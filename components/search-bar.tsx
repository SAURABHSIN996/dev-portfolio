"use client";

import { useEffect, useRef, useState } from "react";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // Pagefind UI initialises lazily once its static assets exist (post-build)
    const init = async () => {
      if (typeof window === "undefined") return;
      // @ts-expect-error — pagefind is a runtime global injected by the static build
      if (window.pagefind) {
        // @ts-expect-error
        await window.pagefind.init();
        // @ts-expect-error
        new window.PagefindUI({ element: "#pagefind-search", showImages: false });
      }
    };
    init();
  }, [open]);

  return (
    <div ref={ref}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>🔍</span>
          <span>Search posts…</span>
          <kbd className="hidden sm:inline text-xs border rounded px-1.5 py-0.5 bg-muted">
            ⌘K
          </kbd>
        </button>
      ) : (
        <div className="space-y-2">
          <div id="pagefind-search" />
          <button
            onClick={() => setOpen(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Close search
          </button>
        </div>
      )}
    </div>
  );
}
