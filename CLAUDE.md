# Project Instructions

## Overview

Personal portfolio and blog — a high-performance Jamstack site with an integrated dynamic blogging platform. Goals: sub-100ms load times, perfect Lighthouse scores, zero-cost scaling, and a maintenance-free content layer.

**Stack summary:** Next.js App Router (TypeScript) · Tailwind CSS + Shadcn/ui · Strapi v5 CMS · Vercel · Pagefind · Umami Analytics · Resend · Giscus

## Architecture

### Paradigm

Jamstack Hybrid via Next.js App Router with Incremental Static Regeneration (ISR). Pages are statically compiled and distributed on Vercel's Edge CDN. Strapi webhook events → `/api/revalidate` → `revalidateTag()` → Pagefind rebuild — no full redeploy needed.

### Technology Decisions

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js App Router (TypeScript) | RSC by default; Client Components only for interactive islands |
| Styling | Tailwind CSS + Shadcn/ui | Utility-first; semantic tokens in `globals.css` |
| CMS | Strapi v5 | Open-source headless CMS; REST API; self-hostable; Draft & Publish built-in |
| Hosting | Vercel | Native ISR + `revalidateTag()`; zero config for Next.js; Hobby tier covers personal sites |
| Search | Pagefind | Runs at build time, ships as static assets, zero cost, zero infra |
| Analytics | Umami Cloud | <1KB, cookie-less, GDPR-compliant; injected via root layout |
| Forms | Server Actions + Resend | No live Node listener; serverless email delivery; rate-limit with `@upstash/ratelimit` |
| Comments | Giscus | GitHub Discussions-backed; OAuth 2.0; zero database |

### Routing Map

```
app/
├── layout.tsx                          # Root: fonts, theme provider, Umami analytics
├── page.tsx                            # Portfolio landing / bio (Static)
├── actions.ts                          # Server Actions (contact form handler)
├── sitemap.ts                          # Auto-generated sitemap (Next.js built-in)
├── og/
│   └── route.tsx                       # Dynamic OG image generation (@vercel/og)
├── feed.xml/
│   └── route.ts                        # RSS feed
├── api/
│   ├── draft/route.ts                  # Draft mode toggle (validates STRAPI_WEBHOOK_SECRET)
│   └── revalidate/route.ts             # Strapi webhook handler (validates x-strapi-secret header)
├── contact/
│   └── page.tsx                        # Contact page (wraps ContactForm client component)
└── blog/
    ├── page.tsx                        # Blog index — post list (ISR)
    ├── [slug]/
    │   └── page.tsx                    # Individual post view (ISR)
    └── category/
        └── [categorySlug]/
            └── page.tsx               # Category archive (ISR)

lib/
└── cms.ts                              # Strapi v5 REST client — all CMS fetches go through here

components/
├── ui/                                 # Shadcn/ui primitives (button, input, dialog…)
├── main-nav.tsx                        # RSC shell; interactive toggle extracted to child Client Component
├── search-bar.tsx                      # Pagefind overlay (Client Component)
├── comments.tsx                        # Giscus script encapsulation (Client Component)
└── contact-form.tsx                    # Form UI + submission feedback (Client Component)

styles/
└── globals.css                         # Tailwind directives + semantic CSS tokens
```

### Content Workflows

**Publish flow:**
```
Write post in Strapi Admin
  → Click Publish
  → Strapi fires webhook (with x-strapi-secret header)
  → /api/revalidate validates secret + calls revalidateTag('posts')
  → Next.js regenerates affected ISR pages
  → Vercel triggers post-build Pagefind index rebuild
  → Updated content live on edge CDN
```

**Contact form flow:**
```
User submits ContactForm (Client Component)
  → Native Server Action (actions.ts)
  → Rate-limit check via @upstash/ratelimit
  → Input validation (zod)
  → Resend API → email to inbox
  → Returns status to client (no page refresh)
```

## Development

### Setup

```bash
npx create-next-app@latest --typescript --tailwind --app
npx shadcn@latest init
npm install resend @upstash/ratelimit @upstash/redis zod
npm install -D pagefind
```

Add to `.env.local` (copy from `.env.local.example`):
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
STRAPI_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_BASE_URL=
```

### Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build + Pagefind index
npm run pagefind     # Rebuild search index only
npm run lint         # ESLint
```

## Rules

@.claude/rules/cms-schema.md

### Component rules

- Default to React Server Components. Only add `'use client'` when the component needs `useState`, `useEffect`, browser APIs, or event handlers.
- Never use raw `<img>` — always use Next.js `<Image />` with explicit `width`, `height`, and `alt`.
- Extract interactive sub-trees into isolated Client Component files rather than marking a whole layout Client.

### Data fetching rules

- All CMS fetches go through the helper functions in `lib/cms.ts`. Never call the Strapi REST API directly inside page components.
- ISR revalidation interval: `revalidate: 3600` as baseline; on-demand via `revalidateTag()` triggered by Strapi webhooks.
- Cache tags are set inside `lib/cms.ts` — do not override or duplicate them in page files.

### Security rules

- Validate `STRAPI_WEBHOOK_SECRET` (via `x-strapi-secret` header) on every request to `/api/revalidate`. Reject without it.
- Rate-limit the contact form Server Action with `@upstash/ratelimit` before any email dispatch.
- All secrets in `.env.local` only; never hardcode or commit them.

### Performance rules

- Target `revalidate: 3600` on all ISR pages; use `revalidateTag()` for instant post-publish updates.
- OG images generated at `/og` via `@vercel/og` (Edge Runtime) — do not use canvas or sharp for this.
- Do not import heavy libraries into Client Components; keep the client bundle lean.
