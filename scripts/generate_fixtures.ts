import { toExport } from "../src/analyze.js";
import { sampleBoardCapitalReallocationBrief } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardCapitalReallocationBrief.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/board-capital-reallocation-brief.json",
  JSON.stringify(toExport(sampleBoardCapitalReallocationBrief), null, 2)
);

writeFileSync(
  "fixtures/board-capital-reallocation-brief-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
