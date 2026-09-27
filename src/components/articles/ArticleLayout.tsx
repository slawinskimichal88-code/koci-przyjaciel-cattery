"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { REAL_MESSENGER_URL } from "@/data/realCatsData";
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronRight, Share2, Check } from "lucide-react";

// ── Article template layout ──────────────────────────────────────────────────
interface ArticleLayoutProps {
  slug: string;
  number: string;
  accentClass: string;
  accentGlow: string;
  readTime: string;
  seoTag: string;
  title: string;
  subtitle: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
  prevSlug?: string;
  prevTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
}

export function ArticleLayout({
  slug,
  number,
  accentClass,
  accentGlow,
  readTime,
  seoTag,
  title,
  subtitle,
  toc,
  children,
  prevSlug,
  prevTitle,
  nextSlug,
  nextTitle,
}: ArticleLayoutProps) {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [activeSection, setActiveSection] = useState(toc[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenReservation = () => {
    if (typeof window !== "undefined") window.open(REAL_MESSENGER_URL, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const top = el.getBoundingClientRect().top;
      const height = el.clientHeight;
      const viewH = window.innerHeight;
      const scrolled = Math.min(Math.max(-top / (height - viewH), 0), 1);
      setReadProgress(Math.round(scrolled * 100));

      // Active ToC section detection
      const sections = toc.map((t) => document.getElementById(t.id));
      let current = toc[0]?.id ?? "";
      for (const section of sections) {
        if (!section) continue;
        if (section.getBoundingClientRect().top < 140) current = section.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} onOpenReservation={handleOpenReservation} />

      <main className="pt-24 sm:pt-28">
        {/* ── Article Hero ─────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-mono text-white/30 mb-6">
            <Link href="/baza-wiedzy" className="hover:text-white/60 transition-colors">Baza Wiedzy</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/baza-wiedzy/artykuly" className="hover:text-white/60 transition-colors">Artykuły</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={accentClass}>{seoTag}</span>
          </nav>

          {/* Article Number */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`font-black text-5xl leading-none ${accentClass} opacity-40`}>{number}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <span className={`text-xs font-mono px-3 py-1 rounded-full border bg-white/5 ${accentClass} border-current/30`}>{seoTag}</span>
            <div className="flex items-center gap-1 text-xs font-mono text-white/30">
              <Clock className="w-3 h-3" />
              {readTime}
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-heading font-semibold text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            <span className={`${accentClass} drop-shadow-[0_2px_16px_rgba(255,255,255,0.08)]`}>{title}</span>
          </h1>

          <p className="text-[#86868b] text-base sm:text-lg leading-relaxed mb-8">{subtitle}</p>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/8">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Koci Przyjaciel *PL — Certyfikowana hodowla Maine Coon · Wrocław · FIFe / FPL</span>
            </div>
            <div className="ml-auto">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Share2 className="w-3 h-3 text-white/40" />}
                <span className={copied ? "text-green-400" : "text-white/40"}>
                  {copied ? "Skopiowano!" : "Udostępnij"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Content + Sidebar ────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <div className="flex gap-12 items-start">
            {/* Main Content */}
            <div className="flex-1 min-w-0" ref={contentRef}>
              {children}
            </div>

            {/* ToC Sidebar — desktop only */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-28">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Spis treści</p>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-xs py-1.5 px-2.5 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? `${accentClass} bg-white/8 font-medium`
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Progress */}
                <div className="mt-5 pt-4 border-t border-white/8">
                  <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1.5">
                    <span>Postęp</span>
                    <span>{readProgress}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${accentGlow}`}
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── CTA strip ────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-600/10 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-1">
              <p className="font-semibold text-white text-base mb-1">
                Zainteresowany kociętami Maine Coon z certyfikowanej hodowli?
              </p>
              <p className="text-sm text-white/50">Wrocław · FIFe/FPL · Badania serca + DNA · Socjalizacja z dziećmi</p>
            </div>
            <Link
              href="/dostepne-kociaki"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Zobacz aktualnie dostępne kocięta Maine Coon w naszej hodowli
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Article Nav ───────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-2 gap-4">
            {prevSlug ? (
              <Link
                href={`/baza-wiedzy/artykuly/${prevSlug}`}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-white/30 mb-0.5">Poprzedni artykuł</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors line-clamp-2">{prevTitle}</p>
                </div>
              </Link>
            ) : <div />}

            {nextSlug ? (
              <Link
                href={`/baza-wiedzy/artykuly/${nextSlug}`}
                className="flex items-center justify-end gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group text-right"
              >
                <div>
                  <p className="text-[10px] font-mono text-white/30 mb-0.5">Następny artykuł</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors line-clamp-2">{nextTitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors shrink-0" />
              </Link>
            ) : <div />}
          </div>

          {/* Back to hub */}
          <div className="text-center mt-8">
            <Link
              href="/baza-wiedzy/artykuly"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Wróć do wszystkich artykułów
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} setLang={setLang} />
    </div>
  );
}
