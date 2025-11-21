# Supabase 인증 시스템 구축 가이드

## 완료된 작업

### 1. 데이터베이스 스키마 생성 ✅

**파일**: `supabase/migrations/001_create_profiles_table.sql`

- `profiles` 테이블 생성 (auth.users와 FK 연동)
- 필수 필드:
  - `id`: UUID (auth.users의 id와 FK, Primary Key)
  - `nickname`: TEXT (고유값, Not Null)
  - `school_elementary`: TEXT (초등학교)
  - `school_middle`: TEXT (중학교)
  - `school_high`: TEXT (고등학교)
  - `activity_points`: INTEGER (기본값 0)
  - `citizen_rank`: ENUM (기본값 '파주새댁')
  - `created_at`: TIMESTAMPTZ (기본값 now())
- RLS (Row Level Security) 정책 설정
- 자동 프로필 생성 트리거 (회원가입 시 학교 정보 포함)

### 2. Supabase 클라이언트 유틸리티 ✅

**@supabase/ssr 패키지 사용** (Next.js App Router 최신 권장 방식)

#### `utils/supabase/client.ts` (클라이언트 컴포넌트용)
```typescript
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()
```

#### `utils/supabase/server.ts` (서버 컴포넌트용)
```typescript
import { createClient } from '@/utils/supabase/server'
const supabase = await createClient()
```

#### `utils/supabase/middleware.ts` (미들웨어용)
```typescript
import { createClient } from '@/utils/supabase/middleware'
const { supabase, supabaseResponse } = createClient(request)
```

### 3. 미들웨어 설정 ✅

**파일**: `middleware.ts` (루트)

**기능**:
- Supabase 세션 자동 갱신
- 보호된 라우트 관리 (`/my-page`, `/groups/create` 등)
- 비로그인 사용자 리다이렉트
- 로그인한 사용자의 로그인/회원가입 페이지 접근 차단

### 4. 로그인/회원가입 페이지 ✅

**파일들**:
- `app/auth/login/page.tsx`
- `app/auth/signup/page.tsx`
- `app/auth/verify-email/page.tsx`

**특징**:
- `Input`, `Button`, `Card` 컴포넌트 재사용
- 파주 커뮤니티 테마 디자인
- 이메일/비밀번호 인증
- 회원가입 시 프로필 정보 자동 저장:
  - 닉네임
  - 동네 정보 (my_dongne)
  - 학교 정보 (school_elementary, school_middle, school_high)

## 설치 및 설정

### 1. 패키지 설치

```bash
npm install @supabase/ssr @supabase/supabase-js
```

### 2. 환경 변수 설정

`.env.local` 파일에 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. 데이터베이스 마이그레이션

Supabase 대시보드 → SQL Editor에서 실행:

1. `supabase/migrations/001_create_profiles_table.sql` 파일 내용 복사
2. SQL Editor에 붙여넣기
3. 실행

또는 Supabase CLI 사용:

```bash
supabase db push
```

## 사용 방법

### 클라이언트 컴포넌트에서 사용

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password'
    })
  }
  
  return <button onClick={handleLogin}>로그인</button>
}
```

### 서버 컴포넌트에서 사용

```typescript
import { createClient } from '@/utils/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return <div>User: {user?.email}</div>
}
```

### API Route에서 사용

```typescript
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({ user })
}
```

## 회원가입 플로우

1. 사용자가 회원가입 폼 작성
   - 이메일, 비밀번호, 닉네임
   - 동네 정보 (선택)
   - 학교 정보 (선택)

2. Supabase Auth로 계정 생성
   ```typescript
   await supabase.auth.signUp({
     email,
     password,
     options: {
       data: {
         nickname,
         area,
         school_type,
         school_name
       }
     }
   })
   ```

3. 트리거로 프로필 자동 생성
   - `handle_new_user()` 함수 실행
   - `profiles` 테이블에 레코드 생성
   - 메타데이터에서 학교 정보 추출하여 적절한 필드에 저장

4. 프로필 정보 업데이트 (선택)
   - 클라이언트에서 추가 정보 업데이트 가능
   - 실패해도 계정은 생성됨 (나중에 수정 가능)

## 보안

### Row Level Security (RLS)

프로필 테이블에 RLS 정책이 설정되어 있습니다:

- **SELECT**: 사용자는 자신의 프로필만 조회 가능
- **UPDATE**: 사용자는 자신의 프로필만 수정 가능
- **INSERT**: 인증된 사용자는 자신의 프로필만 생성 가능

### 미들웨어 보호

보호된 라우트:
- `/my-page`
- `/groups/create`
- `/events/camping/write`

비로그인 사용자는 자동으로 `/auth/login`으로 리다이렉트됩니다.

## 문제 해결

### 환경 변수 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- Next.js 서버 재시작 필요

### 프로필 자동 생성 실패
- 트리거 함수가 정상적으로 생성되었는지 확인
- Supabase SQL Editor에서 트리거 확인

### 세션 갱신 문제
- 미들웨어가 정상적으로 작동하는지 확인
- 브라우저 쿠키 확인

## 추가 리소스

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [@supabase/ssr 문서](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

