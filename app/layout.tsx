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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-100 flex flex-col items-center min-h-screen text-gray-900`}>
        <Providers>
          <Header />
          <main className="w-full max-w-[600px] bg-white min-h-screen shadow-2xl">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
