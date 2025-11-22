"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import WeatherBadge from "@/components/home/WeatherBadge";
import UserMenu from "@/components/auth/UserMenu";
import ChatDrawer from "@/components/chat/ChatDrawer";

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 w-full" style={{ position: 'relative', zIndex: 100 }}>
      <div className="w-full px-4 md:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 relative">
          {/* 좌측: UserMenu */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <UserMenu />
          </div>

          {/* 중앙: 로고 */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            <span className="text-2xl font-bold text-gray-900">파주</span>
            <span className="bg-[#0D4FFF] text-white px-2 py-1 rounded-lg text-lg font-bold">on</span>
            <span className="text-xs text-gray-500 ml-2">파주에 오다</span>
          </Link>

          {/* 우측: 날씨 + 검색/알림 아이콘 */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4 z-10">
            <WeatherBadge />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openChatDrawer"));
                }}
                className="p-2 text-gray-600 hover:text-primary transition-colors relative"
              >
                <PaperAirplaneIcon className="w-6 h-6" />
              </button>
              <Link
                href="/notifications"
                className="p-2 text-gray-600 hover:text-primary transition-colors relative"
              >
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link
                href="/search"
                className="p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 채팅 Drawer */}
      <ChatDrawer />
    </header>
  );
}
