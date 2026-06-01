import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-capital-reallocation-brief app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/reallocation-brief", "/trim-candidates", "/redeployment-plan", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("html");
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/reallocation-brief",
      "/api/trim-candidates",
      "/api/redeployment-plan",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("json");
    }
  });
});
