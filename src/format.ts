import type { BoardCapitalReallocationReport } from "./types.js";

export function toSummary(report: BoardCapitalReallocationReport) {
  return [
    `Reallocation lanes: ${report.items}`,
    `Average savings release: ${report.averageSavingsReleaseScore}`,
    `Average redeployment readiness: ${report.averageRedeploymentReadinessScore}`,
    `Average downside containment: ${report.averageDownsideContainmentScore}`,
    `Average timing score: ${report.averageTimingScore}`,
    `Average board alignment: ${report.averageBoardAlignmentScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Trim candidates: ${report.trimCandidates}`,
    `Protect lanes: ${report.protectLanes}`,
    `Total capital shift ($M): ${report.totalCapitalShiftMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
