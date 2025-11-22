/**
 * 중고거래 게시글 자동 카테고리 분류 시스템
 * 제목 기반으로 카테고리와 타입을 자동 감지합니다.
 */

// 카테고리 키워드 매핑
const categoryKeywords: Record<string, string[]> = {
  "전자제품": [
    // 스마트폰
    "아이폰", "iphone", "갤럭시", "galaxy", "스마트폰", "핸드폰", "휴대폰", "폰",
    // 노트북/PC
    "노트북", "laptop", "맥북", "macbook", "컴퓨터", "PC", "데스크탑", "데스크톱",
    // 가전제품
    "냉장고", "세탁기", "에어컨", "TV", "티비", "텔레비전", "모니터", "프린터",
    // 기타 전자제품
    "에어프라이어", "전자레인지", "믹서", "청소기", "드라이기", "선풍기", "공기청정기",
    "가전제품", "전자제품", "디지털", "태블릿", "아이패드", "패드",
  ],
  "가구": [
    "소파", "침대", "책상", "의자", "책장", "옷장", "장농", "식탁", "테이블",
    "수납장", "신발장", "화장대", "침대프레임", "침대 프레임", "매트리스",
    "서랍장", "협탁", "거실장", "TV장", "책꽂이", "선반", "붙박이장",
  ],
  "자동차": [
    "아반떼", "소나타", "K5", "K3", "아이오닉", "코나", "투싼", "싼타페",
    "SUV", "경차", "중형차", "대형차", "차량", "자동차", "차", "오토바이",
    "현대", "기아", "쌍용", "GM", "르노삼성", "현대자동차", "기아자동차",
  ],
  "부동산": [
    "아파트", "원룸", "단독주택", "상가", "오피스텔", "토지", "부지",
    "전세", "월세", "매매", "임대", "전세자금", "보증금", "월세자금",
    "건물", "사무실", "창고", "공장", "건물 매매", "건물 임대",
  ],
};

// 타입 키워드 매핑
const typeKeywords: Record<string, string[]> = {
  "팝니다": ["팝니다", "판매", "매매", "팔아요", "팔아", "판매합니다", "매매합니다", "내놓습니다"],
  "삽니다": ["삽니다", "구매", "구해요", "찾아요", "구매합니다", "구합니다", "사고 싶어요", "구매하고 싶어요"],
  "나눔합니다": ["나눔", "무료", "증여", "나눔합니다", "무료나눔", "무료 나눔", "나눔해요", "증여합니다"],
};

/**
 * 제목에서 카테고리 자동 감지
 */
export function detectCategory(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return null;
  }

  const titleLower = title.toLowerCase();
  const scores: Record<string, number> = {};

  // 각 카테고리별로 키워드 매칭 점수 계산
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      // 정확히 일치하면 높은 점수
      if (titleLower.includes(keywordLower)) {
        score += keywordLower.length; // 키워드가 길수록 더 높은 점수
      }
    }
    if (score > 0) {
      scores[category] = score;
    }
  }

  // 점수가 가장 높은 카테고리 반환
  if (Object.keys(scores).length === 0) {
    return "기타"; // 매칭되는 카테고리가 없으면 "기타"
  }

  const sortedCategories = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sortedCategories[0][0];
}

/**
 * 제목에서 타입 자동 감지
 */
export function detectType(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return null;
  }

  const titleLower = title.toLowerCase();
  const scores: Record<string, number> = {};

  // 각 타입별로 키워드 매칭 점수 계산
  for (const [type, keywords] of Object.entries(typeKeywords)) {
    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      if (titleLower.includes(keywordLower)) {
        scores[type] = (scores[type] || 0) + keywordLower.length;
      }
    }
  }

  // 점수가 가장 높은 타입 반환
  if (Object.keys(scores).length === 0) {
    return null; // 매칭되는 타입이 없으면 null
  }

  const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sortedTypes[0][0];
}

/**
 * 제목에서 카테고리와 타입을 동시에 감지
 */
export function autoClassify(title: string): {
  category: string | null;
  type: string | null;
} {
  return {
    category: detectCategory(title),
    type: detectType(title),
  };
}

/**
 * 카테고리 추천 신뢰도 계산 (0-100)
 */
export function getCategoryConfidence(title: string, category: string): number {
  if (!title || !category || category === "기타") {
    return 0;
  }

  const titleLower = title.toLowerCase();
  const keywords = categoryKeywords[category] || [];
  let matchCount = 0;
  let totalLength = 0;

  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    if (titleLower.includes(keywordLower)) {
      matchCount++;
      totalLength += keywordLower.length;
    }
  }

  // 키워드 매칭 비율과 길이를 고려한 신뢰도 계산
  const keywordRatio = keywords.length > 0 ? matchCount / keywords.length : 0;
  const lengthRatio = titleLower.length > 0 ? totalLength / titleLower.length : 0;
  
  return Math.min(100, Math.round((keywordRatio * 50 + lengthRatio * 50)));
}

