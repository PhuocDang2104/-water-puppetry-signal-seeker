"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageProvider";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  const { dict } = useLanguage();

  const meta = [
    { icon: MapPin, label: dict.hero.locationLabel, value: dict.hero.location },
    { icon: Clock, label: dict.hero.timeLabel, value: dict.hero.time },
    { icon: Phone, label: dict.hero.phoneLabel, value: "0813.686.565 - 0928.055.992 - 0931.477.699" }
  ];

  return (
    <section id="home" className="relative h-[100svh] max-h-[100svh] overflow-hidden bg-darkGreen text-white">
      <Navbar variant="hero" />
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.25, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/hero-water-puppet.png"
          alt="Sân khấu múa rối nước với con rối đứng trên mặt nước"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="water-mask absolute inset-x-0 bottom-0 h-28 opacity-75 mix-blend-screen sm:h-36" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pb-12 pt-24 sm:pb-14 sm:pt-28"
      >
        <div className="max-w-5xl">
          <motion.p
            variants={fadeUp}
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-paleMint sm:text-sm"
          >
            {dict.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="heading-display text-[clamp(2.25rem,5.2vw,4.85rem)] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)]"
          >
            {dict.hero.title1}
            <span className="block whitespace-nowrap">{dict.hero.title2}</span>
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-5 grid max-w-2xl gap-2 text-xs sm:text-sm md:text-[15px]">
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p>
                    <span className="font-bold">{item.label}: </span>
                    <span className="text-paleMint">{item.value}</span>
                  </p>
                </div>
              );
            })}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-7">
            <Link
              href="/#shows"
              className="focus-ring group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white px-6 py-3 text-sm font-extrabold text-deepGreen shadow-[0_16px_40px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_52px_rgba(0,0,0,0.32)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition duration-700 group-hover:translate-x-full" />
              <Search className="relative h-4 w-4 text-gold" />
              <span className="relative">{dict.hero.cta}</span>
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-deepGreen text-white transition group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
