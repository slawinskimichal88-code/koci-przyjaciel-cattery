"use client";

import React, { useEffect, useRef } from "react";

interface KittenParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  alpha: number;
  decay: number;
  type: "jumping_kitten" | "peeking_cat" | "paw" | "curled_kitten";
  scale: number;
  targetScale: number;
}

export default function KittenCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const onResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const kittens: KittenParticle[] = [];
    let lastX = -500;
    let lastY = -500;
    let lastTime = performance.now();

    const types: ("jumping_kitten" | "peeking_cat" | "paw" | "curled_kitten")[] = [
      "jumping_kitten",
      "peeking_cat",
      "paw",
      "curled_kitten",
    ];

    const spawnKitten = (x: number, y: number, speedMultiplier = 1) => {
      const angle = (Math.random() - 0.5) * Math.PI * 0.8 - Math.PI / 2; // mostly upward burst
      const speed = (Math.random() * 2.5 + 2.0) * speedMultiplier;
      const type = types[Math.floor(Math.random() * types.length)];

      kittens.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        size: Math.random() * 10 + 22, // 22px to 32px for great visibility
        alpha: 1.0,
        decay: Math.random() * 0.016 + 0.012,
        type,
        scale: 0.2,
        targetScale: 1.0,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      // Pop out kittens when moving cursor
      if (dist > 18 && now - lastTime > 28) {
        lastTime = now;
        lastX = e.clientX;
        lastY = e.clientY;
        spawnKitten(e.clientX, e.clientY, 1);
      }
    };

    const onClick = (e: MouseEvent) => {
      // Joyful kitten litter explosion on click!
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        const type = types[Math.floor(Math.random() * types.length)];

        kittens.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 12 + 24,
          alpha: 1.0,
          decay: Math.random() * 0.018 + 0.012,
          type,
          scale: 0.1,
          targetScale: 1.1,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let animId: number;

    // Drawing helper: cute line-art cat paw
    const drawPaw = (ctx: CanvasRenderingContext2D, size: number) => {
      const r = size * 0.5;
      // Main palm pad
      ctx.beginPath();
      ctx.ellipse(0, r * 0.25, r * 0.65, r * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 4 toe pads
      const toes = [
        { x: -r * 0.6, y: -r * 0.35, rx: r * 0.22, ry: r * 0.28, rot: -0.3 },
        { x: -r * 0.22, y: -r * 0.6, rx: r * 0.22, ry: r * 0.3, rot: -0.1 },
        { x: r * 0.22, y: -r * 0.6, rx: r * 0.22, ry: r * 0.3, rot: 0.1 },
        { x: r * 0.6, y: -r * 0.35, rx: r * 0.22, ry: r * 0.28, rot: 0.3 },
      ];
      toes.forEach((t) => {
        ctx.beginPath();
        ctx.ellipse(t.x, t.y, t.rx, t.ry, t.rot, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.stroke();
      });
    };

    // Drawing helper: cute peeking kitten face with Maine Coon tufts
    const drawPeekingCat = (ctx: CanvasRenderingContext2D, size: number) => {
      const r = size * 0.55;

      // Head circle
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Left Ear
      ctx.beginPath();
      ctx.moveTo(-r * 0.8, -r * 0.2);
      ctx.lineTo(-r * 0.7, -r * 1.25);
      ctx.lineTo(-r * 0.15, -r * 0.85);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.stroke();

      // Left ear tuft (Maine Coon lynx tuft)
      ctx.beginPath();
      ctx.moveTo(-r * 0.7, -r * 1.25);
      ctx.lineTo(-r * 0.85, -r * 1.55);
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Right Ear
      ctx.beginPath();
      ctx.moveTo(r * 0.15, -r * 0.85);
      ctx.lineTo(r * 0.7, -r * 1.25);
      ctx.lineTo(r * 0.8, -r * 0.2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.stroke();

      // Right ear tuft
      ctx.beginPath();
      ctx.moveTo(r * 0.7, -r * 1.25);
      ctx.lineTo(r * 0.85, -r * 1.55);
      ctx.stroke();

      // Inner ear pink detail
      ctx.fillStyle = "#fbcfe8";
      ctx.beginPath();
      ctx.moveTo(-r * 0.65, -r * 0.3);
      ctx.lineTo(-r * 0.6, -r * 0.95);
      ctx.lineTo(-r * 0.25, -r * 0.7);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(r * 0.25, -r * 0.7);
      ctx.lineTo(r * 0.6, -r * 0.95);
      ctx.lineTo(r * 0.65, -r * 0.3);
      ctx.fill();

      // Happy curved eyes
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(-r * 0.35, -r * 0.05, r * 0.22, Math.PI * 0.9, Math.PI * 2.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(r * 0.35, -r * 0.05, r * 0.22, Math.PI * 0.9, Math.PI * 2.1);
      ctx.stroke();

      // Tiny triangle nose
      ctx.fillStyle = "#f472b6";
      ctx.beginPath();
      ctx.moveTo(0, r * 0.15);
      ctx.lineTo(-r * 0.12, r * 0.05);
      ctx.lineTo(r * 0.12, r * 0.05);
      ctx.closePath();
      ctx.fill();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(-r * 0.2, r * 0.3);
      ctx.quadraticCurveTo(-r * 0.1, r * 0.38, 0, r * 0.25);
      ctx.quadraticCurveTo(r * 0.1, r * 0.38, r * 0.2, r * 0.3);
      ctx.stroke();

      // Whiskers
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-r * 0.4, r * 0.15);
      ctx.lineTo(-r * 1.2, r * 0.05);
      ctx.moveTo(-r * 0.4, r * 0.25);
      ctx.lineTo(-r * 1.15, r * 0.3);

      ctx.moveTo(r * 0.4, r * 0.15);
      ctx.lineTo(r * 1.2, r * 0.05);
      ctx.moveTo(r * 0.4, r * 0.25);
      ctx.lineTo(r * 1.15, r * 0.3);
      ctx.stroke();
    };

    // Drawing helper: playful jumping kitten silhouette / line-art
    const drawJumpingKitten = (ctx: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.8;

      // Body arch (jumping pose)
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.9, s * 0.55, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(s * 0.8, -s * 0.4, s * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.moveTo(s * 0.6, -s * 0.7);
      ctx.lineTo(s * 0.75, -s * 1.1);
      ctx.lineTo(s * 0.95, -s * 0.8);
      ctx.fill();
      ctx.stroke();

      // Bushy Maine Coon tail in the air
      ctx.beginPath();
      ctx.moveTo(-s * 0.8, s * 0.1);
      ctx.quadraticCurveTo(-s * 1.4, -s * 0.8, -s * 1.1, -s * 1.3);
      ctx.quadraticCurveTo(-s * 0.6, -s * 0.9, -s * 0.6, 0);
      ctx.fill();
      ctx.stroke();

      // Front paws stretched forward
      ctx.beginPath();
      ctx.moveTo(s * 0.6, s * 0.2);
      ctx.lineTo(s * 1.1, s * 0.6);
      ctx.moveTo(s * 0.4, s * 0.3);
      ctx.lineTo(s * 0.9, s * 0.7);
      ctx.stroke();

      // Back paws stretched back
      ctx.beginPath();
      ctx.moveTo(-s * 0.4, s * 0.3);
      ctx.lineTo(-s * 0.8, s * 0.8);
      ctx.stroke();
    };

    // Drawing helper: curled cozy kitten
    const drawCurledKitten = (ctx: CanvasRenderingContext2D, size: number) => {
      const r = size * 0.5;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#09090b";
      ctx.lineWidth = 1.8;

      // Curled body
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.9, r * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Curled tail hugging the body
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.95, 0.4, Math.PI * 1.4);
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Cute ear on top
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-r * 0.2, -r * 0.6);
      ctx.lineTo(-r * 0.4, -r * 1.05);
      ctx.lineTo(0, -r * 0.75);
      ctx.fill();
      ctx.stroke();

      // Sleeping closed eye
      ctx.beginPath();
      ctx.arc(r * 0.2, -r * 0.1, r * 0.18, 0.1, Math.PI * 0.9);
      ctx.stroke();
    };

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Update & render bouncing kittens
      for (let i = kittens.length - 1; i >= 0; i--) {
        const k = kittens[i];
        k.x += k.vx;
        k.y += k.vy;
        k.vy += 0.12; // gentle playful gravity
        k.rotation += k.rotSpeed;
        k.scale += (k.targetScale - k.scale) * 0.2;
        k.alpha -= k.decay;

        if (k.alpha <= 0) {
          kittens.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(k.x, k.y);
        ctx.rotate(k.rotation);
        ctx.scale(k.scale, k.scale);
        ctx.globalAlpha = Math.max(0, Math.min(1, k.alpha));

        // Soft drop shadow for great pop against both light and dark backgrounds
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        if (k.type === "jumping_kitten") {
          drawJumpingKitten(ctx, k.size);
        } else if (k.type === "peeking_cat") {
          drawPeekingCat(ctx, k.size);
        } else if (k.type === "paw") {
          drawPaw(ctx, k.size);
        } else {
          drawCurledKitten(ctx, k.size);
        }

        ctx.restore();
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
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
