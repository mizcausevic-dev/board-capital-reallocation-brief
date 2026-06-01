# Architecture

Board Capital Reallocation Brief is a static-friendly TypeScript executive-intelligence surface for showing what leadership should trim, protect, hold, and redeploy next.

## Core flow

- `src/data/sampleVerticalBrief.ts` models capital-rotation lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores savings release, redeployment readiness, downside containment, timing, board alignment, urgency, and total capital shift while generating reallocation findings.
- `src/services/verticalBriefService.ts` exposes the reallocation-brief, trim-candidates, redeployment-plan, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- what should we trim now
- what should we protect from cuts
- what should we hold until proof improves
- where should released capital be redeployed

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
