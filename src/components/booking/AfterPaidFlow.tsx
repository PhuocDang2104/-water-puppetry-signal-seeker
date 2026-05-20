"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Camera, Check, CheckCircle2, FileImage, Home, ImageUp, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Show } from "@/types/booking";

type AfterPaidFlowProps = {
  show: Show;
};

type AfterPaidStep = "success" | "guide" | "clue" | "fact";
type ScanState = "idle" | "uploading" | "analyzing" | "verified";

const guideCards = [
  {
    image: "/images/UI/after_paid/paid_2/paid2_4.jpg",
    title: "1. Đọc mật thư",
    body: "Nhận gợi ý về một nhân vật hoặc phân cảnh bí ẩn."
  },
  {
    image: "/images/UI/after_paid/paid_2/paid2_2.jpg",
    title: "2. Giải mã Gallery Wall",
    body: "Đến rạp sớm 15 phút, tham quan Bảo tàng Rối để xác định nhân vật."
  },
  {
    image: "/images/UI/after_paid/paid_2/paid2_1.jpg",
    title: "3. Bắt khoảnh khắc",
    body: "Tập trung xem diễn và chụp đúng phân cảnh được mật thư mô tả."
  },
  {
    image: "/images/UI/after_paid/paid_2/paid2_3.jpg",
    title: "4. Nhận mô hình",
    body: "Đưa ảnh cho nhân viên quầy để nhận figure lưu niệm độc bản."
  }
];

const facts = [
  {
    image: "/images/UI/after_paid/fact/long.jpg",
    title: "Long",
    body:
      "Rồng Việt tượng trưng cho mưa thuận gió hòa và sự sinh sôi. Hình dáng mềm mại, hiền hòa, gắn với ước vọng mùa màng."
  },
  {
    image: "/images/UI/after_paid/fact/lan.jpg",
    title: "Lân",
    body:
      "Kỳ Lân là biểu tượng của điềm lành, thái bình và phúc đức, thường xuất hiện cùng bậc hiền tài."
  },
  {
    image: "/images/UI/after_paid/fact/quy.jpg",
    title: "Quy",
    body:
      "Rùa tượng trưng cho trường thọ, bền bỉ và trí tuệ. Hình tượng Kim Quy gắn với nhiều truyền thuyết Việt."
  },
  {
    image: "/images/UI/after_paid/fact/phung.jpg",
    title: "Phụng",
    body:
      "Phượng hoàng là linh điểu của cao quý, đức hạnh và vẻ đẹp, xuất hiện nhiều trong mỹ thuật cung đình."
  }
];

export function AfterPaidFlow({ show }: AfterPaidFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<AfterPaidStep>("success");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    playPaymentDing();
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function goHome() {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("booking-celebration", "1");
    }
    router.push("/?challenge=completed");
  }

  function startScan() {
    if (scanState !== "idle") return;
    setProgress(10);
    setScanState("uploading");

    timers.current.push(
      window.setTimeout(() => {
        setProgress(45);
        setScanState("analyzing");
      }, 760),
      window.setTimeout(() => {
        setProgress(100);
        setScanState("verified");
      }, 1780),
      window.setTimeout(() => {
        setStep("fact");
      }, 2650)
    );
  }

  return (
    <main className="fixed inset-0 z-[60] overflow-y-auto bg-white text-deepGreen">
      <AnimatePresence mode="wait">
        {step === "success" && <SuccessScreen key="success" onOpen={() => setStep("guide")} onLater={goHome} />}
        {step === "guide" && <GuideScreen key="guide" onOpenClue={() => setStep("clue")} />}
        {step === "clue" && (
          <ClueScreen key="clue" showTitle={show.title} scanState={scanState} progress={progress} onScan={startScan} />
        )}
        {step === "fact" && <FunFactScreen key="fact" onComplete={goHome} />}
      </AnimatePresence>
    </main>
  );
}

