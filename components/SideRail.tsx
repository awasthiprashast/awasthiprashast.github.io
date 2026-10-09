"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "top", n: "01", label: "About" },
  { id: "experience", n: "02", label: "Experience" },
  { id: "projects", n: "03", label: "Projects" },
  { id: "beyond", n: "04", label: "Beyond code" },
  { id: "toolkit", n: "05", label: "Toolkit" },
  { id: "contact", n: "06", label: "Contact" },
];

/** Section tracker shown in the side margin on very wide screens. */
export function SideRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.45;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // Near the bottom the last section can be too short to reach the line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? items[items.length - 1].id : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <ul className="relative flex flex-col gap-5 border-l border-line pl-4">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="group relative">
              <span
                aria-hidden
                className={`absolute top-1/2 -left-[17px] h-px -translate-y-1/2 bg-accent transition-all duration-300 ${on ? "w-3" : "w-0"}`}
              />
              <a
                href={`#${i.id}`}
                aria-current={on ? "true" : undefined}
                className={`font-mono text-[11px] transition-colors duration-300 ${on ? "text-accent" : "text-dim hover:text-fg"}`}
              >
                {i.n}
                <span className="pointer-events-none absolute top-1/2 left-full ml-4 -translate-y-1/2 rounded-md border border-line bg-surface px-2 py-1 text-[11px] whitespace-nowrap text-fg opacity-0 transition-opacity group-hover:opacity-100">
                  {i.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
