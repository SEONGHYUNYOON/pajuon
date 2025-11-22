# 🚨 긴급: Supabase profiles 테이블 생성 가이드

## 문제 상황
회원가입 시도 시 다음 오류 발생:
```
Could not find the table 'public.profiles' in the schema cache
```

## 해결 방법

### 방법 1: Supabase 대시보드에서 SQL 실행 (권장)

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard 접속
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 좌측 메뉴에서 **"SQL Editor"** 클릭
   - **"New query"** 버튼 클릭

3. **SQL 스크립트 실행**
   - 아래 SQL 스크립트를 복사하여 SQL Editor에 붙여넣기
   - **"Run"** 버튼 클릭

```sql
-- profiles 테이블 생성
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

-- nickname UNIQUE 제약조건 추가
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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 기존 RLS 정책 정리
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;

-- RLS 정책 생성
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
```

4. **스키마 캐시 갱신**
   - 좌측 메뉴에서 **"Settings"** 클릭
   - **"API"** 탭 선택
   - **"Reload Schema Cache"** 버튼 클릭
   - 또는 **"Database"** > **"Tables"** 메뉴에서 새로고침

### 방법 2: 마이그레이션 파일 직접 실행

프로젝트에 이미 다음 마이그레이션 파일들이 있습니다:
- `supabase/migrations/001_create_profiles.sql`
- `supabase/migrations/006_fix_profiles_table.sql`

위 파일의 내용을 Supabase SQL Editor에서 실행하세요.

## 테이블 확인 방법

SQL Editor에서 다음 쿼리를 실행하여 테이블이 생성되었는지 확인:

```sql
-- 테이블 존재 여부 확인
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
);

-- 테이블 구조 확인
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- RLS 정책 확인
SELECT policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'profiles';
```

## 문제 해결 체크리스트

- [ ] `profiles` 테이블이 생성되었는지 확인
- [ ] `nickname` 컬럼에 UNIQUE 제약조건이 있는지 확인
- [ ] RLS 정책이 올바르게 설정되었는지 확인
- [ ] Supabase 스키마 캐시를 갱신했는지 확인
- [ ] 회원가입 페이지에서 닉네임 중복 확인이 작동하는지 테스트

## 참고 사항

- 테이블 생성 후 Supabase가 스키마 캐시를 자동으로 갱신할 때까지 몇 분이 걸릴 수 있습니다.
- "Reload Schema Cache" 버튼을 클릭하면 즉시 반영됩니다.
- 여전히 오류가 발생하면 브라우저 캐시를 지우고 페이지를 새로고침하세요.

