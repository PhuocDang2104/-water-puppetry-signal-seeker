"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "vi" | "en";

type Dictionary = {
  nav: {
    home: string;
    services: string;
    shows: string;
    news: string;
    training: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    locationLabel: string;
    location: string;
    timeLabel: string;
    time: string;
    phoneLabel: string;
    cta: string;
  };
  section: {
    about: string;
    intro: string;
    shows: string;
  };
  about: Array<{
    title: string;
    body: string;
    imageAlt: string;
  }>;
  reserved: {
    copy: string;
  };
  shows: {
    duration: string;
    cast: string;
    seats: string;
    book: string;
    ariaBook: string;
  };
  footer: {
    title: string;
    copy: string;
    address: string;
    cta: string;
  };
  chatbot: {
    title: string;
    status: string;
    hello: string;
    fallback: string;
    input: string;
    suggestions: string[];
    answers: Record<string, string>;
  };
};

const dictionaries: Record<Language, Dictionary> = {
  vi: {
    nav: {
      home: "Trang chủ",
      services: "Dịch vụ",
      shows: "Vở diễn",
      news: "Tin tức",
      training: "Đào tạo"
    },
    hero: {
      eyebrow: "Nghệ thuật sân khấu dân gian truyền thống",
      title1: "Múa Rối Nước",
      title2: "Rồng Phương Nam",
      locationLabel: "Địa điểm",
      location: "Bên trong Bảo tàng Lịch sử, Nguyễn Bỉnh Khiêm, Phường Sài Gòn, Thành phố Hồ Chí Minh",
      timeLabel: "Thời gian",
      time: "Thứ 7 & Chủ nhật hằng tuần",
      phoneLabel: "Số điện thoại",
      cta: "Khám phá ngay"
    },
    section: {
      about: "Giới thiệu",
      intro: "Giới thiệu",
      shows: "Vở diễn"
    },
    about: [
      {
        title: "Múa rối nước là gì?",
        body:
          "Múa rối nước là một loại hình nghệ thuật biểu diễn truyền thống và giàu tính nghệ thuật trong nền văn minh đồng bằng sông Cửu Long của Việt Nam. Hàng năm, vào những dịp đặc biệt như Tết Nguyên đán hay Trung thu, người dân và trẻ em tập trung quanh sân khấu, nơi những con rối bắt đầu kể những câu chuyện cổ tích, hoặc những hoạt động thường nhật sau một mùa làm việc vất vả. Múa rối nước tượng trưng cho trí tuệ của người lao động mang trong mình tâm hồn nghệ sĩ.",
        imageAlt: "Những con rối nước truyền thống trên sân khấu"
      },
      {
        title: "Đặc điểm",
        body:
          "Múa rối nước gồm hai phần chính: con rối và nước. Con rối là những hình nộm bằng gỗ đơn giản với đường nét cứng cáp và màu sắc giản dị. Nhưng sự kết hợp giữa chúng với nước, chất lỏng mềm mại, tạo nên hiệu ứng ảo diệu. Vì được người nông dân tạo ra để giải trí sau một mùa màng vất vả, nên nó vẫn mang đậm nét mộc mạc của người Việt Nam.",
        imageAlt: "Đoàn rối nước xếp hàng trên mặt nước"
      },
      {
        title: "Thực trạng",
        body:
          "Ngày nay, sân khấu múa rối được đầu tư và chuyển vào sân khấu trong nhà với mục đích phát triển và bảo tồn. Tuy nhiên, các nghệ nhân vẫn cố gắng giữ gìn truyền thống từ thời xa xưa. Hiện nay, với sự hỗ trợ của các cơ quan chức năng và lòng nhiệt huyết của các nghệ sĩ, múa rối đã được đưa đến các thành phố lớn và các địa điểm biểu diễn nghệ thuật truyền thống để tiếp cận đông đảo người dân hiện đại.",
        imageAlt: "Nghệ nhân trong xưởng chế tác rối nước"
      }
    ],
    reserved: {
      copy: "Khu vực nội dung B được chừa sẵn để mở rộng phần giới thiệu, dịch vụ trải nghiệm hoặc các chương trình giáo dục nghệ thuật."
    },
    shows: {
      duration: "Thời lượng",
      cast: "Diễn viên",
      seats: "Chỗ ngồi",
      book: "Đặt vé",
      ariaBook: "Đặt vé"
    },
    footer: {
      title: "Rồng Phương Nam",
      copy:
        "Sân khấu múa rối nước mang tinh thần dân gian Việt Nam trong một trải nghiệm đặt vé hiện đại, rõ ràng và dễ sử dụng.",
      address: "Bên trong Bảo tàng Lịch sử, Nguyễn Bỉnh Khiêm, Thành phố Hồ Chí Minh",
      cta: "Xem vở diễn"
    },
    chatbot: {
      title: "AI hỗ trợ",
      status: "Rồng Phương Nam online",
      hello: "Tôi là chatbot, bạn có thắc mắc gì về lịch diễn, múa rối nước hoặc thanh toán không?",
      fallback: "Tôi là chatbot, bạn có thắc mắc gì không? Bạn có thể bấm một trong 3 câu hỏi mẫu bên dưới để tôi hỗ trợ nhanh hơn.",
      input: "Nhập câu hỏi...",
      suggestions: ["Lịch diễn tuần này", "Múa rối nước là gì", "Hướng dẫn thanh toán"],
      answers: {
        "Lịch diễn tuần này":
          "Tuần này có 2 suất vào Thứ 7 ngày 23/05/2026: 10:30 - 11:15 và 14:30 - 15:15. Bạn có thể vào mục Vở diễn rồi chọn Đặt vé.",
        "Múa rối nước là gì":
          "Múa rối nước là nghệ thuật sân khấu dân gian Việt Nam, nơi các con rối gỗ biểu diễn trên mặt nước cùng âm nhạc, lời thoại và ánh sáng.",
        "Hướng dẫn thanh toán":
          "Bạn chọn suất diễn, chọn ghế, nhập thông tin liên hệ, kiểm tra tổng tiền, tick đồng ý điều khoản rồi bấm Thanh toán ngay."
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      shows: "Shows",
      news: "News",
      training: "Training"
    },
    hero: {
      eyebrow: "Traditional Vietnamese folk stage art",
      title1: "Water Puppetry",
      title2: "Rong Phuong Nam",
      locationLabel: "Location",
      location: "Inside the History Museum, Nguyen Binh Khiem Street, Saigon Ward, Ho Chi Minh City",
      timeLabel: "Schedule",
      time: "Every Saturday & Sunday",
      phoneLabel: "Phone",
      cta: "Explore now"
    },
    section: {
      about: "Introduction",
      intro: "Introduction",
      shows: "Shows"
    },
    about: [
      {
        title: "What is water puppetry?",
        body:
          "Water puppetry is a traditional Vietnamese performing art where wooden puppets move on the water surface to tell folk tales, village stories and festive scenes. The water becomes both the stage and the source of magical motion.",
        imageAlt: "Traditional water puppets on stage"
      },
      {
        title: "Characteristics",
        body:
          "The art combines hand-carved wooden puppets, water, live music and light. Simple rural forms become vivid through reflections, ripples and precise manipulation behind the stage.",
        imageAlt: "A group of water puppets on the water"
      },
      {
        title: "Today",
        body:
          "Modern indoor stages help preserve the tradition while making it accessible to wider audiences. Artists keep the old techniques alive and enrich the experience with lighting, music and professional staging.",
        imageAlt: "Artisan workshop for water puppets"
      }
    ],
    reserved: {
      copy: "Section B is reserved for expanded introduction content, visitor services or educational art programs."
    },
    shows: {
      duration: "Duration",
      cast: "Cast",
      seats: "Seats",
      book: "Book ticket",
      ariaBook: "Book ticket"
    },
    footer: {
      title: "Rong Phuong Nam",
      copy: "A Vietnamese water puppet stage with a clear, modern and friendly ticket booking experience.",
      address: "Inside the History Museum, Nguyen Binh Khiem Street, Ho Chi Minh City",
      cta: "View shows"
    },
    chatbot: {
      title: "AI assistant",
      status: "Rong Phuong Nam online",
      hello: "I am the chatbot. Do you have any questions about schedules, water puppetry or payment?",
      fallback: "I am the chatbot. What would you like to know? You can tap one of the three sample questions below.",
      input: "Ask a question...",
      suggestions: ["This week's schedule", "What is water puppetry?", "Payment guide"],
      answers: {
        "This week's schedule":
          "This week has two shows on Saturday, May 23, 2026: 10:30 - 11:15 and 14:30 - 15:15. Open Shows and choose Book ticket to reserve seats.",
        "What is water puppetry?":
          "Water puppetry is a Vietnamese folk stage art where wooden puppets perform on water with music, narration and lighting.",
        "Payment guide":
          "Choose a showtime, select seats, enter contact details, review the total, accept the terms and press Pay now."
      }
    }
  }
};

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    const saved = window.localStorage.getItem("water-puppet-language");
    if (saved === "vi" || saved === "en") setLangState(saved);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (nextLang) => {
        setLangState(nextLang);
        window.localStorage.setItem("water-puppet-language", nextLang);
      },
      dict: dictionaries[lang]
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
