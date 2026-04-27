# CLAUDE.md — JM Publicidad · Corporate Website

> This file is the single source of truth for Claude Code on this project.
> Read it fully before taking any action in the codebase.
> Update this file at the end of every session.

---

## What This Is

JM Publicidad is a full-service advertising and print production studio based in Spain. They design and manufacture promotional materials — large-format outdoor signage, vehicle branding, branded merchandise, digital displays, and corporate print collateral. They operate B2B with bespoke quotes per project.

This is a **lead generation and service showcase website** — not an e-commerce platform, not a client portal. The primary goal is converting visitors into enquiries. The site must be bilingual (EN primary, ES full translation) and deployed to Cloudflare Pages.

**The client has zero existing digital presence. This site is their first.**

---

## MCP Connections

| Server | Purpose |
|--------|---------|
| `figma` | Read design files, components, styles, tokens |
| `supabase` | Database operations — enquiries table, RLS |

### Figma File
- **File URL:** `https://www.figma.com/design/TK3GGneXlLV2FBTza2PB28/JM-Publicacion--AIXD-Product-engineering-design-file?node-id=4-6&t=ZJteOXxiw11BPlf8-1`
- **Starting node:** `4-6`

> When reading from Figma, always pull exact values — spacing, colour hex, font size, font weight, line height, letter spacing. Do not approximate or assume. If a value is not readable from the MCP, ask rather than guess.

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18 + TypeScript | Bootstrapped with Vite |
| Build Tool | Vite (latest) | |
| Styling | Tailwind CSS v3 | Utility classes only — no custom CSS unless absolutely necessary |
| Routing | React Router v6 | |
| i18n | react-i18next | EN primary, ES full translation — structured from day one, not bolted on later |
| Backend | Supabase | Database for form submissions only (no auth for MVP) |
| Hosting | Cloudflare Pages | Auto-deploy from GitHub main branch |
| Version Control | GitHub | Feature branches, commit messages required |
| AI Dev Environment | Claude Code | Primary build tool — all code via Claude Code |
| MCP Servers | Figma MCP + Supabase MCP | Figma for design-to-code, Supabase for DB ops |
| Component Reference | 21st.dev | |

---

## Brand Identity

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--jm-primary` | `#536049` | Olive green — CTAs, brand name, active nav states, primary buttons |
| `--jm-accent` | `#6c7960` | Mid green — accent text, icon backgrounds, secondary elements |
| `--jm-bg` | `#fbf9f5` | Warm cream — main page background |
| `--jm-bg-section` | `#f6f3ef` | Light warm grey — footer, alternate section backgrounds |
| `--jm-bg-card` | `#f0edea` | Slightly darker warm grey — card backgrounds, secondary sections |
| `--jm-heading` | `#1b1c1a` | Near black — all headings |
| `--jm-body` | `#454840` | Dark warm grey — body copy, secondary text |

> These are the confirmed values pulled from the Figma design file. Do not substitute or approximate.

### Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Display / Headings | **Manrope** | ExtraBold (800), Bold (700) | H1, H2, H3, section titles |
| Body / UI | **Inter** | Regular (400), Medium (500), SemiBold (600) | Body copy, labels, buttons, nav |

- Import both via Google Fonts in any HTML output
- Tailwind font tokens: `font-manrope` (headings), `font-inter` (body)

### Logo
- Mark: JM + vertical 'PUBLICIDAD' — geometric, high-contrast
- On dark backgrounds: white logo on slate
- Reference file: `1000220789.jpg` (attached to brief package)

### Tone
Professional, confident — not playful, not stiff.

### Photography
The client has provided two Google Drive folders of real completed-work photography. These are the strongest credibility asset on the site — use them prominently. The site must feel like a real studio portfolio, not a stock photo brochure.

- Photo library 1: `https://photos.app.goo.gl/nrkqJvZ1AH7HdjNG8`
- Photo library 2: `https://photos.app.goo.gl/dqCPaJMiA7LJJyRV7`

---

## Services Catalogue

All six categories must be represented on the website. Descriptions must exist in both EN and ES, written in plain language.

| Category | Sub-items |
|----------|-----------|
| Outdoor Signage | Classic Signs, Illuminated Signs, 3D Letters |
| Vehicle Branding | Full car wraps, Truck / trailer branding, Vinyl on any surface |
| Digital Advertising | Digital Billboards, LED Billboards, Digital Screens, Counter Cap Touch |
| Promotional Merch | Branded Pens, Cups, Serviettes, Packaging |
| Printed Media | Business Cards, Letterheads, Envelopes, Folders |
| [6th category] | Pull from `Cata.pdf` — attached to brief package |

> IA note: Six categories, multiple sub-items each. Surface without overwhelming the visitor. Consider tabbed layout or category cards.

---

## Target Audience

Three personas — all design and copy decisions must work for all three.

| Code | Persona | Core Need |
|------|---------|-----------|
| MM | Marketing Manager / Brand Owner | See portfolio, request a quote, find a trusted supplier fast |
| OE | SME Owner / Entrepreneur | Understand options, simple contact, get a price idea |
| EC | Existing JM Client | Browse all services, quick contact, share with colleagues |

---

## MVP Scope

### Must Ship
- [ ] Homepage — hero, services overview, CTA
- [ ] Services page — all 6 categories with descriptions
- [ ] Portfolio gallery using client photography
- [ ] Contact page with enquiry form
- [ ] Quote request form (page or modal)
- [ ] Mobile responsive layout
- [ ] EN / ES language toggle — full translation
- [ ] Form submissions stored in Supabase
- [ ] Deployed to Cloudflare Pages
- [ ] RLS enabled — form data protected

