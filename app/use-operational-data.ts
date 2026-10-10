"use client";
import { useCallback, useEffect, useRef, useState } from "react";
export type OperationalDevice = {
  id: string;
  hostname: string;
  vendor: string;
  model: string | null;
  managementIp: string | null;
  monitoringEnabled: boolean;
  site: string;
  siteId: string | null;
  collectorId: string | null;
  lastSeenAt: string | null;
  health: {
    status: "online" | "offline" | "unknown";
    reason: string;
    stale: boolean;
  };
  observation: {
    observedAt: string;
    online: boolean;
    latencyMs: number | null;
    packetLossPct: number;
  } | null;
  cpu: number | null;
  memory: number | null;
  metrics: {
    metricKey: string;
    value: number;
    unit: string;
    observedAt: string;
  }[];
};
export type OperationalData = {
  devices: OperationalDevice[];
  sites: { id: string; name: string; region: string | null }[];
  collectors: {
    id: string;
    name: string;
    fresh: boolean;
    lastSeenAt: string | null;
  }[];
  summary: {
    total: number;
    online: number;
    offline: number;
    unknown: number;
    collectorsOnline: number;
  };
  checkedAt: string;
  canAdmin: boolean;
};
export function useOperationalData(live = true) {
  const [data, setData] = useState<OperationalData | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  const controller = useRef<AbortController | null>(null);
  const refresh = useCallback(async () => {
    controller.current?.abort();
    const current = new AbortController();
    controller.current = current;
    setLoading(true);
    try {
      const response = await fetch("/api/platform/devices", {
        cache: "no-store",
        signal: current.signal,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Inventory could not be loaded");
      if (!current.signal.aborted) {
        setData(result);
        setError("");
      }
    } catch (error) {
      if (!current.signal.aborted) {
        setError(
          error instanceof Error
            ? error.message
            : "Inventory could not be loaded",
        );
        setData((previous) =>
          previous
            ? {
                ...previous,
                summary: {
                  ...previous.summary,
                  online: 0,
                  offline: 0,
                  unknown: previous.summary.total,
                  collectorsOnline: 0,
                },
                devices: previous.devices.map((device) => ({
                  ...device,
                  health: {
                    status: "unknown",
                    reason: "Latest health request failed",
                    stale: true,
                  },
                  metrics: [],
                  cpu: null,
                  memory: null,
                })),
                collectors: previous.collectors.map((collector) => ({
                  ...collector,
                  fresh: false,
                })),
              }
            : null,
        );
      }
    } finally {
      if (!current.signal.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => {
      clearTimeout(timer);
      controller.current?.abort();
    };
  }, [refresh]);
  useEffect(() => {
    if (!live) return;
    const timer = setInterval(() => {
      void refresh();
    }, 15000);
    return () => clearInterval(timer);
  }, [refresh, live]);
  return { data, error, loading, refresh };
}
export async function mutate(path: string, method: string, body: unknown) {
  const response = await fetch(path, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Change failed");
  return result;
}
export function timestamp(at: string | null | undefined) {
  return at ? new Date(at).toLocaleString() : "Never";
}
