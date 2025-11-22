-- profiles 테이블 존재 여부 확인 및 생성 (재확인용)
-- 만약 테이블이 이미 존재하더라도 에러 없이 실행되도록 IF NOT EXISTS 사용

-- 1. profiles 테이블이 없으면 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  birth_date DATE,
  gender TEXT,
  location TEXT,
  role TEXT DEFAULT '파주새댁',
  activity_points INTEGER DEFAULT 0,
  my_dongne TEXT,
  school_elementary TEXT,
  school_middle TEXT,
  school_high TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. nickname UNIQUE 제약조건 추가 (이미 있으면 에러 무시)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_nickname_key' 
    AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_nickname_key UNIQUE (nickname);
  END IF;
END $$;

-- 3. 인덱스 생성 (이미 있으면 무시)
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 4. RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. 기존 RLS 정책 정리 및 재생성
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;

-- RLS 정책 재생성
-- 모든 사용자가 프로필을 조회할 수 있음 (닉네임 중복 확인용)
CREATE POLICY "Enable read access for all users"
  ON public.profiles
  FOR SELECT
  USING (true);

-- 인증된 사용자가 자신의 프로필을 생성할 수 있음
CREATE POLICY "Enable insert for authenticated users"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 사용자가 자신의 프로필을 업데이트할 수 있음
CREATE POLICY "Enable update for users based on user_id"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 사용자가 자신의 프로필을 삭제할 수 있음
CREATE POLICY "Enable delete for users based on user_id"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- 6. 스키마 캐시 갱신 힌트 (Supabase 대시보드에서 수동으로 해야 함)
-- 참고: Supabase 대시보드 > Settings > API > "Reload Schema Cache" 버튼 클릭 필요

-- 7. 기존 RLS 정책 업데이트 (닉네임 중복 확인을 위해 모든 사용자가 조회 가능하도록)
-- 만약 "Users can view own profile" 정책이 있다면 업데이트
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- 모든 사용자가 프로필을 조회할 수 있음 (닉네임 중복 확인용)
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (true);

