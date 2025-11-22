"use client";

import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import WeatherBadge from "@/components/home/WeatherBadge";
import UserMenu from "@/components/auth/UserMenu";
import ChatDrawer from "@/components/chat/ChatDrawer";

export default function Header() {
  return (
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 h-[60px]">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-3 items-center h-[60px]">
          {/* 좌측: UserMenu (로그인/회원가입) */}
          <div className="flex items-center justify-start" style={{ paddingLeft: '3.5rem' }}>
            <UserMenu />
          </div>

          {/* 중앙: 로고 */}
          <div className="flex items-center justify-center">
            <Link 
              href="/" 
              className="flex items-end gap-1 group relative"
            >
              {/* 파스텔 톤 배경 - 4가지 색상, ON 배지 전체를 덮도록 확장 (브러시 스트로크 스타일) */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-green-200 via-blue-200 to-pink-300 -z-10"
                style={{
                  clipPath: 'polygon(0% 20%, 5% 25%, 10% 21%, 15% 28%, 20% 24%, 25% 31%, 30% 27%, 35% 34%, 40% 30%, 45% 37%, 50% 33%, 55% 40%, 60% 36%, 65% 43%, 70% 39%, 75% 46%, 80% 42%, 85% 49%, 90% 45%, 95% 52%, 100% 48%, 100% 92%, 95% 96%, 90% 92%, 85% 98%, 80% 94%, 75% 100%, 70% 96%, 65% 100%, 60% 96%, 55% 100%, 50% 96%, 45% 100%, 40% 96%, 35% 100%, 30% 96%, 25% 100%, 20% 96%, 15% 100%, 10% 96%, 5% 100%, 0% 96%, 0% 70%)',
                  left: '-16px',
                  right: '-20px',
                  top: '-12px',
                  bottom: '-12px',
                }}
              ></span>
              
              {/* 파주에 오다 텍스트 - 먼저 표시 */}
              <span className="text-sm text-[#0D4FFF] font-medium opacity-80 group-hover:opacity-100 transition-opacity mb-0.5 hidden sm:inline-block leading-none">
                파주에 오다.
              </span>
              
              {/* PAJU 텍스트 - 커스텀 A 포함 */}
              <span className="relative inline-flex items-baseline gap-0">
                {/* P */}
                <span 
                  className="text-3xl font-bold" 
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: '#0D4FFF',
                    letterSpacing: '0.03em',
                    fontWeight: 700,
                  }}
                >
                  P
                </span>
                
                {/* 커스텀 A (chevron 크로스바) - 사이즈 조금 더 키움 */}
                <span className="relative inline-flex items-center justify-center" style={{ width: '0.95em', height: '1.1em', marginLeft: '-0.05em', marginRight: '-0.05em' }}>
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* A의 왼쪽 다리 */}
                    <path 
                      d="M 10 85 L 50 15" 
                      stroke="#0D4FFF" 
                      strokeWidth="11" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* A의 오른쪽 다리 */}
                    <path 
                      d="M 50 15 L 90 85" 
                      stroke="#0D4FFF" 
                      strokeWidth="11" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Chevron 크로스바 (위쪽을 가리키는 화살표) */}
                    <path 
                      d="M 30 50 L 50 30 L 70 50" 
                      stroke="#0D4FFF" 
                      strokeWidth="11" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                
                {/* JU */}
                <span 
                  className="text-3xl font-bold" 
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: '#0D4FFF',
                    letterSpacing: '0.03em',
                    fontWeight: 700,
                  }}
                >
                  JU
                </span>
              </span>
              
              {/* On 배지 - 전원 버튼이 O를 대체 */}
              <span className="relative inline-flex items-center justify-center">
                {/* 외부 글로우 효과 (펄스 애니메이션) */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#0D4FFF] via-[#3B82F6] to-[#60A5FA] rounded-full blur-md opacity-50 group-hover:opacity-70 animate-pulse"></span>
                
                {/* 토글 스위치 스타일 배지 - On처럼 보이게 */}
                <span className="relative inline-flex items-center gap-0 bg-gradient-to-br from-[#0D4FFF] via-[#2563EB] to-[#1E40AF] text-white px-5 py-2.5 rounded-full text-[1.375rem] font-bold shadow-2xl transform group-hover:scale-110 group-hover:shadow-[#0D4FFF]/50 transition-all duration-300 overflow-hidden leading-none">
                  {/* 전원 버튼 아이콘 (O처럼 보이게 - 텍스트와 정확히 같은 크기) */}
                  <span className="relative inline-flex items-center justify-center leading-none" style={{ width: '1em', height: '1em', marginRight: '-0.15em', verticalAlign: 'baseline' }}>
                    {/* 원 + 선 (전원 버튼) */}
                    <svg 
                      className="w-full h-full text-white" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ display: 'inline-block', verticalAlign: 'baseline' }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="8" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                      <path 
                        d="M12 8 L12 4" 
                        className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                      />
                    </svg>
                    {/* 발광 효과 */}
                    <span className="absolute inset-0 text-white opacity-40 animate-ping pointer-events-none">
                      <svg 
                        className="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8 L12 4" />
                      </svg>
                    </span>
                  </span>
                  
                  {/* n 텍스트 (O와 붙여서 On처럼 보이게) */}
                  <span className="relative z-10 font-bold leading-none">n</span>
                  
                  {/* 배경 움직이는 그라데이션 */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </span>
              </span>
            </Link>
          </div>

          {/* 우측: 검색 아이콘 */}
          <div className="flex items-center justify-end gap-4" style={{ paddingRight: '3.5rem' }}>
            <WeatherBadge />
            <button
              type="button"
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
