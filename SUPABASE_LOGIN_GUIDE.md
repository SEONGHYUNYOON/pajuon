# Supabase 로그인 사용 가이드

이 가이드는 파주온 프로젝트에서 Supabase 인증을 사용하는 방법을 단계별로 설명합니다.

## 📋 목차

1. [환경 변수 설정](#1-환경-변수-설정)
2. [로그인 페이지 사용](#2-로그인-페이지-사용)
3. [코드에서 로그인 구현](#3-코드에서-로그인-구현)
4. [사용자 정보 가져오기](#4-사용자-정보-가져오기)
5. [로그아웃](#5-로그아웃)
6. [문제 해결](#6-문제-해결)

---

## 1. 환경 변수 설정

### 1.1 Supabase 프로젝트 정보 가져오기

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **API** 메뉴로 이동
4. 다음 정보를 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** 키 (JWT Secret 아래)

### 1.2 .env.local 파일 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **중요**: 
- `.env.local` 파일은 `.gitignore`에 포함되어 있어야 합니다
- 환경 변수를 변경한 후에는 **반드시 개발 서버를 재시작**해야 합니다

### 1.3 환경 변수 확인

터미널에서 확인:

```bash
# Windows PowerShell
echo $env:NEXT_PUBLIC_SUPABASE_URL

# 또는 .env.local 파일 직접 확인
cat .env.local
```

---

## 2. 로그인 페이지 사용

### 2.1 로그인 페이지 접속

브라우저에서 다음 URL로 접속:

```
http://localhost:3000/auth/login
```

### 2.2 로그인 절차

1. **이메일 입력**: 가입한 이메일 주소 입력
2. **비밀번호 입력**: 가입 시 설정한 비밀번호 입력
3. **로그인 상태 유지** (선택): 체크박스를 선택하면 세션이 더 오래 유지됩니다
4. **로그인 버튼 클릭**

### 2.3 로그인 후 리다이렉트

- 로그인 성공 시 홈페이지(`/`)로 이동
- 보호된 페이지에서 로그인한 경우, 원래 페이지로 자동 리다이렉트

---

## 3. 코드에서 로그인 구현

### 3.1 클라이언트 컴포넌트에서 로그인

클라이언트 컴포넌트(`'use client'`)에서 로그인:

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    // 로그인 성공
    if (data.user) {
      router.push('/')
      router.refresh() // 페이지 새로고침으로 세션 동기화
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
```

### 3.2 인증 상태 리스너 사용

실시간으로 로그인 상태 변경 감지:

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // 현재 사용자 정보 가져오기
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!user) {
    return <p>로그인이 필요합니다</p>
  }

  return <p>안녕하세요, {user.email}님!</p>
}
```

---

## 4. 사용자 정보 가져오기

### 4.1 클라이언트 컴포넌트에서 사용자 정보

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return <div>로딩 중...</div>

  return (
    <div>
      <p>이메일: {user.email}</p>
      <p>사용자 ID: {user.id}</p>
    </div>
  )
}
```

### 4.2 서버 컴포넌트에서 사용자 정보

```typescript
import { createClient } from '@/utils/supabase/server'

export default async function ServerUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>로그인이 필요합니다</div>
  }

  return (
    <div>
      <p>이메일: {user.email}</p>
      <p>사용자 ID: {user.id}</p>
    </div>
  )
}
```

### 4.3 API Route에서 사용자 정보

```typescript
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({ user })
}
```

### 4.4 프로필 정보 가져오기

`profiles` 테이블에서 추가 정보 가져오기:

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function UserProfile() {
  const [profile, setProfile] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      // 현재 사용자 정보 가져오기
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // 프로필 정보 가져오기
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('프로필 조회 오류:', error)
        return
      }

      setProfile(data)
    }

    getProfile()
  }, [])

  if (!profile) return <div>로딩 중...</div>

  return (
    <div>
      <p>닉네임: {profile.nickname}</p>
      <p>활동 포인트: {profile.activity_points}</p>
      <p>등급: {profile.citizen_rank}</p>
    </div>
  )
}
```

---

## 5. 로그아웃

### 5.1 클라이언트 컴포넌트에서 로그아웃

```typescript
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('로그아웃 오류:', error)
      return
    }

    // 로그아웃 후 홈페이지로 이동
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  )
}
```

### 5.2 서버 액션에서 로그아웃

```typescript
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
```

---

## 6. 문제 해결

### 6.1 "Missing Supabase environment variables" 오류

**원인**: 환경 변수가 설정되지 않았거나 서버가 재시작되지 않음

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 값이 올바른지 확인
3. 개발 서버를 완전히 종료하고 재시작:
   ```bash
   # Ctrl + C로 서버 종료
   npm run dev
   ```

### 6.2 "Invalid login credentials" 오류

**원인**: 이메일 또는 비밀번호가 잘못됨

**해결 방법**:
1. 이메일 주소가 정확한지 확인
2. 비밀번호가 정확한지 확인 (대소문자 구분)
3. Supabase 대시보드에서 사용자가 생성되었는지 확인:
   - **Authentication** → **Users** 메뉴

### 6.3 로그인 후 세션이 유지되지 않음

**원인**: 쿠키 설정 문제 또는 미들웨어 문제

**해결 방법**:
1. 브라우저 개발자 도구(F12) → **Application** → **Cookies**에서 쿠키 확인
2. `middleware.ts` 파일이 정상적으로 작동하는지 확인
3. 브라우저 쿠키를 삭제하고 다시 로그인 시도

### 6.4 로그인 후 리다이렉트가 작동하지 않음

**원인**: `window.location.href` 대신 `router.push()` 사용 시 쿠키 동기화 문제

**해결 방법**:
로그인 성공 후 `router.refresh()` 호출:

```typescript
router.push('/')
router.refresh() // 페이지 새로고침으로 세션 동기화
```

또는 완전한 페이지 리로드:

```typescript
window.location.href = '/'
```

### 6.5 CORS 오류

**원인**: Supabase 프로젝트 설정 문제

**해결 방법**:
1. Supabase 대시보드 → **Settings** → **API**
2. **CORS** 설정에서 로컬 개발 URL 추가:
   - `http://localhost:3000`
   - `http://127.0.0.1:3000`

### 6.6 디버깅 팁

로그인 과정을 디버깅하려면 브라우저 콘솔을 확인:

```typescript
// 로그인 시도 전
console.log('로그인 시작:', { email })

// Supabase 클라이언트 생성 확인
const supabase = createClient()
console.log('Supabase 클라이언트 생성됨')

// 로그인 응답 확인
const { data, error } = await supabase.auth.signInWithPassword({ email, password })
console.log('로그인 응답:', { data, error })

// 세션 확인
const { data: { session } } = await supabase.auth.getSession()
console.log('현재 세션:', session)
```

---

## 📚 추가 리소스

- [Supabase Auth 공식 문서](https://supabase.com/docs/guides/auth)
- [@supabase/ssr 문서](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [프로젝트 인증 가이드](./SUPABASE_AUTH_GUIDE.md)
- [환경 변수 설정 가이드](./ENV_SETUP.md)

---

## 💡 빠른 참조

### 로그인 체크리스트

- [ ] `.env.local` 파일에 Supabase 환경 변수 설정
- [ ] 개발 서버 재시작
- [ ] 로그인 페이지 접속 (`/auth/login`)
- [ ] 이메일/비밀번호로 로그인 테스트
- [ ] 브라우저 콘솔에서 오류 확인
- [ ] 세션이 유지되는지 확인

### 자주 사용하는 코드 스니펫

**현재 사용자 확인**:
```typescript
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

**로그인 상태 리스너**:
```typescript
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session?.user)
})
```

**로그아웃**:
```typescript
await supabase.auth.signOut()
```

