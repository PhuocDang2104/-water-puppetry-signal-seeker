"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ribbonItems = ["GIẢI HINT HAY", "NHẬN QUÀ NGAY", "GIẢI HINT HAY", "NHẬN QUÀ NGAY"];

export function ProjectIntroductionSection() {
  return (
    <section id="project" className="relative isolate overflow-hidden bg-white text-deepGreen">
      <div className="border-y border-deepGreen/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 overflow-hidden px-5 py-3 sm:gap-14">
          {ribbonItems.map((item, index) => (
            <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-7">
              <span className="font-heading text-base font-extrabold uppercase leading-none sm:text-xl">{item}</span>
              {index < ribbonItems.length - 1 && <Sparkle className="h-5 w-5 fill-deepGreen text-deepGreen" />}
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative z-30 mx-auto flex min-h-[560px] max-w-7xl flex-col items-center px-5 pb-36 pt-12 text-center sm:min-h-[610px] sm:pb-44 sm:pt-14"
      >
        <FloatingPuppet
          src="/images/element/puppet1.jpg"
          alt="Con rối nước nữ bên trái dự án Thủy Đình Kỳ Thú"
          width={220}
          height={229}
          className="left-[-70px] top-16 w-[112px] sm:left-[-88px] sm:top-20 sm:w-[150px] lg:left-[-116px] lg:w-[190px]"
          baseRotate={-13}
          direction={-1}
        />
        <FloatingPuppet
          src="/images/element/puppet2.jpg"
          alt="Con rối Chú Tễu bên phải dự án Thủy Đình Kỳ Thú"
          width={171}
          height={294}
          className="right-[-64px] top-16 w-[92px] sm:right-[-84px] sm:top-20 sm:w-[124px] lg:right-[-110px] lg:w-[155px]"
          baseRotate={12}
          direction={1}
        />

        <p className="font-heading text-2xl font-extrabold uppercase text-deepGreen sm:text-3xl">
          DỰ ÁN
        </p>
        <h2 className="heading-display mt-2 max-w-5xl text-5xl leading-[0.95] text-deepGreen sm:text-6xl lg:text-7xl">
          THỦY ĐÌNH KỲ THÚ
        </h2>
        <p className="mt-3 text-2xl font-medium leading-tight text-deepGreen sm:text-3xl">
          Mở hint thủy đình, góp tình cho Tễu
        </p>
        <div className="mt-5 h-px w-72 max-w-full bg-deepGreen/45" />
        <p className="mt-5 max-w-5xl text-sm font-medium leading-6 text-deepGreen sm:text-[15px] sm:leading-7">
          Trong khuôn khổ dự án “Thủy Đình Kỳ Thú”, vở diễn “Hoa Đất Việt” được cải tiến toàn diện với mô hình
          mỗi suất diễn một theme văn hóa 3 miền độc bản. Khán giả mua vé sẽ được trực tiếp giải mật thư săn
          hint để nhận Figure nhân vật độc bản, tham gia trò chơi dân gian và giao lưu cùng các nghệ nhân gạo
          cội. Đặc biệt, mỗi tấm vé sẽ tự động trích phần trăm vào Quỹ Chú Tễu để tiếp sức và hỗ trợ cho các
          nghệ sĩ địa phương hoàn cảnh khó khăn.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#services"
            className="focus-ring group inline-flex min-h-12 items-center gap-2 rounded-full bg-deepGreen px-7 py-3 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(13,90,73,0.24)] transition hover:-translate-y-0.5 hover:bg-darkGreen"
          >
            <span>Khám phá ngay</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <motion.a
            href="/donate"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="focus-ring group relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-full border border-gold/60 bg-gold px-7 py-3 text-sm font-extrabold text-deepGreen shadow-[0_16px_34px_rgba(215,168,63,0.28)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition duration-700 group-hover:translate-x-full" />
            <HeartHandshake className="relative h-5 w-5 transition group-hover:rotate-[-8deg] group-hover:scale-110" />
            <span className="relative">Gây quỹ</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-deepGreen text-white transition group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </motion.a>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 24, -16, 0], y: [0, -18, 4, 0], rotate: [-6, 6, -4, -6] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-[4%] z-10 w-36 mix-blend-multiply sm:bottom-10 sm:left-[10%] sm:w-52 lg:w-64"
      >
        <Image src="/images/hero/fish_project.png" alt="" width={1080} height={1080} className="h-auto w-full" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -28, 18, 0], y: [0, -20, 5, 0], rotate: [5, -7, 4, 5] }}
        transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
        className="absolute bottom-7 right-[4%] z-10 w-40 mix-blend-multiply sm:bottom-10 sm:right-[10%] sm:w-56 lg:w-72"
      >
        <Image src="/images/hero/fish_project.png" alt="" width={1080} height={1080} className="h-auto w-full" />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-28 overflow-hidden sm:h-36 md:h-44">
        <motion.div
          animate={{ x: ["-3%", "3%", "-3%"] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[8%] top-0 w-[116%]"
        >
          <Image
            src="/images/hero/wave_project.png"
            alt=""
            width={1920}
            height={1080}
            sizes="116vw"
            className="h-auto w-full -translate-y-[67%]"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingPuppet({
  src,
  alt,
  width,
  height,
  className,
  baseRotate,
  direction
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  baseRotate: number;
  direction: 1 | -1;
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -13, 0], rotate: [baseRotate, baseRotate + direction * 4, baseRotate] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full mix-blend-multiply" />
    </motion.div>
  );
}
