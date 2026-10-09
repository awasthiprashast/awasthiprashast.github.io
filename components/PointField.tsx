"use client";

import { useEffect, useRef, useState } from "react";

const N = 200;
const rnd = Math.random;
const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
const ring = (i: number, n: number, c: [number, number], r: number, ry = r): [number, number] => {
  const a = (i / n) * Math.PI * 2;
  return [c[0] + r * Math.cos(a), c[1] + ry * Math.sin(a)];
};

type Shape = { name: string; project: string; at: (i: number) => [number, number] };

const shapes: Shape[] = [
  {
    name: "forecast",
    project: "neve jewels",
    at: (i) => {
      if (i < 130) {
        const x = 0.04 + (0.56 * i) / 130;
        return [x, 0.6 - 0.14 * Math.sin(x * 14) - 0.2 * x + gauss() * 0.025];
      }
      const j = (i - 130) / (N - 130);
      const x = 0.6 + 0.36 * j;
      return [x, 0.6 - 0.14 * Math.sin(x * 14) - 0.2 * x + gauss() * (0.02 + 0.11 * j)];
    },
  },
  {
    name: "eye",
    project: "attention monitor",
    at: (i) => {
      if (i < 110) return ring(i, 110, [0.5, 0.5], 0.4, 0.16);
      if (i < 165) {
        const a = rnd() * Math.PI * 2;
        const r = 0.1 * Math.sqrt(rnd());
        return [0.5 + r * Math.cos(a), 0.5 + r * Math.sin(a) * 1.4];
      }
      return [0.5, 0.5];
    },
  },
  {
    name: "agents",
    project: "multi-agent research",
    at: (i) => {
      const n = 8;
      const node = (k: number): [number, number] => [
        0.5 + 0.38 * Math.cos((k / n) * Math.PI * 2),
        0.5 + 0.34 * Math.sin((k / n) * Math.PI * 2),
      ];
      if (i < 72) {
        const p = node(i % n);
        return [p[0] + gauss() * 0.012, p[1] + gauss() * 0.014];
      }
      const k = (i - 72) % n;
      const a = node(k);
      const b = node((k + (i % 2 ? 1 : 3)) % n);
      const u = rnd();
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    },
  },
  {
    name: "groups",
    project: "microaggregation",
    at: (i) => {
      const c = [
        [0.22, 0.3],
        [0.55, 0.7],
        [0.78, 0.3],
        [0.82, 0.76],
        [0.28, 0.76],
      ][i % 5];
      return [c[0] + gauss() * 0.05, c[1] + gauss() * 0.06];
    },
  },
];

type Point = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; accent: boolean };

export function PointField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState(shapes[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let current = 0;
    let mx = -999;
    let my = -999;

    const css = getComputedStyle(document.documentElement);
    const readColors = () => ({
      accent: css.getPropertyValue("--accent").trim() || "#d6ff70",
      point: css.getPropertyValue("--point").trim() || "#b9bfb6",
    });

    const pts: Point[] = Array.from({ length: N }, () => ({
      x: rnd() * 300,
      y: rnd() * 300,
      vx: 0,
      vy: 0,
      tx: rnd(),
      ty: rnd(),
      accent: rnd() < 0.35,
    }));

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function setShape(k: number, snap = false) {
      current = k;
      pts.forEach((p, i) => {
        const [tx, ty] = shapes[k].at(i);
        p.tx = tx;
        p.ty = ty;
        if (snap) {
          p.x = tx * w;
          p.y = ty * h;
        }
      });
      setLabel(shapes[k]);
    }

    function draw() {
      if (!ctx) return;
      const colors = readColors();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        for (let j = i + 1; j < N; j++) {
          const b = pts[j];
          const d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
          if (d < 26) {
            ctx.globalAlpha = 0.28 * (1 - d / 26);
            ctx.strokeStyle = colors.accent;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      for (const p of pts) {
        ctx.fillStyle = p.accent ? colors.accent : colors.point;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.accent ? 2.1 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (const p of pts) {
        p.vx = (p.vx + (p.tx * w - p.x) * 0.035) * 0.86;
        p.vy = (p.vy + (p.ty * h - p.y) * 0.035) * 0.86;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 60 && d > 0) {
          const f = ((60 - d) / 60) * 3;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      setShape(0, true);
      draw();
      return () => ro.disconnect();
    }

    setShape(0);
    raf = requestAnimationFrame(step);
    const cycle = window.setInterval(() => setShape((current + 1) % shapes.length), 3800);

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const leave = () => {
      mx = my = -999;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(cycle);
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={className ?? "absolute inset-0 size-full"}
      />
      <p
        aria-hidden
        className="absolute right-5 bottom-5 font-mono text-[10px] text-dim sm:right-8"
      >
        {label.name} <span className="text-accent">/ {label.project}</span>
      </p>
    </>
  );
}
