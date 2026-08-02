export type CollectorLease = {
  collectorId: string;
  failureDomain: string;
  fencingToken: number;
  expiresAt: string;
  releasedAt?: string | null;
};

export type QueueCheckpoint = {
  lastEnqueuedSequence: number;
  lastAcknowledgedSequence: number;
  pendingCount: number;
  oldestPendingAt?: string | null;
};

export function mayAcquirePrimary(input: {
  candidateId: string;
  failureDomain: string;
  now: string;
  current?: CollectorLease | null;
  candidateReady: boolean;
  queueVerified: boolean;
  operatorApproved: boolean;
}) {
  const active = input.current
    && !input.current.releasedAt
    && input.current.failureDomain === input.failureDomain
    && Date.parse(input.current.expiresAt) > Date.parse(input.now);
  if (active) return { allowed: false, reason: "Primary lease is still active; split-brain protection blocked takeover." };
  if (!input.candidateReady) return { allowed: false, reason: "Standby health and capacity checks have not passed." };
  if (!input.queueVerified) return { allowed: false, reason: "Queue checkpoint and replay continuity are not verified." };
  if (!input.operatorApproved) return { allowed: false, reason: "Named failover approval is required." };
  return { allowed: true, reason: "Candidate may acquire the next fencing token." };
}

export function reconcileQueue(checkpoint: QueueCheckpoint) {
  const calculatedPending = Math.max(0, checkpoint.lastEnqueuedSequence - checkpoint.lastAcknowledgedSequence);
  return {
    consistent: calculatedPending === checkpoint.pendingCount,
    calculatedPending,
    replayFromSequence: checkpoint.lastAcknowledgedSequence + 1,
    safeToReplay: calculatedPending === checkpoint.pendingCount,
  };
}
