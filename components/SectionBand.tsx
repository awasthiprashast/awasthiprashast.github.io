"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Decorative transition between sections. Its motion is tied to scroll position, never to scroll itself. */
export function SectionBand({ n, label, reverse }: { n: string; label: string; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-45%", "0%"] : ["0%", "-45%"]);
  const line = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const word = `${n} ${label} · `.repeat(8);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-36 overflow-hidden border-b border-line select-none sm:h-44"
    >
      <motion.div
        style={{ ...(reduce ? {} : { x }), WebkitTextStroke: "1px var(--line-strong)" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[7rem] leading-none font-medium whitespace-nowrap text-transparent sm:text-[10rem]"
      >
        {word}
      </motion.div>
      <p className="absolute right-5 bottom-4 font-mono text-[10px] tracking-[0.14em] text-dim uppercase sm:right-8">
        Next ↓ <span className="text-accent">{label}</span>
      </p>
      <motion.div
        style={{ scaleX: reduce ? 1 : line }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
      />
    </div>
  );
}
