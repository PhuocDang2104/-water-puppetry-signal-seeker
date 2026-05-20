"use client";

import { motion } from "framer-motion";
import { Armchair, ArrowRight, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/DraggableCard";

const cards = [
  {
    src: "/images/hoadatviet/hdv3.jpg",
    alt: "Sân khấu Hoa Đất Việt với rối nước và cờ hội",
    className:
      "z-10 left-1/2 top-[13%] -ml-[96px] h-[220px] w-[162px] rotate-[-8deg] sm:-ml-[128px] sm:h-[288px] sm:w-[216px] lg:-ml-[136px] lg:h-[315px] lg:w-[235px]"
  },
  {
    src: "/images/hoadatviet/hdv1.jpg",
    alt: "Các nhân vật rối nước trong vở Hoa Đất Việt",
    className:
      "z-30 left-1/2 top-[15%] -ml-[42px] h-[182px] w-[148px] rotate-[5deg] sm:-ml-[56px] sm:h-[235px] sm:w-[192px] lg:-ml-[60px] lg:h-[258px] lg:w-[205px]"
  },
  {
    src: "/images/hoadatviet/hdv2.jpg",
    alt: "Rối nước cưỡi linh vật trên mặt nước",
    className:
      "z-20 left-1/2 top-[23%] -ml-[70px] h-[190px] w-[142px] rotate-[9deg] sm:-ml-[88px] sm:h-[252px] sm:w-[184px] lg:-ml-[92px] lg:h-[268px] lg:w-[195px]"
  },
  {
    src: "/images/hoadatviet/hdv4.jpg",
    alt: "Đoàn rối nước biểu diễn trong khói sân khấu",
    className:
      "z-40 left-1/2 top-[39%] -ml-[118px] h-[128px] w-[228px] rotate-[-3deg] sm:-ml-[154px] sm:h-[162px] sm:w-[300px] lg:-ml-[166px] lg:h-[176px] lg:w-[332px]"
  }
];

export function HoaDatVietSection() {
  return (
    <section id="hoa-dat-viet" className="relative isolate overflow-hidden bg-white px-5 py-10 text-deepGreen sm:py-12">
      <div className="relative z-20 mx-auto grid max-w-6xl gap-2 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,0.78fr)] lg:items-center">
        <DraggableCardContainer className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[440px] lg:h-[480px] lg:justify-self-end">
          {cards.map((card) => (
            <DraggableCardBody
              key={card.src}
              className={`absolute bg-transparent p-0 shadow-[0_28px_70px_rgba(13,90,73,0.3)] ring-1 ring-white/70 ${card.className}`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={900}
                height={900}
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="flex w-full justify-center pt-2 lg:-ml-2 lg:justify-start"
        >
          <Image
            src="/images/hoadatviet/hoadatviet_title.png"
            alt="Vở diễn Hoa Đất Việt - Tinh hoa nghệ thuật cội nguồn"
            width={1080}
            height={1080}
            className="h-auto w-2/3 min-w-[250px] max-w-[440px]"
          />
        </motion.div>
      </div>

      <div className="relative z-20 mx-auto mt-1 grid max-w-4xl gap-6 pb-24 text-sm font-semibold leading-6 text-deepGreen drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] sm:grid-cols-2 sm:pb-32 md:text-[15px]">
        <p className="max-w-md [text-shadow:0_1px_10px_rgba(255,255,255,0.95)] sm:justify-self-end">
          Hoa Đất Việt là chương trình nghệ thuật tái hiện và tôn vinh giá trị văn hoá truyền thống Việt Nam theo chủ
          đề ba miền Bắc - Trung - Nam. Thông qua ngôn ngữ sân khấu giàu tính biểu cảm, vở diễn khắc họa nét đặc trưng
          của từng vùng đất, phản ánh chiều sâu văn hoá dân tộc một cách tinh tế và gần gũi.
        </p>
        <p className="max-w-md [text-shadow:0_1px_10px_rgba(255,255,255,0.95)]">
          Điểm nổi bật của chương trình là việc lồng ghép các trò chơi dân gian, được lựa chọn ngẫu nhiên theo chủ đề
          văn hoá của từng ngày biểu diễn, tạo nên sự khác biệt và mới mẻ cho mỗi đêm diễn.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="relative z-30 mx-auto -mt-20 mb-24 max-w-3xl border-[3px] border-deepGreen bg-white/85 px-5 py-4 text-center backdrop-blur-sm sm:-mt-24 sm:mb-32 sm:px-8"
      >
        <div className="mx-auto mb-3 h-1 w-44 max-w-full bg-deepGreen" />
        <p className="font-heading text-lg font-extrabold uppercase leading-none sm:text-xl">Trải nghiệm</p>
        <h3 className="heading-display mt-2 text-[clamp(1.4rem,3vw,2.5rem)] text-deepGreen">
          Đặt vé Hoa Đất Việt ngay!
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <HoaDatVietButton href="/booking/hoa-dat-viet" icon="seat" label="Chỗ ngồi" />
          <HoaDatVietButton href="/booking/hoa-dat-viet" icon="ticket" label="Đặt vé" />
        </div>
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <Image
          src="/images/hoadatviet/hoadatviet_lotus.png"
          alt=""
          width={1920}
          height={1080}
          sizes="100vw"
          className="h-auto w-full max-w-none"
        />
      </div>
    </section>
  );
}

function HoaDatVietButton({ href, icon, label }: { href: string; icon: "seat" | "ticket"; label: string }) {
  const Icon = icon === "seat" ? Armchair : Ticket;

  return (
    <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-full bg-deepGreen px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(13,90,73,0.22)] transition hover:bg-darkGreen"
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
