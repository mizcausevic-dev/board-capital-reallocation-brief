import { describe, expect, it } from "vitest";
import { payload, reallocationBrief, redeploymentPlan, riskMap, summary, trimCandidates, verification } from "./verticalBriefService.js";

describe("board capital reallocation service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the reallocation brief", () => {
    expect(reallocationBrief()[0]?.audience).toBeTruthy();
  });

  it("returns the trim candidates view", () => {
    expect(trimCandidates()[0]?.savingsReleaseScore).toBeGreaterThan(0);
  });

  it("returns the redeployment plan view", () => {
    expect(redeploymentPlan()[0]?.capitalShiftMillions).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
