# DevPortfolio — Project Architecture

## Your Understanding (Correct)

> Next.js frontend hosted on Vercel → connected to Strapi CMS hosted on Railway → Strapi connected to PostgreSQL hosted on Supabase.

That is exactly right. Each service has one job and talks only to what it needs to.

---

## Services Overview

| Service | What it is | What it does in this project |
|---|---|---|
| **Vercel** | Frontend hosting platform | Serves the Next.js site to visitors via global CDN |
| **Railway** | Backend app hosting platform | Runs the Strapi Node.js server 24/7 |
| **Supabase** | Managed PostgreSQL database | Stores all CMS data — posts, categories, users |
| **GitHub** | Code repository | Source of truth for both the frontend and Strapi code |

---

## Architecture Diagram

```
Visitor's Browser
      │
      ▼
┌─────────────────────────────────┐
│  Vercel (Next.js Frontend)      │
│  dev-portfolio-five-pied.       │
│  vercel.app                     │
│                                 │
│  - Serves pre-built HTML pages  │
│  - ISR: pages rebuild on demand │
└──────────────┬──────────────────┘
               │ REST API calls
               │ (only at build time / revalidation)
               ▼
┌─────────────────────────────────┐
│  Railway (Strapi CMS)           │
│  strapi-cms-production-148e.    │
│  up.railway.app                 │
│                                 │
│  - Admin panel for content      │
│  - Exposes REST API             │
│  - Fires webhooks on publish    │
└──────────────┬──────────────────┘
               │ SQL queries
               ▼
┌─────────────────────────────────┐
│  Supabase (PostgreSQL)          │
│  aws-1-ap-southeast-1.pooler.  │
│  supabase.com                   │
│                                 │
│  - Stores posts, categories     │
│  - Strapi manages all reads     │
│    and writes                   │
└─────────────────────────────────┘
```

---

## How a Visitor Sees a Blog Post

1. Visitor opens `https://dev-portfolio-five-pied.vercel.app/blog/hello-world`
2. Vercel serves the pre-built HTML instantly from its CDN — no server needed
3. The HTML was built at deploy time by fetching posts from Strapi's REST API
4. Vercel caches the page for 1 hour (`revalidate: 3600` in the code)

---

## How Publishing a Post Works (Webhook Flow)

```
You write a post in Strapi Admin
         │
         ▼
You click Publish
         │
         ▼
Strapi fires a POST request (webhook) to Vercel:
  URL:    https://dev-portfolio-five-pied.vercel.app/api/revalidate
  Header: x-strapi-secret: <webhook secret>
  Body:   { event: "entry.publish", model: "post", entry: { slug: "..." } }
         │
         ▼
Vercel /api/revalidate route:
  1. Validates the x-strapi-secret header
  2. Calls revalidateTag('posts') — clears the posts cache
  3. Calls revalidateTag('post-<slug>') — clears that specific post's cache
         │
         ▼
Next.js regenerates the blog index and post page
by fetching fresh data from Strapi
         │
         ▼
New post is live on the site within seconds
```

---

## Tokens & Secrets in Use

### 1. Strapi API Token
- **What it is:** A long random string that proves Vercel is allowed to read content from Strapi
- **Where it lives:** `STRAPI_API_TOKEN` in `.env.local` and Vercel environment variables
- **How it's used:** Sent as `Authorization: Bearer <token>` on every API request from Next.js to Strapi
- **Where to regenerate:** Strapi Admin → Settings → API Tokens

### 2. Strapi Webhook Secret
- **What it is:** A random 64-character hex string used to verify that webhook requests genuinely came from Strapi
- **Where it lives:** `STRAPI_WEBHOOK_SECRET` in `.env.local`, Vercel env vars, and Strapi webhook headers
- **How it's used:** Strapi sends it as `x-strapi-secret` header; Vercel checks it before revalidating
- **Value:** `31f6bbb2abf2d166436018f029e69060d35b90612a69b2699d4e1fbffb034d1a`

### 3. Vercel Protection Bypass Token
- **What it is:** A token that lets automated services (like Strapi) bypass Vercel's deployment authentication
- **Where it's used:** Appended to the webhook URL as `?x-vercel-protection-bypass=<token>`
- **Why needed:** Vercel Authentication is enabled on the project, which blocks external POST requests without this token
- **Where to manage:** Vercel → Project Settings → Deployment Protection → Protection Bypass for Automation

### 4. Supabase Database Credentials
- **What it is:** A PostgreSQL connection string with username, password, and host
- **Where it lives:** `DATABASE_URL` in Railway (Strapi's environment variables)
- **How it's used:** Strapi connects to Supabase on startup using this string
- **Connection type:** Session Pooler (port 5432) — required because Supabase's direct connection hostname isn't publicly resolvable from Railway

---

## Environment Variables

### Next.js on Vercel
| Variable | Purpose |
|---|---|
| `STRAPI_URL` | Base URL of the Strapi server on Railway |
| `STRAPI_API_TOKEN` | Auth token for Strapi REST API |
| `STRAPI_WEBHOOK_SECRET` | Validates incoming webhook requests |
| `NEXT_PUBLIC_BASE_URL` | Public URL of this site (used in sitemap and RSS) |

### Strapi on Railway
| Variable | Purpose |
|---|---|
| `DATABASE_CLIENT` | Set to `postgres` |
| `DATABASE_URL` | Full Supabase connection string |
| `DATABASE_SSL` | `true` — Supabase requires SSL |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | `false` — Supabase pooler uses self-signed cert |
| `APP_KEYS` | Strapi internal encryption keys |
| `API_TOKEN_SALT` | Salt used when generating API tokens |
| `ADMIN_JWT_SECRET` | Signs admin panel login sessions |
| `JWT_SECRET` | Signs public user JWTs |
| `TRANSFER_TOKEN_SALT` | Used for Strapi data transfer |
| `ENCRYPTION_KEY` | Encrypts sensitive Strapi data |

---

## GitHub Repositories

| Repo | URL | Purpose |
|---|---|---|
| Frontend | https://github.com/SAURABHSIN996/dev-portfolio | Next.js app — Vercel auto-deploys on every push to main |
| CMS | https://github.com/SAURABHSIN996/strapi-cms | Strapi app — Railway auto-deploys on every push to main |

---

## Key URLs

| What | URL |
|---|---|
| Live site | https://dev-portfolio-five-pied.vercel.app |
| Blog | https://dev-portfolio-five-pied.vercel.app/blog |
| RSS feed | https://dev-portfolio-five-pied.vercel.app/feed.xml |
| Sitemap | https://dev-portfolio-five-pied.vercel.app/sitemap.xml |
| Strapi Admin | https://strapi-cms-production-148e.up.railway.app/admin |
| Strapi API | https://strapi-cms-production-148e.up.railway.app/api |

---

## ISR (Incremental Static Regeneration) — How Caching Works

Pages are not rebuilt on every request. Instead:
- Pages are built once and cached on Vercel's CDN
- They automatically refresh every **1 hour** (`revalidate: 3600`)
- They refresh **instantly** when Strapi fires a webhook (on publish/update/delete)
- This means the site is always fast (serving cached HTML) but content stays up to date

---

## What is NOT in this project (removed during setup)

| Feature | Why removed |
|---|---|
| Contact form | Removed to avoid dependency on Resend (email) and Upstash Redis (rate limiting) |
| Umami Analytics | Optional — can be added by setting `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Vercel |
| Giscus Comments | Optional — can be added by setting 4 Giscus env vars in Vercel |
