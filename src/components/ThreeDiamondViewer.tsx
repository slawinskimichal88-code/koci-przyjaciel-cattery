"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Layers, Sliders, Gem } from "lucide-react";

interface ThreeDiamondViewerProps {
  lang: "PL" | "EN" | "DE";
}

export default function ThreeDiamondViewer({ lang }: ThreeDiamondViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gemColor, setGemColor] = useState<"white" | "sapphire" | "emerald" | "pink" | "carbonado">("white");
  const [dispersion, setDispersion] = useState<number>(2.417);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const diamondMeshRef = useRef<THREE.Mesh | null>(null);
  const diamondEdgesRef = useRef<THREE.LineSegments | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 480;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 4.0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    container.replaceChildren(renderer.domElement);

    // 4. Studio Lighting Rig for Diamond Brilliance
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 2.5);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    const pointLight1 = new THREE.PointLight(0xffffff, 180, 20);
    pointLight1.position.set(0, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xc084fc, 120, 20);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // 5. Geometry: Brilliant Cut 57-facet Diamond
    const rTable = 0.65;
    const yTable = 0.55;
    const rGirdle = 1.25;
    const yGirdle = 0.05;
    const yCulet = -1.1;

    const vertices: number[] = [];
    const indices: number[] = [];

    const tableCenter = [0, yTable, 0];
    const tablePoints: number[][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      tablePoints.push([Math.cos(angle) * rTable, yTable, Math.sin(angle) * rTable]);
    }

    const girdlePoints: number[][] = [];
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      girdlePoints.push([Math.cos(angle) * rGirdle, yGirdle, Math.sin(angle) * rGirdle]);
    }

    const culetPoint = [0, yCulet, 0];

    const addTri = (p1: number[], p2: number[], p3: number[]) => {
      const idx = vertices.length / 3;
      vertices.push(...p1, ...p2, ...p3);
      indices.push(idx, idx + 1, idx + 2);
    };

    // Table facets
    for (let i = 0; i < 8; i++) {
      addTri(tableCenter, tablePoints[i], tablePoints[(i + 1) % 8]);
    }

    // Crown facets
    for (let i = 0; i < 8; i++) {
      const t1 = tablePoints[i];
      const t2 = tablePoints[(i + 1) % 8];
      const g1 = girdlePoints[i * 2];
      const g2 = girdlePoints[i * 2 + 1];
      const g3 = girdlePoints[(i * 2 + 2) % 16];

      addTri(t1, g1, g2);
      addTri(t1, g2, t2);
      addTri(t2, g2, g3);
    }

    // Pavilion facets
    for (let i = 0; i < 16; i++) {
      const g1 = girdlePoints[i];
      const g2 = girdlePoints[(i + 1) % 16];
      addTri(g1, culetPoint, g2);
    }

    const diamondGeometry = new THREE.BufferGeometry();
    diamondGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    diamondGeometry.setIndex(indices);
    diamondGeometry.computeVertexNormals();

    // 6. Material with Physical Diamond parameters
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.01,
      transmission: 0.88,
      ior: 2.417,
      thickness: 2.0,
      specularIntensity: 2.5,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      transparent: true,
      opacity: 0.96,
    });
    materialRef.current = diamondMaterial;

    const diamondMesh = new THREE.Mesh(diamondGeometry, diamondMaterial);
    scene.add(diamondMesh);
    diamondMeshRef.current = diamondMesh;

    // 7. Glowing Crystalline Facet Edges
    const edgesGeometry = new THREE.EdgesGeometry(diamondGeometry, 15);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xa5f3fc,
      transparent: true,
      opacity: 0.55,
      linewidth: 1.5,
    });
    edgeMatRef.current = edgeMaterial;

    const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
    diamondMesh.add(edges);
    diamondEdgesRef.current = edges;

    // 8. Orbiting Stardust Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xdbeafe,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !diamondMeshRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      diamondMeshRef.current.rotation.y += deltaX * 0.009;
      diamondMeshRef.current.rotation.x += deltaY * 0.009;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    dom.addEventListener("touchstart", onPointerDown);
    window.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);

    // 10. Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging && diamondMeshRef.current) {
        diamondMeshRef.current.rotation.y += 0.008;
        diamondMeshRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.05;
      }

      pointLight1.position.x = Math.cos(elapsedTime * 1.2) * 4;
      pointLight1.position.z = Math.sin(elapsedTime * 1.2) * 4;

      pointLight2.position.x = Math.sin(elapsedTime * 0.8) * 3.5;
      pointLight2.position.y = Math.cos(elapsedTime * 0.8) * 3.5;

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      renderer.dispose();
    };
  }, [autoRotate]);

  useEffect(() => {
    if (!materialRef.current) return;
    const mat = materialRef.current;
    mat.ior = dispersion;

    if (edgeMatRef.current) {
      switch (gemColor) {
        case "white":
          edgeMatRef.current.color.setHex(0xa5f3fc);
          mat.color.setHex(0xffffff);
          mat.specularColor.setHex(0xffffff);
          break;
        case "sapphire":
          edgeMatRef.current.color.setHex(0x60a5fa);
          mat.color.setHex(0x1d4ed8);
          mat.specularColor.setHex(0x93c5fd);
          break;
        case "emerald":
          edgeMatRef.current.color.setHex(0x34d399);
          mat.color.setHex(0x047857);
          mat.specularColor.setHex(0xa7f3d0);
          break;
        case "pink":
          edgeMatRef.current.color.setHex(0xf472b6);
          mat.color.setHex(0xbe185d);
          mat.specularColor.setHex(0xfbcfe8);
          break;
        case "carbonado":
          edgeMatRef.current.color.setHex(0x94a3b8);
          mat.color.setHex(0x0f172a);
          mat.specularColor.setHex(0xffffff);
          break;
      }
    }
  }, [gemColor, dispersion]);

  return (
    <section id="crystal-engine" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="luxury-glass-panel rounded-3xl p-6 sm:p-12 border border-white/15">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-400/30 text-xs font-bold text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Gem className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span className="uppercase tracking-widest">Fotorealistyczny Silnik WebGL 3D</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif-luxury tracking-tight">
              Diamentowa Korona: <span className="text-liquid-diamond">Czystość & Refrakcja</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Trójwymiarowy model szlifu brylantowego z fizycznym współczynnikiem załamania światła (IOR 2.42). 
              <strong> Chwyć myszką lub dotknij</strong>, aby obracać diament 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 relative rounded-2xl bg-black/95 border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing">
              <div ref={containerRef} className="w-full h-[480px]" />

              <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-slate-300 flex items-center gap-2 pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Przeciągnij kursorem, aby swobodnie obracać diament 3D</span>
              </div>

              <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>60 FPS • WebGL 2.0</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Wybierz Kamień Szlachetny:</span>
                </label>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {[
                    { id: "white", name: "Biały Diament (Brilliant)", color: "#ffffff", ior: 2.417 },
                    { id: "sapphire", name: "Królewski Błękitny Szafir", color: "#3b82f6", ior: 1.77 },
                    { id: "emerald", name: "Szmaragd Kolumbijski", color: "#10b981", ior: 1.58 },
                    { id: "pink", name: "Różowy Diament Argyle", color: "#f472b6", ior: 2.42 },
                    { id: "carbonado", name: "Czarny Karbonado (Obsydian)", color: "#475569", ior: 2.45 },
                  ].map((gem) => (
                    <button
                      key={gem.id}
                      onClick={() => {
                        setGemColor(gem.id as any);
                        setDispersion(gem.ior);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        gemColor === gem.id
                          ? "bg-blue-600/30 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                          : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-md"
                          style={{ backgroundColor: gem.color }}
                        />
                        <span className="font-semibold">{gem.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">IOR {gem.ior}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-blue-400" />
                      <span>Fizyczny Współczynnik Załamania (IOR):</span>
                    </span>
                    <span className="font-mono text-blue-400 font-bold">{dispersion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={1.4}
                    max={2.8}
                    step={0.05}
                    value={dispersion}
                    onChange={(e) => setDispersion(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <span className="text-slate-300 font-semibold">Automatyczna rotacja 3D:</span>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      autoRotate
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {autoRotate ? "WŁĄCZONA" : "WYŁĄCZONA"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
