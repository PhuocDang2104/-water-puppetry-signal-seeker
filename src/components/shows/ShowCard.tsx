"use client";

import { motion } from "framer-motion";
import { Armchair, Clock, Ticket, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import type { Show } from "@/types/booking";

const englishShows: Record<string, Pick<Show, "title" | "duration" | "cast" | "description">> = {
  "little-mermaid": {
    title: "Water Puppet Show: The Little Mermaid",
    duration: "60 minutes",
    cast: "Phuong Nam Theatre ensemble",
    description:
      "A colorful water puppet journey inspired by the ocean, nature and a little mermaid's dream. Music, lighting and charming puppets bring a vivid family-friendly stage experience."
  },
  "hoa-dat-viet": {
    title: "Water Puppet Show: Flowers of Vietnam",
    duration: "45 minutes",
    cast: "Phuong Nam Theatre ensemble",
    description:
      "Flowers of Vietnam gathers traditional water puppet acts with lively music and folk spirit, inviting audiences into a playful and poetic Vietnamese stage world."
  }
};

type ShowCardProps = {
  show: Show;
  index?: number;
};

export function ShowCard({ show, index = 0 }: ShowCardProps) {
  const { lang, dict } = useLanguage();
  const localized = lang === "en" ? { ...show, ...englishShows[show.id] } : show;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.58, delay: index * 0.08 }}
      className="grid gap-7 border-b border-deepGreen/18 pb-10 last:border-b-0 lg:grid-cols-[260px_1fr_190px] lg:items-center"
    >
      <Link
        href={`/booking/${show.id}`}
        className="focus-ring block overflow-hidden rounded-sm shadow-poster"
        aria-label={`${dict.shows.ariaBook} ${localized.title}`}
      >
        <Image
          src={show.image}
          alt={`Poster ${localized.title}`}
          width={440}
          height={560}
          className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105 sm:max-w-[280px] lg:max-w-none"
        />
      </Link>
      <div>
        <h2 className="heading-display max-w-4xl text-[clamp(2.2rem,5.2vw,4.6rem)] text-deepGreen">
          {localized.title}
        </h2>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold italic text-deepGreen">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" /> {dict.shows.duration}: {localized.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-gold" /> {dict.shows.cast}: {localized.cast}
          </span>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-deepGreen md:text-[15px]">
          {localized.description}
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
        <ActionLink href={`/booking/${show.id}`} icon="seat" label={dict.shows.seats} />
        <ActionLink href={`/booking/${show.id}`} icon="ticket" label={dict.shows.book} />
      </div>
    </motion.article>
  );
}

function ActionLink({ href, icon, label }: { href: string; icon: "seat" | "ticket"; label: string }) {
  const Icon = icon === "seat" ? Armchair : Ticket;
  return (
    <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className={cn(
          "focus-ring inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-deepGreen px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(13,90,73,0.24)] transition hover:bg-darkGreen sm:min-w-[170px]"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </motion.div>
  );
}
