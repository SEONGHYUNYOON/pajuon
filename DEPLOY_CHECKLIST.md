# 배포 체크리스트

## 1. 환경 변수 설정

### 필수 환경 변수
다음 환경 변수들을 Vercel 프로젝트 설정에서 추가하세요:

```bash
DATABASE_URL=postgresql://...  # Supabase PostgreSQL 연결 문자열
NEXTAUTH_URL=https://your-domain.vercel.app  # 배포된 도메인
NEXTAUTH_SECRET=your-random-secret-key  # 랜덤 문자열 생성 (openssl rand -base64 32)
```

### 선택적 환경 변수
- OAuth 제공자 키 (카카오, 네이버, 구글 등)

## 2. Supabase 설정

### 데이터베이스 마이그레이션
1. Supabase 프로젝트 생성
2. `DATABASE_URL` 환경 변수 설정
3. 로컬에서 마이그레이션 실행:
   ```bash
   npm run db:generate
   npx prisma db push
   ```

또는 Supabase SQL Editor에서 직접 스키마 실행

## 3. 빌드 스크립트 확인

`package.json`의 빌드 스크립트:
- ✅ `build`: Prisma 클라이언트 생성 + Next.js 빌드 (Vercel에서 사용)
- ✅ `build:deploy`: Prisma 생성 + DB 푸시 + 빌드 (로컬 테스트용)
- ✅ `dev`: 개발 서버 실행
- ✅ `start`: 프로덕션 서버 실행

**Vercel 빌드 프로세스:**
1. `npm install` - 의존성 설치
2. `npm run build` - Prisma 생성 + Next.js 빌드
3. `.next` 디렉토리 배포

**빌드 전 로컬 테스트:**
```bash
npm run build
```
빌드가 성공하면 Vercel 배포도 성공할 가능성이 높습니다.

## 4. 라우트 연결 확인

### 주요 라우트
- ✅ `/` - 메인 페이지
- ✅ `/auth/login` - 로그인
- ✅ `/auth/signup` - 회원가입
- ✅ `/my-page` - 마이페이지
- ✅ `/groups` - 모임 목록
- ✅ `/groups/[id]` - 모임 상세
- ✅ `/school` - 아이러브스쿨
- ✅ `/events` - 이벤트 목록
- ✅ `/events/[id]` - 이벤트 상세
- ✅ `/events/camping` - 캠핑 모집
- ✅ `/community/hiking` - 등산 모임
- ✅ `/community/riding` - 라이딩 모임
- ✅ `/community/goji-soccer` - 고지 축구
- ✅ `/community/general` - 자유게시판
- ✅ `/news` - 파주 뉴스
- ✅ `/life/hot-place` - 맛집/카페
- ✅ `/life/market` - 파주장터
- ✅ `/tourism` - 관광 정보
- ✅ `/tourism/dmz` - DMZ 관광

### API 라우트
- ✅ `/api/auth/[...nextauth]` - 인증
- ✅ `/api/auth/signup` - 회원가입
- ✅ `/api/user/dashboard` - 대시보드
- ✅ `/api/home/recent-activity` - 최근 활동
- ✅ `/api/groups` - 모임 목록/생성
- ✅ `/api/groups/[id]` - 모임 상세
- ✅ `/api/groups/[id]/join` - 모임 가입/탈퇴
- ✅ `/api/school/register` - 학교 등록
- ✅ `/api/school/list` - 학교 목록
- ✅ `/api/school/alumni` - 동문 목록
- ✅ `/api/school/posts` - 동창 게시판
- ✅ `/api/events/matchmaking/apply` - 미팅 신청

## 5. Vercel 배포 설정

### Build Settings
- Framework Preset: Next.js (자동 감지)
- Build Command: `npm run build` (기본값 사용)
- Output Directory: `.next` (기본값)
- Install Command: `npm install` (기본값)
- Root Directory: `.` (기본값)

**참고**: `vercel.json` 파일이 있어서 자동으로 설정됩니다.

### Environment Variables
Vercel 대시보드에서 환경 변수 설정:
1. Settings → Environment Variables
2. 다음 필수 환경 변수 추가:
   - `DATABASE_URL` (Supabase 연결 문자열)
   - `NEXTAUTH_URL` (배포된 도메인)
   - `NEXTAUTH_SECRET` (랜덤 시크릿 키)
3. Production, Preview, Development 모두 선택
4. 자세한 내용은 `ENV_SETUP.md` 참조

## 6. 배포 후 확인 사항

- [ ] 메인 페이지 로드 확인
- [ ] 로그인/회원가입 기능 확인
- [ ] 데이터베이스 연결 확인
- [ ] 이미지 업로드 기능 확인 (있는 경우)
- [ ] 모든 주요 페이지 접근 확인
- [ ] 모바일 반응형 확인

## 7. 문제 해결

### 빌드 오류
- Prisma 클라이언트 생성 확인: `npm run db:generate`
- TypeScript 오류 확인: `npm run lint`
- 환경 변수 누락 확인

### 런타임 오류
- 데이터베이스 연결 확인
- NextAuth 설정 확인
- API 라우트 오류 로그 확인

