# AI 기능 적용 제안서 (현실적 버전) - PAJU ON

## 📋 개요
**외부 API 없이** 제가 코드로 직접 구현할 수 있는 AI/스마트 기능들만 선별했습니다.

---

## ✅ 구현 가능한 기능 (100% 자신 있음)

### 1. **스마트 검색 기능 강화** ⭐⭐⭐
**구현 가능 이유:** 키워드 매핑 사전과 유사어 처리만으로 충분

**구현할 기능:**
- ✅ **유사어 검색**: "커피숍" = "카페", "맥북" = "노트북", "스마트폰" = "핸드폰"
- ✅ **검색어 자동완성**: 이전 검색어 저장 + 인기 검색어 추천
- ✅ **다중 키워드 검색**: "운정동 카페" → 지역 + 카테고리 동시 검색
- ✅ **부분 일치 검색**: "아이폰" 입력 시 "아이폰 14 프로", "아이폰 13" 모두 검색
- ⚠️ **오타 자동 수정** (간단한 버전만): "운정동" → "운정동" (자주 발생하는 오타만)

**기술 스택:**
- 키워드 매핑 사전 (TypeScript Object)
- 검색어 저장 (LocalStorage 또는 Supabase)
- 간단한 Levenshtein 거리 알고리즘 (오타 수정용)

**예상 개발 시간:** 3-5일

**적용 위치:**
- `app/map/page.tsx` (지도 검색)
- `app/life/hot-place/page.tsx` (맛집/카페 검색)
- `app/life/market/page.tsx` (중고거래 검색)

**구현 예시:**
```typescript
// 유사어 매핑 사전
const synonymMap = {
  "커피숍": ["카페", "커피"],
  "맥북": ["노트북", "macbook"],
  "스마트폰": ["핸드폰", "폰", "휴대폰"],
  "운정동": ["운정"],
  // ...
};

// 검색어 확장
function expandSearchQuery(query: string): string[] {
  const keywords = [query];
  for (const [key, synonyms] of Object.entries(synonymMap)) {
    if (query.includes(key)) {
      keywords.push(...synonyms);
    }
  }
  return [...new Set(keywords)];
}
```

---

### 2. **자동 카테고리 분류** ⭐⭐⭐
**구현 가능 이유:** 키워드 기반 규칙 분류만으로 충분

**구현할 기능:**
- ✅ **제목 기반 자동 분류**: "아이폰 팝니다" → 자동으로 "전자제품" 선택
- ✅ **카테고리 자동 추천**: 게시글 작성 시 제목 입력하면 자동으로 카테고리 제안
- ✅ **타입 자동 추천**: "팝니다", "삽니다", "나눔합니다" 자동 감지
- ✅ **이중 분류 방지**: 제목에서 카테고리와 타입 동시 감지

**기술 스택:**
- 키워드 매칭 규칙 (TypeScript)
- 정규식 패턴 매칭

**예상 개발 시간:** 2-3일

**적용 위치:**
- `app/life/market/write/page.tsx` (중고거래 등록)
- `app/community/local/page.tsx` (커뮤니티 게시글)

**구현 예시:**
```typescript
// 카테고리 키워드 매핑
const categoryKeywords = {
  "전자제품": ["아이폰", "노트북", "컴퓨터", "냉장고", "세탁기", "에어컨", "TV", "스마트폰", "맥북"],
  "가구": ["소파", "책상", "의자", "침대", "옷장", "책장"],
  "자동차": ["아반떼", "소나타", "SUV", "경차", "중형차", "차량"],
  "부동산": ["아파트", "원룸", "단독주택", "상가", "오피스텔", "토지"],
  // ...
};

// 타입 키워드
const typeKeywords = {
  "팝니다": ["팝니다", "판매", "매매", "팔아요"],
  "삽니다": ["삽니다", "구매", "구해요", "찾아요"],
  "나눔합니다": ["나눔", "무료", "증여"],
};

// 자동 분류 함수
function autoClassify(title: string) {
  const category = detectCategory(title); // "전자제품"
  const type = detectType(title); // "팝니다"
  return { category, type };
}
```

---

### 3. **콘텐츠 추천 시스템** ⭐⭐⭐
**구현 가능 이유:** 조회수/좋아요/시간 기반 추천은 통계만 있으면 됨

