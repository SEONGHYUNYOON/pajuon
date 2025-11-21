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
    name: "커뮤니티",
    children: [
      { name: "등산 모임", path: "/community/hiking" },
      { name: "라이딩 모임", path: "/community/riding" },
      { name: "고지 축구", path: "/community/goji-soccer" },
      { name: "자유게시판", path: "/community/general" },
    ],
  },
  {
    name: "아이러브스쿨",
    children: [
      { name: "우리 학교 동창 찾기", path: "/school" },
    ],
  },
  {
    name: "만남과 이벤트",
    children: [
      { name: "함께 캠핑하기", path: "/events/camping" },
      { name: "선남선녀 미팅", path: "/events/matchmaking" },
    ],
  },
  {
    name: "파주 소식 & 핫플",
    children: [
      { name: "파주 뉴스", path: "/news" },
      { name: "맛집/카페 추천", path: "/life/hot-place" },
    ],
  },
  {
    name: "관광 & 정보",
    children: [
      { name: "DMZ 땅굴 관광 가이드", path: "/tourism/dmz" },
      { name: "생활 정보", path: "/tourism/info" },
    ],
  },
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-paju-blue rounded-xl flex items-center justify-center shadow-sm transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl md:text-2xl">ON</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-paju-blue">PAJU ON</span>
                <span className="text-xs md:text-sm text-gray-600 -mt-1 font-medium">파주온</span>
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? "bg-paju-blue text-white shadow-sm"
                        : "text-gray-600 hover:text-paju-blue hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                      isMenuActive(item)
                        ? "bg-paju-blue text-white shadow-sm"
                        : "text-gray-600 hover:text-paju-blue hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                )}

                {/* 드롭다운 메뉴 */}
                {item.children && hoveredMenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`block px-4 py-3 text-sm transition-all duration-200 ${
                          isActivePath(child.path)
                            ? "bg-paju-blue/10 text-paju-blue font-semibold border-l-4 border-paju-blue"
                            : "text-gray-600 hover:bg-gray-50 hover:text-paju-blue"
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
          <div className="flex items-center space-x-2 md:space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/my-page"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>{userNickname || "마이페이지"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-3 py-2 md:px-4 md:py-2 bg-paju-blue text-white rounded-lg text-sm font-semibold hover:bg-paju-blue-dark transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden sm:block px-3 py-2 md:px-4 md:py-2 bg-white text-paju-blue border border-paju-blue rounded-lg text-sm font-semibold hover:bg-paju-blue/5 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  회원가입
                </Link>
              </>
            )}
            
            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-white/80 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
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
          <nav className="lg:hidden pb-4 border-t border-gray-100 mt-2 pt-4 bg-white/95 backdrop-blur-sm rounded-b-lg">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                          ? "bg-paju-blue text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-paju-blue"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div>
                      <div className="px-4 py-3 text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg">
                        {item.name}
                      </div>
                      {item.children && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                isActivePath(child.path)
                                  ? "bg-paju-blue/10 text-paju-blue font-semibold border-l-4 border-paju-blue"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-paju-blue"
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
                    className="mt-4 px-4 py-3 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-paju-blue transition-all duration-200 shadow-sm flex items-center justify-center border border-gray-200"
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
                    className="mt-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="mt-4 px-4 py-3 bg-paju-blue text-white rounded-lg text-sm font-semibold hover:bg-paju-blue-dark transition-all duration-200 shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="mt-2 px-4 py-3 bg-white text-paju-blue border border-paju-blue rounded-lg text-sm font-semibold hover:bg-paju-blue/5 transition-all duration-200 shadow-sm"
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
