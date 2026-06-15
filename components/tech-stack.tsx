"use client";

import { useState } from "react";

const stack: Record<string, string[]> = {
  Frontend: [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Shadcn/ui", "Framer Motion", "Zustand",
  ],
  Backend: [
    "Node.js", "Python", "FastAPI", "Express.js",
    "REST APIs", "GraphQL", "WebSockets",
  ],
  Database: [
    "PostgreSQL", "MongoDB", "Redis", "Supabase",
    "Prisma", "Drizzle ORM",
  ],
  "AI & LLM": [
    "LangChain", "LangGraph", "OpenAI API", "Anthropic Claude",
    "Vercel AI SDK", "Pinecone", "RAG pipelines",
  ],
  DevOps: [
    "Docker", "Vercel", "GitHub Actions", "Linux",
    "CI/CD", "Nginx",
  ],
};

const categories = Object.keys(stack) as (keyof typeof stack)[];

export function TechStack() {
  const [active, setActive] = useState<string>(categories[0]);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-8 border-b border-border/60 pb-px">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative font-mono text-xs tracking-widest uppercase pb-3 px-1 transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: "var(--brand)" }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Tech pills — key re-mounts on category change, triggering animation */}
      <div key={active} className="flex flex-wrap gap-2.5">
        {stack[active].map((tech, i) => (
          <span
            key={tech}
            className="pill-animate font-mono text-xs border border-border px-3 py-1.5 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors cursor-default"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
