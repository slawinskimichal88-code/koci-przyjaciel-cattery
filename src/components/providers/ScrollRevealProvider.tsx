"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // animacja tylko raz
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "80px 0px -10px 0px",
      }
    );

    // Obserwuj wszystkie elementy z klasą .reveal
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Opcjonalne jednorazowe sprawdzenie po załadowaniu dodatkowych komponentów
    const timer = setTimeout(() => {
      const laterElements = document.querySelectorAll(".reveal:not(.is-visible)");
      laterElements.forEach((el) => observer.observe(el));
    }, 1500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
