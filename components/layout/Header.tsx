"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { name: "홈", path: "/" },
  {
    name: "파주NOW",
    children: [
      { name: "오늘의 파주", path: "/now/issue" },
      { name: "파주ON 소식", path: "/news" },
      { name: "파주 신고센터", path: "/now/report" },
    ],
  },
  {
    name: "파주LIFE",
    children: [
      { name: "파주장터", path: "/life/market" },
      { name: "파주 일자리", path: "/life/jobs" },
      { name: "파주 쿠폰&제휴", path: "/life/coupon" },
      { name: "파주 맛집/카페", path: "/life/hot-place" },
      { name: "파주 육아/교육", path: "/life/education" },
    ],
  },
  {
    name: "함께해요",
    children: [
      { name: "파주ON모임", path: "/groups" },
      { name: "아이러브스쿨", path: "/school" },
      { name: "동네별 소모임", path: "/community/local" },
      { name: "반려동물ON", path: "/community/pet" },
    ],
  },
  {
    name: "파주PLAY",
    children: [
      { name: "파주ON 관광", path: "/tourism" },
      { name: "파주ON TV", path: "/play/tv" },
      { name: "파주 추억앨범", path: "/play/album" },
      { name: "ON-이벤트", path: "/events" },
      { name: "이달의 챌린지", path: "/play/challenge" },
    ],
  },
  { name: "파주MAP", path: "/map" },
  { name: "고객센터", path: "/support" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const isLoggedIn = status === "authenticated" && !!session;
  const userNickname = session?.user?.name || null;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  const isActivePath = (path?: string) => {
    if (!path) return false;
    return pathname === path || pathname.startsWith(path + "/");
  };

  const isMenuActive = (menu: MenuItem) => {
    if (menu.path && isActivePath(menu.path)) return true;
    if (menu.children) {
      return menu.children.some((child) => isActivePath(child.path));
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ON</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">PAJU ON</span>
                <span className="text-xs text-gray-500 -mt-1">파주온</span>
              </div>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {item.path ? (
                  <Link
                    href={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                      isMenuActive(item)
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                )}

                {/* 드롭다운 메뉴 */}
                {item.children && hoveredMenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActivePath(child.path)
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 사용자 메뉴 영역 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/my-page"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>{userNickname || "마이페이지"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden md:block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden md:block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
            
            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActivePath(item.path)
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div>
                      <div className="px-4 py-3 text-sm font-medium text-gray-700">
                        {item.name}
                      </div>
                      {item.children && (
                        <div className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                isActivePath(child.path)
                                  ? "bg-green-50 text-green-700 font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isLoggedIn ? (
                <>
                  <Link
                    href="/my-page"
                    className="mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircleIcon className="w-5 h-5 mr-2" />
                    {userNickname || "마이페이지"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="mt-4 px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="mt-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
