import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAJU ON (파주온) - 파주가 켜진다",
  description: "파주 시민을 위한 참여형 로컬 커뮤니티 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#F3F4F6] text-[#1F2937]`}
      >
        <Providers>
          <Header />
          <main className="flex-1 max-w-3xl mx-auto w-full min-h-screen bg-white shadow-xl px-4 py-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
