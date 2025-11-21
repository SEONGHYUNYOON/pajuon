# 환경 변수 설정 가이드

## Supabase 환경 변수 설정

### 1. Supabase 프로젝트 생성
1. [Supabase.com](https://supabase.com) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: pajuon (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정 (반드시 저장!)
   - **Region**: Northeast Asia (Seoul) 선택
   - **Pricing Plan**: Free tier

### 2. 데이터베이스 연결 문자열 가져오기
1. Supabase 대시보드 → Settings → Database
2. "Connection string" → "URI" 탭 선택
3. 연결 문자열 복사:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
   ```
4. `[YOUR-PASSWORD]`를 실제 비밀번호로 교체

### 3. 환경 변수 설정

#### 로컬 개발 (.env 파일)
프로젝트 루트에 `.env` 파일 생성:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Optional: Supabase Client (if needed)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### NEXTAUTH_SECRET 생성 방법
터미널에서 실행:
```bash
openssl rand -base64 32
```

또는 온라인 생성기 사용:
- [randomkeygen.com](https://randomkeygen.com/)

#### Vercel 배포 시 환경 변수 설정
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 다음 변수들을 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | Supabase 연결 문자열 | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | 생성한 시크릿 키 | Production, Preview, Development |

3. 모든 변수 추가 후 "Save" 클릭
4. "Redeploy" 버튼으로 재배포

## 환경 변수 확인 체크리스트

- [ ] `DATABASE_URL` 설정 완료 (Supabase 연결 문자열)
- [ ] `NEXTAUTH_URL` 설정 완료 (로컬: http://localhost:3000, 프로덕션: 실제 도메인)
- [ ] `NEXTAUTH_SECRET` 설정 완료 (32자 이상 랜덤 문자열)
- [ ] 로컬에서 데이터베이스 연결 테스트 완료
- [ ] Vercel 환경 변수 설정 완료

## 문제 해결

### 데이터베이스 연결 오류
- `DATABASE_URL` 형식 확인 (postgresql://로 시작)
- 비밀번호가 올바르게 설정되었는지 확인
- Supabase 프로젝트 상태 확인 (대시보드에서 확인)

### NextAuth 오류
- `NEXTAUTH_SECRET`이 설정되었는지 확인
- `NEXTAUTH_URL`이 올바른 형식인지 확인 (https:// 포함)
- 프로덕션에서는 반드시 https 사용

