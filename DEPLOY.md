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

#### A. 데이터베이스 연결 (중요!)
1. 프로젝트 설정 화면에서 **"Storage"** 탭을 클릭합니다.
2. **"Vercel Postgres"**를 선택합니다.
3. **"Connect Database"** 버튼을 클릭합니다.
4. 데이터베이스 생성 설정:
   - 리전: **Seoul (South Korea)** 선택
   - 데이터베이스 이름: 원하는 이름 입력 (예: `paju-on-db`)
5. 연결이 완료되면 Vercel이 자동으로 `DATABASE_URL` 환경 변수를 생성합니다.

#### B. Prisma 스키마 업데이트 (PostgreSQL 사용 시)

Vercel Postgres를 사용할 경우, `prisma/schema.prisma` 파일의 datasource를 수정해야 합니다:

```prisma
datasource db {
  provider = "postgresql"  // sqlite → postgresql로 변경
  url      = env("DATABASE_URL")
}
```

변경 후 다시 커밋하고 푸시하세요:
```bash
git add prisma/schema.prisma
git commit -m "chore: Update Prisma schema for PostgreSQL"
git push
```

#### C. 환경 변수 설정

프로젝트 설정 화면에서 **"Environment Variables"** 탭으로 이동합니다.

다음 환경 변수들을 추가하세요:

1. **DATABASE_URL** (자동 생성됨 - Vercel Postgres가 주입)
   - 이미 Vercel Postgres 연결 시 자동으로 설정됩니다.
   - 수동으로 건드리지 마세요.

2. **NEXTAUTH_SECRET**
   - 값: 강력한 비밀 키 (예: `openssl rand -base64 32` 명령어로 생성)
   - 예시: `abc123xyz789...` (32자 이상의 랜덤 문자열)

3. **NEXTAUTH_URL**
   - 값: `https://[프로젝트명].vercel.app` (배포 후 실제 도메인)
   - 초기 설정: Vercel이 제안하는 기본 도메인 (예: `https://paju-on.vercel.app`)
   - 배포 후 실제 도메인으로 업데이트 가능

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
- `DATABASE_URL` 환경 변수 확인
- Vercel Postgres 연결 상태 확인

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
# Vercel Postgres 연결 (로컬에서)
vercel env pull .env.local
npx prisma studio
```

### 로그 확인
- Vercel 대시보드 → 프로젝트 → "Logs" 탭

### 환경 변수 업데이트
- Vercel 대시보드 → 프로젝트 → "Settings" → "Environment Variables"
