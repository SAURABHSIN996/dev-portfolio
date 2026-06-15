import type { MetadataRoute } from "next";
import { getPostSlugs, getCategorySlugs } from "@/lib/cms";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  const [postSlugs, categorySlugs] = await Promise.all([
    getPostSlugs(),
    getCategorySlugs(),
  ]);

  const postUrls = postSlugs.map(({ slug }) => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categorySlugs.map(({ slug }) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.9 },
    ...postUrls,
    ...categoryUrls,
  ];
}
