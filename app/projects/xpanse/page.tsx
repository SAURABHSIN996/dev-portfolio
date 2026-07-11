import type { Metadata } from "next";
import Link from "next/link";
import { XpanseDiagram } from "@/components/xpanse-diagram";

export const metadata: Metadata = {
  title: "Xpanse.ai — Multi-Agent Campaign Intelligence",
  description:
    "A production-grade marketing intelligence platform on LangGraph and Amazon Bedrock — seven specialized agents across two checkpointed pipelines, grounded in RAG with human-in-the-loop control.",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const GITHUB_URL = "https://github.com/SAURABHSIN996/Xpanse.ai";
const DEMO_URL = ""; // TODO: add live demo URL, or leave empty to hide the button

const HERO_TAGS = ["LangGraph", "Amazon Bedrock", "Nova Pro", "RAG", "Tavily", "Streamlit"];

const pipelines = [
  {
    name: "Campaign Strategy Engine",
    summary: "Turns historical performance data into a validated, budgeted campaign strategy.",
    agents: [
      { role: "Performance Sentinel", body: "Mines historical campaign data through RAG over an AWS Knowledge Base." },
      { role: "Strategic Seer", body: "Validates findings against current market conditions via Tavily web search." },
      { role: "Campaign Architect", body: "Synthesizes the strategy — budget tables, flow diagrams, and messaging frameworks." },
      { role: "Feedback Router", body: "Classifies user feedback and routes each revision back to the right agent." },
    ],
  },
  {
    name: "Content Transcreation Pipeline",
    summary: "Adapts messaging for regional markets behind an authenticity quality gate.",
    agents: [
      { role: "Cultural Researcher", body: "Investigates local communication norms and consumer psychology." },
      { role: "Content Drafter", body: "Adapts the messaging for the target regional market." },
      { role: "Cultural Critic", body: "Scores authenticity numerically, looping until it clears the quality threshold." },
    ],
  },
];

const architecture = [
  {
    step: "01",
    title: "Checkpointed StateGraph",
    body:
      "The system is a LangGraph StateGraph with checkpointing rather than a linear chain. Every node reads and writes a shared, typed state object, so control flow — loops, branches, and revisions — is explicit, inspectable, and resumable from any point.",
  },
  {
    step: "02",
    title: "Bedrock Nova Pro reasoning",
    body:
      "All seven agents reason through Amazon Bedrock's Nova Pro model via the Converse API — a single, governed inference path instead of scattered SDK calls, which keeps behavior consistent and costs observable across the graph.",
  },
  {
    step: "03",
    title: "Dual Knowledge Bases + live search",
    body:
      "Two specialized Knowledge Bases separate campaign archives from brand information, keeping retrieval both grounded and on-brand. Tavily web search closes the freshness gap so strategy reflects current market conditions, not just the corpus.",
  },
  {
    step: "04",
    title: "Human-in-the-loop control",
    body:
      "The graph pauses at strategic checkpoints, accepts free-text feedback, auto-classifies the user's intent, and routes the revision to the relevant agent — resuming from the checkpoint instead of restarting the run.",
  },
];

const decisions = [
  {
    title: "State synchronization & checkpointing",
    body:
      "A single typed state is the source of truth across every agent, and LangGraph checkpointing persists progress. Together they eliminate the context drift that breaks naive multi-agent chains — and make any run resumable.",
  },
  {
    title: "Human-in-the-loop routing",
    body:
      "Instead of running autonomously, the graph interrupts at decision points and classifies free-text feedback to route revisions precisely. That turns the LLM into a supervised collaborator — the line between a demo and a business tool.",
  },
  {
    title: "Grounded, on-brand retrieval",
    body:
      "Separating campaign-archive and brand Knowledge Bases keeps answers factual and on-voice, while Tavily adds current context. Grounding is a first-class node in the graph, not a bolt-on, which keeps hallucination in check.",
  },
  {
    title: "Quality gates over hope",
    body:
      "The Cultural Critic assigns a numeric authenticity score that drives an iteration loop until output clears a threshold. Quality is enforced by the architecture rather than assumed — a deterministic gate around a probabilistic model.",
  },
];

const stack = [
  { group: "Orchestration", items: ["LangGraph", "StateGraph + Checkpointing"] },
  { group: "AI & Retrieval", items: ["Amazon Bedrock (Nova Pro)", "AWS Knowledge Bases (RAG)", "Tavily Search"] },
  { group: "Interface & Runtime", items: ["Streamlit", "Python 3.14+", "uv"] },
  { group: "Deployment", items: ["AWS EC2"] },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
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

export default function XpanseCaseStudy() {
  return (
    <div className="case-page">
      {/* Back link */}
      <Link href="/#projects" className="archive-back">
        <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9.5 6H2.5M5.5 2.5 2 6l3.5 3.5" />
        </svg>
        Saurabh Singh
      </Link>

      {/* Header */}
      <header className="case-header">
        <p className="case-eyebrow">Case Study · Personal Project</p>
        <h1 className="case-title">Xpanse.ai</h1>
        <p className="case-lede">
          A multi-agent marketing intelligence platform, engineered like production software:
          seven specialized agents across two checkpointed pipelines, grounded retrieval, and
          human-in-the-loop control at every strategic decision.
        </p>

        <div className="case-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="case-btn">
            <GitHubIcon />
            View source
          </a>
          {DEMO_URL && (
            <a href={DEMO_URL} target="_blank" rel="noreferrer noopener" className="case-btn case-btn-ghost">
              <ExternalLinkIcon />
              Live demo
            </a>
          )}
        </div>

        <div className="tag-row case-hero-tags">
          {HERO_TAGS.map((t) => (
            <span key={t} className="port-tag">{t}</span>
          ))}
        </div>
      </header>

      {/* Overview */}
      <section className="case-section">
        <p className="port-section-label">Overview</p>
        <div className="about-body case-prose">
          <p>
            Most &ldquo;AI agent&rdquo; projects work in a demo and fall apart on real inputs: state
            drifts between steps, one bad tool call derails the run, and there&rsquo;s no safe place
            for a human to step in. <strong>Xpanse.ai</strong> is my answer to that gap — a marketing
            intelligence platform that treats an autonomous agent as software to be engineered, with
            the same rigor I&rsquo;d apply to any backend.
          </p>
          <p>
            It runs two orchestrated pipelines: one that generates data-driven <strong>campaign
            strategy</strong>, and one that produces culturally-adapted <strong>content
            transcreation</strong>. Across both, seven specialized agents share a typed state, ground
            their output in retrieval, and defer to human judgment before committing — staying
            <strong> predictable, recoverable, and on-brand</strong> under conditions that break
            naive chains.
          </p>
        </div>
      </section>

      {/* System diagram */}
      <section className="case-section">
        <p className="port-section-label">System Architecture</p>
        <p className="port-section-sub">
          One request, two orchestrated pipelines, seven agents — coordinated over a single
          checkpointed state graph and a shared grounding layer.
        </p>
        <div className="diagram-card">
          <XpanseDiagram />
          <p className="diagram-caption">
            The StateGraph fans work out to the strategy and transcreation pipelines, each agent
            grounded in Bedrock Nova Pro reasoning, dual Knowledge Bases, and live web search — with a
            human-in-the-loop feedback path that resumes the graph from its last checkpoint.
          </p>
        </div>
      </section>

      {/* Agent pipelines */}
      <section className="case-section">
        <p className="port-section-label">Agent Pipelines</p>
        <p className="port-section-sub">
          Two orchestrated flows, seven agents — each with one clearly-scoped job.
        </p>
        <div className="case-pipelines">
          {pipelines.map((p) => (
            <div key={p.name} className="case-pipeline">
              <h3 className="case-pipeline-name">{p.name}</h3>
              <p className="case-pipeline-summary">{p.summary}</p>
              <div className="case-agent-list">
                {p.agents.map((a) => (
                  <div key={a.role} className="case-agent">
                    <span className="case-agent-role">{a.role}</span>
                    <span className="case-agent-body">{a.body}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="case-section">
        <p className="port-section-label">How It Works</p>
        <div className="case-steps">
          {architecture.map((a) => (
            <div key={a.step} className="case-step">
              <span className="case-step-num">{a.step}</span>
              <div>
                <h3 className="case-step-title">{a.title}</h3>
                <p className="case-step-body">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering decisions */}
      <section className="case-section">
        <p className="port-section-label">Engineering Decisions</p>
        <p className="port-section-sub">
          The choices that separate a reliable system from a fragile one.
        </p>
        <div className="case-decisions">
          {decisions.map((d) => (
            <div key={d.title} className="case-decision">
              <h3 className="case-decision-title">{d.title}</h3>
              <p className="case-decision-body">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="case-section">
        <p className="port-section-label">Stack</p>
        <div className="case-stack">
          {stack.map((s) => (
            <div key={s.group} className="case-stack-group">
              <p className="case-stack-label">{s.group}</p>
              <div className="tag-row">
                {s.items.map((t) => (
                  <span key={t} className="port-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <div className="case-footer">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="case-btn">
          <GitHubIcon />
          Explore the code on GitHub
        </a>
        <Link href="/#projects" className="resume-link">
          Back to portfolio
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2.5 9.5 9.5 2.5M5.5 2.5H9.5V6.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
