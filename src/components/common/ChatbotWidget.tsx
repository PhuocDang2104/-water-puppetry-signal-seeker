"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
  image?: string;
  imageAlt?: string;
};

type Answer = {
  text: string;
  image?: string;
  imageAlt?: string;
};

const content = {
  vi: {
    title: "AI hỗ trợ",
    status: "Rồng Phương Nam online",
    hover: "Bạn yêu có thắc mắc gì?",
    input: "Nhập câu hỏi...",
    hello:
      "Tôi là chatbot của Rồng Phương Nam. Bạn có thể hỏi tôi về lịch diễn, các vở đang có, nghệ thuật múa rối nước hoặc cách thanh toán vé.",
    fallback:
      "Tôi là chatbot, bạn có thắc mắc gì không? Hiện tôi hỗ trợ nhanh nhất với các câu hỏi mẫu bên dưới. Bạn có thể bấm vào một câu hỏi để nhận câu trả lời đầy đủ hơn kèm hình minh họa khi phù hợp.",
    suggestions: ["Lịch diễn tuần này", "Múa rối nước là gì", "Hướng dẫn thanh toán", "Đang có những vở nào"],
    answers: {
      "Lịch diễn tuần này": {
        text:
          "Tuần này có các suất diễn cuối tuần tại sân khấu Rồng Phương Nam. Suất nổi bật gồm 10:30 - 11:15 và 14:30 - 15:15 vào Thứ 7. Khi đặt vé, bạn chỉ cần chọn vở diễn, chọn suất diễn phù hợp, chọn ghế trên sơ đồ và nhập thông tin liên hệ. Nếu đi theo gia đình, bạn nên chọn các ghế liền nhau ở khu B hoặc các hàng trung tâm để dễ quan sát sân khấu nước.",
        image: "/images/shows/hoa-dat-viet.jpg",
        imageAlt: "Poster vở Hoa Đất Việt"
      },
      "Múa rối nước là gì": {
        text:
          "Múa rối nước là loại hình sân khấu dân gian Việt Nam, nơi các con rối gỗ biểu diễn trên mặt nước cùng âm nhạc, lời thoại và ánh sáng. Điểm đặc biệt là mặt nước vừa là sân khấu, vừa tạo ra chuyển động phản chiếu, sóng nước và cảm giác huyền ảo. Phía sau phông sân khấu, nghệ nhân điều khiển rối bằng sào, dây và kỹ thuật truyền thống để kể những câu chuyện làng quê, lễ hội, lao động và cổ tích.",
        image: "/images/about/puppet-intro-1.jpg",
        imageAlt: "Con rối nước truyền thống"
      },
      "Hướng dẫn thanh toán": {
        text:
          "Quy trình thanh toán gồm bốn bước. Đầu tiên, bạn chọn suất diễn trong lịch. Tiếp theo, chọn ghế còn trống trên sơ đồ sân khấu. Sau đó, nhập họ tên, email, số điện thoại và quốc tịch để hệ thống ghi nhận thông tin nhận vé. Cuối cùng, kiểm tra lại vở diễn, suất diễn, ghế đã chọn và tổng tiền, tick đồng ý điều khoản rồi bấm Thanh toán ngay. Vé mẫu sẽ được gửi về email sau khi thanh toán thành công.",
        image: "/images/hero/hero-water-puppet.png",
        imageAlt: "Sân khấu múa rối nước"
      },
      "Đang có những vở nào": {
        text:
          "Hiện website đang giới thiệu hai vở chính: Vở Rối Nước Hoa Đất Việt và Vở Rối Nước Nàng Tiên Cá. Hoa Đất Việt tập trung vào các tiết mục dân gian, không khí truyền thống và màu sắc Việt Nam. Nàng Tiên Cá phù hợp với gia đình và khán giả nhỏ tuổi hơn, có chất kể chuyện cổ tích, đại dương và thông điệp gần gũi về thiên nhiên. Bạn có thể bấm Đặt vé ở từng vở để vào flow chọn suất diễn và chọn ghế.",
        image: "/images/shows/little-mermaid.jpg",
        imageAlt: "Poster vở Nàng Tiên Cá"
      }
    } satisfies Record<string, Answer>
  },
  en: {
    title: "AI assistant",
    status: "Rong Phuong Nam online",
    hover: "Need some help?",
    input: "Ask a question...",
    hello:
      "I am the Rong Phuong Nam chatbot. You can ask me about show schedules, current performances, Vietnamese water puppetry or ticket payment.",
    fallback:
      "I am the chatbot. What would you like to know? For this demo, I can answer the sample questions below with more detailed guidance and related images when useful.",
    suggestions: ["This week's schedule", "What is water puppetry?", "Payment guide", "What shows are available?"],
    answers: {
      "This week's schedule": {
        text:
          "This week includes weekend showtimes at Rong Phuong Nam. Highlighted slots include 10:30 - 11:15 and 14:30 - 15:15 on Saturday. To book, choose a show, pick a suitable showtime, select seats on the seat map and enter your contact details. For families, adjacent seats in the central rows or zone B are usually comfortable for viewing the water stage.",
        image: "/images/shows/hoa-dat-viet.jpg",
        imageAlt: "Flowers of Vietnam show poster"
      },
      "What is water puppetry?": {
        text:
          "Water puppetry is a Vietnamese folk stage art where carved wooden puppets perform on the water surface with live-style music, narration and lighting. The water acts as both the stage and a visual effect, creating reflections, ripples and magical movement. Behind the curtain, artists use traditional rods, strings and precise techniques to tell village stories, festival scenes and folk tales.",
        image: "/images/about/puppet-intro-1.jpg",
        imageAlt: "Traditional water puppets"
      },
      "Payment guide": {
        text:
          "The payment flow has four steps. First, choose a showtime from the calendar. Next, select available seats on the venue map. Then enter your name, email, phone number and nationality so the ticket can be recorded. Finally, review the show, showtime, selected seats and total amount, accept the terms and press Pay now. The sample ticket information will be sent to your email after successful payment.",
        image: "/images/hero/hero-water-puppet.png",
        imageAlt: "Water puppet stage"
      },
      "What shows are available?": {
        text:
          "The website currently features two main shows: Flowers of Vietnam and The Little Mermaid. Flowers of Vietnam focuses on folk scenes, traditional Vietnamese color and classic water puppet acts. The Little Mermaid is more story-driven and family-friendly, with an ocean-inspired fairy-tale atmosphere and a gentle message about nature. You can press Book ticket on either show to choose a showtime and seats.",
        image: "/images/shows/little-mermaid.jpg",
        imageAlt: "The Little Mermaid show poster"
      }
    } satisfies Record<string, Answer>
  }
};

