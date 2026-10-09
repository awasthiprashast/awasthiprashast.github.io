"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";

type Pt = { tx: number; ty: number; sx: number; sy: number; delay: number; accent: boolean; phase: number };

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Heading whose letters are first drawn by points that drift in from just around the text,
 * while the real text fades up and sharpens underneath. Fully scroll-driven and reversible.
 */
export function AssembleHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pts = useRef<Pt[]>([]);
  const size = useRef({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96%", "start 52%"] });
  const e = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 });
  const textOpacity = useTransform(e, [0.4, 0.9], [0, 1]);
  const blur = useTransform(e, [0.4, 0.95], [8, 0]);
  const filter = useTransform(blur, (v) => `blur(${v.toFixed(2)}px)`);

  const draw = useCallback((v: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = size.current;
    ctx.clearRect(0, 0, w, h);
    if (v >= 0.995) return;
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim() || "#d6ff70";
    const base = css.getPropertyValue("--point").trim() || "#b9bfb6";
    const fadeIn = clamp(v * 8);
    const fadeOut = 1 - clamp((v - 0.72) / 0.28);
    ctx.globalAlpha = fadeIn * fadeOut;
    for (const p of pts.current) {
      const lp = inOut(clamp((v - p.delay) / 0.55));
      const wob = (1 - lp) * 3;
      const x = p.sx + (p.tx - p.sx) * lp + Math.cos(p.phase + v * 14) * wob;
      const y = p.sy + (p.ty - p.sy) * lp + Math.sin(p.phase + v * 14) * wob;
      ctx.fillStyle = p.accent ? accent : base;
      ctx.beginPath();
      ctx.arc(x, y, p.accent ? 1.6 : 1.25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const build = useCallback(() => {
    const h2 = ref.current;
    const canvas = canvasRef.current;
    if (!h2 || !canvas) return;
    const cs = getComputedStyle(h2);
    const width = Math.ceil(h2.clientWidth);
    const fontSize = parseFloat(cs.fontSize);
    const lineH = parseFloat(cs.lineHeight) || fontSize * 1.02;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if (cs.letterSpacing && cs.letterSpacing !== "normal") octx.letterSpacing = cs.letterSpacing;

    // Greedy word wrap, matching how the DOM text wraps closely enough for the dots to resolve into it.
    const words = children.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const word of words) {
      const test = cur ? `${cur} ${word}` : word;
      if (cur && octx.measureText(test).width > width) {
        lines.push(cur);
        cur = word;
      } else cur = test;
    }
    if (cur) lines.push(cur);

    const height = Math.ceil(lines.length * lineH);
    off.width = width;
    off.height = height;
    octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if (cs.letterSpacing && cs.letterSpacing !== "normal") octx.letterSpacing = cs.letterSpacing;
    octx.fillStyle = "#fff";
    octx.textBaseline = "alphabetic";
    const m = octx.measureText("Hg");
    const asc = m.fontBoundingBoxAscent ?? fontSize * 0.9;
    const desc = m.fontBoundingBoxDescent ?? fontSize * 0.25;
    const baseline = (lineH - (asc + desc)) / 2 + asc;
    lines.forEach((l, i) => octx.fillText(l, 0, i * lineH + baseline));

    const data = octx.getImageData(0, 0, width, height).data;
    const cand: [number, number][] = [];
    for (let y = 0; y < height; y += 2)
      for (let x = 0; x < width; x += 2) if (data[(y * width + x) * 4 + 3] > 110) cand.push([x, y]);

    const n = Math.min(800, cand.length);
    const next: Pt[] = [];
    for (let i = 0; i < n; i++) {
      const [tx, ty] = cand[Math.floor(Math.random() * cand.length)];
      const a = Math.random() * Math.PI * 2;
      const r = 24 + Math.random() * 70;
      next.push({
        tx,
        ty,
        sx: tx + Math.cos(a) * r * 1.5,
        sy: ty + Math.sin(a) * r * 0.75,
        delay: clamp(tx / Math.max(width, 1)) * 0.3 + Math.random() * 0.15,
        accent: Math.random() < 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    pts.current = next;
    size.current = { w: width, h: height };
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(e.get());
  }, [children, draw, e]);

  useEffect(() => {
    if (reduce) return;
    let alive = true;
    let lastW = 0;
    const run = () => {
      if (alive) build();
    };
    (document.fonts?.ready ?? Promise.resolve()).then(run);
    const ro = new ResizeObserver(() => {
      const w = ref.current?.clientWidth ?? 0;
      if (w !== lastW) {
        lastW = w;
        run();
      }
    });
    if (ref.current) ro.observe(ref.current);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [build, reduce]);

  useMotionValueEvent(e, "change", draw);

  return (
    <h2
      ref={ref}
      className="relative font-display text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl"
    >
      <motion.span className="block" style={reduce ? undefined : { opacity: textOpacity, filter }}>
        {children}
      </motion.span>
      {!reduce && (
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute top-0 left-0" />
      )}
    </h2>
  );
}
