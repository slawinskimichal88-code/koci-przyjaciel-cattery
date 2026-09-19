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

    // Obserwuj zmiany w DOM (dla dynamicznie renderowanych elementów)
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(".reveal:not(.is-visible)");
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
