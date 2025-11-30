# 🚀 Supabase 처음부터 배포 가이드

새로 승인받은 Supabase 프로젝트를 처음부터 설정하는 단계별 가이드입니다.

## 📋 체크리스트

- [ ] 1단계: Supabase API 키 가져오기
- [ ] 2단계: 환경 변수 설정
- [ ] 3단계: 데이터베이스 마이그레이션 실행
- [ ] 4단계: 개발 서버 실행 및 테스트
- [ ] 5단계: (선택) 추가 기능 설정

---

## 1단계: Supabase API 키 가져오기

### 1.1 Supabase 대시보드 접속

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 (방금 승인받은 프로젝트)

### 1.2 API 키 가져오기

1. 왼쪽 사이드바에서 **Settings** (⚙️ 아이콘) 클릭
2. **API** 메뉴 클릭
3. 다음 정보를 복사해두세요:

   **📌 Project URL**
   ```
   https://xxxxx.supabase.co
   ```
   - 이 값은 `NEXT_PUBLIC_SUPABASE_URL`에 사용됩니다

   **📌 anon public key**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   - 이 값은 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 사용됩니다
   - "anon public" 또는 "public anon key"라고 표시된 키입니다

   **📌 service_role key** (선택사항)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   - 서버 사이드에서만 사용 (주의: 절대 클라이언트에 노출하지 마세요!)
   - "service_role" 키입니다

### 1.3 Database 연결 문자열 가져오기 (Prisma 사용 시)

1. **Settings** → **Database** 메뉴 클릭
2. **Connection string** 섹션에서 **URI** 탭 선택
3. 연결 문자열 복사:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
   ```
   ⚠️ **중요**: `[YOUR-PASSWORD]`를 프로젝트 생성 시 설정한 데이터베이스 비밀번호로 교체하세요!

---

## 2단계: 환경 변수 설정

### 2.1 .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하세요.

### 2.2 환경 변수 추가

`.env.local` 파일에 다음 내용을 추가하세요:

```env
# ============================================
# Supabase 설정 (필수)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# ============================================
# Database 연결 (Prisma 사용 시)
# ============================================
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require

# ============================================
# NextAuth 설정 (NextAuth 사용 시)
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# ============================================
# Service Role Key (서버 전용, 선택사항)
# ============================================
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2.3 실제 값으로 교체

위의 예시 값들을 1단계에서 복사한 실제 값으로 교체하세요:

- `https://your-project-id.supabase.co` → 실제 Project URL
- `your-anon-key-here` → 실제 anon public key
- `YOUR_PASSWORD` → 실제 데이터베이스 비밀번호
- `your-secret-key-here` → NEXTAUTH_SECRET 생성 (아래 참고)

### 2.4 NEXTAUTH_SECRET 생성 (NextAuth 사용 시)

터미널에서 다음 명령어 실행:

```bash
# Windows PowerShell
openssl rand -base64 32

# 또는 온라인 생성기 사용
# https://randomkeygen.com/
```

생성된 값을 `NEXTAUTH_SECRET`에 사용하세요.

---

## 3단계: 데이터베이스 마이그레이션 실행

### 3.1 Supabase SQL Editor에서 실행 (권장)

1. Supabase 대시보드에서 왼쪽 사이드바의 **SQL Editor** 클릭
2. **New query** 버튼 클릭
3. 아래 SQL 스크립트를 복사하여 붙여넣기

```sql
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
```

4. **Run** 버튼 클릭 (또는 `Ctrl+Enter`)
5. 성공 메시지 확인: "Success. No rows returned"

### 3.2 테이블 생성 확인

SQL Editor에서 다음 쿼리를 실행하여 테이블이 정상적으로 생성되었는지 확인:

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

### 3.3 스키마 캐시 갱신 (중요!)

1. Supabase 대시보드 → **Settings** → **API**
2. **Reload Schema Cache** 버튼 클릭

또는:

1. 왼쪽 사이드바 → **Database** → **Tables**
2. 페이지 새로고침 (F5)

---

## 4단계: 개발 서버 실행 및 테스트

