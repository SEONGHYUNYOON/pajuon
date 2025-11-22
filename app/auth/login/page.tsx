"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/utils/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("🔐 === LOGIN START ===");
      console.log("📧 Email:", formData.email);
      
      // 환경 변수 확인
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log("🔍 Environment check:", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "MISSING"
      });
      
      if (!supabaseUrl || !supabaseKey) {
        setIsLoading(false);
        const errorMsg = "Supabase 환경 변수가 설정되지 않았습니다. 서버를 재시작해주세요.";
        console.error("❌ Missing environment variables");
        setError(errorMsg);
        alert(errorMsg);
        return;
      }
      
      // Supabase 클라이언트 생성
      console.log("🔧 Creating Supabase client...");
      let supabase;
      try {
        supabase = createClient();
        console.log("✅ Supabase client created successfully");
      } catch (clientErr: any) {
        setIsLoading(false);
        console.error("❌ Failed to create Supabase client:", clientErr);
        const errorMsg = `Supabase 클라이언트 생성 실패: ${clientErr.message}`;
        setError(errorMsg);
        alert(errorMsg);
        return;
      }
      
      // 인증 상태 변경 리스너를 먼저 설정 (SIGNED_IN 이벤트 감지)
      let loginCompleted = false;
      let redirectTimeout: NodeJS.Timeout | null = null;
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("🔐 Auth state changed:", event, session?.user?.id);
        
        if (event === "SIGNED_IN" && session?.user) {
          if (loginCompleted) return; // 이미 처리됨
          loginCompleted = true;
          
          console.log("✅ Login confirmed via SIGNED_IN event");
          console.log("👤 User ID:", session.user.id);
          
          // 리다이렉트 타임아웃 정리
          if (redirectTimeout) {
            clearTimeout(redirectTimeout);
          }
          
          // 세션이 쿠키에 저장될 시간 확보
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const callbackUrl = searchParams.get("callbackUrl") || "/";
          console.log("🚀 Redirecting to:", callbackUrl);
          
          // 리스너 정리
          subscription.unsubscribe();
          
          // 완전한 페이지 새로고침으로 쿠키 동기화
          window.location.href = callbackUrl;
        }
      });
      
      // 로그인 요청 (타임아웃 포함)
      console.log("📡 Sending login request to Supabase...");
      const requestStart = Date.now();
      
      // 타임아웃과 함께 로그인 요청
      const loginPromise = supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        redirectTimeout = setTimeout(() => {
          reject(new Error("로그인 요청 타임아웃 (10초)"));
        }, 10000);
      });
      
      try {
        const { data, error: signInError } = await Promise.race([
          loginPromise,
          timeoutPromise
        ]) as { data: any; error: any };
        
        // 타임아웃 정리
        if (redirectTimeout) {
          clearTimeout(redirectTimeout);
        }
        
        const requestDuration = Date.now() - requestStart;
        console.log(`📡 Response received (${requestDuration}ms)`);
        
        if (signInError) {
          console.error("❌ Login error:", signInError);
          
          // 리스너 정리
          subscription.unsubscribe();
          
          const errorMessage = signInError.message || "이메일 또는 비밀번호가 올바르지 않습니다.";
          setError(errorMessage);
          alert(errorMessage);
          setIsLoading(false);
          return;
        }
        
        // 응답을 받았지만 이미 SIGNED_IN 이벤트로 처리되었을 수 있음
        if (data?.user && !loginCompleted) {
          console.log("✅ === LOGIN SUCCESS (from response) ===");
          console.log("👤 User ID:", data.user.id);
          console.log("🔑 Has Session:", !!data.session);
          
          loginCompleted = true;
          
          // 세션이 쿠키에 저장될 시간 확보
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // 리스너 정리
          subscription.unsubscribe();
          
          const callbackUrl = searchParams.get("callbackUrl") || "/";
          console.log("🚀 Redirecting to:", callbackUrl);
          
          window.location.href = callbackUrl;
          return;
        } else if (!data?.user) {
          console.error("❌ Login failed: user is null");
          
          // 리스너 정리
          subscription.unsubscribe();
          
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          setIsLoading(false);
        }
        // loginCompleted가 true면 SIGNED_IN 이벤트에서 처리됨
      } catch (timeoutError: any) {
        // 타임아웃 발생
        if (redirectTimeout) {
          clearTimeout(redirectTimeout);
        }
        
        console.error("❌ Login timeout:", timeoutError);
        
        // 리스너 정리
        subscription.unsubscribe();
        
        // 하지만 SIGNED_IN 이벤트가 발생했을 수 있으므로 조금 더 기다림
        if (!loginCompleted) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          if (!loginCompleted) {
            setError("로그인 요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.");
            alert("로그인 요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.");
            setIsLoading(false);
          }
        }
      }
    } catch (err: any) {
      console.error("❌ === LOGIN EXCEPTION ===");
      console.error("❌ Error:", err);
      console.error("❌ Error message:", err?.message);
      console.error("❌ Error stack:", err?.stack);
      
      let errorMessage = "로그인 중 오류가 발생했습니다.";
      if (err?.message?.includes("fetch") || err?.message?.includes("network") || err?.code === "ECONNREFUSED") {
        errorMessage = "네트워크 오류가 발생했습니다. 브라우저 개발자 도구(F12)의 Network 탭에서 요청 상태를 확인해주세요.";
      } else if (err?.message?.includes("Missing Supabase")) {
        errorMessage = "Supabase 설정이 누락되었습니다. 서버를 재시작해주세요.";
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex items-center justify-center">
              {/* 외부 글로우 효과 */}
              <span className="absolute inset-0 bg-gradient-to-br from-[#0D4FFF] via-[#3B82F6] to-[#60A5FA] rounded-full blur-md opacity-50 animate-pulse"></span>
              
              {/* On 배지 - 전원 버튼이 O를 대체 */}
              <span className="relative inline-flex items-center gap-0 bg-gradient-to-br from-[#0D4FFF] via-[#2563EB] to-[#1E40AF] text-white px-8 py-4 rounded-full text-3xl font-bold shadow-2xl transform hover:scale-110 hover:shadow-[#0D4FFF]/50 transition-all duration-300 leading-none">
                {/* 전원 버튼 아이콘 */}
                <span className="relative inline-flex items-center justify-center leading-none" style={{ width: '1em', height: '1em', marginRight: '-0.15em', verticalAlign: 'baseline' }}>
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
                
                {/* n 텍스트 */}
                <span className="relative z-10 font-bold leading-none">n</span>
                
                {/* 배경 움직이는 그라데이션 */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></span>
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-lg text-gray-600">
            파주온에 오신 것을 환영합니다
          </p>
          <p className="mt-1 text-sm text-gray-500">
            파주 시민을 위한, 파주 시민에 의한 커뮤니티
          </p>
        </div>

        {/* 로그인 폼 */}
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* 이메일 */}
            <Input
              label="이메일"
              type="email"
              required
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={error && !formData.email ? "이메일을 입력해주세요" : undefined}
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              required
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={error && !formData.password ? "비밀번호를 입력해주세요" : undefined}
            />

            {/* 비밀번호 찾기 및 로그인 상태 유지 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  로그인 상태 유지
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          {/* 구분선 */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>
          </div>

          {/* 소셜 로그인 */}
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-yellow-400"
            >
              <span className="mr-2">💬</span>
              카카오 로그인
            </Button>
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="bg-green-500 hover:bg-green-600 text-white border-green-500"
            >
              <span className="mr-2">N</span>
              네이버 로그인
            </Button>
            <Button
              type="button"
              variant="outline"
              fullWidth
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              구글 로그인
            </Button>
          </div>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              아직 회원이 아니신가요?{" "}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-700">
                회원가입
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
