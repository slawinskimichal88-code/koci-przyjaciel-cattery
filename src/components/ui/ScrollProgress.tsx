"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const barRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[3px] bg-[#C8973B] z-50 origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_#C8973B] pointer-events-none"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
