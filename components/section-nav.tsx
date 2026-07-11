"use client";

import { useEffect, useState } from "react";

const BASE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function SectionNav({ hasWriting = false }: { hasWriting?: boolean }) {
  const [active, setActive] = useState("about");
  const [hovered, setHovered] = useState<string | null>(null);

  const sections = hasWriting
    ? [...BASE_SECTIONS, { id: "writing", label: "Writing" }]
    : BASE_SECTIONS;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
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
  }, [hasWriting]);

  return (
    <nav className="mt-12 flex flex-col" aria-label="Page sections">
      {sections.map(({ id, label }) => {
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
                width: isActive ? "56px" : isHovered ? "32px" : "20px",
                backgroundColor: isActive ? "#1f1d1a" : isHovered ? "#8f8b81" : "#cbc4b4",
                transition: "width 300ms, background-color 300ms",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: isActive ? "600" : "500",
                letterSpacing: "0.01em",
                color: isActive ? "#1f1d1a" : isHovered ? "#1f1d1a" : "#6f6b63",
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