### Out of Scope for MVP
- CMS / admin panel for client
- E-commerce or payments
- Additional languages beyond EN / ES
- Client login portal
- SEO beyond basic meta tags

---

## Supabase Schema

### Table: `enquiries`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` (PK) | Auto-generated — UUID, never integer |
| `created_at` | `timestamptz` | Auto-set on insert |
| `name` | `text` | Full name of enquirer |
| `email` | `text` | Contact email |
| `company` | `text` | Business name (optional) |
| `service` | `text` | Which service category they are interested in |
| `message` | `text` | Free-text message |
| `budget_range` | `text` | Optional budget bracket from dropdown |
| `locale` | `text` | Language form was submitted in — `en` or `es` |

> **RLS required before go-live.** Anon users: INSERT only. No SELECT without authentication. The anon key goes in `.env` — never hardcoded in source files.

---

## Environment Variables

| Variable | Source |
|----------|--------|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |

> Anon key only in the frontend — never the service role key.
> Set these in Cloudflare Pages dashboard for production. Never hardcode.

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── ui/             # Base design system components
├── pages/              # Route-level page components
├── lib/                # Utilities, helpers, API clients
│   └── supabase.ts     # Supabase client initialisation
├── i18n/               # Translation files
│   ├── en.json         # English strings
│   └── es.json         # Spanish strings
├── assets/             # Images, fonts, static files
└── main.tsx            # App entry point
public/                 # Files served as-is (favicon, etc.)
CLAUDE.md               # This file
.env                    # Secrets — never committed to Git
.gitignore
package.json
vite.config.ts
```

---

## Coding Conventions

- **TypeScript strict mode** throughout — no `any`, cast to `unknown` first if needed
- **Components in PascalCase** — names must match Figma component names exactly (e.g. `HeroSection.tsx`)
- **Utility functions in camelCase**
- **Named exports only** — no default exports
- Style exclusively with **Tailwind utility classes** — no custom CSS or inline styles
- Every component must handle **loading, error, and empty states**
- Keep components **under 150 lines** — extract sub-components if needed
- Add **JSDoc comments** to all exported functions
- File extensions: `.ts` for logic, `.tsx` for components
- **i18n from day one** — no hardcoded strings in components, all text via `react-i18next`

---

## AIXD Engineering Rules

### Prompting
- Always break large tasks into smaller focused steps before starting
- One task per prompt — complete and commit before moving to the next
- Give full context in every prompt: file path, component name, expected behaviour, screen size if relevant
- If a prompt was wrong, edit the original — do not send a follow-up correction

### Development Loop
1. Write a focused prompt for one specific task
2. Let Claude Code build it
3. Read the diff — understand every change before accepting
4. Test in the browser at localhost
5. Commit if it works, revert if it does not
6. Move to the next task

### Git Discipline
- Always start from a clean `git status` before new work
- Commit after every meaningful piece of work — small commits, easy rollbacks
- Never auto-accept changes without reviewing the diff
- Commit message format: `feat:`, `fix:`, `refactor:`, `chore:`

### Figma → Code Workflow
1. Read the Figma frame via MCP for the component or section being built
2. Extract exact values — colours, typography, spacing, layout
3. Check `/src/components/` for existing reusable pieces before building new
4. Build pixel-accurately — do not invent or deviate from the design
5. If anything in the Figma file is ambiguous, add a `// TODO:` comment and flag it
6. Compare output against the Figma frame before marking done

### CLAUDE.md Updates
- Update this file at the end of every session
- Document current state: what works, what doesn't, known issues
- Record any stack decisions or architectural changes made during the session
- Trigger prompt: `Update CLAUDE.md to reflect today's work`

---

## Security — Non-Negotiable

- `.env` in `.gitignore` before the first commit
- No API keys in any frontend code — reference as `import.meta.env.VITE_YOUR_KEY_NAME`
- If a secret has been committed, treat it as compromised and rotate immediately
- RLS enabled on `enquiries` table — anon INSERT only, no SELECT without authentication
- Anon key used in frontend — never the service role key
- CORS whitelisted to production domain only — never wildcard `*` in production
- Rate limiting configured on contact / quote form endpoint via Cloudflare
- Env variables set in Cloudflare Pages dashboard — not hardcoded anywhere
- Never use sequential integer IDs in URLs — use UUIDs

---

## Client Assets

| Asset | Location |
|-------|----------|
| Photo library 1 | https://photos.app.goo.gl/nrkqJvZ1AH7HdjNG8 |
| Photo library 2 | https://photos.app.goo.gl/dqCPaJMiA7LJJyRV7 |
| Logo reference | `1000220789.jpg` — attached to brief package |
| Services catalogue | `Cata.pdf` — attached to brief package |

---

## Key Files
> Fill in as the project builds out.

---

## Current Status

**Working:**
- Supabase connection — `enquiries` table live, RLS enabled (anon INSERT only)
- Contact form (`/contact`) — full form, EN/ES i18n, submits to Supabase, success/error states
- Routing — all 4 routes registered (`/`, `/services`, `/portfolio`, `/contact`)
- i18n — EN and ES translations in place for all existing sections
- Initial homepage sections scaffolded (Hero, Precision, Services overview, CTA)

**Not yet started:**
- Homepage — needs full design implementation from Figma
- Services page — needs all 6 categories built out
- Portfolio gallery — needs client photography integrated
- Quote request flow
- Cloudflare Pages deployment

**Known issues:** —

---

## Do Not Touch
> Add these as the project progresses.

---

*Last updated: April 2026 · Claude Code · JM Publicidad Live Brief v3 · Dreamlabs AIXD Engineering*
