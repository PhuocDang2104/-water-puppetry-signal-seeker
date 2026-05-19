"use client";

import { SectionHeader } from "@/components/common/SectionHeader";
import { ArchiveShowCarousel } from "@/components/shows/ArchiveShowCarousel";
import { ScheduleSection } from "@/components/shows/ScheduleSection";
import { ShowCard } from "@/components/shows/ShowCard";
import { shows } from "@/data/shows";
import { useLanguage } from "@/i18n/LanguageProvider";

type ShowListProps = {
  withHeader?: boolean;
  className?: string;
};

export function ShowList({ withHeader = true, className = "" }: ShowListProps) {
  const { dict } = useLanguage();

  return (
    <section id="shows" className={`bg-white pt-16 sm:pt-24 ${className}`}>
      {withHeader && <SectionHeader marker="C" label={dict.section.shows} />}
      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5">
        {shows.map((show, index) => (
          <ShowCard key={show.id} show={show} index={index} />
        ))}
      </div>
      <div className="mt-8">
        <ArchiveShowCarousel />
      </div>
      <ScheduleSection />
    </section>
  );
}
