const STRAPI_URL = (process.env.STRAPI_URL ?? "http://localhost:1337").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI<T>(path: string, tags: string[] = []): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers,
      next: { revalidate: 3600, ...(tags.length ? { tags } : {}) },
    });
    if (!res.ok) return [] as unknown as T;
    const { data } = await res.json();
    return data ?? ([] as unknown as T);
  } catch {
    return [] as unknown as T;
  }
}

// --- Types (matches Strapi v5 flattened response) ---

export type StrapiImage = {
  url: string;
  alternativeText?: string;
  formats?: { medium?: { url: string }; small?: { url: string } };
};

export type Category = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
};

export type Post = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  content?: unknown[];
  mainImage?: StrapiImage;
  category?: Category;
};

// Returns the absolute image URL (handles both relative and absolute Strapi URLs).
export function urlFor(image: StrapiImage | undefined): string {
  if (!image?.url) return "";
  return image.url.startsWith("http") ? image.url : `${STRAPI_URL}${image.url}`;
}

// --- Query helpers ---

const POPULATE_POST =
  "populate[category][fields][0]=title&populate[category][fields][1]=slug" +
  "&populate[mainImage][fields][0]=url&populate[mainImage][fields][1]=alternativeText";

export async function getPosts(): Promise<Post[]> {
  return fetchAPI<Post[]>(`/posts?${POPULATE_POST}&sort[0]=publishedAt:desc`, ["posts"]);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchAPI<Post[]>(
    `/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    [`post-${slug}`]
  );
  return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return fetchAPI<Post[]>(
    `/posts?filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}&${POPULATE_POST}&sort[0]=publishedAt:desc`,
    ["posts", "categories"]
  );
}

export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/categories", ["categories"]);
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await fetchAPI<Post[]>("/posts?fields[0]=slug");
  return Array.isArray(posts) ? posts.map((p) => ({ slug: p.slug })) : [];
}

export async function getCategorySlugs(): Promise<{ slug: string }[]> {
  const cats = await fetchAPI<Category[]>("/categories?fields[0]=slug");
  return Array.isArray(cats) ? cats.map((c) => ({ slug: c.slug })) : [];
}
