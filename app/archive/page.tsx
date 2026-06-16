import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Archive",
  description: "A chronological list of all projects I've built.",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const archiveProjects = [
  {
    year: "2024",
    title: "AI Research Agent",
    madeAt: "Personal",
    builtWith: ["LangGraph", "Python", "OpenAI API", "Pinecone"],
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2024",
    title: "Workflow Automation Platform",
    madeAt: "Tech Startup",
    builtWith: ["Next.js", "FastAPI", "PostgreSQL", "LangChain"],
    url: "#",
    githubUrl: null,
  },
  {
    year: "2023",
    title: "AI Adoption Toolkit",
    madeAt: "Tech Startup",
    builtWith: ["TypeScript", "Anthropic Claude", "Node.js", "Docker"],
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2023",
    title: "Multi-tenant SaaS Dashboard",
    madeAt: "Tech Startup",
    builtWith: ["Next.js", "PostgreSQL", "Tailwind CSS", "Stripe"],
    url: null,
    githubUrl: null,
  },
  {
    year: "2023",
    title: "Portfolio & Blog",
    madeAt: "Personal",
    builtWith: ["Next.js", "Strapi", "Vercel", "Pagefind"],
    url: "/",
    githubUrl: "https://github.com/SAURABHSIN996",
  },
  {
    year: "2022",
    title: "Real-time Collaboration Tool",
    madeAt: "Digital Agency",
    builtWith: ["React", "WebSockets", "Node.js", "Redis"],
    url: null,
    githubUrl: "#",
  },
  {
    year: "2022",
    title: "E-commerce Platform",
    madeAt: "Digital Agency",
    builtWith: ["Next.js", "Shopify API", "TypeScript", "Tailwind CSS"],
    url: "#",
    githubUrl: null,
  },
  {
    year: "2022",
    title: "Fintech Analytics Dashboard",
    madeAt: "Digital Agency",
    builtWith: ["React", "D3.js", "Node.js", "MongoDB"],
    url: null,
    githubUrl: null,
  },
  {
    year: "2021",
    title: "Payment Gateway Integration",
    madeAt: "Digital Agency",
    builtWith: ["Node.js", "Stripe", "Express.js", "PostgreSQL"],
    url: null,
    githubUrl: "#",
  },
  {
    year: "2021",
    title: "DevMetrics Dashboard",
    madeAt: "Digital Agency",
    builtWith: ["React", "TypeScript", "GitHub API", "Recharts"],
    url: "#",
    githubUrl: "#",
  },
  {
    year: "2020",
    title: "RESTful API Suite",
    madeAt: "Software House",
    builtWith: ["Express.js", "MySQL", "JWT", "Swagger"],
    url: null,
    githubUrl: "#",
  },
  {
    year: "2020",
    title: "Open-source CLI Toolkit",
    madeAt: "Personal",
    builtWith: ["JavaScript", "Node.js", "Commander.js"],
    url: null,
    githubUrl: "#",
  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2.5 9.5 9.5 2.5M5.5 2.5H9.5V6.5" />
    </svg>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ArchivePage() {
  const years = [...new Set(archiveProjects.map((p) => p.year))];

  return (
    <div className="archive-page">
      {/* Back link */}
      <Link href="/" className="archive-back">
        <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9.5 6H2.5M5.5 2.5 2 6l3.5 3.5" />
        </svg>
        Saurabh Singh
      </Link>

      {/* Header */}
      <header className="archive-header">
        <h1 className="archive-title">All Projects</h1>
        <p className="archive-sub">
          A chronological archive of things I&rsquo;ve built — from production systems to experiments.
        </p>
      </header>

      {/* Table */}
      <div className="archive-table-wrap">
        <table className="archive-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Project</th>
              <th className="archive-th-hide-sm">Made at</th>
              <th className="archive-th-hide-sm">Built with</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {years.map((year) =>
              archiveProjects
                .filter((p) => p.year === year)
                .map((project, i, arr) => (
                  <tr key={project.title} className="archive-row">
                    <td className="archive-year">
                      {i === 0 ? year : ""}
                    </td>
                    <td className="archive-project-title">
                      {project.url ? (
                        <a
                          href={project.url}
                          target={project.url.startsWith("http") ? "_blank" : undefined}
                          rel={project.url.startsWith("http") ? "noreferrer noopener" : undefined}
                          className="archive-project-link"
                        >
                          {project.title}
                        </a>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </td>
                    <td className="archive-made-at archive-th-hide-sm">{project.madeAt}</td>
                    <td className="archive-built-with archive-th-hide-sm">
                      <div className="archive-tags">
                        {project.builtWith.map((t) => (
                          <span key={t} className="archive-tag">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="archive-links">
                      <div className="archive-link-icons">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`${project.title} GitHub`}
                            className="archive-icon-link"
                          >
                            <GitHubIcon />
                          </a>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target={project.url.startsWith("http") ? "_blank" : undefined}
                            rel={project.url.startsWith("http") ? "noreferrer noopener" : undefined}
                            aria-label={`${project.title} live site`}
                            className="archive-icon-link"
                          >
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