### 4.1 패키지 설치 확인

```bash
npm install
```

### 4.2 개발 서버 실행

⚠️ **중요**: 환경 변수를 변경한 후에는 반드시 서버를 재시작해야 합니다!

```bash
# 기존 서버가 실행 중이면 Ctrl+C로 종료 후
npm run dev
```

### 4.3 로그인 페이지 테스트

1. 브라우저에서 `http://localhost:3000/auth/login` 접속
2. 페이지가 정상적으로 로드되는지 확인
3. 브라우저 개발자 도구(F12) → **Console** 탭에서 오류 확인

### 4.4 회원가입 테스트

1. `http://localhost:3000/auth/signup` 접속
2. 테스트 계정 생성:
   - 이메일: `test@example.com`
   - 비밀번호: `test123456`
   - 닉네임: `테스트유저`
3. 회원가입 완료 후 로그인 테스트

### 4.5 Supabase에서 사용자 확인

1. Supabase 대시보드 → **Authentication** → **Users**
2. 방금 생성한 사용자가 표시되는지 확인
3. **Database** → **Tables** → **profiles** 테이블에서 프로필이 생성되었는지 확인

---

## 5단계: (선택) 추가 기능 설정

### 5.1 이메일 인증 설정

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Email** 설정 확인
3. **Email Templates**에서 이메일 템플릿 커스터마이징 가능

### 5.2 소셜 로그인 설정 (카카오, 네이버, 구글)

1. **Authentication** → **Providers**
2. 원하는 소셜 로그인 제공자 선택
3. Client ID와 Client Secret 입력
4. Redirect URL 설정

### 5.3 Storage 설정 (이미지 업로드 등)

1. **Storage** 메뉴 클릭
2. 새 버킷 생성 (예: `avatars`, `posts`)
3. RLS 정책 설정

---

## ✅ 완료 체크리스트

배포 전 최종 확인:

- [ ] `.env.local` 파일에 모든 환경 변수 설정 완료
- [ ] Supabase SQL Editor에서 `profiles` 테이블 생성 완료
- [ ] RLS 정책 4개 확인 (SELECT, INSERT, UPDATE, DELETE)
- [ ] 스키마 캐시 갱신 완료
- [ ] 개발 서버 정상 실행 (`npm run dev`)
- [ ] 로그인 페이지 접속 성공
- [ ] 회원가입 테스트 성공
- [ ] 로그인 테스트 성공
- [ ] Supabase 대시보드에서 사용자 및 프로필 확인 완료

---

## 🐛 문제 해결

### 문제 1: "Missing Supabase environment variables" 오류

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 정확한지 확인 (대소문자 구분)
3. 개발 서버를 완전히 종료하고 재시작

### 문제 2: "Could not find the table 'public.profiles'" 오류

**해결 방법**:
1. SQL Editor에서 테이블 생성 스크립트가 정상 실행되었는지 확인
2. **Settings** → **API** → **Reload Schema Cache** 클릭
3. 브라우저 캐시 삭제 후 새로고침

### 문제 3: 로그인 후 세션이 유지되지 않음

**해결 방법**:
1. 브라우저 개발자 도구(F12) → **Application** → **Cookies** 확인
2. `middleware.ts` 파일이 정상 작동하는지 확인
3. 브라우저 쿠키 삭제 후 다시 로그인 시도

### 문제 4: CORS 오류

**해결 방법**:
1. Supabase 대시보드 → **Settings** → **API**
2. **CORS** 설정에서 `http://localhost:3000` 추가

---

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [프로젝트 로그인 가이드](./SUPABASE_LOGIN_GUIDE.md)
- [프로젝트 인증 가이드](./SUPABASE_AUTH_GUIDE.md)

---

## 💡 다음 단계

설정이 완료되면:

1. **로컬 개발 계속하기**: 기능 개발 및 테스트
2. **Vercel 배포**: [DEPLOY.md](./DEPLOY.md) 참고
3. **프로덕션 환경 변수 설정**: Vercel 대시보드에서 환경 변수 추가

---

**🎉 축하합니다! Supabase 설정이 완료되었습니다!**

