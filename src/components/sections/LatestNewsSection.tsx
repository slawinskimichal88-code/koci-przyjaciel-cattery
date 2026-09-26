"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FBPost, MOCK_POSTS } from "@/lib/facebook";
import PostCard from "@/components/facebook/PostCard";
import FollowerCounterBadge from "@/components/facebook/FollowerCounterBadge";
import { ArrowRight, Sparkles } from "lucide-react";

interface LatestNewsSectionProps {
  lang: "PL" | "EN";
  initialPosts?: FBPost[];
  initialFollowersCount?: number;
}

export default function LatestNewsSection({
  lang,
  initialPosts = MOCK_POSTS.slice(0, 3),
  initialFollowersCount = 26400,
}: LatestNewsSectionProps) {
  const [posts, setPosts] = useState<FBPost[]>(initialPosts);
  const [followersCount, setFollowersCount] = useState<number>(initialFollowersCount);

  useEffect(() => {
    // Dynamiczne pobieranie świeżych danych z API w tle
    fetch("/api/facebook")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.posts && Array.isArray(data.posts)) {
          setPosts(data.posts.slice(0, 3));
          if (data.followersCount) {
            setFollowersCount(data.followersCount);
          }
        }
      })
      .catch((err) => {
        console.warn("Użyto danych testowych dla sekcji newsów:", err);
      });
  }, []);

  return (
    <section
      id="co-u-nas-slychac"
      className="relative py-16 sm:py-20 bg-black text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Subtelne tło dekoracyjne */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,80,40,0.15),rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Nagłówek sekcji */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="mb-4">
            <FollowerCounterBadge followersCount={followersCount} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-[#86868b] text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
            <span className="text-[#f5f5f7]">{lang === "PL" ? "Z życia hodowli" : "Cattery Live Feed"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-[#f5f5f7] max-w-2xl leading-tight">
            {lang === "PL" ? (
              <>
                Co u nas <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">słychać?</span>
              </>
            ) : (
              <>
                What's <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">New?</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#86868b] max-w-xl font-body leading-relaxed font-light">
            {lang === "PL"
              ? "Świeże wieści prosto z naszego domu i wybiegu. Codzienne relacje z rozwoju maluchów, wystawy oraz życie dorosłych kotów."
              : "Fresh news directly from our home and catio. Daily updates on kitten growth, cat shows, and our Maine Coons' life."}
          </p>
        </div>

        {/* Siatka 3 kolumn postów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Dolny przycisk CTA prowadzący do pełnego archiwum */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/aktualizacje"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-ui text-[13px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-all shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>
              {lang === "PL"
                ? "Zobacz wszystkie aktualizacje"
                : "View all updates"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
