export type AllocationTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type ReallocationAction = "REALLOCATE_IN" | "PROTECT" | "HOLD" | "TRIM";

export interface BoardCapitalReallocationItem {
  id: string;
  owner: string;
  audience: string;
  track: AllocationTrack;
  action: ReallocationAction;
  trimSource: string;
  reinvestTarget: string;
  boardQuestion: string;
  currentPosture: string;
  recommendedMove: string;
  savingsReleaseScore: number;
  redeploymentReadinessScore: number;
  downsideContainmentScore: number;
  timingScore: number;
  boardAlignmentScore: number;
  urgencyScore: number;
  capitalShiftMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardCapitalReallocationExport {
  generatedAt: string;
  items: BoardCapitalReallocationItem[];
}

export type FindingCode =
  | "trim-ready"
  | "protect-core"
  | "redeploy-now"
  | "timing-fragile"
  | "thin-proof"
  | "downside-cluster";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: AllocationTrack;
  audience: string;
  message: string;
}

export interface BoardCapitalReallocationReport {
  generatedAt: string;
  items: number;
  averageSavingsReleaseScore: number;
  averageRedeploymentReadinessScore: number;
  averageDownsideContainmentScore: number;
  averageTimingScore: number;
  averageBoardAlignmentScore: number;
  averageUrgencyScore: number;
  trimCandidates: number;
  protectLanes: number;
  totalCapitalShiftMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
