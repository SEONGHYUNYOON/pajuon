/**
 * Next.js Middleware
 * Supabase 세션 갱신 및 보호된 라우트 관리
 */

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // 인증 페이지는 세션 체크 전에 먼저 확인 (리다이렉트 완전 차단)
  const authPaths = ["/auth/login", "/auth/signup", "/auth/verify-email", "/auth/forgot-password"];
  const isAuthPath = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 인증 페이지는 어떤 상황에서도 접근 허용 (세션 체크 전에 처리)
  if (isAuthPath) {
    return supabaseResponse;
  }

  // 세션 갱신 (인증 페이지가 아닐 때만 실행)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 보호된 라우트 정의
  const protectedPaths = ["/my-page", "/groups/create", "/events/camping/write"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 인증이 필요한 페이지에 비로그인 사용자 접근 시 리다이렉트
  if (isProtectedPath && !user) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

