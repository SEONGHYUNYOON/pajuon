"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import WeatherBadge from "@/components/home/WeatherBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[600px] mx-auto w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">PAJU</span>
            <span className="text-2xl font-extrabold text-[#0D4FFF]">ON</span>
            <span className="text-xs text-gray-500 mb-0.5">파주에 오다</span>
          </Link>

          {/* 중앙: 날씨 뱃지 */}
          <WeatherBadge />

          {/* 우측 아이콘 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
            <Link
              href="/notifications"
              className="p-2 text-gray-600 hover:text-primary transition-colors relative"
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
