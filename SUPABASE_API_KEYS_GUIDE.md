# 🔑 Supabase API Keys 화면 가이드

현재 보고 계신 **API Keys** 화면에서 해야 할 작업을 단계별로 안내합니다.

## 📍 현재 화면 위치

**Settings** → **API Keys** 페이지입니다.

---

## ✅ 1단계: Publishable Key 복사 (필수)

### 화면에서 확인할 수 있는 것:

- **"Publishable key"** 섹션에 키가 표시되어 있습니다
- 예시: `sb_publishable_m4SIUmjRRj0P06uKnV4Fbw__gJhvv8H`
- 키 옆에 **복사 아이콘** (📋) 이 있습니다

### 해야 할 일:

1. **Publishable key** 옆의 **복사 아이콘** 클릭
2. 키가 클립보드에 복사됩니다
3. 이 키를 메모장이나 텍스트 파일에 임시로 저장해두세요

**이 키는 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 사용됩니다.**

---

## ✅ 2단계: Secret Key 복사 (선택사항, 서버 전용)

### 화면에서 확인할 수 있는 것:

- **"Secret keys"** 섹션에 테이블이 있습니다
- **"default"** 이름의 키가 있습니다
- 키 옆에 **눈 아이콘** (👁️) 과 **복사 아이콘** (📋) 이 있습니다

### 해야 할 일:

1. Secret key의 **복사 아이콘** 클릭
2. 키가 클립보드에 복사됩니다
3. 이 키를 안전한 곳에 저장해두세요

⚠️ **중요**: 
- 이 키는 **절대 클라이언트 코드에 노출하면 안 됩니다**
- 서버 사이드에서만 사용하세요
- GitHub 등 공개 저장소에 커밋하지 마세요

**이 키는 `SUPABASE_SERVICE_ROLE_KEY`에 사용됩니다 (선택사항).**

---

## ✅ 3단계: Project URL 가져오기 (필수)

### 🎯 방법 1: 현재 화면에서 바로 확인 (가장 쉬운 방법!)

**현재 Settings → General 화면에서:**

1. 화면 중앙의 **"General settings"** 섹션을 보세요
2. **"Project ID"** 필드에 프로젝트 ID가 표시되어 있습니다
   - 예시: `ptnnikqbxjkmtwxnavib`
3. **"Copy"** 버튼을 클릭하여 프로젝트 ID 복사

**Project URL 만들기:**
복사한 프로젝트 ID를 사용해서 다음과 같이 만드세요:

```
https://[프로젝트ID].supabase.co
```

**예시:**
```
프로젝트 ID: ptnnikqbxjkmtwxnavib
↓
Project URL: https://ptnnikqbxjkmtwxnavib.supabase.co
```

---

### 방법 2: API Keys 화면에서 확인

1. 왼쪽 사이드바에서 **Settings** → **API Keys** 클릭
2. 페이지 상단에 **"Project URL"** 또는 **"API URL"** 섹션이 있을 수 있습니다
3. 있으면 복사 아이콘으로 복사

---

### 방법 3: 브라우저 주소창에서 확인

브라우저 주소창을 보면 다음과 같은 URL이 표시됩니다:

```
https://supabase.com/dashboard/project/ptnnikqbxjkmtwxnavib
```

**어디를 봐야 하나요?**
- 브라우저 화면 **가장 위쪽**에 있는 주소 입력창을 보세요
- 현재 페이지의 URL이 표시되어 있습니다

**프로젝트 ID 찾기:**
- URL에서 `/project/` 뒤에 있는 부분이 프로젝트 ID입니다
- 예시: `ptnnikqbxjkmtwxnavib` ← 이 부분!

**Project URL로 변환:**
프로젝트 ID를 찾았으면 다음과 같이 변환하세요:

```
프로젝트 ID: ptnnikqbxjkmtwxnavib
↓
Project URL: https://ptnnikqbxjkmtwxnavib.supabase.co
```

**변환 규칙:**
- `https://` + `프로젝트ID` + `.supabase.co`

**예시:**
```
프로젝트 ID: ptnnikqbxjkmtwxnavib
Project URL: https://ptnnikqbxjkmtwxnavib.supabase.co
```

---

## 📝 복사한 키 정리

지금까지 복사한 정보를 정리하면:

| 항목 | 환경 변수 이름 | 값 예시 |
|------|--------------|---------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | `https://ptnnikqbxjkmtwxnavib.supabase.co` |
| Publishable Key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_m4SIUmjRRj0P06uKnV4Fbw__gJhvv8H` |
| Secret Key | `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_R0admR87R-fwfSwLJYrlww_VQyi7njz` (선택) |

---

## 🚀 다음 단계: 환경 변수 설정

복사한 키들을 프로젝트의 `.env.local` 파일에 추가하세요.

### .env.local 파일 생성/수정

프로젝트 루트 디렉토리에 `.env.local` 파일을 열고 다음 내용을 추가하세요:

```env
# Supabase 설정 (필수)
NEXT_PUBLIC_SUPABASE_URL=https://ptnnikqbxjkmtwxnavib.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_m4SIUmjRRj0P06uKnV4Fbw__gJhvv8H

# Service Role Key (선택사항, 서버 전용)
# SUPABASE_SERVICE_ROLE_KEY=sb_secret_R0admR87R-fwfSwLJYrlww_VQyi7njz
```

⚠️ **주의**: 위의 예시 값들을 실제로 복사한 값으로 교체하세요!

---

## ✅ 체크리스트

현재 화면에서 완료해야 할 작업:

- [ ] Publishable key 복사 완료
- [ ] Secret key 복사 완료 (선택사항)
- [ ] Project URL 확인 완료
- [ ] `.env.local` 파일에 환경 변수 추가 완료

---

## 💡 참고사항

### Publishable Key vs Secret Key

**Publishable Key (sb_publishable_...):**
- ✅ 브라우저에서 안전하게 사용 가능
- ✅ Row Level Security (RLS)가 활성화되어 있으면 안전
- ✅ 클라이언트 코드에 포함 가능
- ✅ `NEXT_PUBLIC_` 접두사 사용 (브라우저에 노출됨)

**Secret Key (sb_secret_...):**
- ⚠️ 서버 사이드에서만 사용
- ⚠️ 절대 클라이언트에 노출하지 마세요
- ⚠️ 관리자 권한으로 데이터베이스 접근 가능
- ⚠️ RLS 정책을 우회할 수 있음

### 새로운 API 키 형식

Supabase가 새로운 API 키 시스템을 도입했습니다:
- 기존: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT 형식)
- 새로운: `sb_publishable_...` 또는 `sb_secret_...` (접두사 형식)

두 형식 모두 정상적으로 작동합니다!

---

## 🔄 다음 단계

환경 변수 설정이 완료되면:

1. **개발 서버 재시작** (환경 변수 변경 후 필수)
   ```bash
   npm run dev
   ```

2. **데이터베이스 마이그레이션 실행**
   - [SUPABASE_FIRST_DEPLOY.md](./SUPABASE_FIRST_DEPLOY.md)의 3단계 참고

3. **로그인 테스트**
   - `http://localhost:3000/auth/login` 접속

---

**🎉 API 키 복사가 완료되었습니다!**

다음 단계는 [SUPABASE_FIRST_DEPLOY.md](./SUPABASE_FIRST_DEPLOY.md)를 참고하세요.

