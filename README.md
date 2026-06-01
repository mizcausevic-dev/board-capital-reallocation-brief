# Board Capital Reallocation Brief

Board-ready capital-reallocation brief for sequencing trims, protections, holds, and reinvestment moves across the executive estate.

- Live: `https://reallocate.kineticgain.com/`
- Repo: `mizcausevic-dev/board-capital-reallocation-brief`

## Why this matters

Leaders need more than ranked asks. They need one brief that shows what should be trimmed, what should be protected, where savings should be redirected, and which redeployment story survives a board or diligence room.

## What it includes

- TypeScript executive-intelligence surface with savings release, redeployment readiness, downside containment, timing, board-alignment, urgency, and capital-shift scoring
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for trim, protect, hold, and redeploy decisions, capital-rotation rollups, and board-ready risk maps
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/reallocation-brief`
- `/trim-candidates`
- `/redeployment-plan`
- `/verification`
- `/docs`

## Local run

```bash
cd board-capital-reallocation-brief
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-capital-reallocation-brief fixtures/board-capital-reallocation-brief.json --format summary
npx board-capital-reallocation-brief fixtures/board-capital-reallocation-brief-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Reallocation brief](screenshots/02-reallocation-brief-proof.png)
![Trim candidates](screenshots/03-trim-candidates-proof.png)
![Redeployment plan](screenshots/04-redeployment-plan-proof.png)
