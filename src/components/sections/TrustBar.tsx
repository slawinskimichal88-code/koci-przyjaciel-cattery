"use client";

import React from "react";
import CustomIcon from "@/components/ui/CustomIcon";
import { FacebookIcon } from "@/components/ui/SocialIcons";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface TrustBarProps {
  lang?: "PL" | "EN";
}

export default function TrustBar({ lang = "PL" }: TrustBarProps) {
  const metrics = [
    {
      value: "26 000+",
      label: lang === "PL" ? "Fanów na Facebooku" : "Facebook Community",
      sub: lang === "PL" ? "Aktywna społeczność opiekunów" : "Active owner community",
      icon: <FacebookIcon className="w-5 h-5 text-[#1877F2]" />,
      link: REAL_FACEBOOK_URL,
    },
    {
      value: "15+ lat",
      label: lang === "PL" ? "Pasji i doświadczenia" : "Years of experience",
      sub: lang === "PL" ? "Ciągła hodowla FIFe / FPL" : "Continuous FIFe / FPL breeding",
      icon: <CustomIcon name="zegar-godziny" className="w-5 h-5 text-amber-400" />,
    },
    {
      value: "100+",
      label: lang === "PL" ? "Szczęśliwych rodzin" : "Happy families",
      sub: lang === "PL" ? "Wychowane z dziećmi i psem" : "Raised with kids and dog",
      icon: <CustomIcon name="rodzina-dzieci" className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "100%",
      label: lang === "PL" ? "Czystych badań DNA & Echo" : "Clean DNA & Echo",
      sub: lang === "PL" ? "Kardiologiczne echo Doppler N/N" : "Cardiological Doppler N/N",
      icon: <CustomIcon name="tarcza-zdrowie" className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <section className="relative z-20 bg-white text-zinc-900 border-y border-zinc-200 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((item, idx) => {
            const content = (
              <div
                key={idx}
                className="flex items-start gap-3.5 sm:gap-4 p-2 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center shrink-0 shadow-xs">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-heading font-medium text-zinc-950 tracking-tight leading-none mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-body text-zinc-800 font-medium leading-snug">
                    {item.label}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 leading-tight mt-0.5 hidden sm:block">
                    {item.sub}
                  </div>
                </div>
              </div>
            );

            if (item.link) {
              return (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                  title="Zobacz nasz profil na Facebooku"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
