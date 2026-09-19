"use client";

import React, { useEffect, useRef } from "react";

interface FloatingFacet {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  vy: number;
  vx: number;
  alpha: number;
  phase: number;
}

export default function CrystalCausticsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const count = 22;
    const facets: FloatingFacet[] = [];

    for (let i = 0; i < count; i++) {
      facets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.2 - 0.05,
        alpha: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle High-End Architectural Ambient Lighting
      const lightGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        0,
        width * 0.5,
        height * 0.2,
        width * 0.65
      );
      lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      lightGrad.addColorStop(0.5, "rgba(248, 250, 252, 0.4)");
      lightGrad.addColorStop(1, "transparent");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Floating Micro Diamond Facets (Monochrome & Pure Silver)
      for (let i = 0; i < facets.length; i++) {
        const f = facets[i];
        f.x += f.vx;
        f.y += f.vy;
        f.rotation += f.rotSpeed;
        f.phase += 0.02;

        if (f.y < -20) {
          f.y = height + 20;
          f.x = Math.random() * width;
        }
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;

        const currentAlpha = (Math.sin(f.phase) * 0.25 + 0.75) * f.alpha;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.globalAlpha = currentAlpha;

        const s = f.size;

        // Subtle silver geometric diamond
        ctx.fillStyle = "rgba(15, 23, 42, 0.15)";
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.8);
        ctx.quadraticCurveTo(0, 0, s * 1.8, 0);
        ctx.quadraticCurveTo(0, 0, 0, s * 1.8);
        ctx.quadraticCurveTo(0, 0, -s * 1.8, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s * 1.8);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
