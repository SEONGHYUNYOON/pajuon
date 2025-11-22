# 🚨 긴급: Supabase profiles 테이블 생성 가이드

## 문제 상황
- `public.profiles` 테이블이 존재하지 않음
- 회원가입 시 "Could not find the table 'public.profiles'" 에러 발생

## 해결 방법 (5분 내 완료)

### 1단계: Supabase 대시보드 접속
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택

### 2단계: SQL Editor 열기
1. 좌측 메뉴에서 **"SQL Editor"** 클릭
2. **"New query"** 버튼 클릭

### 3단계: 아래 SQL 스크립트 복사하여 실행

```sql
-- profiles 테이블 생성 (최종 버전)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  nickname TEXT NOT NULL UNIQUE,
  birthdate DATE,
  gender TEXT,
  location TEXT,
  role TEXT DEFAULT '파주새댁',
  activity_point INTEGER DEFAULT 0,
  activity_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON public.profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email) WHERE email IS NOT NULL;

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 정리
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;

-- SELECT 정책: 모든 사용자가 프로필 조회 가능 (닉네임 중복 확인용)
CREATE POLICY "Enable read access for all users"
  ON public.profiles
  FOR SELECT
  USING (true);

-- INSERT 정책: 인증된 사용자가 자신의 프로필 생성 가능
CREATE POLICY "Enable insert for authenticated users"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- UPDATE 정책: 사용자가 자신의 프로필만 수정 가능
CREATE POLICY "Enable update for users based on user_id"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE 정책: 사용자가 자신의 프로필 삭제 가능
CREATE POLICY "Enable delete for users based on user_id"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);
```

### 4단계: 실행
- SQL Editor에서 **"Run"** 버튼 클릭 (또는 `Ctrl+Enter`)

### 5단계: 스키마 캐시 갱신 (중요!)
1. 좌측 메뉴에서 **"Settings"** 클릭
2. **"API"** 탭 선택
3. **"Reload Schema Cache"** 버튼 클릭

또는:
- **"Database"** > **"Tables"** 메뉴에서 새로고침

### 6단계: 테이블 생성 확인

SQL Editor에서 다음 쿼리 실행:

```sql
-- 테이블 존재 확인
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
);

-- 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
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

### 7단계: 테스트
1. 회원가입 페이지 접속
2. 닉네임 입력 후 "중복 확인" 버튼 클릭
3. 정상 작동 확인

## 문제 해결 체크리스트

- [ ] SQL 스크립트 실행 완료
- [ ] "Success. No rows returned" 또는 성공 메시지 확인
- [ ] 스키마 캐시 갱신 완료
- [ ] 테이블 존재 확인 쿼리 결과: `true`
- [ ] RLS 정책 4개 확인 (SELECT, INSERT, UPDATE, DELETE)
- [ ] 회원가입 페이지에서 닉네임 중복 확인 테스트 성공

## 참고 사항

- 테이블 생성 후 Supabase가 스키마 캐시를 자동으로 갱신할 때까지 1-2분 걸릴 수 있습니다.
- "Reload Schema Cache" 버튼을 클릭하면 즉시 반영됩니다.
- 여전히 오류가 발생하면 브라우저 캐시를 지우고 페이지를 새로고침하세요.

