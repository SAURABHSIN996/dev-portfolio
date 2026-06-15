import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/components/tech-stack";
import { Reveal } from "@/components/reveal";
import { getPosts, getCategories } from "@/lib/cms";
import type { Post, Category } from "@/lib/cms";

const projects = [
  {
    title: "AI Research Agent",
    description:
      "Multi-agent pipeline that autonomously researches topics, synthesises findings across sources, and produces structured reports.",
    tags: ["LangGraph", "Python", "OpenAI API"],
  },
  {
    title: "Workflow Automation Platform",
    description:
      "Full-stack SaaS for building and deploying agentic business workflows with a visual editor and real-time monitoring.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "LangChain"],
  },
  {
    title: "AI Adoption Toolkit",
    description:
      "Internal tooling that helps enterprises integrate LLMs into existing products with minimal disruption.",
    tags: ["TypeScript", "Anthropic Claude", "Node.js", "Docker"],
  },
  {
    title: "Portfolio & Blog",
    description:
      "This site — ISR-powered blog with Strapi CMS, Pagefind search, Giscus comments, and zero-config Vercel deployment.",
    tags: ["Next.js", "Strapi", "Vercel", "Pagefind"],
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function groupPostsByCategory(posts: Post[], categories: Category[]) {
  const map = new Map<string, { category: Category; posts: Post[] }>();
  for (const cat of categories) {
    map.set(cat.slug, { category: cat, posts: [] });
  }
  for (const post of posts) {
    if (post.category) {
      const entry = map.get(post.category.slug);
      if (entry) entry.posts.push(post);
    }
  }
  return Array.from(map.values()).filter((g) => g.posts.length > 0);
}

function SectionHeading({ label }: { label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-14">
        <span
          className="block shrink-0 w-[3px] h-6 rounded-full"
          style={{ backgroundColor: "var(--brand)" }}
        />
        <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-foreground shrink-0">
          {label}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
    </Reveal>
  );
}

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const grouped = groupPostsByCategory(posts, categories);

  return (
    <div className="max-w-3xl mx-auto px-6">

      {/* ── Hero — CSS stagger (always in viewport) ── */}
      <section className="pt-20 pb-28 sm:pt-28 sm:pb-36">
        <p
          className="font-mono text-sm tracking-[0.22em] uppercase text-muted-foreground mb-10 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          // saurabh singh
        </p>
        <h1
          className="font-serif font-semibold text-[4.2rem] sm:text-[6rem] leading-[0.91] tracking-tight mb-10 text-foreground animate-fade-up"
          style={{ animationDelay: "110ms" }}
        >
          I build{" "}
          <span
            className="italic font-normal"
            style={{ color: "var(--brand)" }}
          >
            intelligent
          </span>
          <br />
          systems.
        </h1>
        <p
          className="font-mono text-base text-muted-foreground leading-relaxed mb-12 max-w-md animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          Full stack developer specialising in agentic workflows and AI
          adoption. I help businesses put intelligence to work.
        </p>
        <div
          className="flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "380ms" }}
        >
          <Button
            className="font-mono text-xs tracking-wider h-9 px-5"
            render={<Link href="/blog" />}
          >
            Read the blog →
          </Button>
          <Button
            variant="outline"
            className="font-mono text-xs tracking-wider h-9 px-5"
            render={<a href="mailto:saurabhsingh19ec@gmail.com" />}
          >
            Get in touch
          </Button>
        </div>
      </section>

      {/* ── Writing ── */}
      <SectionHeading label="Writing" />

      <section className="mb-28">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              Thoughts on AI systems, engineering, and building things that matter.
            </p>
            <Link
              href="/blog"
              className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-6"
            >
              All posts →
            </Link>
          </div>
        </Reveal>

        {grouped.length === 0 ? (
          <Reveal delay={100}>
            <div
              className="border-l-2 pl-6 py-6"
              style={{ borderColor: "var(--brand)" }}
            >
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
                // posts incoming
              </p>
              <p className="text-base text-muted-foreground">
                Writing is coming soon — check back shortly.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-12">
            {grouped.map(({ category, posts: catPosts }, i) => (
              <Reveal key={category.slug} delay={i * 90}>
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5">
                    {category.title}
                  </p>
                  <div>
                    {catPosts.slice(0, 5).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-baseline justify-between gap-6 py-4 border-b border-border/60 hover:border-border transition-colors"
                      >
                        <span className="font-serif italic text-2xl sm:text-[1.65rem] leading-snug text-foreground group-hover:opacity-60 transition-opacity">
                          {post.title}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                          {formatDate(post.publishedAt)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Stack ── */}
      <SectionHeading label="Stack" />

      <section className="mb-28">
        <Reveal>
          <p className="text-base text-muted-foreground mb-10 max-w-sm">
            Technologies I reach for across different layers of a system.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <TechStack />
        </Reveal>
      </section>

      {/* ── Selected Work ── */}
      <SectionHeading label="Selected Work" />

      <section className="pb-28">
        <Reveal>
          <p className="text-base text-muted-foreground mb-10 max-w-sm">
            A few things I&apos;ve built — systems, platforms, and tools.
          </p>
        </Reveal>

        <div className="space-y-10">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <div
                className="block border-l-2 pl-6 py-1"
                style={{ borderColor: "var(--brand)" }}
              >
                <h3 className="font-serif italic text-2xl sm:text-3xl text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-3 max-w-lg">
                  {project.description}
                </p>
                <p className="font-mono text-xs text-muted-foreground/70 tracking-wide">
                  {project.tags.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
