"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Thin divider between sections. Its motion is tied to scroll position, never to scroll itself. */
export function SectionStrip({ n, label }: { n: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const line = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);
  const text = `${n} — ${label}      ·      `.repeat(14);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-8 overflow-hidden border-b border-line font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-dim uppercase select-none"
    >
      <motion.div style={reduce ? undefined : { x }} className="inline-block pl-5 leading-8">
        {text}
      </motion.div>
      <motion.div
        style={{ scaleX: reduce ? 1 : line }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
      />
    </div>
  );
}
