/**
 * Supabase 클라이언트 (브라우저용)
 * Next.js App Router에서 클라이언트 컴포넌트에서 사용
 * 
 * 환경 변수 필요:
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase Anon Key
 * 
 * 사용 예시:
 * import { createClient } from '@/utils/supabase/client'
 * const supabase = createClient()
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

