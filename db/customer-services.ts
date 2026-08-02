import { and, eq } from "drizzle-orm";
import { getDb } from ".";
import {
  customerServices,
  customers,
  devices,
  incidents,
  serviceDependencies,
  serviceIncidentImpacts,
} from "./schema";

export const MIKROTIK_PILOT_DEVICE_ID = "device-mikrotik-rb750gr3-pilot";
export const MIKROTIK_PILOT_CUSTOMER_ID = "CUS-MT-PILOT-001";
export const MIKROTIK_PILOT_SERVICE_ID = "SVC-MT-PILOT-001";

export async function ensureMikrotikPilotService(
  db: ReturnType<typeof getDb>,
  observedAt: string,
) {
  const device = (
    await db
      .select({ id: devices.id })
      .from(devices)
      .where(eq(devices.id, MIKROTIK_PILOT_DEVICE_ID))
      .limit(1)
  )[0];
  if (!device) return false;

  await db
    .insert(customers)
    .values({
      id: MIKROTIK_PILOT_CUSTOMER_ID,
      accountNumber: "PILOT-MT-001",
      name: "Unassigned MikroTik pilot",
      serviceStatus: "active",
      slaTier: "pilot-99.5",
      updatedAt: observedAt,
    })
    .onConflictDoUpdate({
      target: customers.id,
      set: { serviceStatus: "active", updatedAt: observedAt },
    });

  await db
    .insert(customerServices)
    .values({
      id: MIKROTIK_PILOT_SERVICE_ID,
      customerId: MIKROTIK_PILOT_CUSTOMER_ID,
      serviceCode: MIKROTIK_PILOT_SERVICE_ID,
      planName: "Pilot monitored service",
      accessType: "MikroTik routed access",
      site: "MikroTik pilot",
      region: "Pilot",
      endpointIp: "10.66.66.5",
      cpeLabel: "MikroTik RB750Gr3",
      lifecycleState: "active",
      slaTargetBps: 9950,
      updatedAt: observedAt,
    })
    .onConflictDoUpdate({
      target: customerServices.id,
      set: { lifecycleState: "active", updatedAt: observedAt },
    });

  for (const dependency of [
    { id: "DEP-MT-PILOT-UPSTREAM", interfaceName: "ether1", dependencyRole: "upstream" },
    { id: "DEP-MT-PILOT-ACCESS", interfaceName: "client", dependencyRole: "access" },
  ]) {
    await db
      .insert(serviceDependencies)
      .values({
        ...dependency,
        serviceId: MIKROTIK_PILOT_SERVICE_ID,
        deviceId: MIKROTIK_PILOT_DEVICE_ID,
        status: "approved",
        approvedAt: observedAt,
        updatedAt: observedAt,
      })
      .onConflictDoUpdate({
        target: serviceDependencies.id,
        set: { status: "approved", approvedAt: observedAt, updatedAt: observedAt },
      });
  }
  return true;
}

export async function syncServiceIncidentImpact(
  db: ReturnType<typeof getDb>,
  input: {
    incidentId: string;
    interfaceName: string;
    impactType: "outage" | "degradation";
    observedAt: string;
    action: "open" | "resolve";
  },
) {
  const dependencies = await db
    .select({ serviceId: serviceDependencies.serviceId })
    .from(serviceDependencies)
    .where(
      and(
        eq(serviceDependencies.deviceId, MIKROTIK_PILOT_DEVICE_ID),
        eq(serviceDependencies.interfaceName, input.interfaceName),
        eq(serviceDependencies.status, "approved"),
      ),
    );
  const serviceIds = [...new Set(dependencies.map((item) => item.serviceId))];

  if (input.action === "open") {
    for (const serviceId of serviceIds) {
      await db
        .insert(serviceIncidentImpacts)
        .values({
          id: `IMPACT-${input.incidentId}-${serviceId}`,
          serviceId,
          incidentId: input.incidentId,
          impactState: "active",
          impactType: input.impactType,
          startedAt: input.observedAt,
          updatedAt: input.observedAt,
        })
        .onConflictDoNothing();
    }
    await db
      .update(incidents)
      .set({ affectedCustomers: serviceIds.length, updatedAt: input.observedAt })
      .where(eq(incidents.id, input.incidentId));
    return serviceIds.length;
  }

  await db
    .update(serviceIncidentImpacts)
    .set({
      impactState: "resolved",
      endedAt: input.observedAt,
      updatedAt: input.observedAt,
    })
    .where(eq(serviceIncidentImpacts.incidentId, input.incidentId));
  return serviceIds.length;
}
