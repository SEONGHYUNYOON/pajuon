"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    // 로딩 타임아웃: 3초 후 강제로 로딩 상태 해제
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("⚠️ Loading timeout - forcing loading state to false");
        setIsLoading(false);
      }
    }, 3000);

    // 1. 초기 세션 확인 (getSession 사용 - 더 빠름)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log("✅ Initial session found");
        handleUserSet(session.user, supabase);
      } else {
        console.log("ℹ️ No initial session");
        setIsLoading(false);
      }
    });

    // 2. 로그인 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔐 Auth state changed:", event);

      if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED")) {
        console.log("✅ Session update from event");
        handleUserSet(session.user, supabase);
      } else if (event === "SIGNED_OUT") {
        console.log("❓ Signed out event received - verifying...");

        // 즉시 로그아웃 하지 않고, 진짜 세션이 없는지 더블 체크
        const { data: { user: checkUser } } = await supabase.auth.getUser();

        if (!checkUser) {
          console.log("❌ Verified: No session found. Logging out.");
          setUser(null);
          setUnreadCount(0);
          setIsLoading(false);
        } else {
          console.log("✅ False alarm: Session still exists. Ignoring SIGNED_OUT event.");
          // 세션이 있다면 다시 정보 업데이트 시도
          handleUserSet(checkUser, supabase);
        }
      }
    });

    // 페이지 포커스 시 세션 재확인 (선택적)
    const handleFocus = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session?.user && user) {
          // 로컬엔 유저가 있는데 세션이 없으면 로그아웃 처리
          setUser(null);
          setUnreadCount(0);
        } else if (session?.user && !user) {
          // 로컬엔 없는데 세션이 있으면 로그인 처리
          handleUserSet(session.user, supabase);
        }
      });
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // 사용자 정보 설정 헬퍼 함수
  const handleUserSet = async (authUser: any, supabase: any) => {
    try {
      // 프로필 확인
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, nickname")
        .eq("id", authUser.id)
        .maybeSingle();

      if (profile) {
        setUser({
          id: profile.id,
          nickname: profile.nickname || authUser.email?.split("@")[0] || "사용자",
          email: authUser.email || "",
          profileImage: null,
        });
      } else {
        setUser({
          id: authUser.id,
          nickname: authUser.email?.split("@")[0] || "사용자",
          email: authUser.email || "",
          profileImage: null,
        });
      }

      // 추가 정보 로드 (비동기)
      loadUserProfile(authUser.id, supabase);
    } catch (error) {
      console.error("Error setting user:", error);
      // 에러 나도 최소한의 정보로 로그인 유지
      setUser({
        id: authUser.id,
        nickname: authUser.email?.split("@")[0] || "사용자",
        email: authUser.email || "",
        profileImage: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string, supabase: any) => {
    try {
      // 읽지 않은 메시지 개수 확인 (에러 무시)
      try {
        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", userId)
          .eq("is_read", false);
        setUnreadCount(count || 0);
      } catch (msgError) {
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("🚪 로그아웃 시작");

      // 먼저 상태 초기화 (UI 즉시 업데이트)
      setUser(null);
      setUnreadCount(0);
      setIsDropdownOpen(false);
      setIsLoading(true); // 로딩 상태로 설정하여 깜빡임 방지

      const supabase = createClient();

      // Supabase 로그아웃 (세션 및 쿠키 삭제)
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        console.error("❌ 로그아웃 에러:", signOutError);
      } else {
        console.log("✅ 로그아웃 성공");
      }

      // 모든 Supabase 관련 쿠키 직접 삭제
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        // Supabase 관련 쿠키 삭제 (sb- 로 시작하는 쿠키)
        if (name.startsWith("sb-") || name.includes("supabase")) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      });

      // 완전한 페이지 리로드로 세션 완전히 제거
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = "/";

    } catch (error) {
      console.error("❌ 로그아웃 예외:", error);
      window.location.href = "/";
    }
  };

  // 드롭다운 외부 클릭 감지 (전역 클릭 이벤트 리스너)
  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 버튼이나 드롭다운 내부를 클릭한 경우 무시
      if (
        (buttonRef.current && buttonRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        return;
      }

      // 외부 클릭 시 드롭다운 닫기
      setIsDropdownOpen(false);
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 300);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  // 로그인하지 않은 경우: 로그인 | 회원가입 표시
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/auth/login';
          }}
          className="text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-[#0D4FFF] hover:text-white hover:border-[#0D4FFF] transition-all duration-200 shadow-sm hover:shadow-md"
          style={{ padding: '0.375rem 0.75rem' }}
        >
          로그인
        </button>
        <span className="text-gray-300 text-sm">|</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/auth/signup';
          }}
          className="text-sm font-medium text-white bg-gradient-to-r from-[#0D4FFF] to-[#3B82F6] rounded-lg hover:from-[#0A3FD9] hover:to-[#2563EB] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          style={{ padding: '0.375rem 0.75rem' }}
        >
          회원가입
        </button>
      </div>
    );
  }

  // 로그인한 경우: 프로필 드롭다운
  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const newState = !isDropdownOpen;
          setIsDropdownOpen(newState);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0D4FFF] transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
        style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.nickname}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user.nickname?.charAt(0) || "U"}
          </div>
        )}
        <span className="text-sm font-medium text-gray-900">내 정보</span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Link
            href="/my-page"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              setIsDropdownOpen(false);
            }}
          >
            내 프로필
          </Link>
          <Link
            href="/chat"
            className="relative block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              setIsDropdownOpen(false);
            }}
          >
            채팅함
            {unreadCount > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <div className="border-t border-gray-200 my-2"></div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogout();
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
