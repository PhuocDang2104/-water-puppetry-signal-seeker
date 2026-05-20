import { ArrowLeft, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DonatePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c6f60] text-white">
      <Image
        src="/images/hero/donate_bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <Link
        href="/"
        className="focus-ring absolute left-4 top-4 z-20 inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-white/80 bg-white/10 px-3 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/18"
        aria-label="Quay lại trang chủ"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Quay lại</span>
      </Link>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center px-5 pb-[48vh] pt-12 text-center sm:pt-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] backdrop-blur-sm sm:text-[10px]">
          <HeartHandshake className="h-3.5 w-3.5 text-gold" />
          Quỹ Chú Tễu
        </div>
        <h1 className="heading-display mt-2 max-w-3xl text-[clamp(1.25rem,2.4vw,2.25rem)] leading-[1.04] text-white drop-shadow-[0_5px_14px_rgba(0,0,0,0.16)]">
          Gói trọn tình nghề
          <span className="block">Chung tay góp sức cho “Quỹ Chú Tễu”</span>
        </h1>
        <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-white sm:text-sm sm:leading-6">
          Mỗi tấm vé bạn mua, mỗi sự đóng góp trực tiếp đều là nguồn tiếp sức thiết thực để những nghệ sĩ dân gian giữ
          vững đam mê và tiếp lửa cho nghệ thuật dân tộc.
        </p>
      </section>
    </main>
  );
}
