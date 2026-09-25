"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function SecurityProtection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showSecurityNotice = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Blokada menu kontekstowego (prawy przycisk myszy)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      e.preventDefault();
      showSecurityNotice("Materiały i fotografie są chronione prawem autorskim © Koci Przyjaciel *PL");
    };

    // 2. Blokada przeciągania elementów (Anti-drag)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Blokada kopiowania do schowka
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      e.preventDefault();
      showSecurityNotice("Kopiowanie treści z witryny zostało zablokowane.");
    };

    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      e.preventDefault();
    };

    // 4. Blokada skrótów klawiszowych (Inspekcja, Zapis, Druk, Źródło)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // F12 — Developer Tools
      if (e.key === "F12") {
        e.preventDefault();
        showSecurityNotice("Dostęp do narzędzi deweloperskich jest zablokowany.");
        return;
      }

      // Ctrl+Shift+I / J / C (DevTools Inspect)
      if (isCtrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        showSecurityNotice("Inspekcja kodu źródłowego jest zablokowana.");
        return;
      }

      // Ctrl+U (Wyświetl źródło strony)
      if (isCtrlOrCmd && key === "u") {
        e.preventDefault();
        showSecurityNotice("Pobieranie źródła strony jest zablokowane.");
        return;
      }

      // Ctrl+S (Zapisz stronę jako)
      if (isCtrlOrCmd && key === "s") {
        e.preventDefault();
        showSecurityNotice("Zapisywanie strony na dysku jest zablokowane.");
        return;
      }

      // Ctrl+P (Drukuj stronę do PDF)
      if (isCtrlOrCmd && key === "p") {
        e.preventDefault();
        showSecurityNotice("Drukowanie i eksport strony do PDF jest zablokowany.");
        return;
      }

      // Ctrl+A poza formularzami
      if (isCtrlOrCmd && key === "a") {
        const active = document.activeElement;
        if (!active || (active.tagName !== "INPUT" && active.tagName !== "TEXTAREA")) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-black/90 backdrop-blur-2xl border border-amber-500/40 text-white text-xs font-ui shadow-[0_15px_40px_rgba(0,0,0,0.85)] max-w-[90vw] text-center">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        <span className="font-light tracking-wide text-zinc-200">{toastMessage}</span>
      </div>
    </div>
  );
}
