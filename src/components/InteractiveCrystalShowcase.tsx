"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, RotateCw, Eye, Sliders, Layers } from "lucide-react";

interface InteractiveCrystalShowcaseProps {
  lang: "PL" | "EN" | "DE";
}

export default function InteractiveCrystalShowcase({ lang }: InteractiveCrystalShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crystalColor, setCrystalColor] = useState<"white" | "sapphire" | "emerald" | "rose" | "obsidian">("white");
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [lightIntensity, setLightIntensity] = useState<number>(1.2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    // 3D Diamond Brilliant Cut Model
    // Top table, crown facets, girdle, pavilion facets, culet
    const rTable = 55;
    const yTable = -75;
    const rGirdle = 110;
    const yGirdle = -15;
    const yCulet = 95;

    interface Node3D {
      x: number;
      y: number;
      z: number;
    }

    // 8-fold symmetry brilliant cut
    const vertices: Node3D[] = [];
    // 0..7: Table
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      vertices.push({ x: Math.cos(angle) * rTable, y: yTable, z: Math.sin(angle) * rTable });
    }
    // 8..15: Girdle
    for (let i = 0; i < 8; i++) {
      const angle = ((i + 0.5) * Math.PI * 2) / 8;
      vertices.push({ x: Math.cos(angle) * rGirdle, y: yGirdle, z: Math.sin(angle) * rGirdle });
    }
    // 16: Culet (bottom point)
    vertices.push({ x: 0, y: yCulet, z: 0 });

    // Facet lines
    const edges: [number, number][] = [];
    // Table rim
    for (let i = 0; i < 8; i++) {
      edges.push([i, (i + 1) % 8]);
    }
    // Crown kite lines
    for (let i = 0; i < 8; i++) {
      edges.push([i, 8 + i]);
      edges.push([i, 8 + ((i + 7) % 8)]);
    }
    // Girdle rim
    for (let i = 0; i < 8; i++) {
      edges.push([8 + i, 8 + ((i + 1) % 8)]);
    }
    // Pavilion facets to culet
    for (let i = 0; i < 8; i++) {
      edges.push([8 + i, 16]);
    }

    let rotX = 0.3;
    let rotY = 0;
    let dragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.01;
      rotX += dy * 0.01;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      dragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Color theme definitions
    const colorStyles = {
      white: {
        glow: "rgba(147, 197, 253, 0.4)",
        edgeStart: "#ffffff",
        edgeMid: "#93c5fd",
        edgeEnd: "#c084fc",
        dot: "#ffffff",
        aura: "rgba(59, 130, 246, 0.15)",
      },
      sapphire: {
        glow: "rgba(59, 130, 246, 0.7)",
        edgeStart: "#60a5fa",
        edgeMid: "#3b82f6",
        edgeEnd: "#1d4ed8",
        dot: "#93c5fd",
        aura: "rgba(37, 99, 235, 0.25)",
      },
      emerald: {
        glow: "rgba(16, 185, 129, 0.6)",
        edgeStart: "#6ee7b7",
        edgeMid: "#10b981",
        edgeEnd: "#059669",
        dot: "#a7f3d0",
        aura: "rgba(16, 185, 129, 0.2)",
      },
      rose: {
        glow: "rgba(244, 114, 182, 0.6)",
        edgeStart: "#fbcfe8",
        edgeMid: "#f472b6",
        edgeEnd: "#db2777",
        dot: "#fdf2f8",
        aura: "rgba(236, 72, 153, 0.2)",
      },
      obsidian: {
        glow: "rgba(148, 163, 184, 0.3)",
        edgeStart: "#94a3b8",
        edgeMid: "#64748b",
        edgeEnd: "#334155",
        dot: "#cbd5e1",
        aura: "rgba(30, 41, 59, 0.3)",
      },
    };

    const render = () => {
      if (!dragging) {
        rotY += 0.008 * rotationSpeed;
      }

      ctx.clearRect(0, 0, width, height);
      const style = colorStyles[crystalColor];

      // Ambient Central Aura Glow
      const centerGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        180
      );
      centerGrad.addColorStop(0, style.aura);
      centerGrad.addColorStop(1, "rgba(3, 4, 7, 0)");
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // Project vertices to 2D
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const fov = 350;

      const projected = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.x * sinY + v.z * cosY;
        // Rotate X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 200);
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Render edges with crystalline prism refraction
      edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.95, (avgZ + 120) / 220)) * lightIntensity;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        const edgeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        edgeGrad.addColorStop(0, style.edgeStart);
        edgeGrad.addColorStop(0.5, style.edgeMid);
        edgeGrad.addColorStop(1, style.edgeEnd);

        ctx.strokeStyle = edgeGrad;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.lineWidth = 1.6 * lightIntensity;
        ctx.shadowColor = style.glow;
        ctx.shadowBlur = 15 * lightIntensity;
        ctx.stroke();
      });

      // Draw Diamond Facet Nodes
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 120) / 220) * lightIntensity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.scale * lightIntensity, 0, Math.PI * 2);
        ctx.fillStyle = style.dot;
        ctx.shadowColor = style.glow;
        ctx.shadowBlur = 18;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [crystalColor, rotationSpeed, lightIntensity]);

  return (
    <section className="py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="crystal-card rounded-3xl p-6 sm:p-10 border border-blue-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-blue-400/20 text-xs font-semibold text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Interaktywny Pokaz Refrakcji Diamentu 3D</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Dotknij i Obracaj: <span className="diamond-text-gradient">Krystaliczna Perfekcja</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Przytrzymaj lewy przycisk myszy i przeciągnij, aby obracać kryształ diamentu w przestrzeni 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Canvas Box (8 cols) */}
            <div
              className="lg:col-span-8 relative rounded-2xl bg-black/80 border border-white/10 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <canvas ref={canvasRef} className="w-full h-[420px] block" />

              {/* Floating Instruction overlay */}
              <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md flex items-center gap-2 pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "10s" }} />
                <span>Przeciągnij myszą, aby obracać model</span>
              </div>
            </div>

            {/* Customizer Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Diamond Color Choice */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Odcień Kryształu Diamentu:</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setCrystalColor("white")}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      crystalColor === "white"
                        ? "bg-blue-500/20 border-blue-400 text-white shadow-md"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    <span>Diament Klasyczny</span>
                  </button>

                  <button
                    onClick={() => setCrystalColor("sapphire")}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      crystalColor === "sapphire"
                        ? "bg-blue-500/20 border-blue-400 text-white shadow-md"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    <span>Szafir Królewski</span>
                  </button>

                  <button
                    onClick={() => setCrystalColor("emerald")}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      crystalColor === "emerald"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-md"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span>Szmaragd Leśny</span>
                  </button>

                  <button
                    onClick={() => setCrystalColor("rose")}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      crystalColor === "rose"
                        ? "bg-pink-500/20 border-pink-400 text-white shadow-md"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
                    <span>Różowy Diament</span>
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2 border-t border-white/10 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-blue-400" />
                      <span>Intensywność Refrakcji Światła:</span>
                    </span>
                    <span className="font-mono text-blue-400">{lightIntensity}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.6}
                    max={2}
                    step={0.1}
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                      <span>Prędkość Samoczynnej Rotacji:</span>
                    </span>
                    <span className="font-mono text-blue-400">{rotationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.2}
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
