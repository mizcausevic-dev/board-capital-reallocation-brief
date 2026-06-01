import type {
  BoardCapitalReallocationExport,
  BoardCapitalReallocationItem,
  BoardCapitalReallocationReport,
  Finding
} from "./types.js";

function average(items: BoardCapitalReallocationItem[], pick: (item: BoardCapitalReallocationItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardCapitalReallocationItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "TRIM" && item.savingsReleaseScore >= 78 && item.boardAlignmentScore >= 74) {
    findings.push({
      code: "trim-ready",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane can release capital now without breaking the board story."
    });
  }

  if (item.action === "PROTECT" && item.downsideContainmentScore >= 78 && item.boardAlignmentScore >= 80) {
    findings.push({
      code: "protect-core",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane behaves like protected core infrastructure and should be defended from opportunistic cuts."
    });
  }

  if (item.action === "REALLOCATE_IN" && item.redeploymentReadinessScore >= 84 && item.timingScore >= 76) {
    findings.push({
      code: "redeploy-now",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready to absorb released capital in the next committee cycle."
    });
  }

  if (item.timingScore <= 58 || item.urgencyScore >= 82) {
    findings.push({
      code: "timing-fragile",
      severity: item.timingScore <= 50 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Timing is fragile enough that the board should sequence this move carefully rather than assume immediate execution."
    });
  }

  if (item.boardAlignmentScore < 68 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-proof",
      severity: item.boardAlignmentScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The reallocation narrative still rests on thin proof and needs tighter evidence before approval."
    });
  }

  if (item.downsideContainmentScore <= 55 && item.urgencyScore >= 72) {
    findings.push({
      code: "downside-cluster",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "Downside pressure is clustering faster than the current plan contains it."
    });
  }

  return findings;
}

export function analyze(
  items: BoardCapitalReallocationItem[],
  options: { now?: string } = {}
): BoardCapitalReallocationReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const trimCandidates = items.filter((item) => item.action === "TRIM").length;
  const protectLanes = items.filter((item) => item.action === "PROTECT").length;
  const totalCapitalShiftMillions = Math.round(items.reduce((sum, item) => sum + item.capitalShiftMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageSavingsReleaseScore: average(items, (item) => item.savingsReleaseScore),
    averageRedeploymentReadinessScore: average(items, (item) => item.redeploymentReadinessScore),
    averageDownsideContainmentScore: average(items, (item) => item.downsideContainmentScore),
    averageTimingScore: average(items, (item) => item.timingScore),
    averageBoardAlignmentScore: average(items, (item) => item.boardAlignmentScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    trimCandidates,
    protectLanes,
    totalCapitalShiftMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardCapitalReallocationItem[], now?: string): BoardCapitalReallocationExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
