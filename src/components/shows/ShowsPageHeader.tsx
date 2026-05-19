"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function ShowsPageHeader() {
  const { lang } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-5 pb-2 pt-28">
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-gold">
        {lang === "vi" ? "Sân khấu cuối tuần" : "Weekend stage"}
      </p>
      <h1 className="heading-display mt-3 max-w-4xl text-[clamp(3rem,8vw,7rem)] text-deepGreen">
        {lang === "vi" ? "Lịch vở diễn" : "Show schedule"}
      </h1>
    </section>
  );
}
