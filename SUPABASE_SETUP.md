# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase.com](https://supabase.com)에 접속하여 계정 생성 또는 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: pajuon (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정 (반드시 저장!)
   - **Region**: Northeast Asia (Seoul) 선택
   - **Pricing Plan**: Free tier

## 2. 환경 변수 설정

### 로컬 개발 (.env.local)

프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 기존 환경 변수 (Prisma/NextAuth와 함께 사용하는 경우)
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Supabase 키 가져오기

1. Supabase 대시보드 → **Settings** → **API**
2. 다음 정보 복사:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`에 사용
   - **anon public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 사용
   - **service_role key**: `SUPABASE_SERVICE_ROLE_KEY`에 사용 (서버 전용)

## 3. 데이터베이스 마이그레이션

### 방법 1: Supabase SQL Editor 사용 (권장)

1. Supabase 대시보드 → **SQL Editor**
2. `supabase/migrations/001_create_profiles_table.sql` 파일 내용 복사
3. SQL Editor에 붙여넣고 실행

### 방법 2: Supabase CLI 사용

```bash
# Supabase CLI 설치 (선택사항)
npm install -g supabase

# Supabase 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

## 4. 필요한 패키지 설치

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## 5. 프로필 테이블 구조

생성되는 `profiles` 테이블 구조:

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | UUID | auth.users의 id와 FK |
| `nickname` | TEXT | 커뮤니티용 닉네임 (고유값) |
| `school_elementary` | TEXT | 초등학교 출신 |
| `school_middle` | TEXT | 중학교 출신 |
| `school_high` | TEXT | 고등학교 출신 |
| `activity_points` | INTEGER | 활동 점수 (기본값 0) |
| `citizen_rank` | ENUM | 회원 등급 (기본값 '파주새댁') |
| `profile_image` | TEXT | 프로필 이미지 URL |
| `my_dongne` | TEXT | 동네별 소모임용 지역 |
| `last_login_at` | TIMESTAMPTZ | 마지막 로그인 시간 |
| `created_at` | TIMESTAMPTZ | 생성 시간 |
| `updated_at` | TIMESTAMPTZ | 수정 시간 |

### 회원 등급 (citizen_rank)

- `파주새댁` (기본값)
- `이장`
- `동장`
- `시장`
- `명예시민`

## 6. Row Level Security (RLS)

프로필 테이블에 RLS 정책이 자동으로 설정됩니다:

- **SELECT**: 사용자는 자신의 프로필만 조회 가능
- **UPDATE**: 사용자는 자신의 프로필만 수정 가능
- **INSERT**: 인증된 사용자는 자신의 프로필만 생성 가능

## 7. 자동 프로필 생성

`auth.users`에 새 사용자가 생성되면 자동으로 `profiles` 테이블에 프로필이 생성됩니다.

트리거 함수: `handle_new_user()`

## 8. 테스트

### 로컬에서 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:3000/auth/signup
```

### 프로필 조회 테스트

```typescript
import { createSupabaseClientDirect } from "@/lib/supabase/client";

const supabase = createSupabaseClientDirect();
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single();
```

## 9. 문제 해결

### 환경 변수 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인 (대소문자 구분)
- Next.js 서버 재시작

### RLS 정책 오류
- Supabase 대시보드에서 RLS 정책 확인
- 사용자가 로그인되어 있는지 확인

### 프로필 자동 생성 실패
- 트리거 함수가 정상적으로 생성되었는지 확인
- Supabase SQL Editor에서 트리거 확인

## 10. 추가 리소스

- [Supabase 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

