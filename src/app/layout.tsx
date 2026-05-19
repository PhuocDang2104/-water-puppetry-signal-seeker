import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import { ChatbotWidget } from "@/components/common/ChatbotWidget";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const heading = Baloo_2({
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800"],
  variable: "--font-heading"
});

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Múa Rối Nước Rồng Phương Nam",
  description:
    "Website giới thiệu và đặt vé múa rối nước Rồng Phương Nam tại Thành phố Hồ Chí Minh."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${heading.variable} ${body.variable} body-copy antialiased`}>
        <LanguageProvider>
          {children}
          <ChatbotWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
