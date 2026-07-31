<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Hakim Portfolio — Project Context

## What This Is

A personal portfolio website for **Hakim**, a master's student in Canada. The site showcases project case studies, certifications, publications, and achievements — functioning as both a professional presence and an academic portfolio.

**Live domain:** `https://hakim.automex.tech` (subdomain of `automex.tech`, a USA LLC).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Content | MDX files with `gray-matter` frontmatter + `remark` HTML rendering |
| Language | TypeScript 5 (strict mode) |
| Package manager | npm |
| Deployment | Static export to Hostinger VPS, served via Nginx, SSL via Certbot |

## Design System — "Schematic"

`src/app/globals.css` implements a blueprint/drafting-table visual language: cool graphite-navy surfaces, a hairline coordinate grid, and lines that draw themselves in on load like a circuit lighting up. Every component should pull its colors, type, and motion from these tokens rather than hard-coding values.

### Color tokens

Defined as CSS variables in `:root` and mapped through `@theme inline`, so they're available as normal Tailwind utilities (`bg-background`, `text-foreground`, `bg-accent`, `border-border`, etc.) with **no config file edits needed**.

| Token | Dark (default) | Light (`prefers-color-scheme: light`) | Use for |
|---|---|---|---|
| `--background` | `#0a0e14` | `#f5f7fa` | Page background |
| `--background-elevated` | `#10151f` | `#ffffff` | Cards, panels |
| `--foreground` | `#e8ecf2` | `#12161d` | Body text |
| `--muted` | `#8a94a6` | `#5b6472` | Secondary text |
| `--border` / `--border-strong` | `#1e2733` / `#2a3644` | `#e1e6ed` / `#cbd3dd` | Rules, grid lines, dividers |
| `--accent` | `#f2a93b` | `#c9791f` | Primary CTA, links on hover, focal highlights |
| `--accent-foreground` | `#16110a` | `#fff9f0` | Text/icons placed on top of `--accent` |
| `--accent-secondary` | `#35d0c0` | `#0f9488` | Links, code highlights, trace-line color |
| `--danger` | `#ef6f6f` | `#ef6f6f` | Form/validation errors |

Dark is the default identity of the site; the light variant is an automatic OS-preference fallback, not a separate design — there is no manual toggle (see Key Conventions).

### Type

| Role | Token | Font | Notes |
|---|---|---|---|
| Display / headings | `font-display` (`h1`–`h4` by default) | Space Grotesk | Set via `next/font/google` in `layout.tsx`, exposed as `--font-space-grotesk`. Used with restraint — headings only. |
| Body | `font-sans` | Geist Sans | Already wired via the default `next/font` setup. |
| Mono / labels / code | `font-mono` or `.mono` | Geist Mono | Use for nav eyebrows, coordinate-style annotations, tags, and code blocks — reinforces the blueprint feel. |

**Action needed:** add Space Grotesk to `layout.tsx` alongside the existing Geist fonts:
```ts
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
// add spaceGrotesk.variable to the <html> className alongside the Geist variables
```

### Signature motion — "trace"

Utility classes in `globals.css`, all respecting `prefers-reduced-motion`:

- `.bg-blueprint-grid` — faint coordinate grid background; use behind the hero or full-bleed sections.
- `.trace-line` — for an inline `<svg><path>`; set `stroke-dasharray` to the path length (or leave the 1000 default) and it draws itself in on mount.
- `.trace-rule` — non-SVG variant; a bottom border that draws left-to-right. Good under headings or above the footer.
- `.reveal` — simple fade/rise-in, for scroll-triggered or staggered content reveals.

Spend this motion deliberately — one orchestrated hero moment (e.g. a trace-line drawing the outline of a device or a connecting path between skill badges) reads better than scattering `.reveal` everywhere.

### Radius

`--radius-sm` (4px) / `--radius-md` (8px) / `--radius-lg` (16px) map onto Tailwind's built-in radius scale, so `rounded-sm` / `rounded-md` / `rounded-lg` just work.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header + Footer wrapper)
│   ├── page.tsx                  # Homepage (hero, skills, featured projects, CTA)
│   ├── globals.css               # Tailwind v4 imports + Schematic design tokens
│   ├── projects/
│   │   ├── page.tsx              # All projects listing
│   │   └── [slug]/page.tsx       # Single project detail (MDX rendered)
│   ├── certifications/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── publications/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── achievements/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/                   # ONLY shared/layout components
│   ├── Header.tsx                # Sticky nav with mobile hamburger
│   ├── Footer.tsx
│   ├── ProjectCard.tsx           # Card used on homepage + projects listing
│   ├── SkillBadge.tsx            # Pill badge used on homepage
│   ├── CertificationCard.tsx
│   ├── Timeline.tsx              # Used by achievements page
│   └── ContactForm.tsx           # Used by contact page
├── lib/
│   ├── constants.ts              # SITE, NAV_LINKS, SKILLS, SOCIAL_LINKS
│   └── content.ts                # MDX reader: getContentBySlug, getAllContent, etc.
└── content/                      # MDX content files (the "database")
    ├── projects/
    │   ├── ecommerce-dashboard.mdx
    │   ├── ml-pipeline.mdx
    │   └── multicloud-cicd-migration.mdx
    ├── certifications/
    ├── publications/
    └── achievements/
