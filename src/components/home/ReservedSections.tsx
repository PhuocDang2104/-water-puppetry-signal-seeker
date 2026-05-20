"use client";

import { SectionHeader } from "@/components/common/SectionHeader";
import type { LucideIcon } from "lucide-react";
import { Camera, Gift, ScrollText, Ticket } from "lucide-react";

const benefits: Array<{
  title: string;
  body: string;
  icon: LucideIcon;
}> = [
  {
    title: "TRẢI NGHIỆM NGHỆ THUẬT DÂN GIAN",
    body:
      "Không chỉ xem múa rối nước, mỗi suất diễn còn là một không gian giao lưu văn hoá riêng biệt. Tuỳ vào suất diễn, khán giả sẽ được trực tiếp tham gia các hoạt động dân gian như Hội bài chòi, Vòng xoay lô tô hay Hò sông nước ngay tại khán đài.",
    icon: Ticket
  },
  {
    title: "GIẢI MẬT THƯ - SĂN CẢNH DIỄN",
    body:
      "Nhận ngay một Mật thư (Hint) ẩn chứa câu đố cổ dân gian ngay sau khi đặt vé thành công. Đến buổi diễn, hãy dùng đôi mắt tinh anh để tìm kiếm phân cảnh chính xác ẩn sau lời đố.",
    icon: ScrollText
  },
  {
    title: "SĂN HINT HAY - RINH QUÀ ĐỘC BẢN",
    body:
      "Dùng điện thoại chụp lại khoảnh khắc khớp với mật thư, gửi lên website để đổi lấy 01 Figure rối nước độc bản mang về làm kỷ niệm.",
    icon: Camera
  },
  {
    title: "GÓP SỨC CHO “QUỸ CHÚ TỄU”",
    body:
      "Mỗi tấm vé bạn sở hữu sẽ trích thẳng 5% giá trị vào quỹ hỗ trợ cho những nghệ sĩ địa phương có hoàn cảnh khó khăn, cô đơn mẹ, nhưng không có điều kiện làm nghề.",
    icon: Gift
  }
];

export function AudienceBenefitsSection() {
  return (
    <section id="services" className="bg-deepGreen py-10 text-white sm:py-12">
      <SectionHeader
        marker="B"
        label="Quyền lợi khán giả"
        className="[&>div:first-child]:border-white [&>div:first-child]:text-white [&>div:last-child>div]:bg-white/70 [&>div:last-child>p]:text-white"
      />
      <div className="mx-auto mt-8 max-w-6xl px-5 text-center text-white">
        <h2 className="heading-display whitespace-nowrap text-[clamp(0.72rem,3.4vw,2.85rem)] leading-tight">
          ĐÂY KHÔNG CHỈ LÀ MỘT TẤM VÉ XEM BIỂU DIỄN!
        </h2>
        <p className="mx-auto mt-3 max-w-5xl whitespace-nowrap text-[clamp(0.65rem,1.6vw,1rem)] font-bold leading-6">
          Khi đồng hành cùng Nhà hát Nghệ thuật Phương Nam, bạn sẽ nhận được trọn vẹn trải nghiệm:
        </p>
      </div>
      <div className="mx-auto mt-7 max-w-6xl px-3 py-3 sm:px-5 sm:py-4">
        <div className="border-2 border-dashed border-white/80 p-3 sm:p-5">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit }: { benefit: (typeof benefits)[number] }) {
  const Icon = benefit.icon;

  return (
    <article className="flex min-h-[220px] flex-col justify-center rounded-[2.25rem] bg-white px-6 py-6 text-left text-deepGreen sm:min-h-[245px] sm:px-8">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lightGray/80">
        <Icon className="h-8 w-8 stroke-[1.4]" />
      </div>
      <h3 className="mt-6 font-heading text-base font-extrabold uppercase leading-tight sm:text-lg">{benefit.title}</h3>
      <p className="mt-3 text-[13px] font-medium leading-6 sm:text-sm">{benefit.body}</p>
    </article>
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
