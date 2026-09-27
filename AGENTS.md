# Project guidance

## Overview
Personal portfolio and blog built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, and Strapi v5. Use npm and preserve package-lock.json.

## Architecture
- `app/page.tsx`: portfolio content and latest CMS posts.
- `app/archive/page.tsx` and `app/projects/xpanse/page.tsx`: project archive and case study.
- `app/blog/`: post index, individual posts, and category pages.
- `lib/cms.ts`: shared Strapi REST client, types, image URLs, and cache tags.
- `app/api/`: draft-mode entry and webhook revalidation endpoints.
- `app/globals.css`: theme tokens, custom layouts, and responsive styles.
- Read `PROJECT.md` for setup and deployment context; read `docs/cms-schema.md` when changing CMS behavior.

## Implementation rules
- Default to Server Components; isolate browser state and event handlers in small Client Components.
- Keep CMS requests in `lib/cms.ts`; pages use its query helpers.
- Keep cache tags in the CMS layer and use a 3600-second baseline revalidation interval.
- Use Next.js `Image` with alt text and explicit dimensions, or `fill` with a sized parent and appropriate `sizes`.
- Preserve the beige theme, typography, and responsive layout unless the task changes the design.
- Reuse existing components and styles; keep client dependencies lean.
- Generate OG images with `ImageResponse` from `next/og` in the existing Edge route.
- Authenticate revalidation POST requests with `STRAPI_WEBHOOK_SECRET` via `x-strapi-secret`; reject missing or invalid credentials.
- Keep secrets in local environment files or deployment environment settings. Never commit or print secret values.

## Commands and validation
- `npm ci`: install locked dependencies.
- `npm run dev`: local development server.
- `npx tsc --noEmit --incremental false`: TypeScript check.
- `npm run lint`: existing lint command; currently fails with an ESLint circular-configuration error.
- `npm run build`: Next.js production build followed by Pagefind indexing of `.next`.
- `npm run pagefind`: repeat indexing against an existing build.
- `npm start`: serve the production build.
- Run checks appropriate to the change; report existing failures separately. For UI work, check desktop and mobile behavior. No automated test suite is configured.

## Known implementation gaps
- Search references Pagefind globals, but loading its browser assets is not wired up. Webhooks do not rebuild the search index.
- The draft endpoint enables a cookie; CMS queries do not yet request draft content.
- CMS errors become empty results, and list queries do not paginate (backend default: 25 entries).
- `/resume.pdf` is linked but absent from this repository.
- Contact forms and a theme provider are not implemented. Umami and Giscus are optional environment-controlled integrations.
- Treat these as context, not instructions to expand the current task. Update this guidance when the implementation changes.
