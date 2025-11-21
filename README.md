# PAJU ON (파주온)

파주 시민을 위한 참여형 로컬 커뮤니티 플랫폼

## 프로젝트 개요

파주온은 파주 시민들이 자유롭게 소통하고 정보를 공유할 수 있는 로컬 커뮤니티 플랫폼입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: Next-Auth.js
- **UI Components**: Heroicons

## 시작하기

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# AWS S3 (이미지 업로드용 - 선택사항)
# AWS_ACCESS_KEY_ID="your-access-key"
# AWS_SECRET_ACCESS_KEY="your-secret-key"
# AWS_REGION="ap-northeast-2"
# AWS_S3_BUCKET_NAME="your-bucket-name"

# Cloudinary (이미지 업로드용 - 선택사항)
# CLOUDINARY_CLOUD_NAME="your-cloud-name"
# CLOUDINARY_API_KEY="your-api-key"
# CLOUDINARY_API_SECRET="your-api-secret"

# OAuth Providers (선택사항)
# KAKAO_CLIENT_ID="your-kakao-client-id"
# KAKAO_CLIENT_SECRET="your-kakao-client-secret"
# NAVER_CLIENT_ID="your-naver-client-id"
# NAVER_CLIENT_SECRET="your-naver-client-secret"
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2. 데이터베이스 설정

```bash
# Prisma Client 생성
npx prisma generate

# 데이터베이스 생성 및 마이그레이션
npx prisma db push
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 주요 기능

### 회원 시스템
- 이메일/비밀번호 로그인
- 소셜 로그인 (카카오, 네이버, 구글) 준비
- 회원 등급 시스템 (파주새싹 → 파주새댁 → 이장 → 동장 → 시장 → 명예시민)
- 활동 포인트 시스템

### 파주장터
- 중고 물품 거래 (팝니다/삽니다/나눔합니다)
- 이미지 업로드
- 거래 희망 장소 설정

### 동네별 소모임
- 동네별 게시판
- 반려동물 커뮤니티

### 파주ON 관광
- 관광지 정보
- 맛집/카페 리뷰

### 기타 기능
- 파주 일자리
- 파주 쿠폰&제휴
- 이벤트 관리
- 파주 추억앨범

## 데이터베이스 스키마

### User
- 사용자 정보
- 활동 포인트
- 등급 정보

### Post
- 게시글
- 카테고리별 분류

### Comment
- 댓글

### MarketItem
- 장터 물품 정보
- 가격, 상태, 위치

## API 엔드포인트

### 인증
- `POST /api/auth/signup` - 회원가입
- `GET /api/auth/check-nickname` - 닉네임 중복 확인

### 장터
- `GET /api/life/market` - 장터 목록
- `POST /api/life/market` - 물품 등록

### 업로드
- `POST /api/upload` - 이미지 업로드

## 개발 가이드

### 포인트 시스템

포인트는 다음 액션으로 획득할 수 있습니다:
- 게시글 작성: 10 P
- 댓글 작성: 2 P
- 일일 로그인: 1 P

### 등급 시스템

- LV 1 파주새싹: 0 P
- LV 2 파주새댁: 100 P
- LV 3 이장: 500 P
- LV 4 동장: 1000 P
- LV 5 파주시장: 2000 P
- LV 6 명예시민: 5000 P

## 배포

배포 가이드는 [DEPLOY.md](./DEPLOY.md) 파일을 참조하세요.

### 빠른 배포 (Vercel)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 리포지토리 Import
3. Vercel Postgres 연결
4. 환경 변수 설정 (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
5. Deploy!

자세한 내용은 `DEPLOY.md`를 참조하세요.

## 라이선스

이 프로젝트는 파주 시민을 위한 공개 프로젝트입니다.