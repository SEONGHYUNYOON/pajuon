-- profiles 테이블 생성 (최종 버전)
-- Supabase 대시보드 SQL Editor에서 이 스크립트를 실행하세요

-- 1. profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  nickname TEXT NOT NULL UNIQUE,
  birthdate DATE,
  gender TEXT,
  location TEXT,
  role TEXT DEFAULT '파주새댁',
  activity_point INTEGER DEFAULT 0,
  activity_points INTEGER DEFAULT 0, -- 기존 코드 호환성을 위한 복수형도 추가
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email) WHERE email IS NOT NULL;

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. 기존 RLS 정책 정리 (중복 방지)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can insert own profile" ON public.profiles;

-- 5. RLS 정책 생성

-- SELECT 정책: 모든 사용자가 프로필을 조회할 수 있음 (닉네임 중복 확인용)
CREATE POLICY "Enable read access for all users"
  ON public.profiles
  FOR SELECT
  USING (true);

-- INSERT 정책: 인증된 사용자가 자신의 프로필을 생성할 수 있음
CREATE POLICY "Enable insert for authenticated users"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- UPDATE 정책: 사용자가 자신의 프로필만 수정할 수 있음
CREATE POLICY "Enable update for users based on user_id"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE 정책: 사용자가 자신의 프로필을 삭제할 수 있음 (선택사항)
CREATE POLICY "Enable delete for users based on user_id"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- 6. updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_profiles_updated_at_trigger ON public.profiles;
CREATE TRIGGER update_profiles_updated_at_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- 8. 테이블 생성 확인 쿼리 (실행 후 확인용)
-- SELECT EXISTS (
--   SELECT FROM information_schema.tables 
--   WHERE table_schema = 'public' 
--   AND table_name = 'profiles'
-- );

-- 9. RLS 정책 확인 쿼리 (실행 후 확인용)
-- SELECT policyname, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- AND tablename = 'profiles';