**구현할 기능:**
- ✅ **인기 게시글 추천**: 조회수 + 좋아요 점수 기반
- ✅ **시간대별 추천**: 아침/점심/저녁 시간대 맞춤 콘텐츠
- ✅ **지역 기반 추천**: 동네별 인기 게시글 필터링
- ✅ **최근 활동 기반 추천**: 사용자가 본 게시글의 카테고리 기반 추천
- ✅ **유사 게시글 추천** (간단한 버전): 같은 카테고리 + 같은 지역

**기술 스택:**
- 점수 계산 알고리즘 (가중 평균)
- LocalStorage (사용자 활동 기록)
- Supabase (게시글 통계)

**예상 개발 시간:** 5-7일

**적용 위치:**
- `app/page.tsx` (홈페이지 추천 섹션)
- 각 게시글 상세 페이지 ("관련 게시글" 섹션)
- `components/home/RecentActivity.tsx` (최근 활동 추천)

**구현 예시:**
```typescript
// 추천 점수 계산
function calculateRecommendationScore(post: Post, userActivity?: UserActivity) {
  const viewScore = post.viewCount * 0.5;
  const likeScore = post.likeCount * 2;
  const recentScore = isRecent(post.createdAt) ? 10 : 0;
  const locationScore = userActivity?.location === post.location ? 5 : 0;
  const categoryScore = userActivity?.categories.includes(post.category) ? 3 : 0;
  
  return viewScore + likeScore + recentScore + locationScore + categoryScore;
}

// 시간대별 추천
function getTimeBasedRecommendations() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    return "아침 추천 게시글"; // 예: 운동, 커뮤니티
  } else if (hour >= 12 && hour < 18) {
    return "오후 추천 게시글"; // 예: 맛집, 이벤트
  } else {
    return "저녁 추천 게시글"; // 예: 모임, 중고거래
  }
}
```

---

### 4. **게시글 작성 도우미 (템플릿 시스템)** ⭐⭐
**구현 가능 이유:** 템플릿과 키워드 추출은 규칙 기반으로 가능

**구현할 기능:**
- ✅ **카테고리별 템플릿 생성**: "아이폰 팝니다" → 품질, 상태, 가격 포함 템플릿
- ✅ **제목 힌트 제안**: 카테고리에 맞는 제목 예시 제공
- ✅ **필수 항목 체크리스트**: 카테고리별 필수 입력 항목 안내
- ✅ **키워드 추출** (간단한 버전): 제목에서 핵심 키워드 자동 추출

**기술 스택:**
- 템플릿 엔진 (TypeScript)
- 키워드 추출 (정규식)

**예상 개발 시간:** 2-3일

**적용 위치:**
- `app/life/market/write/page.tsx`
- `app/news/hotplaces/create/page.tsx`

**구현 예시:**
```typescript
// 카테고리별 템플릿
const templates = {
  "전자제품": {
    title: "[상품명] 팝니다",
    description: `
- 상태: [양호/보통/불량]
- 구매 시기: [YYYY년 MM월]
- 사용 기간: [X개월]
- 가격: [가격]
- 거래 희망 장소: [장소]
    `.trim(),
  },
  // ...
};

// 제목 힌트
const titleHints = {
  "전자제품": ["아이폰 14 프로 팝니다", "LG 세탁기 판매", "노트북 팝니다"],
  "가구": ["소파 팝니다", "책상 무료나눔", "의자 삽니다"],
  // ...
};
```

---

### 5. **간단한 FAQ 챗봇 (키워드 기반)** ⭐⭐
**구현 가능 이유:** 키워드 매칭 기반 자동 응답만 있으면 됨

**구현할 기능:**
- ✅ **FAQ 자동 응답**: 자주 묻는 질문 자동 답변
- ✅ **서비스 안내**: "회원가입은 어떻게 하나요?", "포인트는 어떻게 얻나요?" 등
- ✅ **키워드 매칭**: 입력된 문장에서 키워드 추출하여 관련 FAQ 제공

**기술 스택:**
- 키워드 매칭 알고리즘
- FAQ 데이터베이스 (Supabase)

**예상 개발 시간:** 3-4일

**적용 위치:**
- 새로운 컴포넌트: `components/support/SimpleChatbot.tsx`
- `app/support/page.tsx` (고객 지원 페이지)

