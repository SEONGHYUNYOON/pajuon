"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import WeatherBadge from "@/components/home/WeatherBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 w-full">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">파주</span>
            <span className="bg-[#0D4FFF] text-white px-2 py-1 rounded-lg text-lg font-bold">on</span>
            <span className="text-xs text-gray-500 ml-2">파주에 오다</span>
          </Link>

          {/* 우측: 날씨 + 검색/알림 아이콘 */}
          <div className="flex items-center space-x-4 ml-auto">
            <WeatherBadge />
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
