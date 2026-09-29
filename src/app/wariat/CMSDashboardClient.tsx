"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KittenSpec } from "@/data/availableKittensData";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Home,
  Crown,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

interface CMSDashboardClientProps {
  initialKittens: KittenSpec[];
  currentLogin: string;
}

export default function CMSDashboardClient({ initialKittens, currentLogin: initialLogin }: CMSDashboardClientProps) {
  const router = useRouter();
  const [kittens, setKittens] = useState<KittenSpec[]>(initialKittens);
  const [currentLogin, setCurrentLogin] = useState(initialLogin);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal dodawania / edycji kota
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKittenId, setEditingKittenId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Modal zmiany hasła i loginu
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newLoginInput, setNewLoginInput] = useState(currentLogin);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [isSavingCreds, setIsSavingCreds] = useState(false);

  // Stan formularza kota: zwarty i czytelny
  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as "male" | "female",
    litter: 'Miot "R" (2026)',
    coatColor: "Czarny srebrzysty klasycznie pręgowany",
    emsCode: "MCO ns 22",
    eyeColor: "Głęboki bursztyn (Amber Gold)",
    availableFrom: "Gotowy do odbioru od zaraz",
    destiny: "kolanka" as "kolanka" | "hodowla" | "kolanka_lub_hodowla",
    status: "available" as "available" | "reserved",
    personality: "",
    images: [] as { src: string; caption: string; badge?: string }[],
  });

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const hasAnyAvailable = kittens.some((k) => k.status === "available");
  const availableCount = kittens.filter((k) => k.status === "available").length;

  // Przełącznik dostępności jednym kliknięciem: Dostępny / Niedostępny
  const toggleKittenStatus = async (kitten: KittenSpec) => {
    const newStatus = kitten.status === "available" ? "reserved" : "available";
    setIsUpdating(true);

    try {
      const res = await fetch("/api/cms/kittens", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: kitten.id, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setKittens(data.kittens);
        showNotification(
          "success",
          newStatus === "available"
            ? `Kot ${kitten.name} WIDOCZNY na stronie! Baner jest aktywny.`
            : `Kot ${kitten.name} UKRYTY ze strony (niedostępny).`
        );
      } else {
        showNotification("error", data.error || "Błąd aktualizacji statusu");
      }
    } catch {
      showNotification("error", "Błąd połączenia z serwerem");
    } finally {
      setIsUpdating(false);
    }
  };

  // Usuwanie kota
  const handleDeleteKitten = async (kitten: KittenSpec) => {
    if (!confirm(`Czy na pewno chcesz usunąć kota: "${kitten.name}"?`)) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/cms/kittens?id=${kitten.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setKittens(data.kittens);
        showNotification("success", `Usunięto kota: ${kitten.name}`);
      } else {
        showNotification("error", data.error || "Błąd usuwania kota");
      }
    } catch {
      showNotification("error", "Błąd połączenia z serwerem");
    } finally {
      setIsUpdating(false);
    }
  };

  // Otwarcie modala dodawania nowego kota
  const handleOpenAddModal = () => {
    setEditingKittenId(null);
    setFormData({
      name: "",
      gender: "male",
      litter: 'Miot "R" (2026)',
      coatColor: "Czarny klasycznie pręgowany",
      emsCode: "MCO n 22",
      eyeColor: "Głęboki bursztyn (Amber Gold)",
      availableFrom: "Gotowy do odbioru od zaraz",
      destiny: "kolanka",
      status: "available",
      personality: "Bardzo proludzki, uwielbia głaskanie, kontaktowy i pieszczoch.",
      images: [],
    });
    setIsModalOpen(true);
  };

  // Otwarcie modala edycji
  const handleOpenEditModal = (kitten: KittenSpec) => {
    setEditingKittenId(kitten.id);
    setFormData({
      name: kitten.name,
      gender: kitten.gender,
      litter: kitten.litter || "",
      coatColor: kitten.coatColor || "",
      emsCode: kitten.emsCode || "",
      eyeColor: kitten.eyeColor || "Głęboki bursztyn",
      availableFrom: kitten.availableFrom || "",
      destiny: kitten.destiny || "kolanka",
      status: (kitten.status === "available" ? "available" : "reserved"),
      personality: kitten.personality || kitten.description || "",
      images: kitten.images || [],
    });
    setIsModalOpen(true);
  };

  // Upload zdjęcia
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              src: data.url,
              caption: `${formData.name || "Kotek"} - zdjęcie`,
              badge: prev.images.length === 0 ? "Główne" : "Zdjęcie",
            },
          ],
        }));
        showNotification("success", "Zdjęcie zostało pomyślnie dodane!");
      } else {
        showNotification("error", data.error || "Błąd podczas wgrywania pliku");
      }
    } catch {
      showNotification("error", "Błąd połączenia z serwerem podczas uploadu");
    } finally {
      setUploadingImage(false);
    }
  };

  // Usunięcie zdjęcia z formularza
  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Zapis kota (Nowy lub Edycja)
  const handleSaveKitten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Podaj imię kota!");
      return;
    }

    setIsUpdating(true);

    const kittenId =
      editingKittenId ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`;

    const imagesToSave =
      formData.images.length > 0
        ? formData.images
        : [
            {
              src: "/images/cats/cat_07.webp",
              caption: `${formData.name} - portret`,
              badge: "Główne",
            },
          ];

    const payload: KittenSpec = {
      id: kittenId,
      name: formData.name,
      gender: formData.gender,
      litter: formData.litter,
      coatColor: formData.coatColor,
      emsCode: formData.emsCode,
      eyeColor: formData.eyeColor || "Głęboki bursztyn (Amber Gold)",
      birthDate: "",
      availableFrom: formData.availableFrom,
      destiny: formData.destiny,
      status: formData.status,
      badge: formData.status === "available" ? "Dostępny do rezerwacji" : "Zarezerwowany",
      personality: formData.personality,
      description: formData.personality,
      steps: [],
      images: imagesToSave,
    };

    try {
      const res = await fetch("/api/cms/kittens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setKittens(data.kittens);
        setIsModalOpen(false);
        showNotification(
          "success",
          editingKittenId ? "Zaktualizowano dane kota!" : "Nowy kot został dodany!"
        );
      } else {
        showNotification("error", data.error || "Błąd zapisu kota");
      }
    } catch {
      showNotification("error", "Błąd połączenia z serwerem");
    } finally {
      setIsUpdating(false);
    }
  };

  // Zmiana loginu i hasła
  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoginInput || !newPasswordInput) {
      alert("Wypełnij nowy login i nowe hasło!");
      return;
    }

    setIsSavingCreds(true);
    try {
      const res = await fetch("/api/cms/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newLogin: newLoginInput,
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentLogin(data.newLogin);
        setIsPasswordModalOpen(false);
        setNewPasswordInput("");
        showNotification("success", "Dane logowania zostały zmienione pomyślnie!");
      } else {
        showNotification("error", data.error || "Błąd zmiany danych logowania");
      }
    } catch {
      showNotification("error", "Błąd połączenia z serwerem");
    } finally {
      setIsSavingCreds(false);
    }
  };

  // Wylogowanie
  const handleLogout = async () => {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/wariat/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] pb-24 selection:bg-amber-500 selection:text-black">
      
      {/* Toast powiadomienia */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-sm transition-all duration-300 animate-slide-up ${
            notification.type === "success"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
              : "bg-red-500/20 border-red-500/40 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Górny pasek nawigacyjny CMS */}
      <header className="sticky top-0 z-30 bg-[#161617]/95 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
              KP
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Panel Adopcji Kotów
              </h1>
              <span className="text-[11px] font-mono text-neutral-400">
                Zalogowany: <strong className="text-amber-300 font-semibold">{currentLogin}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setNewLoginInput(currentLogin);
                setNewPasswordInput("");
                setIsPasswordModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Zmień login i hasło"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Zmień hasło</span>
            </button>

            <Link
              href="/dostepne-kociaki"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <span>Podgląd strony</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Wyloguj</span>
            </button>
          </div>
        </div>
      </header>

      {/* Główna treść */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* KARTA STANU BANERA I STRONY GŁÓWNEJ */}
        <section className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
          hasAnyAvailable
            ? "bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
            : "bg-[#161617]/70 border-white/10"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-3 w-3 shrink-0">
                  {hasAnyAvailable ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-600" />
                  )}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Stan baneru na stronie głównej i w podstronach
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {hasAnyAvailable ? (
                  <span className="text-amber-300">
                    🟢 BANER WŁĄCZONY — Na stronie widoczne: {availableCount} {availableCount === 1 ? "kotek" : "kociąt"}
                  </span>
                ) : (
                  <span className="text-neutral-400">
                    ⚪ BANER WYGASZONY — Żaden kot nie jest wystawiony na stronie
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                1 kliknięcie: Kliknij <strong>„Dostępny”</strong>, aby kot pojawił się na stronie i włączył baner. Kliknij <strong>„Niedostępny”</strong>, a natychmiast zniknie.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Dodaj nowego kota</span>
            </button>
          </div>
        </section>

        {/* LISTA KOTÓW */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">
              Koty w systemie ({kittens.length})
            </h3>
            <span className="text-xs text-neutral-400">
              Zielony = Widoczny na stronie · Szary = Ukryty
            </span>
          </div>

          {kittens.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#161617]/40 border border-white/10 text-neutral-400">
              <p className="text-base">Brak kotów w bazie.</p>
              <button
                onClick={handleOpenAddModal}
                className="mt-4 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
              >
                + Dodaj pierwszego kota
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {kittens.map((kitten) => {
                const isAvailable = kitten.status === "available";
                const mainImg = kitten.images?.[0]?.src || "/images/cats/cat_07.webp";

                return (
                  <div
                    key={kitten.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isAvailable
                        ? "bg-[#18181b]/95 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                        : "bg-[#141416]/70 border-white/10 opacity-75"
                    }`}
                  >
                    {/* Lewa część: Miniatura + Podstawowe dane */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-neutral-900 border border-white/15 shrink-0">
                        <Image
                          src={mainImg}
                          alt={kitten.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {kitten.name}
                          </h4>
                          
                          {/* Płeć */}
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            kitten.gender === "male"
                              ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                              : "bg-pink-500/10 border-pink-500/30 text-pink-300"
                          }`}>
                            {kitten.gender === "male" ? "Kocurek ♂" : "Kotka ♀"}
                          </span>

                          {/* Opcja kolanka vs hodowla */}
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            kitten.destiny === "kolanka"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                              : kitten.destiny === "hodowla"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : "bg-purple-500/10 border-purple-500/30 text-purple-300"
                          }`}>
                            {kitten.destiny === "kolanka"
                              ? "🏠 Na kolanka"
                              : kitten.destiny === "hodowla"
                              ? "👑 Do hodowli"
                              : "✨ Kolanka lub hodowla"}
                          </span>

                          {/* Miot */}
                          {kitten.litter && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                              {kitten.litter}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-400">
                          <strong className="text-neutral-300">{kitten.emsCode}</strong> · {kitten.coatColor}
                        </p>

                        <p className="text-xs text-neutral-500 line-clamp-1 max-w-xl">
                          {kitten.personality || kitten.description}
                        </p>
                      </div>
                    </div>

                    {/* Prawa część: Przełącznik statusu + Przyciski akcji */}
                    <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                      
                      {/* Przełącznik dostępny / niedostępny */}
                      <button
                        onClick={() => toggleKittenStatus(kitten)}
                        disabled={isUpdating}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isAvailable
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                            : "bg-neutral-800/90 border-neutral-700 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                        }`}
                        title="Kliknij, aby zmienić dostępność kota na stronie"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isAvailable ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
                        }`} />
                        <span>{isAvailable ? "🟢 DOSTĘPNY (Widoczny)" : "⚪ Niedostępny (Ukryty)"}</span>
                      </button>

                      {/* Akcje: Edycja / Usuwanie */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(kitten)}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edytuj dane"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteKitten(kitten)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Usuń kota"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* MODAL DODAWANIA / EDYCJI KOTA - WYGODNY I DOPASOWANY (BEZ PRZYSŁANIANIA PRZEZ HEADER) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#161617] border border-white/15 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] my-auto">
            
            {/* Nagłówek modala - stały na górze */}
            <div className="sticky top-0 z-10 bg-[#161617] px-6 py-4 border-b border-white/10 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>{editingKittenId ? "Edycja kota" : "Dodaj nowego kota"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Treść z przewijaniem wewnątrz okna */}
            <form onSubmit={handleSaveKitten} className="p-6 space-y-4 text-sm overflow-y-auto flex-grow">
              
              {/* Imię i płeć */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Imię kota *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="np. Ramzes Koci Przyjaciel *PL"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Płeć *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "male" })}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                        formData.gender === "male"
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                          : "bg-black border-white/15 text-neutral-400"
                      }`}
                    >
                      Kocurek ♂
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "female" })}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                        formData.gender === "female"
                          ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                          : "bg-black border-white/15 text-neutral-400"
                      }`}
                    >
                      Kotka ♀
                    </button>
                  </div>
                </div>
              </div>

              {/* Przeznaczenie: Na kolanka vs Do hodowli */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Opcja adopcyjna *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, destiny: "kolanka" })}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                      formData.destiny === "kolanka"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-black border-white/15 text-neutral-400"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Na kolanka</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, destiny: "hodowla" })}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                      formData.destiny === "hodowla"
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                        : "bg-black border-white/15 text-neutral-400"
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Do hodowli</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, destiny: "kolanka_lub_hodowla" })}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                      formData.destiny === "kolanka_lub_hodowla"
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                        : "bg-black border-white/15 text-neutral-400"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Obie opcje</span>
                  </button>
                </div>
              </div>

              {/* Status dostępności */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Dostępność na stronie *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "available" })}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.status === "available"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        : "bg-black border-white/15 text-neutral-400"
                    }`}
                  >
                    ● DOSTĘPNY (Widoczny + Baner)
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "reserved" })}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.status === "reserved"
                        ? "bg-neutral-600/30 border-neutral-400 text-white"
                        : "bg-black border-white/15 text-neutral-400"
                    }`}
                  >
                    ○ NIEDOSTĘPNY (Ukryty)
                  </button>
                </div>
              </div>

              {/* Zdjęcia (Upload & Podgląd) */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Zdjęcia kota
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/20 group">
                      <Image src={img.src} alt="Zdjęcie" fill className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-red-400 hover:text-white hover:bg-red-500 transition-colors"
                        title="Usuń zdjęcie"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="absolute bottom-1 left-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
                        {idx === 0 ? "Główne" : `#${idx + 1}`}
                      </span>
                    </div>
                  ))}

                  <label className="relative aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-amber-400/60 bg-black/40 hover:bg-black/80 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    <Upload className="w-4 h-4 text-neutral-400" />
                    <span className="text-[10px] text-neutral-400 text-center px-1">
                      {uploadingImage ? "Wgrywanie..." : "+ Dodaj zdjęcie"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Miot i kod EMS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Miot
                  </label>
                  <input
                    type="text"
                    value={formData.litter}
                    onChange={(e) => setFormData({ ...formData, litter: e.target.value })}
                    placeholder='np. Miot "R" (2026)'
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Kod EMS (np. MCO ns 22)
                  </label>
                  <input
                    type="text"
                    value={formData.emsCode}
                    onChange={(e) => setFormData({ ...formData, emsCode: e.target.value })}
                    placeholder="np. MCO ns 22"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Umaszczenie i Kolor oczu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Kolor futra (opisowy)
                  </label>
                  <input
                    type="text"
                    value={formData.coatColor}
                    onChange={(e) => setFormData({ ...formData, coatColor: e.target.value })}
                    placeholder="np. Czarny srebrzysty klasycznie pręgowany"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Kolor oczu
                  </label>
                  <input
                    type="text"
                    value={formData.eyeColor}
                    onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })}
                    placeholder="np. Głęboki bursztyn (Amber Gold)"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Gotowość do odbioru */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Gotowość do odbioru
                </label>
                <input
                  type="text"
                  value={formData.availableFrom}
                  onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                  placeholder="np. Gotowy do odbioru od zaraz"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Krótki opis charakteru */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Krótki opis charakteru
                </label>
                <textarea
                  rows={2}
                  value={formData.personality}
                  onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                  placeholder="np. Absolutny pieszczoch, uwielbia spać na kolanach i głośno mruczy..."
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Przyciski modala - stałe na dole */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  {isUpdating ? "Zapisywanie..." : editingKittenId ? "Zapisz zmiany" : "Opublikuj kota"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL ZMIANY HASŁA I LOGINU */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#161617] border border-white/15 rounded-2xl p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Zmień login i hasło</span>
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Nowy Login *
                </label>
                <input
                  type="text"
                  required
                  value={newLoginInput}
                  onChange={(e) => setNewLoginInput(e.target.value)}
                  placeholder="np. murzynek"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Nowe Hasło *
                </label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Wpisz nowe hasło (min. 6 znaków)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isSavingCreds}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  {isSavingCreds ? "Zapisywanie..." : "Zapisz nowe dane"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
