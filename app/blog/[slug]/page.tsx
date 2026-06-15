import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getPostBySlug, getPostSlugs, urlFor } from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { Comments } from "@/components/comments";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    return await getPostSlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage)] : [],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <header className="space-y-4">
        {post.category && (
          <Link href={`/blog/category/${post.category.slug}`}>
            <Badge variant="secondary">{post.category.title}</Badge>
          </Link>
        )}
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p>
      </header>

      {post.mainImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={urlFor(post.mainImage)}
            alt={post.mainImage.alternativeText ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {post.content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <BlocksRenderer content={post.content as Parameters<typeof BlocksRenderer>[0]["content"]} />
        </div>
      )}

      <div className="pt-8 border-t">
        <Comments />
      </div>

      <Link
        href="/blog"
        className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to blog
      </Link>
    </article>
  );
}
