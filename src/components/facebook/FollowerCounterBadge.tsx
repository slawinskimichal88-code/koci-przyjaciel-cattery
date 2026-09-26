import React from "react";
import { FacebookIcon } from "@/components/ui/SocialIcons";

interface FollowerCounterBadgeProps {
  followersCount: number;
  className?: string;
}

export default function FollowerCounterBadge({
  followersCount,
  className = "",
}: FollowerCounterBadgeProps) {
  const formattedCount = (followersCount || 26400).toLocaleString("pl-PL");

  return (
    <div
      className={`inline-flex items-center gap-2 text-zinc-400 font-ui text-xs sm:text-sm ${className}`}
    >
      <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2] fill-current" />
      <span>
        Obserwuje nas{" "}
        <strong className="text-white font-medium">{formattedCount}</strong> osób
      </span>
    </div>
  );
}
