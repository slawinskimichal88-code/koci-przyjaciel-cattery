"use client";

import React, { useState, useMemo } from "react";
import { FBPost } from "@/lib/facebook";
import PostCard from "@/components/facebook/PostCard";
import FollowerCounterBadge from "@/components/facebook/FollowerCounterBadge";
import {
  Calendar,
  Filter,
  Search,
  Sparkles,
  Inbox,
  ArrowUpDown,
} from "lucide-react";

interface UpdatesArchiveClientProps {
  posts: FBPost[];
  followersCount: number;
}

const MONTH_NAMES_PL = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export default function UpdatesArchiveClient({
  posts,
  followersCount,
}: UpdatesArchiveClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Wszystkie unikalne lata z postów
  const availableYears = useMemo(() => {
    const yearsSet = new Set<number>();
    posts.forEach((p) => {
      const year = new Date(p.createdTime).getFullYear();
      if (!isNaN(year)) yearsSet.add(year);
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [posts]);

  // Miesiące dostępne w danym wybranym roku (lub we wszystkich)
  const availableMonths = useMemo(() => {
    const monthCounts: Record<number, number> = {};

    posts.forEach((p) => {
      const date = new Date(p.createdTime);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-11

      if (selectedYear === "ALL" || year.toString() === selectedYear) {
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    });

    // Zwróć posortowane miesiące (malejąco od grudnia do stycznia)
    return Object.entries(monthCounts)
      .map(([mIndex, count]) => ({
        index: Number(mIndex),
        name: MONTH_NAMES_PL[Number(mIndex)],
        count,
      }))
      .sort((a, b) => b.index - a.index);
  }, [posts, selectedYear]);

  // Przefiltrowane posty
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const date = new Date(p.createdTime);
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();

      if (selectedYear !== "ALL" && year !== selectedYear) return false;
      if (selectedMonth !== "ALL" && month !== selectedMonth) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesMsg = p.message.toLowerCase().includes(query);
        return matchesMsg;
      }

      return true;
    });
  }, [posts, selectedYear, selectedMonth, searchQuery]);

  // Grupowanie postów według Miesiąca i Roku
  const groupedPosts = useMemo(() => {
    const groups: { key: string; label: string; posts: FBPost[] }[] = [];
    const groupMap = new Map<string, FBPost[]>();

    filteredPosts.forEach((post) => {
      const date = new Date(post.createdTime);
      const year = date.getFullYear();
      const monthName = MONTH_NAMES_PL[date.getMonth()];
      const key = `${year}-${String(date.getMonth()).padStart(2, "0")}`;
      const label = `${monthName} ${year}`;

      if (!groupMap.has(key)) {
        groupMap.set(key, []);
        groups.push({ key, label, posts: groupMap.get(key)! });
      }
      groupMap.get(key)!.push(post);
    });

    return groups;
  }, [filteredPosts]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-32">
      {/* Tło ambientowe */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(180,120,60,0.18),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Nagłówek strony */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="mb-4">
            <FollowerCounterBadge followersCount={followersCount} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-ui uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kronika Hodowli</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-light tracking-tight text-white mb-4">
            Aktualności i <span className="font-semibold italic text-amber-200">Życie Hodowli</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-body leading-relaxed">
            Archiwum naszych postów z Facebooka. Śledź na bieżąco rozwój kociąt,
            sukcesy na wystawach felinologicznych FIFe i codzienne chwile z naszymi kotami Maine Coon.
          </p>
        </div>

        {/* Pasek filtrów i wyszukiwarki */}
        <div className="p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-xl mb-12 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filtr Roku */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-ui font-semibold mr-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Rok:
              </span>
              <button
                onClick={() => {
                  setSelectedYear("ALL");
                  setSelectedMonth("ALL");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-ui transition-all ${
                  selectedYear === "ALL"
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                Wszystkie ({posts.length})
              </button>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year.toString());
                    setSelectedMonth("ALL");
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-ui transition-all ${
                    selectedYear === year.toString()
                      ? "bg-white text-black font-bold shadow-md"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Wyszukiwarka tekstowa */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Szukaj w postach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-ui"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Wyczyść
                </button>
              )}
            </div>
          </div>

          {/* Filtr Miesiąca (jeśli w danym roku są posty) */}
          {availableMonths.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-ui font-semibold mr-1 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> Miesiąc:
              </span>
              <button
                onClick={() => setSelectedMonth("ALL")}
                className={`px-3 py-1 rounded-full text-xs font-ui transition-all ${
                  selectedMonth === "ALL"
                    ? "bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold"
                    : "bg-white/[0.04] text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                }`}
              >
                Wszystkie miesiące
              </button>
              {availableMonths.map((m) => (
                <button
                  key={m.index}
                  onClick={() => setSelectedMonth(m.index.toString())}
                  className={`px-3 py-1 rounded-full text-xs font-ui transition-all ${
                    selectedMonth === m.index.toString()
                      ? "bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold"
                      : "bg-white/[0.04] text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                  }`}
                >
                  {m.name} <span className="opacity-60 text-[11px]">({m.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Wyniki postów zgrupowane według miesięcy */}
        {groupedPosts.length > 0 ? (
          <div className="space-y-16">
            {groupedPosts.map((group) => (
              <div key={group.key} className="space-y-6">
                {/* Nagłówek grupy daty */}
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-heading font-medium text-white tracking-tight">
                    {group.label}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  <span className="text-xs font-ui text-zinc-400">
                    {group.posts.length}{" "}
                    {group.posts.length === 1 ? "post" : "posty/wpisy"}
                  </span>
                </div>

                {/* Siatka postów w danym miesiącu */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-zinc-950/50 border border-white/5">
            <Inbox className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-white mb-2">
              Brak postów dla wybranych kryteriów
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Nie znaleziono wpisów spełniających wybrane filtry. Spróbuj zmienić rok, miesiąc lub frazę wyszukiwania.
            </p>
            <button
              onClick={() => {
                setSelectedYear("ALL");
                setSelectedMonth("ALL");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-white text-black font-ui text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all"
            >
              Resetuj wszystkie filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
