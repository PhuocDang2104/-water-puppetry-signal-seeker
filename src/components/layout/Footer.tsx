"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="bg-darkGreen px-5 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-heading text-3xl font-extrabold uppercase tracking-[0.01em]">{dict.footer.title}</p>
          <p className="mt-3 max-w-2xl text-sm text-paleMint">{dict.footer.copy}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" />
            {dict.footer.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" />
            0813.686.565 - 0928.055.992 - 0931.477.699
          </p>
          <Link href="/#shows" className="focus-ring inline-flex rounded-full bg-gold px-4 py-2 font-bold text-deepGreen">
            {dict.footer.cta}
          </Link>
        </div>
      </div>
    </footer>
  );
}
