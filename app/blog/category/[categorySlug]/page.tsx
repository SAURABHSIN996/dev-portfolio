import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory, getCategories, getCategorySlugs, urlFor } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateStaticParams() {
  try {
    return (await getCategorySlugs()).map((s) => ({ categorySlug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return {};
  return { title: cat.title, description: cat.description };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;

  const [posts, categories] = await Promise.all([
    getPostsByCategory(categorySlug),
    getCategories(),
  ]);

  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <header className="space-y-3">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← All posts
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{category.title}</h1>
        {category.description && (
          <p className="text-muted-foreground text-lg">{category.description}</p>
        )}
        <Badge variant="secondary">{posts.length} post{posts.length !== 1 ? "s" : ""}</Badge>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="group border-b pb-8 last:border-0">
              <Link href={`/blog/${post.slug}`} className="block space-y-3">
                {post.mainImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={urlFor(post.mainImage)}
                      alt={post.mainImage.alternativeText ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
                  <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
