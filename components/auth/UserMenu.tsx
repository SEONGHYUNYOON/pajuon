"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User, LogOut, Settings, Activity, ChevronDown } from "lucide-react";

interface UserProfile {
  nickname: string;
  avatar_url?: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 유저 정보 설정 및 프로필 로드
  const handleUserSet = async (authUser: any, supabase: any) => {
    try {
      setUser(authUser);

      // 프로필 정보 가져오기
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("nickname, avatar_url")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      } else {
        // 프로필이 없으면 기본값 설정
        setProfile({
          nickname: authUser.email?.split("@")[0] || "사용자",
        });
      }
    } catch (error) {
      console.error("Error setting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const supabase = createClient();

    // 1. 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleUserSet(session.user, supabase);
      } else {
        setIsLoading(false);
      }
    });

    // 2. 로그인 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED")) {
        handleUserSet(session.user, supabase);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 로딩 중일 때 (스켈레톤)
  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-[#0D4FFF] hover:text-white hover:border-[#0D4FFF] transition-all duration-200 shadow-sm hover:shadow-md px-3 py-1.5"
        >
          로그인
        </Link>
        <span className="text-gray-300 text-sm">|</span>
        <Link
          href="/auth/signup"
          className="text-sm font-medium text-white bg-gradient-to-r from-[#0D4FFF] to-[#3B82F6] rounded-lg hover:from-[#0A3FD9] hover:to-[#2563EB] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 px-3 py-1.5"
        >
          회원가입
        </Link>
      </div>
    );
  }

  // 로그인한 경우
  return (
    <div className="flex items-center gap-2 relative z-[100]">
      {/* 프로필 버튼 */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D4FFF] to-[#60A5FA] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {profile?.nickname?.substring(0, 1) || user.email?.substring(0, 1) || "U"}
          </div>
          <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
            {profile?.nickname || "내 정보"}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-left"
          >
            <div className="p-4 border-b border-gray-50 bg-gray-50/50">
              <p className="text-sm font-bold text-gray-900">{profile?.nickname || "사용자"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="p-2">
              <Link
                href="/my-page"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="w-4 h-4 text-gray-500" />
                마이페이지
              </Link>
              <Link
                href="/my-page/activity"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Activity className="w-4 h-4 text-gray-500" />
                내 활동
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="w-4 h-4 text-gray-500" />
                설정
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 로그아웃 버튼 (외부로 이동) */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
        title="로그아웃"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
