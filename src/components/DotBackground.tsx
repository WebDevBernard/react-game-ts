"use client";

import { useEffect, useRef } from "react";

const SPACING = 30;
const RADIUS = 2;
const COLOR = "rgba(0,0,0,0.1)";
const INFLUENCE = 90;
const MAX_SHIFT = 16;
const SPRING = 0.08;

interface Dot {
  bx: number;
  by: number;
  x: number;
  y: number;
}

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let mx = -9999;
    let my = -9999;
    let dots: Dot[] = [];

    function layout() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      dots = [];
      for (let x = SPACING / 2; x < canvas!.width; x += SPACING) {
        for (let y = SPACING / 2; y < canvas!.height; y += SPACING) {
          dots.push({ bx: x, by: y, x, y });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const d of dots) {
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.hypot(dx, dy);
        if (dist < INFLUENCE) {
          const force = (1 - dist / INFLUENCE) ** 2 * MAX_SHIFT;
          d.x = d.bx + (dx / dist) * force;
          d.y = d.by + (dy / dist) * force;
        } else {
          d.x += (d.bx - d.x) * SPRING;
          d.y += (d.by - d.y) * SPRING;
        }
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = COLOR;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    layout();
    draw();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", layout);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
