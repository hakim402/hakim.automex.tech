# Portfolio Technology Plan

## Summary

A statically-generated portfolio site using **Next.js 15** (App Router, static export), **Tailwind CSS** for styling, and **MDX/Markdown** for all content. Built output is deployed as static files to a Hostinger VPS behind Nginx, served at **hakim.automex.tech** (subdomain of automex.tech).

## Recommended Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 15 (App Router) | Full React framework you're skilled in; file-based routing; built-in MDX support via @next/mdx; static export for zero-server hosting |
| **UI** | React 19 | Your primary skillset; server components by default in App Router for performance |
| **Styling** | Tailwind CSS 4 | Rapid, consistent design; responsive out of the box; works great with Next.js |
| **Content** | MDX / Markdown | Each case study, certification, publication = one `.mdx` file; rendered at build time |
| **Content Layer** | gray-matter | Parse YAML frontmatter from `.mdx` files at build time for listing pages and filtering |
| **Package Manager** | npm | Standard Node.js package manager; simpler CI/CD setup |
| **Linting/Formatting** | ESLint + Prettier | Built-in Next.js ESLint config + Prettier |
| **Deployment** | Static export → Nginx on Hostinger VPS | `next build` outputs a static `out/` folder; Nginx serves it directly — no Node.js runtime needed in production |

## Domain Setup

- **Domain**: `hakim.automex.tech`
- **Parent domain**: `automex.tech` (USA LLC)
- **DNS**: Add an A record pointing `hakim.automex.tech` → Hostinger VPS IP
- **SSL**: Certbot (Let's Encrypt) certificate via Nginx

## Why Next.js Static Export

- You already know React and the Next.js ecosystem — fastest path to building
- App Router gives you server components at build time (zero client JS for content pages)
- `next build` with `output: 'export'` produces a 100% static `out/` folder — no Node.js needed in production
- File-based routing with `page.tsx` is intuitive and well-documented
- If you ever want to add a backend later (API routes, form handling, auth), just remove `output: 'export'` and you have a full Next.js server — no migration needed

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Header, Footer, metadata)
│   │   ├── page.tsx            # Home page
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects listing with filters
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual project case study
│   │   ├── certifications/
│   │   │   ├── page.tsx        # Certifications grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Single certification detail
│   │   ├── publications/
│   │   │   ├── page.tsx        # Publications list
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Single publication detail
│   │   ├── achievements/
│   │   │   └── page.tsx        # Achievements timeline
│   │   └── contact/
│   │       └── page.tsx        # Contact form
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBadge.tsx
│   │   ├── CertificationCard.tsx
│   │   ├── Timeline.tsx
│   │   └── ContactForm.tsx
│   ├── content/                # All Markdown/MDX content files
│   │   ├── projects/
│   │   │   └── sample-case-study.mdx
│   │   ├── certifications/
│   │   ├── publications/
│   │   └── achievements/
│   ├── lib/                    # Utility functions
│   │   ├── content.ts          # MDX parsing helpers (gray-matter, etc.)
│   │   └── constants.ts        # Site-wide constants
│   └── styles/
│       └── globals.css         # Tailwind directives + custom styles
├── public/                     # Static assets
│   ├── images/
│   ├── resume.pdf
│   └── favicon.ico
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── package.json
```

## Hostinger VPS Deployment Architecture

```
GitHub Repo (main branch)
    │
    ▼ (git push triggers)
GitHub Actions
    │
    ├── npm ci
    ├── npm run build           → generates out/ folder (static export)
    └── rsync out/ → VPS (/var/www/hakim.automex.tech)
                              │
                              ▼
                         Nginx (virtual host for hakim.automex.tech)
                              │
                              ▼
                    https://hakim.automex.tech
```

- **Nginx server block** configured specifically for `hakim.automex.tech`
- **SSL**: Certbot auto-renews Let's Encrypt certificate
- **Static files** served from `/var/www/hakim.automex.tech`
- **GitHub Actions** builds the Next.js static export and rsyncs to VPS on every push to `main`
- **VPS prerequisites**: Node.js 20+ (for build), Nginx, Certbot, rsync

## Key Pages & Features

| Page | Route | Content Source | Interactive? |
|------|-------|---------------|--------------|
| Home | `/` | Hero, skill badges, featured projects | Yes — subtle animations, skill carousel |
| Projects | `/projects` | `/content/projects/*.mdx` — case studies with images | Yes — category filter |
| Project Detail | `/projects/[slug]` | Individual `.mdx` file | No |
| Certifications | `/certifications` | `/content/certifications/*.mdx` | Yes — filter by category |
| Publications | `/publications` | `/content/publications/*.mdx` | No |
| Achievements | `/achievements` | `/content/achievements/*.mdx` — timeline layout | No |
| Contact | `/contact` | Inline component with form | Yes — form with validation |

## Content File Format (MDX Frontmatter)

Each `.mdx` file starts with YAML frontmatter for structured data:

```yaml
---
title: "Project Title"
slug: "project-slug"
date: "2025-06-01"
category: "machine-learning"
tags: ["Python", "TensorFlow", "NLP"]
image: "/images/projects/project-cover.jpg"
featured: true
summary: "A brief one-liner describing this project."
---
# Rest of the content in Markdown...
```

This frontmatter is parsed at build time by `gray-matter` and used to generate listing pages, filter categories, and populate meta tags (OG images, descriptions).

## Next Steps After Plan Approval

1. Scaffold the Next.js project with `npx create-next-app@latest`
2. Configure Tailwind CSS, `next.config.ts` for static export
3. Set up the content directory and MDX parsing utilities
4. Build the root layout (Header, Footer, metadata)
5. Create page templates: Home, Projects listing, Project detail
6. Add one sample case study as a content template
7. Repeat for Certifications, Publications, Achievements, Contact
8. Configure Nginx server block + SSL on Hostinger VPS for `hakim.automex.tech`
9. Set up GitHub Actions CI/CD for automatic deployment