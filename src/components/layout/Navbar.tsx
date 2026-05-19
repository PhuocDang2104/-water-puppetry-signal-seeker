"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useLanguage, type Language } from "@/i18n/LanguageProvider";

const navItems = [
  { href: "/#home", key: "home" },
  { href: "/#services", key: "services" },
  { href: "/#shows", key: "shows" },
  { href: "/#news", key: "news" },
  { href: "/#training", key: "training" }
] as const;

type NavbarProps = {
  variant?: "hero" | "solid";
};

export function Navbar({ variant = "hero" }: NavbarProps) {
  const pathname = usePathname();
  const { lang, setLang, dict } = useLanguage();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY.current + 6;
      const scrollingUp = currentY < lastY.current - 6;

      if (hideTimer.current) window.clearTimeout(hideTimer.current);

      if (currentY < 20 || scrollingUp) {
        setVisible(true);
      } else if (scrollingDown) {
        hideTimer.current = window.setTimeout(() => setVisible(false), 1000);
      }

      lastY.current = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-x-0 top-4 z-50 px-3"
        >
          <nav
            className={cn(
              "mx-auto flex w-[min(96vw,980px)] items-center justify-between gap-2 rounded-full border px-2 py-2 backdrop-blur-xl",
              variant === "hero"
                ? "border-white/30 bg-white/14 text-white shadow-[0_16px_42px_rgba(0,0,0,0.2)]"
                : "border-deepGreen/18 bg-white/90 text-deepGreen shadow-soft"
            )}
            aria-label="Điều hướng chính"
          >
            <div className="flex min-w-0 flex-1 items-center justify-center overflow-x-auto">
              <div className="flex min-w-max items-center gap-1">
                {navItems.map((item) => {
                  const active = pathname === "/" && item.key === "home";
                  const label = dict.nav[item.key];

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "focus-ring group relative overflow-hidden rounded-full px-4 py-2.5 font-heading text-[15px] font-extrabold transition duration-300 sm:px-6",
                        "[-webkit-text-stroke:0.55px_rgba(6,68,55,0.82)] [text-shadow:0_1px_0_rgba(234,241,237,0.55),0_1px_3px_rgba(0,0,0,0.36),0_0_7px_rgba(13,90,73,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(13,90,73,0.18)]",
                        variant === "hero" ? "hover:bg-white/18" : "hover:bg-paleMint",
                        active && (variant === "hero" ? "bg-white/18" : "bg-paleMint shadow-[0_10px_26px_rgba(13,90,73,0.12)]")
                      )}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/24 to-transparent transition duration-500 group-hover:translate-x-full" />
                      <span className="absolute inset-x-4 bottom-1 h-0.5 scale-x-0 rounded-full bg-gold transition duration-300 group-hover:scale-x-100" />
                      <span className="relative">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 border-l border-current/20 pl-2">
              <LangButton lang="vi" active={lang === "vi"} onClick={() => setLang("vi")} />
              <LangButton lang="en" active={lang === "en"} onClick={() => setLang("en")} />
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function LangButton({ lang, active, onClick }: { lang: Language; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={lang === "vi" ? "Chuyển sang tiếng Việt" : "Switch to English"}
      onClick={onClick}
      className={cn(
        "focus-ring grid h-9 w-9 place-items-center rounded-full border text-[11px] font-bold shadow-sm transition hover:scale-105",
        active ? "border-gold bg-gold text-deepGreen" : "border-current/20 bg-white/14 text-current hover:bg-white/22"
      )}
    >
      {lang === "vi" ? <VietnamFlag /> : <UkFlag />}
    </button>
  );
}

function VietnamFlag() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-redSon text-[12px] leading-none text-gold">
      ★
    </span>
  );
}

function UkFlag() {
  return (
    <span className="relative block h-6 w-6 overflow-hidden rounded-full bg-[#1f4f94]">
      <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-white" />
      <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-white" />
      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-redSon" />
      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-redSon" />
      <span className="absolute left-[-2px] top-1/2 h-0.5 w-8 origin-center rotate-45 bg-white" />
      <span className="absolute left-[-2px] top-1/2 h-0.5 w-8 origin-center -rotate-45 bg-white" />
    </span>
  );
}
