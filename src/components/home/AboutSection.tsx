"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DottedPath } from "@/components/common/DottedPath";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

const media = [
  { image: "/images/about/puppet-intro-1.jpg", reverse: false },
  { image: "/images/about/puppet-intro-2.jpg", reverse: true },
  { image: "/images/about/artisan-workshop.jpg", reverse: false }
];

export function AboutSection() {
  const { dict } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <SectionHeader marker="A" label={dict.section.about} />
      <DottedPath />
      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl gap-12 px-5">
        {dict.about.map((item, index) => {
          const asset = media[index];

          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
              className={cn(
                "grid items-stretch gap-6 lg:grid-cols-2",
                asset.reverse && "lg:[&_.about-image]:order-2"
              )}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 230, damping: 22 }}
                className="about-image min-h-[300px] overflow-hidden rounded-sm shadow-poster sm:min-h-[360px]"
              >
                <Image
                  src={asset.image}
                  alt={item.imageAlt}
                  width={720}
                  height={430}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 230, damping: 22 }}
                className="min-h-[300px] overflow-hidden rounded-lg border border-deepGreen/35 bg-[linear-gradient(135deg,#eef5f1_0%,#dce7e2_52%,#f8f4e8_100%)] p-6 shadow-soft sm:min-h-[360px] md:p-10"
              >
                <div className="flex h-full flex-col justify-center">
                  <h2 className="heading-display max-w-[660px] text-[clamp(2rem,4.4vw,4.4rem)] text-deepGreen">
                    {item.title}
                  </h2>
                  <p className="mt-6 max-w-[650px] text-sm leading-6 text-deepGreen md:text-base md:leading-7">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
