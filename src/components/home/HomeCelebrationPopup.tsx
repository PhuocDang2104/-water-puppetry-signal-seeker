"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeCelebrationPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromChallenge = params.get("challenge") === "completed";
    const stored = window.sessionStorage.getItem("booking-celebration") === "1";

    if (!fromChallenge && !stored) return;

    window.sessionStorage.removeItem("booking-celebration");
    if (fromChallenge) {
      window.history.replaceState({}, "", window.location.pathname + window.location.hash);
    }

    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-deepGreen/12 px-5 backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative max-w-md rounded-[28px] border border-white/70 bg-white px-7 py-8 text-center text-deepGreen shadow-[0_28px_90px_rgba(13,90,73,0.3)]"
          >
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={() => setVisible(false)}
              className="focus-ring absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-paleMint text-deepGreen transition hover:bg-deepGreen hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-deepGreen text-white">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <p className="heading-display mt-5 text-4xl text-deepGreen">Chúc mừng!</p>
            <p className="mt-3 text-sm font-semibold leading-6">
              Bạn đã hoàn thành thử thách mật thư và mở khóa Fun Fact Chuyện Tứ Linh.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-gold">
              <Sparkles className="h-4 w-4" />
              Hẹn gặp bạn tại Thủy Đình
              <Sparkles className="h-4 w-4" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
