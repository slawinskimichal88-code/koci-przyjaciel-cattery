"use client";

import React, { useEffect, useRef } from "react";

interface PastelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  type: "star" | "diamond" | "bubble" | "paw";
}

const PASTEL_COLORS = [
  "#FFD4C2", // Peach
  "#C8F2D4", // Mint
  "#BAE6FD", // Sky
  "#E9D5FF", // Lavender
  "#FEF08A", // Butter Yellow
  "#FDA4AF", // Rose
];

export default function DiamondCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: PastelParticle[] = [];
    let targetX = -500;
    let targetY = -500;
    let lastX = -500;
    let lastY = -500;
    let lastTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const dist = Math.hypot(targetX - lastX, targetY - lastY);
      const now = performance.now();
      const timeDiff = now - lastTime;

      if (dist > 8 && timeDiff > 12) {
        lastTime = now;
        lastX = targetX;
        lastY = targetY;

        const count = Math.min(2, Math.max(1, Math.floor(dist / 16)));
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.3;
          const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
          const rand = Math.random();
          const type: "star" | "diamond" | "bubble" | "paw" =
            rand > 0.6 ? "star" : rand > 0.3 ? "diamond" : rand > 0.1 ? "bubble" : "paw";

          particles.push({
            x: targetX + (Math.random() - 0.5) * 12,
            y: targetY + (Math.random() - 0.5) * 12,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.3,
            size: Math.random() * 8 + 8,
            alpha: 1.0,
            decay: Math.random() * 0.024 + 0.016,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.1,
            color,
            type,
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      // Cheerful burst of pastel sparkles on click
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.0 + 1.5;
        const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
        const rand = Math.random();
        const type: "star" | "diamond" | "bubble" | "paw" =
          rand > 0.5 ? "star" : rand > 0.2 ? "diamond" : "bubble";

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 12 + 8,
          alpha: 1.0,
          decay: Math.random() * 0.022 + 0.014,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2,
          color,
          type,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Render Pastel Confetti & Sparkles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

        const r = p.size;

        if (p.type === "star") {
          // 4-Point Cute Cartoon Star
          ctx.fillStyle = p.color;
          ctx.strokeStyle = "#2A221F";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
          ctx.stroke();
        } else if (p.type === "diamond") {
          // Cute Lozenge Diamond
          ctx.fillStyle = p.color;
          ctx.strokeStyle = "#2A221F";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.7, 0);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Cute white highlight
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(-r * 0.2, -r * 0.2, r * 0.15, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "paw") {
          // Tiny cute paw print
          ctx.fillStyle = p.color;
          ctx.strokeStyle = "#2A221F";
          ctx.lineWidth = 1.0;
          // Main pad
          ctx.beginPath();
          ctx.arc(0, r * 0.2, r * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Toes
          const toeRadius = r * 0.16;
          [-r * 0.35, 0, r * 0.35].forEach((tx, idx) => {
            const ty = idx === 1 ? -r * 0.4 : -r * 0.25;
            ctx.beginPath();
            ctx.arc(tx, ty, toeRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
        } else {
          // Floating pastel bubble with cute reflection
          ctx.fillStyle = p.color;
          ctx.strokeStyle = "#2A221F";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(-r * 0.2, -r * 0.2, r * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none"
    />
  );
}
