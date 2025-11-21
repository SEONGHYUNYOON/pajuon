-- Supabase Auth와 연동되는 profiles 테이블 생성
-- auth.users 테이블은 Supabase가 자동으로 생성합니다.

-- 회원 등급 Enum 타입 생성
CREATE TYPE citizen_rank AS ENUM (
  '파주새댁',
  '이장',
  '동장',
  '시장',
  '명예시민'
);

-- profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT UNIQUE NOT NULL,
  school_elementary TEXT,
  school_middle TEXT,
  school_high TEXT,
  activity_points INTEGER DEFAULT 0 NOT NULL,
  citizen_rank citizen_rank DEFAULT '파주새댁' NOT NULL,
  profile_image TEXT,
  my_dongne TEXT, -- 동네별 소모임용
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 자신의 프로필을 조회할 수 있음
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 모든 사용자가 자신의 프로필을 수정할 수 있음
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 인증된 사용자가 프로필을 생성할 수 있음 (회원가입 시)
CREATE POLICY "Authenticated users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 회원가입 시 자동으로 프로필 생성하는 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_nickname TEXT;
  user_area TEXT;
  user_school_type TEXT;
  user_school_name TEXT;
  school_elem TEXT := NULL;
  school_mid TEXT := NULL;
  school_high TEXT := NULL;
BEGIN
  -- 메타데이터에서 정보 추출
  user_nickname := COALESCE(NEW.raw_user_meta_data->>'nickname', 'user_' || substr(NEW.id::text, 1, 8));
  user_area := NEW.raw_user_meta_data->>'area';
  user_school_type := NEW.raw_user_meta_data->>'school_type';
  user_school_name := NEW.raw_user_meta_data->>'school_name';
  
  -- 학교 타입에 따라 적절한 필드에 저장
  IF user_school_type = '초등학교' AND user_school_name IS NOT NULL THEN
    school_elem := user_school_name;
  ELSIF user_school_type = '중학교' AND user_school_name IS NOT NULL THEN
    school_mid := user_school_name;
  ELSIF user_school_type = '고등학교' AND user_school_name IS NOT NULL THEN
    school_high := user_school_name;
  END IF;
  
  -- 프로필 생성
  INSERT INTO public.profiles (
    id,
    nickname,
    my_dongne,
    school_elementary,
    school_middle,
    school_high
  )
  VALUES (
    NEW.id,
    user_nickname,
    user_area,
    school_elem,
    school_mid,
    school_high
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users에 새 사용자가 생성될 때 프로필 자동 생성 트리거
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS profiles_nickname_idx ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS profiles_activity_points_idx ON public.profiles(activity_points);
CREATE INDEX IF NOT EXISTS profiles_citizen_rank_idx ON public.profiles(citizen_rank);

-- 코멘트 추가
COMMENT ON TABLE public.profiles IS '사용자 프로필 정보 (Supabase Auth와 연동)';
COMMENT ON COLUMN public.profiles.id IS 'auth.users의 id와 동일 (FK)';
COMMENT ON COLUMN public.profiles.nickname IS '커뮤니티용 닉네임 (고유값)';
COMMENT ON COLUMN public.profiles.school_elementary IS '초등학교 출신';
COMMENT ON COLUMN public.profiles.school_middle IS '중학교 출신';
COMMENT ON COLUMN public.profiles.school_high IS '고등학교 출신';
COMMENT ON COLUMN public.profiles.activity_points IS '활동 점수 (기본값 0)';
COMMENT ON COLUMN public.profiles.citizen_rank IS '회원 등급 (기본값: 파주새댁)';
COMMENT ON COLUMN public.profiles.my_dongne IS '동네별 소모임용 지역 정보';

