/**
 * Supabase 미들웨어 클라이언트
 * Next.js Middleware에서 사용
 * 
 * 환경 변수 필요:
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase Anon Key
 * 
 * 사용 예시:
 * import { createClient } from '@/utils/supabase/middleware'
 * const supabase = createClient(request)
 */

import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export function createClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        request.cookies.set(name, value);
        supabaseResponse = NextResponse.next({
          request,
        });
        supabaseResponse.cookies.set(name, value, options);
      },
      remove(name: string, options: any) {
        request.cookies.delete(name);
        supabaseResponse = NextResponse.next({
          request,
        });
        supabaseResponse.cookies.delete(name);
      },
    },
  });

  return { supabase, supabaseResponse };
}

