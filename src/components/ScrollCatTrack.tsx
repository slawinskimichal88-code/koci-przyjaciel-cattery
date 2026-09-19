"use client";

import React, { useEffect, useState } from "react";

export default function ScrollCatTrack() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pawActive, setPawActive] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);
      setIsScrolling(true);
      setPawActive(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setPawActive(false);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Starts comfortably lower (36% from top) so it is immediately at eye-level on page load, traveling down to 88%
  const topPercent = 32 + scrollProgress * 56;

  return (
    <div className="fixed right-3 sm:right-8 top-0 bottom-0 w-20 sm:w-28 z-40 pointer-events-none select-none flex flex-col items-center justify-between">
      <style>{`
        @keyframes mcTailSwish {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-14deg) translate(3px, -4px);
          }
        }
        @keyframes mcPawBat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          30% {
            transform: translate(2px, -8px) rotate(-10deg);
          }
          60% {
            transform: translate(4px, -14px) rotate(-18deg);
          }
          85% {
            transform: translate(1px, -4px) rotate(-4deg);
          }
        }
        @keyframes mcBreathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03, 1.02);
          }
        }
        @keyframes mcEarFlick {
          0%, 80%, 100% {
            transform: rotate(0deg);
          }
          85% {
            transform: rotate(-5deg);
          }
          92% {
            transform: rotate(4deg);
          }
        }
        @keyframes mcYarnBob {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) rotate(180deg);
          }
        }
        @keyframes mcBlink {
          0%, 92%, 98%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          95% {
            opacity: 0.1;
            transform: scaleY(0.1);
          }
        }
      `}</style>

      {/* Vertical Hairline Guide Track with Paws */}
      <div className="absolute top-20 bottom-20 left-1/2 -translate-x-1/2 w-[2.5px] border-l-2 border-dashed border-[#2A221F]/30">
        <div className="absolute top-[20%] -left-2 text-[10px] opacity-40">🐾</div>
        <div className="absolute top-[45%] -left-2 text-[10px] opacity-40">🐾</div>
        <div className="absolute top-[70%] -left-2 text-[10px] opacity-40">🐾</div>
        <div className="absolute top-[90%] -left-2 text-[10px] opacity-40">🐾</div>
      </div>

      {/* Top Spool Anchor */}
      <div className="mt-16 text-center">
        <div className="w-7 h-7 rounded-full bg-[#FFE5D9] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] flex items-center justify-center">
          <span className="text-xs">🧶</span>
        </div>
      </div>

      {/* The Adorable Cartoon Maine Coon Cat Traveling Down With Scroll */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-150 ease-out flex flex-col items-center"
        style={{
          top: `${topPercent}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Suspended Ball of Yarn (Continuously Bobbing & Spinning, Reacts to Paw) */}
        <div
          className="relative mb-2 flex flex-col items-center"
          style={{
            animation: isScrolling
              ? "mcYarnBob 0.6s ease-in-out infinite"
              : "mcYarnBob 2.8s ease-in-out infinite",
          }}
        >
          {/* Thread holding yarn */}
          <div className="w-[1.5px] h-3.5 bg-[#2A221F] -mt-2 mb-0.5" />
          {/* Yarn Ball with internal weave */}
          <div className="w-5 h-5 rounded-full bg-[#FDA4AF] border-2 border-[#2A221F] relative shadow-[2px_2px_0px_#2A221F]">
            <div className="absolute inset-0.5 border-t-1.5 border-[#2A221F] rounded-full" />
            <div className="absolute inset-1 border-r-1.5 border-[#2A221F] rounded-full opacity-70" />
          </div>
        </div>

        {/* The Authentic Maine Coon Cat Cartoon Illustration */}
        <div
          className={`transition-transform duration-300 ease-out ${
            isScrolling ? "scale-108 -translate-y-1" : "scale-100"
          }`}
          style={{
            animation: "mcBreathe 3.6s ease-in-out infinite",
            transformOrigin: "50% 90%",
          }}
        >
          <svg
            width="96"
            height="116"
            viewBox="0 0 100 120"
            fill="none"
            stroke="#2A221F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-md"
          >
            {/* 1. GIANT BUSHY PLUME TAIL */}
            <g
              style={{
                transformOrigin: "72px 98px",
                animation: isScrolling
                  ? "mcTailSwish 0.9s ease-in-out infinite"
                  : "mcTailSwish 3.2s ease-in-out infinite",
              }}
            >
              {/* Outer feather plume curve with warm ginger fill */}
              <path
                d="M72 98 C88 94, 98 81, 95 56 C92 40, 77 42, 81 60 C85 74, 78 88, 67 96 Z"
                fill="#FED7AA"
                strokeWidth="2.4"
              />
              {/* Tail fluff stripes */}
              <path d="M84 55 C88 52, 92 50, 95 48" strokeWidth="1.8" />
              <path d="M80 68 C85 65, 90 63, 94 62" strokeWidth="1.8" />
              <path d="M74 82 C78 79, 84 78, 88 77" strokeWidth="1.8" />
            </g>

            {/* 2. SOLID BODY HAUNCHES */}
            <g>
              {/* Body contour */}
              <path
                d="M28 78 C20 89, 21 104, 33 110 L67 110 C79 104, 80 89, 72 78 Z"
                fill="#FFEDD5"
                strokeWidth="2.4"
              />
              {/* Flank shadow */}
              <path d="M30 110 L70 110" strokeWidth="2.0" strokeDasharray="3 3" opacity="0.4" />
            </g>

            {/* 3. BROAD CHEST & LION RUFF / MANE */}
            <g>
              <path
                d="M32 57 C24 65, 25 75, 32 82 C38 90, 62 90, 68 82 C76 75, 75 65, 68 57 Z"
                fill="#FFF7ED"
                strokeWidth="2.2"
              />
              {/* Bib fur strands */}
              <path d="M42 66 L38 75 M50 67 L50 81 M58 66 L62 75" strokeWidth="1.6" />
            </g>

            {/* 4. LEFT FORELEG */}
            <g>
              <path
                d="M37 84 L37 108 C37 112, 46 112, 46 108 L46 87 Z"
                fill="#FFF7ED"
                strokeWidth="2.2"
              />
              <path d="M40 107 L40 111 M43 107 L43 111" strokeWidth="1.6" />
            </g>

            {/* 5. RIGHT FORELEG & PLAYFUL BATTING PAW */}
            <g
              style={{
                transformOrigin: "53px 85px",
                animation: isScrolling || pawActive
                  ? "mcPawBat 0.9s ease-in-out infinite"
                  : "mcPawBat 2.8s ease-in-out infinite",
              }}
            >
              <path
                d="M53 84 L54 104 C55 108, 64 108, 64 104 L62 82 Z"
                fill="#FFF7ED"
                strokeWidth="2.2"
              />
              <path d="M57 103 L57 107 M60 103 L60 107" strokeWidth="1.6" />
              {/* Playful batting spark */}
              <circle cx="68" cy="98" r="2" fill="#F43F5E" stroke="#2A221F" strokeWidth="1" />
            </g>

            {/* 6. MAINE COON HEAD */}
            <g
              style={{
                transformOrigin: "50px 45px",
                animation: "mcEarFlick 4.2s ease-in-out infinite",
              }}
            >
              {/* Left ear */}
              <path d="M34 32 L24 10 L42 24 Z" fill="#FED7AA" strokeWidth="2.2" />
              <path d="M32 27 L26 13 L39 23 Z" fill="#FDA4AF" stroke="none" />
              {/* Lynx tips */}
              <path d="M24 10 L19 2 M24 10 L23 1 M24 10 L27 2" strokeWidth="2.0" />

              {/* Right ear */}
              <path d="M58 24 L76 10 L66 32 Z" fill="#FED7AA" strokeWidth="2.2" />
              <path d="M61 23 L74 13 L68 27 Z" fill="#FDA4AF" stroke="none" />
              {/* Lynx tips */}
              <path d="M76 10 L81 2 M76 10 L77 1 M76 10 L73 2" strokeWidth="2.0" />

              {/* Head base */}
              <path
                d="M34 32 C28 38, 29 48, 35 55 C40 61, 60 61, 65 55 C71 48, 72 38, 66 32 C62 25, 38 25, 34 32 Z"
                fill="#FED7AA"
                strokeWidth="2.2"
              />

              {/* Cheeks blush */}
              <circle cx="34" cy="46" r="3.5" fill="#FDA4AF" opacity="0.6" stroke="none" />
              <circle cx="66" cy="46" r="3.5" fill="#FDA4AF" opacity="0.6" stroke="none" />

              {/* Square muzzle & chin */}
              <path
                d="M40 50 C44 54, 56 54, 60 50 C58 56, 42 56, 40 50 Z"
                fill="#FFF7ED"
                strokeWidth="1.8"
              />

              {/* Sweet cartoon eyes */}
              <g
                style={{
                  transformOrigin: "50px 39px",
                  animation: "mcBlink 3.8s ease-in-out infinite",
                }}
              >
                {/* Left eye */}
                <circle cx="41" cy="39" r="4.5" fill="#2A221F" stroke="none" />
                <circle cx="42.5" cy="37.5" r="1.6" fill="#FFFFFF" stroke="none" />
                {/* Right eye */}
                <circle cx="59" cy="39" r="4.5" fill="#2A221F" stroke="none" />
                <circle cx="60.5" cy="37.5" r="1.6" fill="#FFFFFF" stroke="none" />
              </g>

              {/* Nose button */}
              <polygon points="48,44 52,44 50,47" fill="#F43F5E" stroke="#2A221F" strokeWidth="1" />
              <path d="M50 47 L50 50" strokeWidth="1.5" />

              {/* Whiskers */}
              <path d="M34 49 C22 47, 12 50, 4 52" strokeWidth="1.4" />
              <path d="M34 52 C21 54, 12 59, 6 64" strokeWidth="1.4" />
              <path d="M66 49 C78 47, 88 50, 96 52" strokeWidth="1.4" />
              <path d="M66 52 C79 54, 88 59, 94 64" strokeWidth="1.4" />
            </g>
          </svg>
        </div>

        {/* Real-Time Metric Badge in Cute Cartoon Style */}
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FFE5D9] border-1.5 border-[#2A221F] font-mono text-[10px] font-black text-[#2A221F] tracking-wider shadow-[2px_2px_0px_#2A221F]">
          🐾 {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      {/* Bottom Anchor */}
      <div className="mb-16 text-center">
        <div className="w-6 h-6 rounded-full bg-[#E2F4E7] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] flex items-center justify-center">
          <span className="text-[10px]">🏠</span>
        </div>
      </div>
    </div>
  );
}
