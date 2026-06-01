import { analyze } from "../analyze.js";
import { sampleBoardCapitalReallocationBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageSavingsReleaseScore: report.averageSavingsReleaseScore,
    averageRedeploymentReadinessScore: report.averageRedeploymentReadinessScore,
    averageDownsideContainmentScore: report.averageDownsideContainmentScore,
    averageTimingScore: report.averageTimingScore,
    averageBoardAlignmentScore: report.averageBoardAlignmentScore,
    averageUrgencyScore: report.averageUrgencyScore,
    trimCandidates: report.trimCandidates,
    protectLanes: report.protectLanes,
    totalCapitalShiftMillions: report.totalCapitalShiftMillions,
    highFindings,
    recommendation:
      "Trim duplicate procurement packaging, reallocate into the AI and revenue cores, protect identity and biotech continuity, and hold FinTech expansion until proof improves."
  };
}

export function reallocationBrief() {
  return sampleBoardCapitalReallocationBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    trimSource: item.trimSource,
    reinvestTarget: item.reinvestTarget,
    recommendedMove: item.recommendedMove,
    nextMove: item.nextMove
  }));
}

export function trimCandidates() {
  return sampleBoardCapitalReallocationBrief
    .filter((item) => item.action === "TRIM" || item.action === "HOLD")
    .map((item) => ({
      owner: item.owner,
      audience: item.audience,
      action: item.action,
      savingsReleaseScore: item.savingsReleaseScore,
      downsideContainmentScore: item.downsideContainmentScore,
      timingScore: item.timingScore,
      trimSource: item.trimSource,
      companyTags: item.companyTags
    }));
}

export function redeploymentPlan() {
  return sampleBoardCapitalReallocationBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    capitalShiftMillions: item.capitalShiftMillions,
    redeploymentReadinessScore: item.redeploymentReadinessScore,
    boardAlignmentScore: item.boardAlignmentScore,
    urgencyScore: item.urgencyScore,
    headline: item.headline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic capital-reallocation data only - no live committee memos, internal forecasts, or actual budget approvals are included.",
    "Savings release, redeployment readiness, downside containment, timing, board alignment, urgency, and capital-shift metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package trim, protect, hold, and redeploy decisions into one board-readable capital brief.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    reallocationBrief: reallocationBrief(),
    trimCandidates: trimCandidates(),
    redeploymentPlan: redeploymentPlan(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardCapitalReallocationBrief
  };
}
