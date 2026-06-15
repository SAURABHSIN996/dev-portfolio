# CMS Schema Reference — Strapi v5

All CMS logic lives in `lib/cms.ts`. Pages import from there — no ad-hoc `fetch` calls in page components.

## Strapi Collection Types

Create these in the Strapi Admin under **Content-Type Builder → Collection Types**.

### `post`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | Yes | Blog post heading |
| `slug` | UID (source: title) | Yes | Routes to `/blog/[slug]` |
| `excerpt` | Long text | No | Used on index cards and meta description |
| `content` | Rich text (Blocks) | No | Body content — render with `@strapi/blocks-react-renderer` |
| `publishedAt` | Built-in | — | Strapi Draft & Publish handles this automatically |
| `mainImage` | Media (single) | No | Alt text is the media file's `alternativeText` field |
| `category` | Relation → category (many-to-one) | Yes | Must be an existing category |

### `category`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | Yes | Display name |
| `slug` | UID (source: title) | Yes | Routes to `/blog/category/[slug]` |
| `description` | Long text | No | Meta description for category pages |

## ISR Tag Convention

Tags are applied in `lib/cms.ts` query helpers — do not override them inline in pages.

| Tag | Covers |
|---|---|
| `'posts'` | All post list fetches |
| `'post-[slug]'` | Individual post fetch |
| `'categories'` | Category list fetches |

## Webhook Setup (Strapi → Next.js)

In Strapi Admin → **Settings → Webhooks → Add webhook**:
- URL: `https://yoursite.com/api/revalidate`
- Events: `Entry: publish`, `Entry: unpublish`, `Entry: update`, `Entry: delete`
- Custom header: `x-strapi-secret` → `<your STRAPI_WEBHOOK_SECRET value>`

## Content Rendering

Blog post `content` is Strapi's Blocks (Lexical) format. To render it:

```bash
npm install @strapi/blocks-react-renderer
```

Then in `app/blog/[slug]/page.tsx`, replace the placeholder comment with:

```tsx
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

<BlocksRenderer content={post.content as Parameters<typeof BlocksRenderer>[0]["content"]} />
```

## Image URLs

Use `urlFor(image)` from `lib/cms.ts`. It handles both relative paths (local Strapi) and absolute URLs (Strapi Cloud / S3).
