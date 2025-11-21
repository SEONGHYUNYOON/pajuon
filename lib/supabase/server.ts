/**
 * Supabase 서버 클라이언트 (서버 사이드용)
 * 
 * 환경 변수 필요:
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase Anon Key
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase Service Role Key (서버 전용, 선택사항)
 * 
 * .env.local 파일에 추가:
 * NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 * SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (선택사항)
 */

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Next.js App Router용 서버 클라이언트 (쿠키 기반)
// 주의: @supabase/auth-helpers-nextjs 패키지가 필요한 경우 설치 필요
// npm install @supabase/auth-helpers-nextjs
export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  // 쿠키에서 세션 정보 가져오기
  const cookieStore = cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      ...(accessToken && refreshToken && {
        storage: {
          getItem: (key: string) => {
            if (key === "sb-access-token") return accessToken;
            if (key === "sb-refresh-token") return refreshToken;
            return null;
          },
          setItem: () => {},
          removeItem: () => {},
        },
      }),
    },
  });
}

// Service Role Key를 사용한 관리자 클라이언트 (서버 전용)
export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }

  if (!supabaseServiceRoleKey) {
    console.warn(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Admin client will not be available."
    );
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// 직접 서버 클라이언트 생성
export function createSupabaseServerClientDirect() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

