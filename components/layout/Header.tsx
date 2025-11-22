"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import WeatherBadge from "@/components/home/WeatherBadge";
import UserMenu from "@/components/auth/UserMenu";
import ChatDrawer from "@/components/chat/ChatDrawer";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 왼쪽: 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">파주</span>
            <span className="bg-[#0D4FFF] text-white px-2 py-1 rounded-lg text-lg font-bold">on</span>
            <span className="text-xs text-gray-500 ml-1">파주에 오다</span>
          </Link>

          {/* 오른쪽: UserMenu + 날씨 + 아이콘들 */}
          <div className="flex items-center gap-4">
            <UserMenu />
            <WeatherBadge />
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("openChatDrawer"));
              }}
              className="p-2 text-gray-600 hover:text-[#0D4FFF] transition-colors"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
            <Link
              href="/notifications"
              className="p-2 text-gray-600 hover:text-[#0D4FFF] transition-colors relative"
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-[#0D4FFF] transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* 채팅 Drawer */}
      <ChatDrawer />
    </header>
  );
}
