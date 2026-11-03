# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Agreed design preferences

- Black and red VALDUS branding, transparent supplied logo and smoke texture.
- Anuphan typography, readable contact information, matching 90:54 proportions on both card faces.
- Roles and short taglines stay English; TH/EN switches other copy.
- Nickname follows first name; use full job titles.
- No print control; clicking the phone downloads the current member's vCard.
- Company name, address and registration number belong in the back-face footer.
- Team order: CEO, COO, CTO, PM, HR. Do not invent missing member details.

- Company details now belong to the website footer outside the card (supersedes earlier back-footer preference).
- Do not push changes unless the user explicitly requests a push for the current changes.

- Both visible card faces must always have equal width and height at every viewport. Match the taller content face; never clip text to force equality.