export function ChatbotWidget() {
  const { lang } = useLanguage();
  const copy = content[lang];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages([{ id: 1, role: "bot", text: copy.hello }]);
    setMessage("");
    setTyping(false);
  }, [copy.hello]);

  const suggestions = useMemo(() => copy.suggestions, [copy.suggestions]);

  function ask(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        text: cleanQuestion
      }
    ]);
    setMessage("");
    setTyping(true);

    window.setTimeout(() => {
      const answers = copy.answers as Record<string, Answer>;
      const answer = answers[cleanQuestion] ?? { text: copy.fallback };
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "bot",
          text: answer.text,
          image: answer.image,
          imageAlt: answer.imageAlt
        }
      ]);
      setTyping(false);
    }, 520);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-h-[calc(100svh-2rem)] flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="mb-4 flex max-h-[calc(100svh-7rem)] w-[min(calc(100vw-40px),430px)] flex-col overflow-hidden rounded-[26px] border border-white/45 bg-white shadow-[0_22px_80px_rgba(6,68,55,0.32)]"
          >
            <div className="relative shrink-0 overflow-hidden bg-deepGreen p-4 text-white">
              <div className="absolute inset-0 water-mask opacity-30" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="font-heading text-2xl font-extrabold uppercase leading-none tracking-[0.01em]">
                    {copy.title}
                  </p>
                  <p className="mt-1 text-xs text-paleMint">{copy.status}</p>
                </div>
                <button
                  type="button"
                  aria-label="Đóng chatbot"
                  onClick={() => setOpen(false)}
                  className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-white/12 transition hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      item.role === "user"
                        ? "max-w-[82%] rounded-2xl rounded-br-sm bg-deepGreen px-4 py-3 text-sm text-white shadow-sm"
                        : "max-w-[88%] overflow-hidden rounded-2xl rounded-tl-sm border border-deepGreen/10 bg-white text-sm text-deepGreen shadow-sm"
                    }
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ""}
                        width={520}
                        height={260}
                        className="h-36 w-full object-cover"
                      />
                    )}
                    <p className={item.role === "user" ? "" : "px-4 py-3 leading-6"}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm border border-deepGreen/10 bg-white px-4 py-3 text-sm text-deepGreen shadow-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-deepGreen/45" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-deepGreen/45 [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-deepGreen/45 [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 space-y-3 border-t border-deepGreen/10 bg-white/55 p-4">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => ask(item)}
                    className="focus-ring rounded-full border border-deepGreen/20 bg-paleMint px-3 py-2 text-xs font-bold text-deepGreen transition hover:border-deepGreen hover:bg-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <form
                className="flex items-center gap-2 rounded-full border border-deepGreen/20 bg-white p-1 shadow-inner"
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(message);
                }}
              >
                <label htmlFor="chatbot-message" className="sr-only">
                  Nội dung cần hỏi
                </label>
                <input
                  id="chatbot-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.input}
                  className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-2 text-sm text-deepGreen outline-none placeholder:text-deepGreen/45"
                />
                <button
                  type="submit"
                  aria-label="Gửi tin nhắn"
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-deepGreen text-white transition hover:bg-darkGreen disabled:opacity-45"
                  disabled={typing || !message.trim()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Đóng chatbot AI" : "Mở chatbot AI"}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="group relative h-20 w-20 shrink-0 bg-transparent p-0"
      >
        <span className="pointer-events-none absolute bottom-full right-2 mb-2 w-max max-w-[210px] origin-bottom-right scale-95 rounded-2xl rounded-br-sm bg-white px-4 py-2 text-sm font-bold text-deepGreen opacity-0 ring-1 ring-deepGreen/15 transition group-hover:scale-100 group-hover:opacity-100">
          {copy.hover}
        </span>
        <Image
          src="/images/element/puppet-ai-icon.png"
          alt="AI puppet assistant"
          width={96}
          height={96}
          className="h-full w-full object-contain"
          priority
        />
      </motion.button>
    </div>
  );
}