function SuccessScreen({ onOpen, onLater }: { onOpen: () => void; onLater: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3 }}
      className="grid min-h-svh place-items-center px-5 py-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.06 }}
          className="grid h-20 w-20 place-items-center rounded-[34%] bg-deepGreen text-white shadow-[0_20px_55px_rgba(13,90,73,0.22)]"
        >
          <Check className="h-11 w-11 stroke-[4]" />
        </motion.div>
        <h1 className="heading-display mt-6 text-[clamp(2rem,5vw,4.25rem)] leading-[0.88] text-deepGreen">
          Hoàn tất thanh toán
        </h1>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-deepGreen sm:text-lg">
          Khoan đã... Tấm vé này đang cất giấu một bí mật của Thủy Đình!
          <span className="block">Bạn có muốn khám phá bí mật này ngay không?</span>
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <FlowButton label="Xem sau" onClick={onLater} />
          <FlowButton label="Mở ngay" onClick={onOpen} />
        </div>
      </div>
    </motion.section>
  );
}

function GuideScreen({ onOpenClue }: { onOpenClue: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex min-h-svh max-w-6xl flex-col px-5 py-5 sm:px-6"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onOpenClue}
          className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-full bg-deepGreen/12 px-6 text-sm font-bold text-deepGreen shadow-inner transition hover:bg-deepGreen hover:text-white sm:text-base"
        >
          Xem mật thư
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mx-auto -mt-1 text-center">
        <p className="heading-display text-[clamp(1.35rem,3vw,2.4rem)] leading-none text-deepGreen">4 bước</p>
        <h2 className="heading-display mt-1 text-[clamp(2.25rem,5.6vw,4.6rem)] leading-[0.86] text-deepGreen">
          Truy tìm con rối
        </h2>
        <div className="mx-auto mt-4 h-px w-[min(44vw,420px)] bg-deepGreen/55" />
      </div>

      <div className="mt-5 grid flex-1 content-center gap-4 sm:grid-cols-2">
        {guideCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: index * 0.06 }}
            className="grid min-h-[170px] grid-cols-[132px_1fr] items-center gap-4 rounded-[28px] border border-deepGreen/10 bg-white p-3 shadow-[0_18px_50px_rgba(13,90,73,0.1)] lg:grid-cols-[158px_1fr]"
          >
            <Image
              src={card.image}
              alt=""
              width={260}
              height={260}
              className="aspect-square w-full rounded-[26px] object-cover shadow-[0_16px_36px_rgba(13,90,73,0.16)]"
            />
            <div>
              <h3 className="heading-display text-[clamp(1.35rem,2.4vw,2.35rem)] leading-[0.9] text-deepGreen">
                {card.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-5 text-deepGreen sm:text-[15px]">{card.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function ClueScreen({
  showTitle,
  scanState,
  progress,
  onScan
}: {
  showTitle: string;
  scanState: ScanState;
  progress: number;
  onScan: () => void;
}) {
  const status =
    scanState === "uploading"
      ? "Đang tải ảnh minh chứng..."
      : scanState === "analyzing"
        ? "Đang phân tích phân cảnh..."
        : scanState === "verified"
          ? "Kiểm tra đúng rồi!"
          : "Đăng tải hình ảnh minh chứng vào đây";

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.3 }}
      className="relative grid min-h-svh place-items-center overflow-hidden bg-[radial-gradient(circle_at_42%_50%,rgba(13,90,73,0.08),transparent_38%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)] px-5 py-5"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,760px)_minmax(220px,1fr)]">
        <div className="w-full rounded-[30px] border border-white/80 bg-white/[0.92] p-3 shadow-[0_28px_90px_rgba(13,90,73,0.16)] backdrop-blur-sm sm:p-4">
          <div className="relative overflow-hidden rounded-[24px] bg-deepGreen px-5 py-7 text-center text-white shadow-[8px_10px_0_rgba(0,0,0,0.12)] sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute inset-0 water-mask opacity-[0.12]" />
            <div className="relative">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold">Ở Hoa Đất Việt</p>
              <h1 className="heading-display mt-1 text-[clamp(2.2rem,4.1vw,3.8rem)] leading-none">Mật thư</h1>
              <div className="mx-auto mt-5 max-w-[640px] text-center font-body text-[clamp(1.05rem,1.72vw,1.48rem)] font-semibold leading-[1.45] tracking-normal text-white">
                <span className="block">Sân đình mặt nước xanh trong,</span>
                <span className="block">Có đôi chim quý lượn vòng múa ca.</span>
                <span className="block">Duyên tình thắm thiết giao hòa</span>
                <span className="block">Gặp nhau một chốc, hóa ra ba mình.</span>
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{showTitle}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-deepGreen/15 bg-white px-4 py-5 text-center shadow-[0_12px_34px_rgba(13,90,73,0.08)]">
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-paleMint text-deepGreen ring-1 ring-deepGreen/10">
              {scanState === "verified" ? <CheckCircle2 className="h-6 w-6" /> : <ImageUp className="h-6 w-6" />}
            </div>
            <p className="mt-3 text-sm font-bold text-deepGreen sm:text-[15px]">{status}</p>
            {scanState !== "idle" && (
              <div className="mx-auto mt-3 h-1.5 max-w-sm overflow-hidden rounded-full bg-deepGreen/12">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45 }}
                  className="h-full rounded-full bg-deepGreen"
                />
              </div>
            )}
            {scanState === "analyzing" && (
              <p className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-deepGreen/75">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Đối chiếu mật thư với khoảnh khắc sân khấu
              </p>
            )}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <UploadButton icon="camera" label="Máy ảnh" disabled={scanState !== "idle"} onClick={onScan} />
              <UploadButton icon="file" label="Tập tin" disabled={scanState !== "idle"} onClick={onScan} />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="pointer-events-none hidden justify-self-end lg:block"
        >
          <Image
            src="/images/UI/after_paid/paid_2/paid2_3_element.png"
            alt=""
            width={900}
            height={900}
            priority
            className="w-[min(24vw,330px)] translate-x-8 object-contain drop-shadow-[0_22px_50px_rgba(13,90,73,0.13)]"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

function FunFactScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-svh overflow-hidden px-5 py-5"
    >
      <div className="pointer-events-none absolute inset-x-0 top-[112px] h-[92px] border-y border-redSon/20 bg-[repeating-radial-gradient(ellipse_at_center,#9b2e37_0_2px,transparent_2px_20px)] opacity-20" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-5xl flex-col">
        <div className="text-center">
          <p className="heading-display text-[clamp(1.45rem,3vw,2.4rem)] text-deepGreen">Fun fact</p>
          <h1 className="heading-display text-[clamp(2.35rem,6.2vw,5rem)] leading-[0.82] text-deepGreen">
            Chuyện tứ linh
          </h1>
        </div>

        <div className="mt-5 grid flex-1 content-center gap-x-7 gap-y-4 sm:grid-cols-2">
          {facts.map((fact, index) => (
            <motion.article
              key={fact.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: index * 0.06 }}
              className="grid grid-cols-[92px_1fr] gap-3 rounded-2xl border border-deepGreen/10 bg-white/88 p-3 shadow-[0_14px_40px_rgba(13,90,73,0.1)]"
            >
              <Image
                src={fact.image}
                alt={fact.title}
                width={150}
                height={210}
                className="h-32 w-full rounded-sm object-cover shadow-[0_12px_28px_rgba(13,90,73,0.16)]"
              />
              <div>
                <h2 className="heading-display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-none text-deepGreen">
                  {fact.title}
                </h2>
                <p className="mt-1.5 text-xs font-medium leading-5 text-deepGreen sm:text-[13px]">{fact.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onComplete}
            className="focus-ring group inline-flex min-h-12 items-center gap-2 rounded-full bg-deepGreen px-7 text-sm font-bold text-white shadow-[0_16px_38px_rgba(13,90,73,0.24)] transition hover:-translate-y-0.5 hover:bg-darkGreen"
          >
            Hoàn thành thử thách
            <Home className="h-4 w-4 transition group-hover:scale-110" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function FlowButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="focus-ring min-h-14 rounded-full bg-deepGreen px-9 text-lg font-bold text-white shadow-[0_16px_38px_rgba(13,90,73,0.24)] transition hover:bg-darkGreen"
    >
      {label}
    </motion.button>
  );
}

function UploadButton({
  icon,
  label,
  disabled,
  onClick
}: {
  icon: "camera" | "file";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = icon === "camera" ? Camera : FileImage;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="focus-ring inline-flex min-h-9 items-center gap-2 rounded-full bg-deepGreen px-4 text-xs font-bold text-white shadow-[0_10px_24px_rgba(13,90,73,0.18)] transition hover:bg-darkGreen disabled:cursor-wait disabled:opacity-60"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function playPaymentDing() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const notes = [880, 1174];

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.16;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.24);
    });

    window.setTimeout(() => void context.close(), 700);
  } catch {
    // Audio feedback is decorative; payment flow remains usable if the browser blocks it.
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
