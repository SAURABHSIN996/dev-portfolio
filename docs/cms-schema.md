# CMS schema and caching

The frontend uses Strapi v5 flattened REST responses through `lib/cms.ts`.
The companion backend is in `../strapi-backend/my-cms`; its schema files under
`src/api/` are the source of truth for field constraints.

## Collection types

Both collections enable Draft & Publish.

| Collection | Field | Type | Required in backend |
|---|---|---|---|
| post | title | String | Yes |
| post | slug | UID from title | Yes |
| post | excerpt | Text | No |
| post | content | Blocks | No |
| post | mainImage | Single media | No |
| post | category | Many-to-one category relation | No |
| category | title | String | No |
| category | slug | UID from title | No |
| category | description | Text | No |
| category | posts | One-to-many post relation | No |

`publishedAt` is managed by Strapi. The frontend expects `mainImage` to be an
image, although the backend currently also allows files, video, and audio.
Post bodies already render through `@strapi/blocks-react-renderer`.
Use `urlFor(image)` for relative or absolute media URLs; remote image hosts
must also be allowed in `next.config.ts`.

## Cache tags

| Helper | Tags |
|---|---|
| getPosts | posts |
| getPostBySlug | post-{slug} |
| getPostsByCategory | posts, categories |
| getCategories | categories |
| getPostSlugs / getCategorySlugs | None; time-based revalidation only |

All queries use a 3600-second revalidation interval. List queries currently
omit pagination; backend REST defaults are 25 entries, with a maximum of 100.
The client returns empty results on HTTP or network errors.

## Publishing and preview

Configure Strapi webhooks for entry publish, unpublish, update, and delete:
- URL: `https://<site>/api/revalidate`
- Header: `x-strapi-secret`, matching the deployment's `STRAPI_WEBHOOK_SECRET`.

The handler invalidates `posts` and the supplied `post-{slug}` for post events,
`categories` for category events, and both list tags for other entry models.
Affected cached content regenerates on subsequent requests. Category changes
do not currently invalidate individual post tags or the general posts tag.
No Pagefind rebuild is triggered by this handler.

`/api/draft` validates a secret and enables Next.js draft mode. The CMS client
does not yet read draft mode or send `status=draft`, so preview is incomplete.
