import { payload, redeploymentPlan, reallocationBrief, riskMap, summary, trimCandidates, verification } from "./verticalBriefService.js";

const productTitle = "Board Capital Reallocation Brief";
const domain = "https://reallocate.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/reallocation-brief", "Reallocation brief"],
    ["/trim-candidates", "Trim candidates"],
    ["/redeployment-plan", "Redeployment plan"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = reallocationBrief().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.trimSource)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Reinvest target:</strong> ${escapeHtml(item.reinvestTarget)}</p>
        <p>${escapeHtml(item.recommendedMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Board Capital Rotation</span>
      <h1>What should leadership trim, protect, hold, and redeploy next?</h1>
      <p class="lede">Board Capital Reallocation Brief turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one committee-ready capital rotation packet.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Reallocation lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current committee packet.</div></div>
        <div class="metric"><span class="metric-label">Savings release</span><span class="metric-value">${executiveSummary.averageSavingsReleaseScore}</span><div class="metric-copy">Average strength of each release-of-capital move.</div></div>
        <div class="metric"><span class="metric-label">Redeployment readiness</span><span class="metric-value">${executiveSummary.averageRedeploymentReadinessScore}</span><div class="metric-copy">Average readiness of the target lanes absorbing released capital.</div></div>
        <div class="metric"><span class="metric-label">Capital shift</span><span class="metric-value">$${executiveSummary.totalCapitalShiftMillions}M</span><div class="metric-copy">Modeled capital that can rotate into stronger board-approved lanes.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Capital rotation queue</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Reallocation findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for trimming, protecting, holding, and redeploying capital across the executive estate."
  );
}

export function renderReallocationBrief() {
  const rows = reallocationBrief()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.trimSource)}</td>
        <td>${escapeHtml(item.reinvestTarget)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Reallocation brief",
    "/reallocation-brief",
    `<section class="hero">
      <span class="eyebrow">Reallocation brief</span>
      <h1>Every capital-rotation move stays tied to one audience, one source, and one destination.</h1>
      <p class="lede">The reallocation brief keeps trim, protect, hold, and redeploy decisions readable instead of scattering them across unrelated deck fragments.</p>
      <div class="nav">${navLinks("/reallocation-brief")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Trim source</th><th>Reinvest target</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Reallocation brief showing capital source, destination, and owner accountability."
  );
}

export function renderTrimCandidates() {
  const rows = trimCandidates()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.savingsReleaseScore}</td>
        <td>${item.downsideContainmentScore}</td>
        <td>${item.timingScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Trim candidates",
    "/trim-candidates",
    `<section class="hero">
      <span class="eyebrow">Trim candidates</span>
      <h1>See which lanes can release capital now without breaking the board story.</h1>
      <p class="lede">This view keeps savings release, downside containment, and timing together so the committee can cut cleanly instead of trimming into risk.</p>
      <div class="nav">${navLinks("/trim-candidates")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Savings release</th><th>Downside containment</th><th>Timing</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Trim-candidate view for capital release, downside containment, and timing."
  );
}

export function renderRedeploymentPlan() {
  const rows = redeploymentPlan()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>$${item.capitalShiftMillions}M</td>
        <td>${item.redeploymentReadinessScore}</td>
        <td>${item.boardAlignmentScore}</td>
        <td>${item.urgencyScore}</td>
      </tr>`
    )
    .join("");
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Redeployment plan",
    "/redeployment-plan",
    `<section class="hero">
      <span class="eyebrow">Redeployment plan</span>
      <h1>Capital shift, readiness, alignment, and urgency stay visible in one redeployment plan.</h1>
      <p class="lede">The redeployment plan highlights where released capital should go next and which motions still need more proof before approval.</p>
      <div class="nav">${navLinks("/redeployment-plan")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Capital shift</th><th>Redeployment readiness</th><th>Board alignment</th><th>Urgency</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="section">
      <h2>Verification</h2>
      <ul>${notes}</ul>
    </section>`,
    "Redeployment-plan view for capital shift, board alignment, and urgency."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this capital-reallocation packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, proof boundaries, and reproducibility notes visible before anyone treats the sample as live investment advice.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Capital Reallocation Brief sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Capital Reallocation Brief docs</h1>
      <p class="lede">This surface packages trim, protect, hold, and redeploy decisions into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/reallocation-brief</code> keeps sources, destinations, actions, and next moves readable.</li>
        <li><code>/trim-candidates</code> compares savings release, downside containment, and timing.</li>
        <li><code>/redeployment-plan</code> shows capital shift, redeployment readiness, and board alignment.</li>
        <li><code>/api/payload</code> exposes the reproducible capital-reallocation packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Capital Reallocation Brief and its board-decision routes."
  );
}
