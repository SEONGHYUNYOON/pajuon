"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    checkUser();
    
    // 로그인 상태 변경 감지
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const supabase = createClient();
      // getSession으로 빠르게 세션 확인 (이중 체크)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to check user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, nickname, email, profile_image")
        .eq("id", userId)
        .single();

      if (profile) {
        setUser({
          id: profile.id,
          nickname: profile.nickname || profile.email?.split("@")[0] || "사용자",
          email: profile.email,
          profileImage: profile.profile_image,
        });
      }

      // 읽지 않은 메시지 개수 확인
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", userId)
        .eq("is_read", false);

      setUnreadCount(count || 0);
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  // 로그인하지 않은 경우: 로그인 | 회원가입 표시
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/auth/login';
          }}
          className="text-sm text-gray-600 hover:text-[#0D4FFF] transition-colors font-medium"
        >
          로그인
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/auth/signup';
          }}
          className="text-sm text-gray-600 hover:text-[#0D4FFF] transition-colors font-medium"
        >
          회원가입
        </button>
      </div>
    );
  }

  // 로그인한 경우: 프로필 드롭다운
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0D4FFF] transition-colors rounded-lg hover:bg-gray-50"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.nickname}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user.nickname.charAt(0)}
          </div>
        )}
        <span className="text-sm font-medium text-gray-900">내 정보</span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <Link
              href="/my-page"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              내 프로필
            </Link>
            <Link
              href="/chat"
              className="relative block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
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
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}
