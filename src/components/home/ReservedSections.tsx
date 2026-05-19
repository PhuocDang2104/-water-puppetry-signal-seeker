"use client";

import { SectionHeader } from "@/components/common/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ServiceIntroSection() {
  const { dict } = useLanguage();

  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <SectionHeader marker="B" label={dict.section.intro} />
      <div className="mx-auto mt-10 min-h-[220px] max-w-6xl px-5 sm:min-h-[340px]">
        <div className="rounded-lg border border-dashed border-deepGreen/35 bg-paleMint/55 p-8 text-sm text-deepGreen">
          {dict.reserved.copy}
        </div>
      </div>
    </section>
  );
}

export function NewsTrainingAnchors() {
  return (
    <>
      <section id="news" className="sr-only" aria-label="Tin tức" />
      <section id="training" className="sr-only" aria-label="Đào tạo" />
    </>
  );
}