```

## Component Co-Location Rule (CRITICAL)

**Each page stores its own page-specific components in a co-located `_components/` directory.** For example:
- `src/app/projects/_components/ProjectFilter.tsx` — only used by the projects page
- `src/app/certifications/_components/CertBadge.tsx` — only used by certifications

**The ONLY exception is the homepage** (`page.tsx`), whose components (`Header`, `Footer`, `ProjectCard`, `SkillBadge`) live in `src/components/` because they are **shared across the entire site** or **used by the root layout**.

**Rule:** If only ONE page uses a component, it goes in `_components/`. If TWO OR MORE pages use it, it goes in `src/components/`.

## MDX Content Authoring

All content lives as `.mdx` files under `src/content/{type}/`. Each file has **YAML frontmatter** followed by **Markdown body**.

### Required Frontmatter Fields

```yaml
---
title: "Full-Stack E-Commerce Dashboard"   # Display title (string)
slug: "ecommerce-dashboard"                # URL slug (string, kebab-case)
date: "2025-01-20"                         # ISO date (string, YYYY-MM-DD)
category: "Web Development"                # Category label (string)
tags: ["Next.js", "React", "TypeScript"]   # Tags (string array)
image: ""                                  # Hero image path or empty (string)
featured: true                             # Show on homepage? (boolean)
summary: "Built a responsive..."           # Short summary for cards (string)
---
```

### Supported Content Types

| Type | Directory | Card Component | Detail Page |
|---|---|---|---|
| `projects` | `src/content/projects/` | `ProjectCard` | `[slug]/page.tsx` |
| `certifications` | `src/content/certifications/` | Native card in listing | `[slug]/page.tsx` |
| `publications` | `src/content/publications/` | Native card in listing | `[slug]/page.tsx` |
| `achievements` | `src/content/achievements/` | `Timeline` | N/A (list only) |

### The `ContentMeta` Interface

```ts
interface ContentMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  summary: string;
}
```

## Development Commands

```bash
npm run dev      # Start dev server (default: http://localhost:3000)
npm run build    # Production build (static export)
npm run lint     # Run ESLint
```

## Key Conventions

1. **Dark mode** — Every component must support dark mode via Tailwind's `dark:` prefix, but with the Schematic tokens above most components shouldn't need `dark:` overrides at all — reference the CSS variables (`bg-background`, `text-foreground`, etc.) and light/dark is handled centrally in `globals.css`. The dark variant is triggered by the user's OS preference (no toggle needed — this is a static site).

2. **TypeScript strict** — `tsconfig.json` has `"strict": true`. No `any` types. Use the `ContentMeta` and `ContentItem` interfaces from `@/lib/content` for typed content handling.

3. **Static generation** — All pages are generated at build time (no `"use client"` unless absolutely needed). Data comes from `fs.readFileSync` calls in `content.ts` — there is no database, no API routes, no server-side runtime. Note: `.trace-line` / `.reveal` rely on CSS `animation`, not JS, so they don't require `"use client"` by themselves — only add it if you wire up scroll-trigger logic (e.g. `IntersectionObserver`) for `.reveal`.

4. **`@/*` alias** — Maps to `./src/*`. Always use `@/components/...`, `@/lib/...`, etc. — never relative imports for `src/` files.

5. **CSS** — Tailwind CSS v4 via `@tailwindcss/postcss`. The main stylesheet is `src/app/globals.css`, which defines the full Schematic token system above via `@theme inline`. No CSS modules or styled-components — Tailwind only. Don't hard-code hex colors in components; use the token utilities.

6. **Next.js 16 specifics** — This is Next.js 16 with React 19. APIs may differ from Next.js 12/13/14. Check `node_modules/next/dist/docs/` if something doesn't work as expected.

## Deployment

- **Build output:** Static export (`next build` produces `out/` directory)
- **Server:** Hostinger VPS running Nginx
- **Domain:** `hakim.automex.tech`
- **SSL:** Certbot (Let's Encrypt)
- **No CI/CD in place yet** — deployments are manual (copy `out/` to the VPS)

## Navigation (6 pages)

| Route | Label | Description |
|---|---|---|
| `/` | Home | Hero, skills, featured projects, certifications, CTA |
| `/projects` | Projects | All project case studies, filterable by category |
| `/projects/[slug]` | — | Individual project detail (MDX rendered) |
| `/certifications` | Certifications | Professional credentials |
| `/certifications/[slug]` | — | Individual certification detail |
| `/publications` | Publications | Research papers and publications |
| `/publications/[slug]` | — | Individual publication detail |
| `/achievements` | Achievements | Timeline of academic achievements |
| `/contact` | Contact | Contact form |