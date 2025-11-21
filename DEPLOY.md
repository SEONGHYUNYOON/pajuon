# PAJU ON 배포 가이드

## 1. GitHub 리포지토리 생성 및 푸시

### 1.1 GitHub 리포지토리 생성
1. GitHub.com에 접속하여 로그인합니다.
2. 새 리포지토리를 생성합니다 (예: `paju-on`).
3. Private 리포지토리로 설정하는 것을 권장합니다.

### 1.2 코드 푸시
터미널에서 다음 명령어를 실행하세요:

```bash
# Git 초기화 (이미 초기화되어 있으면 생략)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "feat: Project 'PAJU ON' Step 4 completion (Ready for Deploy)"

# 메인 브랜치 설정
git branch -M main

# 원격 저장소 추가 (GitHub_Repo_URL을 실제 리포지토리 URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/paju-on.git

# 푸시
git push -u origin main
```

## 2. Vercel 배포

### 2.1 Vercel 프로젝트 생성
1. [Vercel.com](https://vercel.com)에 접속하여 GitHub 계정으로 로그인합니다.
2. 대시보드에서 "Add New..." → "Project"를 선택합니다.
3. "Import Git Repository"에서 방금 푸시한 `paju-on` 리포지토리를 선택합니다.
4. "Import" 버튼을 클릭합니다.

### 2.2 프로젝트 설정

#### A. 데이터베이스 연결 - Supabase 설정 (중요!)

**Supabase 프로젝트 생성 및 설정:**

1. [Supabase.com](https://supabase.com)에 접속하여 계정을 생성하거나 로그인합니다.
2. "New Project" 버튼을 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 설정:
   - **Name**: 프로젝트 이름 입력 (예: `paju-on`)
   - **Database Password**: 강력한 비밀번호 설정 (반드시 저장해두세요!)
   - **Region**: **Northeast Asia (Seoul)** 선택 (한국 서버)
   - **Pricing Plan**: Free tier 선택 (시작 시)
4. 프로젝트 생성이 완료될 때까지 대기합니다 (약 2-3분 소요).

**Supabase에서 필요한 키 가져오기:**

1. Supabase 대시보드에서 프로젝트를 선택합니다.
2. 왼쪽 사이드바에서 **"Settings"** (톱니바퀴 아이콘) 클릭
3. **"API"** 섹션으로 이동합니다.
4. 다음 정보를 복사합니다:
   - **Project URL**: `https://xxxxx.supabase.co` 형식의 URL
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 형식의 긴 문자열
   - **service_role key** (선택사항, 서버 사이드에서만 사용): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 형식

**데이터베이스 연결 문자열 (Connection String) 가져오기:**

1. Supabase 대시보드에서 **"Settings"** → **"Database"** 섹션으로 이동
2. **"Connection string"** 섹션에서 **"URI"** 탭을 선택
3. 연결 문자열을 복사합니다. 형식은 다음과 같습니다:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
   ```
   ⚠️ **주의**: `[YOUR-PASSWORD]` 부분을 위에서 설정한 데이터베이스 비밀번호로 교체해야 합니다!

**로컬 .env 파일 설정:**

`.env` 파일에 다음을 추가하세요:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Supabase (선택사항 - Supabase 클라이언트 사용 시)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**로컬에서 데이터베이스 마이그레이션 실행:**

```bash
# Prisma Client 재생성
npx prisma generate

# 데이터베이스 마이그레이션 실행
npx prisma db push

# 또는 마이그레이션 파일 사용
npx prisma migrate dev
```

#### B. Prisma 스키마 확인

`prisma/schema.prisma` 파일이 이미 PostgreSQL로 설정되어 있는지 확인하세요:

```prisma
datasource db {
  provider = "postgresql"  // ✅ 이미 postgresql로 설정됨
  url      = env("DATABASE_URL")
}
```

이미 PostgreSQL로 설정되어 있으므로 추가 변경이 필요 없습니다.

#### C. Vercel 환경 변수 설정

Vercel 프로젝트 설정 화면에서 **"Environment Variables"** 탭으로 이동합니다.

다음 환경 변수들을 추가하세요:

1. **DATABASE_URL** ⭐ (필수)
   - **Key**: `DATABASE_URL`
   - **Value**: Supabase에서 가져온 연결 문자열
     ```
     postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require
     ```
   - **Environment**: Production, Preview, Development 모두 선택
   - ⚠️ **주의**: 비밀번호를 실제 비밀번호로 교체하세요!

2. **NEXTAUTH_SECRET** ⭐ (필수)
   - **Key**: `NEXTAUTH_SECRET`
   - **Value**: 강력한 비밀 키
     - 로컬에서 생성: `openssl rand -base64 32` 명령어 실행
     - 또는 온라인 생성기 사용: [randomkeygen.com](https://randomkeygen.com/)
   - **Environment**: Production, Preview, Development 모두 선택
   - 예시: `abc123xyz789...` (32자 이상의 랜덤 문자열)

3. **NEXTAUTH_URL** ⭐ (필수)
   - **Key**: `NEXTAUTH_URL`
   - **Value**: 배포 후 실제 도메인
     - 초기: `https://[프로젝트명].vercel.app` (예: `https://paju-on.vercel.app`)
     - 배포 후 실제 도메인으로 업데이트 가능
   - **Environment**: Production, Preview, Development 모두 선택

4. **NEXT_PUBLIC_SUPABASE_URL** (선택사항 - Supabase 클라이언트 사용 시)
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Supabase Project URL (예: `https://xxxxx.supabase.co`)
   - **Environment**: Production, Preview, Development 모두 선택

5. **NEXT_PUBLIC_SUPABASE_ANON_KEY** (선택사항 - Supabase 클라이언트 사용 시)
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Supabase anon public key
   - **Environment**: Production, Preview, Development 모두 선택

**환경 변수 추가 방법:**
1. Vercel 프로젝트 → **"Settings"** → **"Environment Variables"**
2. 각 환경 변수를 하나씩 추가:
   - **Name**: 위의 Key 값 입력
   - **Value**: 위의 Value 값 입력
   - **Environment**: 체크박스로 선택 (Production, Preview, Development)
3. **"Save"** 버튼 클릭
4. 모든 환경 변수 추가 후 **"Redeploy"** 버튼을 클릭하여 재배포

### 2.3 배포 실행

1. 모든 설정이 완료되면 **"Deploy"** 버튼을 클릭합니다.
2. 빌드 로그를 실시간으로 확인하며 오류가 없는지 체크합니다.
3. 빌드가 완료되면 Vercel이 배포 URL을 제공합니다.

## 3. 배포 확인

### 3.1 기본 기능 테스트
배포 완료 후 다음 기능들을 테스트하세요:

1. **홈페이지 접속**
   - `https://[프로젝트명].vercel.app` 접속 확인

2. **회원가입**
   - `/auth/signup` 페이지에서 신규 계정 생성
   - 데이터베이스에 사용자 정보 저장 확인

3. **로그인**
   - `/auth/login` 페이지에서 로그인
   - 일일 로그인 포인트 지급 확인 (1 P)

4. **파주장터 글쓰기**
   - `/life/market/write` 페이지에서 물품 등록
   - 포인트 적립 확인 (10 P)
   - 데이터베이스에 게시글 저장 확인

5. **등급 시스템**
   - 마이페이지에서 등급 및 포인트 확인
   - 등급 진행도 바 표시 확인

### 3.2 문제 해결

#### 빌드 실패 시
- Vercel 로그 확인
- 환경 변수 설정 확인
- Prisma 스키마 확인 (PostgreSQL provider 설정)

#### 데이터베이스 연결 오류
- `DATABASE_URL` 환경 변수 확인 (Supabase 연결 문자열이 올바른지 확인)
- Supabase 프로젝트 상태 확인 (대시보드에서 확인)
- 데이터베이스 비밀번호가 올바르게 설정되었는지 확인
- Supabase 방화벽 설정 확인 (필요 시 IP 화이트리스트 추가)

#### 인증 오류
- `NEXTAUTH_SECRET` 환경 변수 확인
- `NEXTAUTH_URL` 환경 변수 확인 (https:// 포함)

## 4. 추가 설정 (선택사항)

### 4.1 커스텀 도메인
1. Vercel 프로젝트 설정 → "Domains"
2. 원하는 도메인 추가
3. DNS 설정 가이드 따르기

### 4.2 이미지 스토리지 (AWS S3/Cloudinary)
실제 프로덕션 환경에서는 `app/api/upload/route.ts`를 수정하여 실제 스토리지 서비스와 연동해야 합니다.

환경 변수 추가:
- AWS S3: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET_NAME`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### 4.3 OAuth 소셜 로그인
카카오, 네이버, 구글 로그인을 활성화하려면:
1. 각 플랫폼에서 OAuth 앱 생성
2. 콜백 URL 설정: `https://[프로젝트명].vercel.app/api/auth/callback/[provider]`
3. Vercel 환경 변수에 클라이언트 ID 및 Secret 추가
4. `app/api/auth/[...nextauth]/route.ts`에서 Provider 활성화

## 5. 유지보수

### 데이터베이스 관리
```bash
# 환경 변수 가져오기 (로컬에서)
vercel env pull .env.local

# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio

# 마이그레이션 실행
npx prisma migrate dev

# 데이터베이스 상태 확인
npx prisma db pull
```

**Supabase 대시보드에서 데이터베이스 관리:**
- Supabase 대시보드 → **"Table Editor"**: 테이블 데이터 직접 확인/수정
- Supabase 대시보드 → **"SQL Editor"**: SQL 쿼리 실행
- Supabase 대시보드 → **"Database"**: 연결 정보, 백업 등 관리

### 로그 확인
- Vercel 대시보드 → 프로젝트 → "Logs" 탭

### 환경 변수 업데이트
- Vercel 대시보드 → 프로젝트 → "Settings" → "Environment Variables"