**구현 예시:**
```typescript
// FAQ 데이터
const faqData = [
  {
    keywords: ["회원가입", "가입", "등록"],
    question: "회원가입은 어떻게 하나요?",
    answer: "우측 상단의 '회원가입' 버튼을 클릭하신 후 이메일과 비밀번호를 입력하시면 됩니다.",
  },
  {
    keywords: ["포인트", "점수", "활동"],
    question: "포인트는 어떻게 얻나요?",
    answer: "게시글 작성(10P), 댓글 작성(2P), 일일 로그인(1P)으로 포인트를 얻을 수 있습니다.",
  },
  // ...
];

// 키워드 매칭
function findFAQ(userInput: string) {
  const inputLower = userInput.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some(keyword => inputLower.includes(keyword))) {
      return faq;
    }
  }
  return null;
}
```

---

## ⚠️ 구현 불가능한 기능 (외부 API 필요)

### ❌ 이미지 자동 태그/설명 생성
- 이미지 분석은 **반드시 외부 API 필요** (Google Cloud Vision, AWS Rekognition, OpenAI Vision)
- 제가 직접 구현 불가능

### ❌ 진정한 AI 챗봇 (대화형)
- 자연어 이해와 생성은 **GPT API 필요**
- 키워드 기반 FAQ 봇만 가능

### ❌ 제목 자동 생성 (AI 기반)
- 생성형 AI는 **GPT API 필요**
- 템플릿 기반 힌트만 가능

### ❌ 내용 개선 제안 (AI 기반)
- 문법/가독성 개선은 **AI API 필요**
- 기본적인 필수 항목 체크리스트만 가능

---

## 📊 최종 추천 구현 순서

### Phase 1 (1주) - 가장 큰 효과
1. **스마트 검색 기능** ⭐⭐⭐
   - 검색 경험 대폭 개선
   - 구현 시간: 3-5일
   - 예상 효과: ⭐⭐⭐⭐⭐

2. **자동 카테고리 분류** ⭐⭐⭐
   - 사용자 편의성 향상
   - 구현 시간: 2-3일
   - 예상 효과: ⭐⭐⭐⭐

### Phase 2 (1주) - 사용자 참여도 증가
3. **콘텐츠 추천 시스템** ⭐⭐⭐
   - 사용자 재방문율 증가
   - 구현 시간: 5-7일
   - 예상 효과: ⭐⭐⭐⭐⭐

### Phase 3 (1주) - 편의 기능
4. **게시글 작성 도우미** ⭐⭐
   - 콘텐츠 품질 향상
   - 구현 시간: 2-3일
   - 예상 효과: ⭐⭐⭐

5. **간단한 FAQ 챗봇** ⭐⭐
   - 고객 지원 부담 감소
   - 구현 시간: 3-4일
   - 예상 효과: ⭐⭐⭐⭐

---

## 💰 비용

**모든 기능 외부 API 없이 구현 가능 → 비용 0원!**

- 유사어 검색: 키워드 사전만 있으면 됨
- 자동 카테고리 분류: 규칙 기반 분류
- 콘텐츠 추천: 통계 기반 점수 계산
- 템플릿 시스템: 하드코딩된 템플릿
- FAQ 챗봇: 키워드 매칭

---

## 🚀 시작하기

**제가 자신 있게 구현할 수 있는 순서:**

1. **자동 카테고리 분류** (가장 간단, 효과 큼) - 2-3일
2. **스마트 검색 기능** (검색 경험 개선) - 3-5일
3. **콘텐츠 추천 시스템** (사용자 참여도 증가) - 5-7일
4. **게시글 작성 도우미** (편의 기능) - 2-3일
5. **간단한 FAQ 챗봇** (고객 지원) - 3-4일

**총 예상 시간:** 약 3주 (단계별 구현)

---

## ✅ 결론

제가 **100% 자신 있게 구현**할 수 있는 기능:
1. ✅ 스마트 검색 기능 (유사어, 자동완성)
2. ✅ 자동 카테고리 분류 (키워드 기반)
3. ✅ 콘텐츠 추천 시스템 (통계 기반)
4. ✅ 게시글 작성 도우미 (템플릿 시스템)
5. ✅ 간단한 FAQ 챗봇 (키워드 매칭)

**어떤 기능부터 시작할까요?**

---

**제안서 작성일:** 2024-12-19
**버전:** 2.0 (현실적 버전)

