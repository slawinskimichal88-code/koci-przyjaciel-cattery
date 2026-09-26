"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import UpdatesArchiveClient from "@/components/facebook/UpdatesArchiveClient";
import { FBPost } from "@/lib/facebook";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface UpdatesPageContentProps {
  posts: FBPost[];
  followersCount: number;
}

export default function UpdatesPageContent({
  posts,
  followersCount,
}: UpdatesPageContentProps) {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => {
    if (typeof window !== "undefined") {
      window.open(REAL_FACEBOOK_URL, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={handleOpenReservation}
      />

      <main>
        <UpdatesArchiveClient
          posts={posts}
          followersCount={followersCount}
        />
      </main>

      <Footer lang={lang} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        lang={lang}
      />
    </div>
  );
}
