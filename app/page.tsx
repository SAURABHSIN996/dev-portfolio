import Link from "next/link";
import { SectionNav } from "@/components/section-nav";
import { getPosts } from "@/lib/cms";

// ─── DATA ────────────────────────────────────────────────────────────────────

const experiences = [
  {
    period: "Aug 2023 — Present",
    role: "Software Engineer",
    company: "Epsilon",
    companyUrl: "https://www.epsilon.com",
    bullets: [
      "Architected a multi-agent code review platform on n8n — orchestrating four specialized agents (security, fraud, code quality, test coverage) with stateful session tracking and automated report generation, wired directly into the Azure DevOps CI/CD pipeline",
      "Built an AI campaign-script automation pipeline with n8n, AWS Bedrock (Claude), and the Azure DevOps API, cutting script deployment from 60 minutes to under 2 — with human-in-the-loop approval gates and automated Git PR creation",
      "Re-architected critical backend API endpoints, rewriting core logic and hardening exception handling to significantly cut response latency and eliminate a class of production errors",
      "Delivered an end-to-end Private Label Credit Card (PLCC) payment integration that opened a new transaction path and directly grew revenue",
    ],
    tags: ["Java", "n8n", "AWS Bedrock", "PostgreSQL", "Azure DevOps"],
  },
  {
    period: "Feb 2023 — Aug 2023",
    role: "Software Engineer Intern",
    company: "Epsilon",
    companyUrl: "https://www.epsilon.com",
    bullets: [
      "Migrated the entire codebase from legacy Azure Repos to Git and stood up Azure Pipelines CI/CD with automated unit testing, sharply reducing manual-deployment errors and turnaround time",
      "Built a customer referral program end-to-end in a .NET enterprise solution, driving measurable growth in referrals and downstream sales",
    ],
    tags: [".NET", "Azure Pipelines", "Git", "CI/CD"],
  },
];

const projects = [
  {
    title: "Xpanse.ai — Multi-Agent Campaign Intelligence",
    description:
      "A production-grade marketing intelligence platform on LangGraph and Amazon Bedrock. Seven specialized agents run across two checkpointed pipelines — strategy generation and cultural content transcreation — grounded in RAG over dual Knowledge Bases, validated with live web search (Tavily), and gated by human-in-the-loop review at every strategic decision.",
    tags: ["LangGraph", "Amazon Bedrock", "RAG", "Tavily", "Streamlit"],
    url: "/projects/xpanse",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: "inline", marginLeft: "4px", marginBottom: "1px", verticalAlign: "middle" }} aria-hidden="true">
      <path d="M2.5 9.5 9.5 2.5M5.5 2.5H9.5V6.5" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/SAURABHSIN996", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/saurabhsingh", Icon: LinkedInIcon },
  { label: "Twitter / X", href: "https://twitter.com/saurabhsin996", Icon: XIcon },
  { label: "Email", href: "mailto:saurabhsingh19ec@gmail.com", Icon: EmailIcon },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return <span className="port-tag">{label}</span>;
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 5);
  const hasWriting = latestPosts.length > 0;

  return (
    <div className="port-layout">

      {/* ── LEFT PANEL ── */}
      <aside className="port-left">
        <div className="port-left-top">

          {/* Name */}
          <h1 className="port-name">
            Saurabh Singh
          </h1>
          <p className="port-title">Full Stack Developer<br />& AI Engineer</p>
          <p className="port-tagline">
            I build enterprise-grade applications and integrate production-ready, autonomous AI agents into secure backends.
          </p>

          <SectionNav hasWriting={hasWriting} />
        </div>

        {/* Social links */}
        <div className="port-social">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={label}
              className="port-social-link"
            >
              <Icon />
            </a>
          ))}
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main className="port-right">

        {/* ABOUT */}
        <section id="about" className="port-section scroll-mt-20">
          <div className="about-body">
            <p>
              I&rsquo;m a full-stack developer and AI engineer focused on bridging the gap between bleeding-edge AI models and robust, enterprise-scale software architecture. While the industry is flooded with fragile Python prototypes, my focus is production. I specialize in building highly scalable backends, using <strong>Java</strong>, <strong>Postgres</strong>, <strong>LangChain</strong>, and <strong>n8n</strong> to automate complex, multi-step business workflows that remain deterministic and predictable at scale.
            </p>
            <p>
              My approach to <strong>agentic architecture</strong> focuses heavily on state synchronization, rigorous error-handling, data consistency, and human-in-the-loop guardrails. I design AI systems built to operate safely in real-world business environments &mdash; not just inside a terminal.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="port-section scroll-mt-20">
          <p className="port-section-label">Experience</p>
          <div className="exp-list">
            {experiences.map((exp) => (
              <div key={exp.role + exp.company} className="exp-card">
                <p className="exp-period">{exp.period}</p>
                <div className="exp-body">
                  <h3 className="exp-role">
                    {exp.role}
                    <span className="exp-separator"> · </span>
                    <a href={exp.companyUrl} className="exp-company" target="_blank" rel="noreferrer">
                      {exp.company}
                      <ExternalIcon />
                    </a>
                  </h3>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {exp.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a href="/resume.pdf" className="resume-link" target="_blank" rel="noreferrer">
            View full résumé
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2.5 9.5 9.5 2.5M5.5 2.5H9.5V6.5" />
            </svg>
          </a>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="port-section scroll-mt-20">
          <p className="port-section-label">Projects</p>
          <div className="projects-grid">
            {projects.map((project) => (
              <Link key={project.title} href={project.url} className="project-card">
                <div className="project-top">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1f1d1a" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="project-arrow" aria-hidden="true">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <span className="project-cta">
                  Read the case study
                  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2.5 6h7M6 2.5 9.5 6 6 9.5" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/archive" className="resume-link" style={{ marginTop: "20px" }}>
            View full project archive
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2.5 9.5 9.5 2.5M5.5 2.5H9.5V6.5" />
            </svg>
          </Link>
        </section>

        {/* WRITING — rendered only when at least one post is published */}
        {hasWriting && (
          <section id="writing" className="port-section scroll-mt-20">
            <div className="writing-hd">
              <p className="port-section-label" style={{ marginBottom: 0 }}>Writing</p>
              <Link href="/blog" className="all-posts-link">All posts →</Link>
            </div>
            <p className="port-section-sub">
              Field notes on production AI — agent reliability, state management, and building enterprise backends that don&rsquo;t break.
            </p>

            <div className="posts-list">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row">
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">{formatDate(post.publishedAt)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
