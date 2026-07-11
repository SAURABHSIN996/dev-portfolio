// Bespoke SVG architecture diagram for the Xpanse.ai case study.
// Pure presentational SVG — no client interactivity, so it stays a Server Component.
// Colours/strokes are driven by CSS classes in globals.css (.dg-*) so the diagram
// inherits the site's theme tokens and font.

const NODE_W = 312;
const NODE_H = 44;

const laneA = {
  x: 94,
  cx: 250,
  num: "01",
  title: "Campaign Strategy Engine",
  firstY: 224,
  gap: 60,
  agents: [
    { name: "Performance Sentinel", tag: "RAG" },
    { name: "Strategic Seer", tag: "WEB" },
    { name: "Campaign Architect" },
    { name: "Feedback Router", tag: "ROUTE" },
  ],
};

const laneB = {
  x: 494,
  cx: 650,
  num: "02",
  title: "Content Transcreation",
  firstY: 224,
  gap: 76,
  agents: [
    { name: "Cultural Researcher" },
    { name: "Content Drafter" },
    { name: "Cultural Critic", tag: "SCORE" },
  ],
};

const groundPills = [
  { label: "Amazon Bedrock · Nova Pro", x: 70, w: 214 },
  { label: "KB · Campaigns", x: 300, w: 150 },
  { label: "KB · Brand", x: 470, w: 120 },
  { label: "Tavily · Live Web", x: 610, w: 220 },
];

type Lane = typeof laneA;

function renderLane(lane: Lane) {
  return lane.agents.map((a, i) => {
    const y = lane.firstY + i * lane.gap;
    const last = i === lane.agents.length - 1;
    return (
      <g key={a.name}>
        <rect x={lane.x} y={y} width={NODE_W} height={NODE_H} rx={9} className="dg-node" />
        <text x={lane.x + 18} y={y + NODE_H / 2 + 4} className="dg-node-label">
          {a.name}
        </text>
        {a.tag && (
          <>
            <rect x={lane.x + NODE_W - 58} y={y + 11} width={46} height={22} rx={11} className="dg-tag-bg" />
            <text x={lane.x + NODE_W - 35} y={y + 26} textAnchor="middle" className="dg-tag-text">
              {a.tag}
            </text>
          </>
        )}
        {!last && (
          <line
            x1={lane.cx}
            y1={y + NODE_H}
            x2={lane.cx}
            y2={y + lane.gap}
            markerEnd="url(#dg-arrow)"
            className="dg-flow"
          />
        )}
      </g>
    );
  });
}

export function XpanseDiagram() {
  return (
    <svg viewBox="0 0 900 588" role="img" aria-label="Xpanse.ai system architecture" className="xpanse-diagram">
      <defs>
        <marker id="dg-arrow" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 z" className="dg-arrowhead" />
        </marker>
        <marker id="dg-arrow-teal" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 z" className="dg-arrowhead-teal" />
        </marker>
        <filter id="dg-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Input */}
      <rect x={375} y={16} width={150} height={42} rx={21} className="dg-input" />
      <text x={450} y={42} textAnchor="middle" className="dg-input-text">
        Campaign Goal
      </text>
      <line x1={450} y1={58} x2={450} y2={84} markerEnd="url(#dg-arrow)" className="dg-flow" />

      {/* State graph core */}
      <rect x={140} y={86} width={620} height={56} rx={12} className="dg-state" filter="url(#dg-glow)" />
      <text x={450} y={112} textAnchor="middle" className="dg-state-title">
        LangGraph StateGraph
      </text>
      <text x={450} y={130} textAnchor="middle" className="dg-state-sub">
        shared typed state · checkpointed
      </text>

      {/* Split into two lanes */}
      <line x1={310} y1={142} x2={252} y2={216} markerEnd="url(#dg-arrow)" className="dg-flow" />
      <line x1={590} y1={142} x2={648} y2={216} markerEnd="url(#dg-arrow)" className="dg-flow" />

      {/* Lane A */}
      <rect x={70} y={184} width={360} height={286} rx={16} className="dg-lane" />
      <text x={92} y={210} className="dg-lane-num">{laneA.num}</text>
      <text x={116} y={210} className="dg-lane-title">{laneA.title}</text>
      {renderLane(laneA)}

      {/* Lane B */}
      <rect x={470} y={184} width={360} height={286} rx={16} className="dg-lane" />
      <text x={492} y={210} className="dg-lane-num">{laneB.num}</text>
      <text x={516} y={210} className="dg-lane-title">{laneB.title}</text>
      {renderLane(laneB)}

      {/* Iteration loop on Cultural Critic → Content Drafter */}
      <path d="M806 398 C 862 396 862 324 808 322" markerEnd="url(#dg-arrow-teal)" className="dg-iterate" />
      <text x={873} y={360} textAnchor="middle" transform="rotate(-90 873 360)" className="dg-loop-label">
        iterate ↻
      </text>

      {/* Human-in-the-loop feedback loop back to the state graph */}
      <path d="M94 426 C 20 414 20 150 206 143" markerEnd="url(#dg-arrow-teal)" className="dg-hitl" filter="url(#dg-glow)" />
      <text x={32} y={290} textAnchor="middle" transform="rotate(-90 32 290)" className="dg-hitl-label">
        HUMAN-IN-THE-LOOP
      </text>

      {/* Grounding & reasoning layer */}
      <line x1={70} y1={494} x2={302} y2={494} className="dg-divider-line" />
      <text x={450} y={498} textAnchor="middle" className="dg-divider-text">
        GROUNDING &amp; REASONING
      </text>
      <line x1={598} y1={494} x2={830} y2={494} className="dg-divider-line" />

      <line x1={250} y1={470} x2={250} y2={510} markerEnd="url(#dg-arrow-teal)" className="dg-ground-connector" />
      <line x1={650} y1={470} x2={650} y2={510} markerEnd="url(#dg-arrow-teal)" className="dg-ground-connector" />

      {groundPills.map((p) => (
        <g key={p.label}>
          <rect x={p.x} y={516} width={p.w} height={42} rx={10} className="dg-pill" />
          <text x={p.x + p.w / 2} y={542} textAnchor="middle" className="dg-pill-text">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
