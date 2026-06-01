import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardCapitalReallocationBrief } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardCapitalReallocationBrief.length);
  });

  it("computes positive reallocation metrics", () => {
    const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageSavingsReleaseScore).toBeGreaterThan(0);
    expect(report.averageRedeploymentReadinessScore).toBeGreaterThan(0);
  });

  it("counts trim and protect lanes", () => {
    const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.trimCandidates).toBeGreaterThan(0);
    expect(report.protectLanes).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up total capital shift", () => {
    const report = analyze(sampleBoardCapitalReallocationBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.totalCapitalShiftMillions).toBeGreaterThan(0);
  });
});
