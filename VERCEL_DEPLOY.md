# Vercel 배포 가이드 (CLI 방식)

## 📋 사전 준비사항

### 1. 빌드 상태 확인 ✅
로컬에서 빌드가 성공적으로 완료되었습니다:
```bash
npm run build
```

### 2. 필수 환경 변수 리스트

Vercel에 설정해야 할 환경 변수:

#### 필수 환경 변수 (Required)
1. **DATABASE_URL**
   - Vercel Postgres 연결 시 자동 생성됨
   - 수동 설정 불필요

2. **NEXTAUTH_SECRET**
   - NextAuth.js 세션 암호화용 비밀 키
   - 생성 방법:
     ```bash
     # Windows PowerShell
     [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
     
     # 또는 온라인 생성기 사용
     # https://generate-secret.vercel.app/32
     ```
   - 최소 32자 이상의 랜덤 문자열 권장

3. **NEXTAUTH_URL**
   - 배포 후 실제 도메인으로 설정
   - 초기값: `https://[프로젝트명].vercel.app`
   - 예시: `https://pajuon.vercel.app`

#### 선택적 환경 변수 (Optional)
- **AWS S3** (이미지 업로드용)
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION` (예: `ap-northeast-2`)
  - `AWS_S3_BUCKET_NAME`

- **Cloudinary** (이미지 업로드용)
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

- **OAuth 소셜 로그인** (카카오, 네이버, 구글)
  - `KAKAO_CLIENT_ID`
  - `KAKAO_CLIENT_SECRET`
  - `NAVER_CLIENT_ID`
  - `NAVER_CLIENT_SECRET`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

---

## 🚀 Vercel CLI 배포 단계

### Step 1: Vercel CLI 설치 및 로그인

```bash
# Vercel CLI 설치 (전역)
npm install -g vercel

# Vercel 로그인
vercel login
```

브라우저가 열리면 GitHub 계정으로 로그인하세요.

### Step 2: 프로젝트 디렉토리에서 배포 시작

```bash
# 프로젝트 루트 디렉토리에서 실행
cd D:\Dev\pajuon
vercel
```

### Step 3: 배포 설정 질문에 답변

Vercel CLI가 다음 질문들을 할 것입니다:

1. **Set up and deploy "D:\Dev\pajuon"?** 
   - ✅ **Y** (Yes)

2. **Which scope do you want to deploy to?**
   - 본인의 계정 선택

3. **Link to existing project?**
   - 처음 배포하는 경우: **N** (No)
   - 기존 프로젝트에 연결: **Y** (Yes) → 프로젝트명 선택

4. **What's your project's name?**
   - 기본값 사용 또는 원하는 이름 입력 (예: `pajuon`)

5. **In which directory is your code located?**
   - 기본값: `./` (현재 디렉토리)
   - ✅ **Enter** (기본값 사용)

6. **Want to override the settings?**
   - 기본값 사용: **N** (No)
   - 커스터마이징: **Y** (Yes)

### Step 4: 환경 변수 설정

배포 전에 환경 변수를 설정해야 합니다:

```bash
# NEXTAUTH_SECRET 생성 (PowerShell)
$secret = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
Write-Host $secret

# 환경 변수 설정 (배포 URL은 배포 후 확인)
vercel env add NEXTAUTH_SECRET
# → 생성한 secret 값 입력

# NEXTAUTH_URL은 배포 후 설정 (아래 참조)
```

또는 Vercel 대시보드에서 설정:
1. https://vercel.com/dashboard 접속
2. 프로젝트 선택 → Settings → Environment Variables
3. 환경 변수 추가

### Step 5: Vercel Postgres 데이터베이스 연결

**중요**: 데이터베이스는 Vercel 대시보드에서 설정해야 합니다.

1. Vercel 대시보드 → 프로젝트 선택
2. **Storage** 탭 클릭
3. **Create Database** → **Postgres** 선택
4. 설정:
   - **Region**: `Seoul (South Korea)` 선택
   - **Database Name**: `pajuon-db` (원하는 이름)
5. **Create** 클릭
6. 연결 완료 시 `DATABASE_URL`이 자동으로 환경 변수에 추가됩니다.

### Step 6: 프로덕션 배포

```bash
# 프로덕션 환경으로 배포
vercel --prod
```

또는

```bash
# 프로덕션 배포 (별칭)
vercel -p
```

### Step 7: 배포 후 NEXTAUTH_URL 설정

배포가 완료되면 배포 URL을 확인하고 `NEXTAUTH_URL`을 설정합니다:

```bash
# 배포 URL 확인 (예: https://pajuon.vercel.app)
# 환경 변수 추가
vercel env add NEXTAUTH_URL production
# → https://pajuon.vercel.app 입력

# 환경 변수 재배포 (변경사항 적용)
vercel --prod
```

---

## 🔍 배포 확인 및 테스트

### 1. 기본 접속 확인
- 배포된 URL로 접속 (예: `https://pajuon.vercel.app`)
- 홈페이지가 정상적으로 로드되는지 확인

### 2. 데이터베이스 연결 확인
- Vercel 대시보드 → 프로젝트 → **Storage** → **Postgres**
- 데이터베이스 상태가 "Active"인지 확인

### 3. 회원가입 테스트
- `/auth/signup` 페이지 접속
- 신규 계정 생성
- 데이터베이스에 사용자 정보가 저장되는지 확인

### 4. 로그인 테스트
- `/auth/login` 페이지 접속
- 생성한 계정으로 로그인
- 일일 로그인 포인트(1 P) 지급 확인

### 5. 기능 테스트
- 파주장터 글쓰기 (`/life/market/write`)
- 마이페이지 접속 (`/my-page`)
- 등급 시스템 확인

---

## 🛠️ 문제 해결

### 빌드 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# Vercel 빌드 로그 확인
vercel logs [배포-URL]
```

### 데이터베이스 연결 오류
1. Vercel 대시보드 → Storage → Postgres 상태 확인
2. `DATABASE_URL` 환경 변수 확인
3. Prisma 스키마 확인 (`prisma/schema.prisma`)

### 인증 오류
1. `NEXTAUTH_SECRET` 환경 변수 확인
2. `NEXTAUTH_URL` 환경 변수 확인 (https:// 포함)
3. 환경 변수 재배포: `vercel --prod`

### 환경 변수 확인
```bash
# 환경 변수 목록 확인
vercel env ls

# 특정 환경 변수 확인
vercel env pull .env.local
```

---

## 📝 유용한 Vercel CLI 명령어

```bash
# 배포 상태 확인
vercel ls

# 최근 배포 로그 확인
vercel logs

# 환경 변수 목록
vercel env ls

# 환경 변수 추가
vercel env add [변수명]

# 환경 변수 삭제
vercel env rm [변수명]

# 로컬 환경 변수 다운로드
vercel env pull .env.local

# 프로젝트 정보 확인
vercel inspect
```

---

## ✅ 체크리스트

배포 전 확인사항:
- [x] 로컬 빌드 성공 (`npm run build`)
- [ ] Vercel CLI 설치 및 로그인 완료
- [ ] Vercel Postgres 데이터베이스 생성
- [ ] `DATABASE_URL` 자동 설정 확인
- [ ] `NEXTAUTH_SECRET` 생성 및 설정
- [ ] `NEXTAUTH_URL` 설정 (배포 후)
- [ ] 프로덕션 배포 완료
- [ ] 배포 URL 접속 확인
- [ ] 회원가입/로그인 테스트
- [ ] 데이터베이스 연동 확인

---

## 📚 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vercel Postgres 가이드](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [NextAuth.js 설정](https://next-auth.js.org/configuration/options)

