"use client";

import React from "react";

interface PawDividerProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function PawDivider({ variant = "dark", className = "" }: PawDividerProps) {
  const isLight = variant === "light";
  const lineColor = isLight ? "bg-[#E8E4DC]" : "bg-[#2A2A2A]";
  const pawColor = "#C8973B"; // Gold accent

  return (
    <div className={`w-full py-8 flex items-center justify-center gap-4 select-none pointer-events-none ${className}`}>
      <div className={`h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] ${lineColor}`} />
      
      <div className="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill={pawColor} className="opacity-80">
          <circle cx="6" cy="7" r="2.2" />
          <circle cx="11" cy="4.5" r="2.2" />
          <circle cx="16" cy="5.5" r="2.2" />
          <circle cx="20" cy="9.5" r="2.2" />
          <path d="M12 10.5 C8 10.5 6 13 6.5 16.5 C7 19.5 10 20.5 12 20.5 C14 20.5 17 19.5 17.5 16.5 C18 13 16 10.5 12 10.5 Z" />
        </svg>

        <div className={`w-1.5 h-1.5 rounded-full ${lineColor}`} />

        <svg width="22" height="22" viewBox="0 0 24 24" fill={pawColor} className="opacity-100 scale-110">
          <circle cx="6" cy="7" r="2.2" />
          <circle cx="11" cy="4.5" r="2.2" />
          <circle cx="16" cy="5.5" r="2.2" />
          <circle cx="20" cy="9.5" r="2.2" />
          <path d="M12 10.5 C8 10.5 6 13 6.5 16.5 C7 19.5 10 20.5 12 20.5 C14 20.5 17 19.5 17.5 16.5 C18 13 16 10.5 12 10.5 Z" />
        </svg>

        <div className={`w-1.5 h-1.5 rounded-full ${lineColor}`} />

        <svg width="18" height="18" viewBox="0 0 24 24" fill={pawColor} className="opacity-80">
          <circle cx="6" cy="7" r="2.2" />
          <circle cx="11" cy="4.5" r="2.2" />
          <circle cx="16" cy="5.5" r="2.2" />
          <circle cx="20" cy="9.5" r="2.2" />
          <path d="M12 10.5 C8 10.5 6 13 6.5 16.5 C7 19.5 10 20.5 12 20.5 C14 20.5 17 19.5 17.5 16.5 C18 13 16 10.5 12 10.5 Z" />
        </svg>
      </div>

      <div className={`h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] ${lineColor}`} />
    </div>
  );
}
