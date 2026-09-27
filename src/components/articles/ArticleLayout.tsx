"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown, ChevronRight, CheckCircle2, XCircle,
  AlertTriangle, ArrowRight, ArrowLeft, Clock,
  Share2, Check, BookOpen, HeartPulse, Dna,
  Activity, ShieldCheck, Stethoscope
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED ARTICLE LAYOUT — Apple dark with full-bleed hero image
// ═══════════════════════════════════════════════════════════════════════════

interface ArticleLayoutProps {
  number: string;
  accent: string;           // tailwind color e.g. "amber"
  accentHex: string;        // hex for glow
  readTime: string;
  tag: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  heroCaption: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
  prevSlug?: string;
  prevTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
}

export function ArticleLayout({
  number, accent, accentHex, readTime, tag, title, subtitle,
  heroImage, heroAlt, heroCaption, toc, children,
  prevSlug, prevTitle, nextSlug, nextTitle
}: ArticleLayoutProps) {
  const [activeSection, setActiveSection] = useState(toc[0]?.id ?? "");
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const accentColors: Record<string, string> = {
    violet: "text-violet-300", amber: "text-amber-300", rose: "text-rose-300",
    green: "text-green-300", sky: "text-sky-300"
  };
  const accentBgs: Record<string, string> = {
    violet: "bg-violet-500/20 border-violet-500/30", amber: "bg-amber-500/20 border-amber-500/30",
    rose: "bg-rose-500/20 border-rose-500/30", green: "bg-green-500/20 border-green-500/30",
    sky: "bg-sky-500/20 border-sky-500/30"
  };
  const accentGradients: Record<string, string> = {
    violet: "from-violet-500 to-purple-400", amber: "from-amber-500 to-orange-400",
    rose: "from-rose-500 to-red-400", green: "from-green-500 to-emerald-400",
    sky: "from-sky-500 to-blue-400"
  };

  const textAccent = accentColors[accent] ?? "text-amber-300";
  const bgAccent = accentBgs[accent] ?? "bg-amber-500/20 border-amber-500/30";
  const gradientAccent = accentGradients[accent] ?? "from-amber-500 to-orange-400";

  useEffect(() => {
    const onScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const top = el.getBoundingClientRect().top;
      const height = el.clientHeight;
      const viewH = window.innerHeight;
      const prog = Math.min(Math.max(-top / (height - viewH), 0), 1);
      setReadProgress(Math.round(prog * 100));

      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < 140) setActiveSection(t.id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      {/* ── Sticky read progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-white/10">
        <div
          className={`h-full bg-gradient-to-r ${gradientAccent} transition-all duration-300`}
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* ── HERO — Full-bleed image with overlay ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 55vw, 680px)" }}>
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${accentHex}22, transparent 70%)` }}
        />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 sm:left-10 flex items-center gap-1.5 text-xs font-mono text-white/40">
          <Link href="/baza-wiedzy" className="hover:text-white/70 transition-colors">Baza Wiedzy</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/baza-wiedzy/artykuly" className="hover:text-white/70 transition-colors">Artykuły</Link>
          <ChevronRight className="w-3 h-3" />
          <span className={textAccent}>{tag}</span>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`font-black text-4xl sm:text-5xl opacity-25 text-white leading-none`}>{number}</span>
              <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${bgAccent} ${textAccent}`}>{tag}</span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                <Clock className="w-3 h-3" />{readTime}
              </span>
            </div>
            <h1
              className="font-heading font-semibold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              {title}
            </h1>
            <p className="text-[#86868b] text-sm sm:text-base leading-relaxed max-w-2xl">{subtitle}</p>
          </div>

          {/* Caption pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/60">
            <BookOpen className="w-3 h-3" />
            {heroCaption}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="flex gap-14 items-start">
          {/* Article body */}
          <div className="flex-1 min-w-0" ref={contentRef}>
            {children}
          </div>

          {/* Sticky ToC sidebar */}
          <aside className="hidden xl:block w-52 shrink-0 sticky top-8">
            <div className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Spis treści</p>
              <nav className="space-y-0.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-[11px] py-1.5 px-2.5 rounded-lg transition-all duration-200 leading-tight ${
                      activeSection === item.id
                        ? `${textAccent} bg-white/8 font-semibold`
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1.5">
                  <span>Postęp</span><span>{readProgress}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${gradientAccent} transition-all duration-500`} style={{ width: `${readProgress}%` }} />
                </div>
              </div>
              <button onClick={handleCopy} className="mt-3 w-full flex items-center justify-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Share2 className="w-3 h-3 text-white/40" />}
                <span className={copied ? "text-green-400" : "text-white/40"}>{copied ? "Skopiowano!" : "Udostępnij"}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ── CTA Strip ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className={`p-6 sm:p-8 rounded-3xl border bg-gradient-to-r ${
          accent === "violet" ? "from-violet-600/15 border-violet-500/20" :
          accent === "rose" ? "from-rose-600/15 border-rose-500/20" :
          accent === "green" ? "from-green-600/15 border-green-500/20" :
          accent === "sky" ? "from-sky-600/15 border-sky-500/20" :
          "from-amber-600/15 border-amber-500/20"
        } to-transparent flex flex-col sm:flex-row items-center gap-5`}>
          <div className="flex-1">
            <p className="font-semibold text-white text-base mb-1">Szukasz kociaka Maine Coon z certyfikowanej hodowli?</p>
            <p className="text-sm text-[#86868b]">Wrocław · FIFe/FPL · Echo Doppler HCM · Laboklin N/N · Socjalizacja w rodzinie</p>
          </div>
          <Link
            href="/dostepne-kociaki"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 hover:scale-105"
          >
            Zobacz aktualnie dostępne kocięta Maine Coon w naszej hodowli
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Prev / Next nav ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
        <div className="grid grid-cols-2 gap-4">
          {prevSlug ? (
            <Link href={`/baza-wiedzy/artykuly/${prevSlug}`} className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-[#161617] hover:border-white/20 hover:bg-white/[0.04] transition-all group">
              <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0" />
              <div>
                <p className="text-[10px] font-mono text-white/30 mb-0.5">Poprzedni</p>
                <p className="text-sm text-white/70 group-hover:text-white line-clamp-2">{prevTitle}</p>
              </div>
            </Link>
          ) : <div />}
          {nextSlug ? (
            <Link href={`/baza-wiedzy/artykuly/${nextSlug}`} className="flex items-center justify-end gap-3 p-4 rounded-2xl border border-white/10 bg-[#161617] hover:border-white/20 hover:bg-white/[0.04] transition-all group text-right">
              <div>
                <p className="text-[10px] font-mono text-white/30 mb-0.5">Następny</p>
                <p className="text-sm text-white/70 group-hover:text-white line-clamp-2">{nextTitle}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0" />
            </Link>
          ) : <div />}
        </div>
        <div className="text-center mt-6">
          <Link href="/baza-wiedzy/artykuly" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />Wróć do wszystkich artykułów
          </Link>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER — matches site style
// ═══════════════════════════════════════════════════════════════════════════

export function SectionHeading({ accent, children }: { accent: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    violet: "bg-violet-500", amber: "bg-amber-500", rose: "bg-rose-500",
    green: "bg-green-500", sky: "bg-sky-500"
  };
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <div className={`w-1 h-6 rounded-full ${colors[accent] ?? "bg-amber-500"}`} />
      <h2 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] leading-snug">{children}</h2>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD — big number Apple style
// ═══════════════════════════════════════════════════════════════════════════

export function StatCard({ value, unit, label, desc }: { value: string; unit: string; label: string; desc: string }) {
  return (
    <div className="p-7 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-heading font-light text-[#f5f5f7] leading-none" style={{ fontSize: "clamp(2.8rem, 4.5vw, 4rem)" }}>{value}</span>
        <span className="text-lg font-body text-amber-300 font-semibold">{unit}</span>
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#86868b] font-medium mb-1.5">{label}</p>
        <p className="text-sm font-body text-[#86868b] leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO SIDE CARD — image + content side by side
// ═══════════════════════════════════════════════════════════════════════════

export function PhotoCard({
  image, alt, side = "left", children
}: { image: string; alt: string; side?: "left" | "right"; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col ${side === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-stretch`}>
      <div className="md:w-[45%] relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ minHeight: 280 }}>
        <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="md:w-[55%] flex flex-col justify-center">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE ACCORDION
// ═══════════════════════════════════════════════════════════════════════════

export function AccordionItem({
  title, icon, accentClass, children
}: { title: string; icon: string; accentClass: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open ? "border-white/20" : "border-white/[0.08]"} bg-[#161617]`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className={`font-semibold text-sm ${open ? accentClass : "text-white/80"} transition-colors`}>{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/[0.08]">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HEALTH TEST TABS — article 3
// ═══════════════════════════════════════════════════════════════════════════

const HEALTH_TESTS = [
  {
    code: "HCM", icon: HeartPulse, emoji: "❤️", color: "text-rose-300", bg: "bg-rose-500/20 border-rose-500/30",
    fullName: "Kardiomiopatia przerostowa",
    stats: [{ l: "Częstość w rasie", v: "~26%" }, { l: "Wiek objawów", v: "2–6 lat" }, { l: "Nasza hodowla", v: "CLEAR" }],
    what: "Choroba serca — patologiczne pogrubienie ściany lewej komory. Może prowadzić do nagłej śmierci lub zastoinowej niewydolności serca.",
    test: "Echo Doppler — badanie echokardiograficzne przez kardiologa weterynaryjnego. Powtarzane co 12–18 miesięcy. Certyfikat ważny rok.",
    result: "Wyniki naszych kotów: CLEAR (serce bez zmian). Certyfikaty dostępne do wglądu na życzenie.",
  },
  {
    code: "SMA", icon: Dna, emoji: "🧬", color: "text-amber-300", bg: "bg-amber-500/20 border-amber-500/30",
    fullName: "Rdzeniowy zanik mięśni",
    stats: [{ l: "Typ dziedziczenia", v: "Autosomalne" }, { l: "Test DNA w", v: "Laboklin" }, { l: "Nasza hodowla", v: "N/N" }],
    what: "Choroba nerwowo-mięśniowa — postępujące osłabienie i zanik mięśni. Koty SMA/SMA mają znacznie obniżoną jakość życia.",
    test: "Test DNA — mutacja genu LIX1. Wynik N/N = wolny od mutacji. Wykonywany raz w życiu kota w akredytowanym laboratorium.",
    result: "Wszystkie koty hodowlane: N/N — wolne od mutacji SMA. Laboklin, Niemcy.",
  },
  {
    code: "PKD", icon: Activity, emoji: "🫁", color: "text-violet-300", bg: "bg-violet-500/20 border-violet-500/30",
    fullName: "Wielotorbielowatość nerek",
    stats: [{ l: "Diagnoza", v: "DNA + USG" }, { l: "Mutacja genu", v: "PKD1" }, { l: "Nasza hodowla", v: "N/N" }],
    what: "Choroba prowadząca do tworzenia torbieli w nerkach — stopniowe niszczenie funkcji nerek. Postępuje przez całe życie kota.",
    test: "Test DNA (mutacja PKD1) + badanie USG nerek. Wynik N/N = clear. Nosiciel: PKD/N — nie powinien być kojarzony z innym nosicielem.",
    result: "Nasze koty: N/N — brak mutacji PKD. Badania USG nerek: bez zmian torbielowatych.",
  },
];

export function HealthTestsInteractive() {
  const [active, setActive] = useState(0);
  const test = HEALTH_TESTS[active];
  const Icon = test.icon;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {HEALTH_TESTS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
              active === i ? "bg-white text-black border-white" : `${t.bg} ${t.color} hover:bg-white/10`
            }`}
          >
            <span>{t.emoji}</span> {t.code}
          </button>
        ))}
      </div>

      <div className={`p-6 rounded-2xl border ${test.bg} space-y-5 transition-all duration-300`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${test.bg}`}>
            <Icon className={`w-6 h-6 ${test.color}`} />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${test.color}`}>{test.code}</h3>
            <p className="text-white/50 text-sm">{test.fullName}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {test.stats.map((s, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-white/40 mb-1 font-mono">{s.l}</p>
              <p className="text-sm font-bold text-white">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {[{ label: "Czym jest?", text: test.what }, { label: "Jak testujemy?", text: test.test }, { label: "Nasze wyniki", text: test.result }].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl ${i === 2 ? "bg-green-500/10 border border-green-500/25" : "bg-white/[0.04] border border-white/10"}`}>
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${i === 2 ? "text-green-400" : "text-white/40"}`}>{item.label}</p>
              <p className="text-white/75 leading-relaxed text-xs">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECKLIST ROW
// ═══════════════════════════════════════════════════════════════════════════

export function CheckRow({ children, variant = "ok" }: { children: React.ReactNode; variant?: "ok" | "warn" | "bad" }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[0.06] last:border-0">
      {variant === "ok" && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />}
      {variant === "warn" && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
      {variant === "bad" && <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
      <span className="text-sm text-white/75 leading-relaxed">{children}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOCIALIZATION TIMELINE
// ═══════════════════════════════════════════════════════════════════════════

export function SocializationTimeline() {
  const [active, setActive] = useState(0);

  const stages = [
    { age: "2–4 tyg.", icon: "👁️", color: "bg-violet-500", title: "Faza imprinting", desc: "Kocięta otwierają oczy i uszy. Pierwsze kontakty z głosem i zapachem ludzi. Mama jest modelem zachowania." },
    { age: "4–6 tyg.", icon: "🤝", color: "bg-blue-500", title: "Pierwszy dotyk", desc: "Oswajanie z ludzkim dotykiem — każdego dnia. Kocięta uczą się, że ręce = bezpieczeństwo." },
    { age: "6–8 tyg.", icon: "👶", color: "bg-amber-500", title: "Kontakt z dziećmi", desc: "Dzieci nadzorowane uczą się obchodzenia z kociakiem. Kociak uczy się przewidywać zachowania dzieci." },
    { age: "8–10 tyg.", icon: "🐕", color: "bg-green-500", title: "Kontakt z psem", desc: "Stopniowe oswajanie przez siatkę, wymiana zapachów. Bez stresu, bez forsowania kontaktu." },
    { age: "12 tyg.", icon: "🏡", color: "bg-rose-500", title: "Gotowy do adopcji", desc: "Socjalnie dojrzały kociak z pełną dokumentacją jest gotowy na swój nowy, wymarzony dom." },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {stages.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              active === i ? "bg-white text-black border-white" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{s.icon}</span>{s.age}
          </button>
        ))}
      </div>
      <div className={`flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-[#161617] transition-all duration-300`}>
        <div className={`w-10 h-10 rounded-2xl ${stages[active].color} flex items-center justify-center text-xl shrink-0`}>
          {stages[active].icon}
        </div>
        <div>
          <p className="font-semibold text-white mb-1">{stages[active].title}</p>
          <p className="text-xs text-white/50 font-mono mb-2">{stages[active].age}</p>
          <p className="text-sm text-white/75 leading-relaxed">{stages[active].desc}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRAIT BAR CHART
// ═══════════════════════════════════════════════════════════════════════════

export function TraitBars() {
  const traits = [
    { label: "Przywiązanie do rodziny", mc: 5, dog: 5 },
    { label: "Przyjazność wobec dzieci", mc: 5, dog: 4 },
    { label: "Tolerancja na hałas", mc: 4, dog: 4 },
    { label: "Akceptacja psów", mc: 4, dog: 3 },
    { label: "Aktywność i zabawa", mc: 5, dog: 5 },
    { label: "Samodzielność", mc: 3, dog: 2 },
  ];

  return (
    <div className="space-y-5">
      {traits.map((t, i) => (
        <div key={i}>
          <p className="text-sm text-white/70 mb-2">{t.label}</p>
          <div className="flex gap-3 items-center">
            <span className="text-[10px] font-mono w-7 text-white/30">MC</span>
            <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700" style={{ width: `${(t.mc / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-mono w-4 text-amber-300">{t.mc}</span>
          </div>
          <div className="flex gap-3 items-center mt-1.5">
            <span className="text-[10px] font-mono w-7 text-white/30">🐕</span>
            <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-700" style={{ width: `${(t.dog / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-mono w-4 text-blue-300">{t.dog}</span>
          </div>
        </div>
      ))}
      <div className="flex gap-5 text-xs text-white/40 mt-2">
        <span className="flex items-center gap-1.5"><span className="w-4 h-2 rounded-sm bg-amber-400 inline-block" />Maine Coon</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-2 rounded-sm bg-blue-400 inline-block" />Pies</span>
        <span className="ml-auto">Skala 1–5</span>
      </div>
    </div>
  );
}
