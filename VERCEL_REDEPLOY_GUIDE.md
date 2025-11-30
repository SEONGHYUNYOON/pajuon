# Vercel 재배포 가이드

## 🚀 재배포 방법 (3가지)

### 방법 1: Vercel 대시보드에서 수동 재배포 (가장 쉬움) ⭐

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard 에 접속
   - GitHub 계정으로 로그인

2. **프로젝트 선택**
   - 목록에서 `pajuon` (또는 해당 프로젝트명) 클릭

3. **배포 히스토리 확인**
   - 프로젝트 페이지에서 "Deployments" 탭 클릭
   - 최근 배포 목록이 표시됨

4. **재배포 실행**
   - 원하는 배포 항목에서 **"⋯" (3점 메뉴)** 클릭
   - **"Redeploy"** 선택
   - 확인 창에서 **"Redeploy"** 클릭

   또는

   - 상단 우측의 **"Deploy"** 버튼 클릭
   - **"Redeploy"** 선택
   - 최신 커밋으로 재배포됨

5. **배포 완료 대기**
   - 배포 상태가 "Building" → "Ready"로 변경될 때까지 대기 (약 1-3분)
   - 녹색 체크 표시가 나타나면 배포 완료!

---

### 방법 2: Vercel CLI를 사용한 재배포

**로컬에서 명령어로 재배포:**

```bash
# 1. Vercel CLI가 설치되어 있지 않으면 설치
npm install -g vercel

# 2. Vercel 로그인 (이미 로그인되어 있으면 생략)
vercel login

# 3. 프로젝트 디렉토리로 이동
cd D:\Dev\pajuon

# 4. 프로덕션 환경으로 재배포
vercel --prod
```

**또는 특정 배포를 재배포:**

```bash
# 최근 배포 목록 확인
vercel ls

# 특정 배포 URL로 재배포
vercel --prod --deployment-url https://[프로젝트명].vercel.app
```

---

### 방법 3: GitHub 커밋으로 트리거 (자동 배포)

**이미 GitHub에 푸시했다면 자동으로 재배포됩니다!**

```bash
# 1. 빈 커밋을 만들어서 푸시 (재배포 트리거)
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main

# 또는

# 2. 작은 변경사항과 함께 커밋
git add .
git commit -m "chore: trigger redeploy"
git push origin main
```

GitHub에 푸시하면 Vercel이 자동으로 감지하여 재배포를 시작합니다.

---

## ✅ 재배포 확인 방법

### 1. Vercel 대시보드에서 확인
- 프로젝트 페이지 → "Deployments" 탭
- 최신 배포 상태 확인:
  - 🟡 **Building** - 배포 진행 중
  - 🟢 **Ready** - 배포 완료
  - 🔴 **Error** - 배포 실패

### 2. 배포 URL로 직접 확인
- 배포 완료 후: `https://[프로젝트명].vercel.app`
- 브라우저에서 접속하여 최신 변경사항이 반영되었는지 확인

### 3. 빌드 로그 확인
- Vercel 대시보드 → 배포 항목 클릭 → "Build Logs" 탭
- 빌드 과정과 오류 확인 가능

---

## 🔍 배포 실패 시 확인사항

### 1. 빌드 오류 확인
```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 오류가 있다면 수정 후 재배포
```

### 2. 환경 변수 확인
- Vercel 대시보드 → Settings → Environment Variables
- 필수 환경 변수가 모두 설정되어 있는지 확인:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Vercel 빌드 로그 확인
- 배포 실패 항목 클릭 → "Build Logs" 탭
- 오류 메시지 확인 및 수정

---

## 📝 유용한 팁

### 환경 변수 변경 후 재배포
환경 변수를 추가/수정했다면 **반드시 재배포**해야 변경사항이 적용됩니다:

1. Vercel 대시보드 → Settings → Environment Variables
2. 환경 변수 추가/수정
3. **"Redeploy"** 버튼 클릭 (또는 위 방법 중 하나 사용)

### 특정 커밋으로 재배포
1. Vercel 대시보드 → Deployments
2. 원하는 배포 항목의 "⋯" 클릭
3. "Redeploy" 선택

### 배포 취소
배포가 진행 중일 때:
1. 배포 항목 클릭
2. "Cancel Deployment" 클릭

---

## 🎯 가장 빠른 재배포 방법

**현재 상황 (이미 GitHub에 푸시 완료):**

1. **Vercel 대시보드 접속** → https://vercel.com/dashboard
2. **프로젝트 선택** → `pajuon` 클릭
3. **"Deployments" 탭** → 최신 배포 확인
4. **상단 "Redeploy" 버튼** 클릭
5. **완료!** (1-3분 후 배포 완료)

또는

**터미널에서 (Vercel CLI 사용):**

```bash
cd D:\Dev\pajuon
vercel --prod
```

---

**참고:**
- Supabase 대시보드는 데이터베이스 관리용입니다
- 애플리케이션 재배포는 **Vercel**에서 해야 합니다
- GitHub에 푸시하면 자동으로 재배포되지만, 수동으로도 가능합니다

