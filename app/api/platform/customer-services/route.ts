import { and, desc, eq, gte, like } from "drizzle-orm";
import { getDb } from "../../../../db";
import {
  MIKROTIK_PILOT_CUSTOMER_ID,
  ensureMikrotikPilotService,
  MIKROTIK_PILOT_DEVICE_ID,
  MIKROTIK_PILOT_SERVICE_ID,
} from "../../../../db/customer-services";
import {
  auditEvents,
  availabilitySamples,
  customerServices,
  customers,
  devices,
  incidents,
  metricSamples,
  serviceDependencies,
  serviceIncidentImpacts,
} from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

export const dynamic = "force-dynamic";

const PILOT_INTERFACES = new Set(["ether1", "client"]);

function clean(value: unknown, maximum = 120) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function safeInterface(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function formatUptime(seconds: number | null) {
  if (seconds === null) return "—";
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  return days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
}

export async function GET(request: Request) {
  const decision = await authorizeRequest(request, "platform.read");
  if (!decision.ok) return decision.response;

  try {
    const db = getDb();
    const now = new Date();
    const checkedAt = now.toISOString();
    await ensureMikrotikPilotService(db, checkedAt);
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    const [
      serviceRows,
      dependencyRows,
      deviceRows,
      availabilityRows,
      metricRows,
      incidentRows,
      impactRows,
    ] = await Promise.all([
      db
        .select({ service: customerServices, customer: customers })
        .from(customerServices)
        .innerJoin(customers, eq(customerServices.customerId, customers.id))
        .where(eq(customerServices.lifecycleState, "active")),
      db
        .select()
        .from(serviceDependencies)
        .where(eq(serviceDependencies.status, "approved")),
      db
        .select()
        .from(devices)
        .where(eq(devices.id, MIKROTIK_PILOT_DEVICE_ID))
        .limit(1),
      db
        .select()
        .from(availabilitySamples)
        .where(
          and(
            eq(availabilitySamples.deviceId, MIKROTIK_PILOT_DEVICE_ID),
            gte(availabilitySamples.observedAt, dayAgo),
          ),
        )
        .orderBy(desc(availabilitySamples.observedAt))
        .limit(2880),
      db
        .select()
        .from(metricSamples)
        .where(eq(metricSamples.deviceId, MIKROTIK_PILOT_DEVICE_ID))
        .orderBy(desc(metricSamples.observedAt))
        .limit(1000),
      db
        .select()
        .from(incidents)
        .where(like(incidents.title, "MikroTik interface %"))
        .orderBy(desc(incidents.openedAt))
        .limit(50),
      db
        .select()
        .from(serviceIncidentImpacts)
        .orderBy(desc(serviceIncidentImpacts.startedAt))
        .limit(50),
    ]);

    const latestMetric = new Map<string, (typeof metricRows)[number]>();
    for (const sample of metricRows) {
      if (!latestMetric.has(sample.metricKey)) latestMetric.set(sample.metricKey, sample);
    }
    const metricValue = (interfaceName: string, suffix: string) => {
      const safe = safeInterface(interfaceName);
      for (const [key, sample] of latestMetric) {
        if (
          new RegExp(`^interface\\.i\\d+_${safe}\\.${suffix.replaceAll(".", "\\.")}$`).test(
            key,
          )
        ) {
          return sample.value;
        }
      }
      return null;
    };
    const deviceMetric = (key: string) => latestMetric.get(key)?.value ?? null;
    const device = deviceRows[0] ?? null;
    const latestAvailability = availabilityRows[0] ?? null;
    const live = Boolean(
      latestAvailability &&
        now.getTime() - Date.parse(latestAvailability.observedAt) < 180_000,
    );
    const uptimePct = availabilityRows.length
      ? Math.round(
          (availabilityRows.filter((sample) => sample.online).length /
            availabilityRows.length) *
            10000,
        ) / 100
      : null;
    const activeIncidents = incidentRows.filter((incident) => incident.status !== "resolved");
    const incidentById = new Map(incidentRows.map((incident) => [incident.id, incident]));

    const services = serviceRows.map(({ service, customer }) => {
      const dependencies = dependencyRows.filter((item) => item.serviceId === service.id);
      const accessDependency =
        dependencies.find((item) => item.dependencyRole === "access") ?? dependencies[0];
      const interfaceStates = dependencies
        .map((item) => metricValue(item.interfaceName, "oper.status"))
        .filter((value): value is number => value !== null);
      const storedImpact = impactRows.find(
        (impact) => impact.serviceId === service.id && impact.impactState === "active",
      );
      const fallbackIncident = activeIncidents.find((incident) =>
        dependencies.some((dependency) =>
          incident.title.startsWith(`MikroTik interface ${dependency.interfaceName} `),
        ),
      );
      const activeIncident = storedImpact
        ? incidentById.get(storedImpact.incidentId) ?? fallbackIncident
        : fallbackIncident;
      const isOffline =
        !live ||
        !latestAvailability?.online ||
        interfaceStates.some((state) => state === 2) ||
        storedImpact?.impactType === "outage";
      const isDegraded =
        !isOffline &&
        (Boolean(activeIncident) ||
          interfaceStates.length < dependencies.length ||
          (latestAvailability?.packetLossPct ?? 0) >= 2 ||
          (latestAvailability?.latencyMs ?? 0) >= 100);
      const status = isOffline ? "Offline" : isDegraded ? "Degraded" : "Operational";
      const loss = latestAvailability?.packetLossPct ?? 100;
      const latency = latestAvailability?.latencyMs ?? null;
      const health = Math.max(
        0,
        Math.min(
          100,
          (isOffline ? 25 : isDegraded ? 72 : 98) -
            Math.min(loss, 15) -
            (latency !== null && latency > 100 ? 8 : 0),
        ),
      );

      return {
        id: customer.id,
        accountNumber: customer.accountNumber,
        name: customer.name,
        serviceId: service.id,
        serviceCode: service.serviceCode,
        plan: service.planName,
        access: service.accessType,
        site: service.site,
        region: service.region ?? "Unassigned",
        endpointIp: service.endpointIp,
        cpe: service.cpeLabel,
        lifecycleState: service.lifecycleState,
        status,
        downBps: accessDependency
          ? metricValue(accessDependency.interfaceName, "rx.bps")
          : null,
        upBps: accessDependency
          ? metricValue(accessDependency.interfaceName, "tx.bps")
          : null,
        latencyMs: latency,
        packetLossPct: loss,
        health,
        slaTargetPct: service.slaTargetBps / 100,
        observedAvailabilityPct: uptimePct,
        observationStartedAt:
          availabilityRows.at(-1)?.observedAt ?? latestAvailability?.observedAt ?? null,
        sessionUptime: formatUptime(deviceMetric("device.uptime.seconds")),
        dependencies: dependencies.map((dependency) => ({
          deviceId: dependency.deviceId,
          deviceName: device?.hostname ?? dependency.deviceId,
          interfaceName: dependency.interfaceName,
          role: dependency.dependencyRole,
          operStatus: metricValue(dependency.interfaceName, "oper.status"),
        })),
        activeIncident: activeIncident
          ? {
              id: activeIncident.id,
              title: activeIncident.title,
              severity: activeIncident.severity,
              status: activeIncident.status,
              openedAt: activeIncident.openedAt,
              impactType: storedImpact?.impactType ?? "degradation",
            }
          : null,
        lastObservedAt: latestAvailability?.observedAt ?? null,
      };
    });

    const incidentImpact = activeIncidents
      .map((incident) => {
        const affectedServices = services.filter(
          (service) => service.activeIncident?.id === incident.id,
        );
        return {
          id: incident.id,
          title: incident.title,
          severity: incident.severity,
          status: incident.status,
          openedAt: incident.openedAt,
          affectedServices: affectedServices.length,
          affectedCustomers: new Set(affectedServices.map((service) => service.id)).size,
        };
      })
      .filter((incident) => incident.affectedServices > 0);

    return Response.json(
      {
        source: "live",
        checkedAt,
        scope: {
          label: "Commissioned MikroTik pilot",
          deviceId: MIKROTIK_PILOT_DEVICE_ID,
          customerAssignment:
            services[0]?.name === "Unassigned MikroTik pilot" ? "unassigned" : "assigned",
          refreshSeconds: 15,
          performancePollSeconds: 60,
        },
        summary: {
          activeServices: services.length,
          operational: services.filter((service) => service.status === "Operational").length,
          degraded: services.filter((service) => service.status === "Degraded").length,
          offline: services.filter((service) => service.status === "Offline").length,
          impactedCustomers: new Set(
            services
              .filter((service) => service.activeIncident)
              .map((service) => service.id),
          ).size,
        },
        services,
        incidentImpact,
        controls: {
          persistentMappings: true,
          automaticIncidentCorrelation: true,
          networkWrites: false,
          externalNotifications: false,
        },
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Customer service monitoring is unavailable",
      },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const decision = await authorizeRequest(request, "platform.admin");
  if (!decision.ok) return decision.response;

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const customerName = clean(payload.customerName);
  const accountNumber = clean(payload.accountNumber, 48).toUpperCase();
  const planName = clean(payload.planName);
  const site = clean(payload.site);
  const region = clean(payload.region);
  const slaTargetPct =
    typeof payload.slaTargetPct === "number" ? payload.slaTargetPct : Number.NaN;
  const dependencyInterfaces = Array.isArray(payload.dependencyInterfaces)
    ? [...new Set(payload.dependencyInterfaces.map((item) => clean(item, 32)).filter(Boolean))]
    : [];

  if (
    customerName.length < 2 ||
    !/^[A-Z0-9][A-Z0-9._/-]{2,47}$/.test(accountNumber) ||
    planName.length < 2 ||
    site.length < 2 ||
    region.length < 2
  ) {
    return Response.json(
      { error: "Customer, account, package, site and region are required." },
      { status: 422 },
    );
  }
  if (!Number.isFinite(slaTargetPct) || slaTargetPct < 95 || slaTargetPct > 99.999) {
    return Response.json(
      { error: "SLA target must be between 95% and 99.999%." },
      { status: 422 },
    );
  }
  if (
    dependencyInterfaces.length === 0 ||
    dependencyInterfaces.some((name) => !PILOT_INTERFACES.has(name))
  ) {
    return Response.json(
      { error: "Select at least one verified pilot interface." },
      { status: 422 },
    );
  }

  try {
    const db = getDb();
    const updatedAt = new Date().toISOString();
    await ensureMikrotikPilotService(db, updatedAt);
    const duplicate = (
      await db
        .select({ id: customers.id })
        .from(customers)
        .where(eq(customers.accountNumber, accountNumber))
        .limit(1)
    )[0];
    if (duplicate && duplicate.id !== MIKROTIK_PILOT_CUSTOMER_ID) {
      return Response.json({ error: "That customer account already exists." }, { status: 409 });
    }

    await db
      .update(customers)
      .set({
        accountNumber,
        name: customerName,
        serviceStatus: "active",
        slaTier: `custom-${slaTargetPct}`,
        updatedAt,
      })
      .where(eq(customers.id, MIKROTIK_PILOT_CUSTOMER_ID));
    await db
      .update(customerServices)
      .set({
        planName,
        site,
        region,
        slaTargetBps: Math.round(slaTargetPct * 100),
        updatedAt,
      })
      .where(eq(customerServices.id, MIKROTIK_PILOT_SERVICE_ID));

    for (const interfaceName of PILOT_INTERFACES) {
      await db
        .update(serviceDependencies)
        .set({
          status: dependencyInterfaces.includes(interfaceName) ? "approved" : "inactive",
          approvedAt: dependencyInterfaces.includes(interfaceName) ? updatedAt : null,
          updatedAt,
        })
        .where(
          and(
            eq(serviceDependencies.serviceId, MIKROTIK_PILOT_SERVICE_ID),
            eq(serviceDependencies.interfaceName, interfaceName),
          ),
        );
    }

    await db.insert(auditEvents).values({
      id: `customer-service-assignment-${crypto.randomUUID()}`,
      actorEmail: decision.identity.email,
      action: "customer_service.assign",
      resourceType: "customer_service",
      resourceId: MIKROTIK_PILOT_SERVICE_ID,
      outcome: "allowed",
      requestId: request.headers.get("x-request-id"),
      metadata: {
        accountNumber,
        planName,
        site,
        region,
        slaTargetPct,
        dependencyInterfaces,
        networkWrites: false,
      },
    });

    return Response.json(
      {
        ok: true,
        assignedAt: updatedAt,
        assignedBy: decision.identity.displayName,
        networkWrites: false,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Service assignment failed" },
      { status: 503 },
    );
  }
}
