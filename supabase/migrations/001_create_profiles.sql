-- profiles 테이블 생성
-- 회원가입 및 사용자 프로필 정보 저장용

-- profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL UNIQUE,
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

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS 정책 삭제 (기존 정책이 있다면)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;

-- RLS 정책 생성
-- 1. 모든 사용자(익명 포함)가 프로필을 조회할 수 있음 (닉네임 중복 확인용)
CREATE POLICY "Enable read access for all users"
  ON public.profiles
  FOR SELECT
  USING (true);

-- 2. 인증된 사용자가 자신의 프로필을 생성할 수 있음
CREATE POLICY "Enable insert for authenticated users"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. 사용자가 자신의 프로필을 업데이트할 수 있음
CREATE POLICY "Enable update for users based on user_id"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. 사용자가 자신의 프로필을 삭제할 수 있음 (선택사항)
CREATE POLICY "Enable delete for users based on user_id"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- auth.users에 새 유저가 생성될 때 profiles 테이블에 자동으로 행을 생성하는 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nickname', '파주시민' || substr(NEW.id::text, 1, 8)),
    '파주새댁'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 주석 추가
COMMENT ON TABLE public.profiles IS '사용자 프로필 정보 테이블';
COMMENT ON COLUMN public.profiles.id IS 'auth.users의 id와 동일 (FK)';
COMMENT ON COLUMN public.profiles.nickname IS '사용자 닉네임 (중복 불가)';
COMMENT ON COLUMN public.profiles.role IS '사용자 등급 (파주새댁, 이장, 동장, 시장, 명예시민 등)';
COMMENT ON COLUMN public.profiles.activity_points IS '활동 포인트 (게시글, 댓글 등)';

