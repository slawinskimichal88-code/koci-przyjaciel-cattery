"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export default function DiamondCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for interactive refraction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate Diamond Sparkles
    const sparklesCount = 45;
    const sparkles: Sparkle[] = [];
    const colors = ["#ffffff", "#e0f2fe", "#93c5fd", "#c084fc", "#67e8f9"];

    for (let i = 0; i < sparklesCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1.5,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.008,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // 3D Diamond Polyhedron definition
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Octahedron/Diamond vertices
    const baseVertices: Point3D[] = [
      { x: 0, y: -130, z: 0 },   // Top apex
      { x: 85, y: -30, z: 85 },  // Upper waist 1
      { x: -85, y: -30, z: 85 }, // Upper waist 2
      { x: -85, y: -30, z: -85 },// Upper waist 3
      { x: 85, y: -30, z: -85 }, // Upper waist 4
      { x: 100, y: 30, z: 0 },   // Belt 1
      { x: 0, y: 30, z: 100 },   // Belt 2
      { x: -100, y: 30, z: 0 },  // Belt 3
      { x: 0, y: 30, z: -100 },  // Belt 4
      { x: 0, y: 150, z: 0 },    // Bottom pavilion tip
    ];

    // Facet lines connecting vertices
    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
      [1, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 8], [4, 8], [4, 5],
      [5, 6], [6, 7], [7, 8], [8, 5],
      [9, 5], [9, 6], [9, 7], [9, 8],
    ];

    let rotX = 0.2;
    let rotY = 0;
    let rotZ = 0.1;

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep radial glow at mouse position (Diamond Caustics)
      const grad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        width * 0.45
      );
      grad.addColorStop(0, "rgba(59, 130, 246, 0.09)");
      grad.addColorStop(0.3, "rgba(147, 197, 253, 0.04)");
      grad.addColorStop(0.7, "rgba(192, 132, 252, 0.02)");
      grad.addColorStop(1, "rgba(3, 4, 7, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Diamond Sparkles
      sparkles.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > s.maxAlpha || s.alpha < 0.05) {
          s.speed = -s.speed;
        }
        s.rotation += s.rotationSpeed;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;

        // Draw 4-point Diamond Star
        ctx.beginPath();
        ctx.moveTo(0, -s.size * 2.5);
        ctx.quadraticCurveTo(0, 0, s.size * 2.5, 0);
        ctx.quadraticCurveTo(0, 0, 0, s.size * 2.5);
        ctx.quadraticCurveTo(0, 0, -s.size * 2.5, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s.size * 2.5);
        ctx.fill();

        ctx.restore();
      });

      // Render Floating 3D Diamond Crystal in the background corner/center
      rotY += 0.005;
      rotX = 0.2 + (mouseY / height - 0.5) * 0.3;
      rotZ = (mouseX / width - 0.5) * 0.3;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const fov = 400;
      // Position crystal elegantly in the top-right / hero background
      const centerX = width > 1024 ? width * 0.78 : width * 0.5;
      const centerY = height * 0.35;

      const projected: { x: number; y: number; z: number }[] = [];

      baseVertices.forEach((v) => {
        // Rotate Y
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        // Rotate X
        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;
        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        const scale = fov / (fov + z2 + 250);
        projected.push({
          x: centerX + x3 * scale,
          y: centerY + y3 * scale,
          z: z2,
        });
      });

      // Draw Diamond facet lines with crystalline prism luminescence
      edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.08, Math.min(0.7, (avgZ + 150) / 300));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const edgeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        edgeGrad.addColorStop(0, `rgba(147, 197, 253, ${alpha * 0.9})`);
        edgeGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 1.2})`);
        edgeGrad.addColorStop(1, `rgba(192, 132, 252, ${alpha * 0.8})`);

        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "rgba(147, 197, 253, 0.8)";
        ctx.shadowBlur = 12;
        ctx.stroke();
      });

      // Draw shiny vertices (Diamond Nodes)
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#93c5fd";
        ctx.shadowBlur = 15;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
