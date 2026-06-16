"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "writing", label: "Writing" },
];

export function SectionNav() {
  const [active, setActive] = useState("about");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="mt-12 flex flex-col" aria-label="Page sections">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id && !isActive;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="flex items-center gap-4 py-2.5"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: isActive ? "40px" : isHovered ? "28px" : "18px",
                backgroundColor: isActive ? "#64ffda" : isHovered ? "#c8c8c8" : "#555555",
                transition: "width 300ms, background-color 300ms",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: "500",
                letterSpacing: "0.01em",
                color: isActive ? "#64ffda" : isHovered ? "#f0f0f0" : "#a0a0a0",
                transition: "color 200ms",
              }}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
