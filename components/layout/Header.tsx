"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">ON</span>
            </div>
            <span className="text-xl font-bold text-gray-900">파주온</span>
          </Link>

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
