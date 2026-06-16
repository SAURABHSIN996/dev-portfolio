"use client";

import { type IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiFramer,
  SiNodedotjs, SiPython, SiFastapi, SiExpress, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiSupabase, SiPrisma, SiDrizzle,
  SiOpenai, SiAnthropic, SiLangchain,
  SiDocker, SiVercel, SiGithubactions, SiLinux, SiGithub, SiNginx,
} from "react-icons/si";

type TechItem = { name: string; Icon: IconType; bg: string; color: string };
type Category = { title: string; items: TechItem[] };

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    items: [
      { name: "Next.js",    Icon: SiNextdotjs,    bg: "#000000", color: "#ffffff" },
      { name: "React",      Icon: SiReact,        bg: "#20232a", color: "#61dafb" },
      { name: "TypeScript", Icon: SiTypescript,   bg: "#3178c6", color: "#ffffff" },
      { name: "JavaScript", Icon: SiJavascript,   bg: "#f7df1e", color: "#000000" },
      { name: "Tailwind",   Icon: SiTailwindcss,  bg: "#0ea5e9", color: "#ffffff" },
      { name: "HTML5",      Icon: SiHtml5,        bg: "#e34f26", color: "#ffffff" },
      { name: "Framer",     Icon: SiFramer,       bg: "#0055ff", color: "#ffffff" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js",    Icon: SiNodedotjs,    bg: "#339933", color: "#ffffff" },
      { name: "Python",     Icon: SiPython,       bg: "#3776ab", color: "#ffd43b" },
      { name: "FastAPI",    Icon: SiFastapi,      bg: "#009688", color: "#ffffff" },
      { name: "Express",    Icon: SiExpress,      bg: "#000000", color: "#ffffff" },
      { name: "GraphQL",    Icon: SiGraphql,      bg: "#e10098", color: "#ffffff" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql,   bg: "#4169e1", color: "#ffffff" },
      { name: "MongoDB",    Icon: SiMongodb,      bg: "#47a248", color: "#ffffff" },
      { name: "Redis",      Icon: SiRedis,        bg: "#dc382d", color: "#ffffff" },
      { name: "Supabase",   Icon: SiSupabase,     bg: "#3ecf8e", color: "#000000" },
      { name: "Prisma",     Icon: SiPrisma,       bg: "#0c344b", color: "#ffffff" },
      { name: "Drizzle",    Icon: SiDrizzle,      bg: "#c5f74f", color: "#000000" },
    ],
  },
  {
    title: "AI / LLM",
    items: [
      { name: "OpenAI",     Icon: SiOpenai,       bg: "#412991", color: "#ffffff" },
      { name: "Anthropic",  Icon: SiAnthropic,    bg: "#d4a574", color: "#000000" },
      { name: "LangChain",  Icon: SiLangchain,    bg: "#1c3c3c", color: "#ffffff" },
    ],
  },
  {
    title: "DevOps",
    items: [
      { name: "Docker",     Icon: SiDocker,       bg: "#2496ed", color: "#ffffff" },
      { name: "Vercel",     Icon: SiVercel,       bg: "#000000", color: "#ffffff" },
      { name: "GH Actions", Icon: SiGithubactions,bg: "#2088ff", color: "#ffffff" },
      { name: "Linux",      Icon: SiLinux,        bg: "#fcc624", color: "#000000" },
      { name: "GitHub",     Icon: SiGithub,       bg: "#181717", color: "#ffffff" },
      { name: "Nginx",      Icon: SiNginx,        bg: "#009639", color: "#ffffff" },
    ],
  },
];

function IconChip({ name, Icon, bg, color }: TechItem) {
  return (
    <div className="stack-chip" title={name}>
      <div className="stack-icon-wrap" style={{ background: bg }}>
        <Icon size={22} color={color} />
      </div>
      <span className="stack-chip-label">{name}</span>
    </div>
  );
}

// Grid placement: Frontend + Backend left (2 cols), DevOps right (1 col tall)
// Database bottom-left (1 col), AI/LLM bottom-right (2 cols)
const GRID_CLASSES: Record<string, string> = {
  Frontend: "stack-card-frontend",
  Backend:  "stack-card-backend",
  Database: "stack-card-database",
  "AI / LLM": "stack-card-ai",
  DevOps:   "stack-card-devops",
};

export function TechStack() {
  return (
    <div className="stack-grid">
      {CATEGORIES.map((cat) => (
        <div key={cat.title} className={`stack-card ${GRID_CLASSES[cat.title] ?? ""}`}>
          <p className="stack-cat-title">{cat.title}</p>
          <div className="stack-icons">
            {cat.items.map((item) => (
              <IconChip key={item.name} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
