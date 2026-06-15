import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts, getCategories, urlFor } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/search-bar";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 3600;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <SearchBar />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer">All</Badge>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/blog/category/${cat.slug}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                {cat.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts published yet.</p>
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
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.category && (
                      <Badge variant="secondary" className="text-xs">
                        {post.category.title}
                      </Badge>
                    )}
                  </div>
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
