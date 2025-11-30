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
    // 로딩 타임아웃: 3초 후 강제로 로딩 상태 해제 (무한 로딩 방지)
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("⚠️ Loading timeout - forcing loading state to false");
        setIsLoading(false);
      }
    }, 3000);
    
    // 초기 세션 확인
    checkUser();
    
    // 로그인 상태 변경 감지
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔐 Auth state changed:", event, session?.user?.id);
      
      if (session?.user && event === "SIGNED_IN") {
        console.log("✅ Session found, checking profile...");
        
        // 프로필이 실제로 있는지 먼저 확인
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, nickname")
          .eq("id", session.user.id)
          .maybeSingle();
        
        if (profile) {
          console.log("✅ Valid login: profile exists");
          // 프로필 정보로 사용자 설정
          setUser({
            id: profile.id,
            nickname: profile.nickname || session.user.email?.split("@")[0] || "사용자",
            email: session.user.email || "",
            profileImage: null,
          });
          
          // 추가 프로필 정보 로드
          loadUserProfile(session.user.id).catch((err) => {
            console.error("Profile load failed:", err);
          });
        } else {
          console.log("⚠️ Session exists but profile not found - using session data");
          // 프로필이 없으면 세션 정보로 기본값 설정
          setUser({
            id: session.user.id,
            nickname: session.user.email?.split("@")[0] || "사용자",
            email: session.user.email || "",
            profileImage: null,
          });
          
          // 추가 프로필 정보 로드 시도 (백그라운드)
          loadUserProfile(session.user.id).catch((err) => {
            console.error("Profile load failed:", err);
          });
        }
      } else if (event === "SIGNED_OUT" || !session?.user) {
        console.log("❌ No session, clearing user state");
        setUser(null);
        setUnreadCount(0);
        setIsLoading(false);
      } else if (event === "INITIAL_SESSION") {
        // 초기 세션 확인 완료 (이미 checkUser()에서 처리됨)
        console.log("🔍 Initial session check completed");
        setIsLoading(false);
      } else {
        // 기타 이벤트
        console.log("🔍 Auth event:", event);
        setIsLoading(false);
      }
    });

    // 페이지 포커스 시 세션 재확인
    const handleFocus = () => {
      checkUser();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const checkUser = async () => {
    try {
      const supabase = createClient();
      
      // 타임아웃과 함께 세션 확인 (무한 대기 방지)
      const sessionCheckPromise = Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession()
      ]);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Session check timeout")), 2000);
      });
      
      let user, session, userError, sessionError;
      
      try {
        const [userResult, sessionResult] = await Promise.race([
          sessionCheckPromise,
          timeoutPromise
        ]) as any[];
        
        user = userResult?.data?.user;
        userError = userResult?.error;
        session = sessionResult?.data?.session;
        sessionError = sessionResult?.error;
      } catch (timeoutErr) {
        console.log("⚠️ Session check timeout - assuming logged out");
        setUser(null);
        setUnreadCount(0);
        setIsLoading(false);
        return;
      }
      
      console.log("🔍 User check:", {
        user: user?.id,
        session: session?.user?.id,
        hasUser: !!user,
        hasSession: !!session,
        userError: userError?.message,
        sessionError: sessionError?.message
      });
      
      // 세션과 사용자가 있고, 에러가 없는 경우만 로그인 상태로 인정
      if (user && session?.user && !userError && !sessionError) {
        // 프로필이 실제로 있는지 먼저 확인 (타임아웃 포함)
        const profileCheckPromise = supabase
          .from("profiles")
          .select("id, nickname")
          .eq("id", user.id)
          .maybeSingle();
        
        const profileTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Profile check timeout")), 2000);
        });
        
        let profile, profileError;
        
        try {
          const profileResult = await Promise.race([
            profileCheckPromise,
            profileTimeoutPromise
          ]) as any;
          
          profile = profileResult?.data;
          profileError = profileResult?.error;
        } catch (timeoutErr) {
          console.log("⚠️ Profile check timeout - assuming no profile");
          profile = null;
          profileError = null;
        }
        
        console.log("🔍 Profile check:", {
          hasProfile: !!profile,
          profileError: profileError?.message
        });
        
        // 프로필이 있는 경우만 로그인 상태로 인정
        if (profile) {
          console.log("✅ Valid login: user and profile both exist");
          // 프로필 정보로 사용자 설정
          setUser({
            id: profile.id,
            nickname: profile.nickname || user.email?.split("@")[0] || "사용자",
            email: user.email || "",
            profileImage: null,
          });
          
          // 추가 프로필 정보는 나중에 로드 (비동기, 에러 무시)
          loadUserProfile(user.id).catch((err) => {
            console.error("Profile load failed:", err);
          });
        } else {
          // 세션은 있지만 프로필이 없으면 세션 정보로 기본값 설정
          console.log("⚠️ Session exists but profile not found - using session data");
          setUser({
            id: user.id,
            nickname: user.email?.split("@")[0] || "사용자",
            email: user.email || "",
            profileImage: null,
          });
          
          // 추가 프로필 정보는 나중에 로드 (비동기, 에러 무시)
          loadUserProfile(user.id).catch((err) => {
            console.error("Profile load failed:", err);
          });
        }
      } else {
        // 세션이 없거나 에러가 있으면 로그아웃 상태
        console.log("❌ No valid session - logged out");
        setUser(null);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to check user:", error);
      setUser(null);
      setUnreadCount(0);
    } finally {
      // 항상 로딩 상태 해제
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const supabase = createClient();
      
      console.log("🔍 Loading profile for user:", userId);
      
      // 프로필 정보 가져오기 (에러 상세 로깅)
      // profiles 테이블의 실제 스키마에 맞춰 필드 선택
      // 007_create_profiles_table_simple.sql 기준: id, email, nickname, birthdate, gender, location, role, activity_point, activity_points
      // profile_image 필드는 없음!
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, nickname, email")
        .eq("id", userId)
        .maybeSingle(); // single 대신 maybeSingle 사용 (없어도 에러 안남)

      if (profileError) {
        console.error("❌ Profile query error:", profileError);
        console.error("Error details:", {
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint
        });
        // 에러가 있어도 세션 정보는 유지
        return;
      }

      // 세션에서 이메일 가져오기 (profiles 테이블에는 email이 없음)
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const userEmail = authUser?.email || "";

      if (profile) {
        console.log("✅ Profile loaded:", profile.nickname);
        // 프로필이 있으면 프로필 정보로 업데이트
        setUser({
          id: profile.id,
          nickname: profile.nickname || profile.email?.split("@")[0] || userEmail?.split("@")[0] || "사용자",
          email: profile.email || userEmail,
          profileImage: null, // profile_image 필드가 테이블에 없음
        });
      } else {
        // 프로필이 없으면 세션 정보로 기본값 설정
        console.log("⚠️ Profile not found for user:", userId, "- using session data");
        if (authUser) {
          setUser({
            id: authUser.id,
            nickname: authUser.email?.split("@")[0] || "사용자",
            email: userEmail,
            profileImage: null,
          });
        }
      }

      // 읽지 않은 메시지 개수 확인 (에러 무시)
      try {
        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("receiver_id", userId)
          .eq("is_read", false);
        setUnreadCount(count || 0);
      } catch (msgError) {
        // 메시지 테이블이 없거나 에러가 나도 무시
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
      // 프로필 로드 실패해도 세션 정보는 이미 설정되어 있으므로 무시
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
      // 약간의 지연을 주어 쿠키 삭제가 확실히 완료되도록 함
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = "/";
      
    } catch (error) {
      console.error("❌ 로그아웃 예외:", error);
      // 에러가 발생해도 강제로 리로드
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
        console.log("🔘 내부 클릭 감지, 드롭다운 유지");
        return;
      }
      
      // 외부 클릭 시 드롭다운 닫기
      console.log("🔘 외부 클릭, 드롭다운 닫기");
      setIsDropdownOpen(false);
    };

    // 더 긴 지연 후 이벤트 리스너 추가 (버튼 클릭 이벤트가 완전히 처리되고 드롭다운이 렌더링된 후)
    const timer = setTimeout(() => {
      // click 이벤트로 변경 (mousedown은 버튼 클릭과 충돌할 수 있음)
      document.addEventListener("click", handleClickOutside, true); // capture phase에서 처리
    }, 300); // 100ms -> 300ms로 증가

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  // 로딩 중이어도 로그인/회원가입 버튼은 클릭 가능하게 함 (블로킹 방지)

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
          console.log("🔘 내 정보 버튼 클릭, 드롭다운:", newState ? "열기" : "닫기");
          
          // 즉시 상태 변경하여 드롭다운 표시
          setIsDropdownOpen(newState);
        }}
        onMouseDown={(e) => {
          // mousedown에서 이벤트 전파 차단 (전역 리스너와의 충돌 방지)
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
                console.log("🔘 내 프로필 클릭");
                setIsDropdownOpen(false);
              }}
            >
              내 프로필
            </Link>
            <Link
              href="/chat"
              className="relative block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                console.log("🔘 채팅함 클릭");
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
                console.log("🔘 로그아웃 클릭");
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
