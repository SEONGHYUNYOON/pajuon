"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// 이미지 다양화를 위한 고정된 이미지 ID 배열 (20개)
const IMAGE_IDS = [
  "photo-1505740420928-5e560c06d30e",
  "photo-1511632765486-a01980e01a18",
  "photo-1551632811-561732d1e306",
  "photo-1559339352-11d035aa65de",
  "photo-1509042239860-f550ce710b93",
  "photo-1544531586-fde5298cdd40",
  "photo-1481627834876-b7833e8f5570",
  "photo-1431324155629-1a6deb1dec8d",
  "photo-1488646953014-85cb44e25828",
  "photo-1478131143081-80f7f84ca84d",
  "photo-1544947950-fa07a98d237f",
  "photo-1526170375885-4d8ecf77b99f",
  "photo-1506905925346-21bda4d32df4",
  "photo-1519681393784-d120267933ba",
  "photo-1464822759844-d150ad90c88c",
  "photo-1506905925346-21bda4d32df4",
  "photo-1506443432602-ac2fcd6f54e0",
  "photo-1469474968028-56623f02e42e",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1441974231531-c6227db76b6e",
];

// 카테고리 구조 정의
const categoryGroups = [
  {
    label: "🏃 액티비티/취미 (참여형)",
    options: [
      { label: "등산/트레킹", value: "HIKING" },
      { label: "라이딩/러닝", value: "RIDING" },
      { label: "구기 종목", value: "SPORTS" },
      { label: "반려동물", value: "PETS" },
      { label: "캠핑/차박", value: "CAMPING" },
    ],
  },
  {
    label: "📚 문화/라이프 (지역 특화)",
    options: [
      { label: "독서/인문학", value: "READING" },
      { label: "카페/맛집 투어", value: "FOOD_TOUR" },
      { label: "사진/출사", value: "PHOTO" },
    ],
  },
  {
    label: "🏫 소셜/네트워킹 (연결)",
    options: [
      { label: "아이러브스쿨 (동창찾기)", value: "ALUMNI" },
      { label: "솔로탈출 (미팅)", value: "DATING" },
      { label: "육아/살림", value: "PARENTING" },
    ],
  },
];

interface Group {
  id: string;
  name: string;
  description: string;
  category: string; // value 값
  categoryLabel: string; // 표시용 라벨
  coverImage: string | null;
  creator: {
    id: string;
    nickname: string;
    profileImage: string | null;
  };
  memberCount: number;
  postCount: number;
  createdAt: string;
}

// 더미 데이터 생성
const generateDummyGroups = (): Group[] => {
  const baseData = [
    { name: "심학산 둘레길 걷기", desc: "매주 토요일 심학산 둘레길 함께 걸어요", cat: "HIKING", catLabel: "등산/트레킹" },
    { name: "감악산 출렁다리 번개", desc: "감악산 출렁다리 인생샷 찍으러 가실 분!", cat: "HIKING", catLabel: "등산/트레킹" },
    { name: "공릉천 러닝 크루", desc: "매일 저녁 8시 공릉천에서 5km 러닝", cat: "RIDING", catLabel: "라이딩/러닝" },
    { name: "DMZ 자전거 라이딩", desc: "주말 평화누리길 자전거 라이딩 모임", cat: "RIDING", catLabel: "라이딩/러닝" },
    { name: "운정 조기축구회", desc: "일요일 아침 땀 흘리며 축구하실 분 모집", cat: "SPORTS", catLabel: "구기 종목" },
    { name: "파주 풋살 매니아", desc: "평일 야간 풋살 용병 구합니다", cat: "SPORTS", catLabel: "구기 종목" },
    { name: "운정 호수공원 댕댕이 산책", desc: "강아지 친구 만들어주기 프로젝트", cat: "PETS", catLabel: "반려동물" },
    { name: "파주 펫티켓 지킴이", desc: "올바른 반려동물 문화를 만들어가요", cat: "PETS", catLabel: "반려동물" },
    { name: "임진각 평화누리 캠핑", desc: "가족과 함께하는 주말 캠핑", cat: "CAMPING", catLabel: "캠핑/차박" },
    { name: "파주 노지 캠핑 공유", desc: "나만 아는 시크릿 노지 공유해요", cat: "CAMPING", catLabel: "캠핑/차박" },
    { name: "책과 콩나무", desc: "출판단지 지혜의 숲에서 독서 토론", cat: "READING", catLabel: "독서/인문학" },
    { name: "파주 인문학 살롱", desc: "매월 1회 인문학 강연 함께 듣기", cat: "READING", catLabel: "독서/인문학" },
    { name: "헤이리 카페 탐방대", desc: "예쁜 카페 찾아다니며 힐링해요", cat: "FOOD_TOUR", catLabel: "카페/맛집 투어" },
    { name: "야당역 맛집 도장깨기", desc: "야당역 근처 숨은 맛집 발굴단", cat: "FOOD_TOUR", catLabel: "카페/맛집 투어" },
    { name: "임진각 출사 모임", desc: "노을이 예쁜 임진각에서 사진 찍어요", cat: "PHOTO", catLabel: "사진/출사" },
    { name: "벽초지 수목원 인생샷", desc: "꽃구경하며 서로 인생샷 찍어주기", cat: "PHOTO", catLabel: "사진/출사" },
    { name: "금촌고 15회 동창회", desc: "보고싶다 친구들아!", cat: "ALUMNI", catLabel: "아이러브스쿨" },
    { name: "문산여고 졸업생 모임", desc: "추억의 떡볶이집 번개", cat: "ALUMNI", catLabel: "아이러브스쿨" },
    { name: "운정 선남선녀 미팅", desc: "설레는 만남, 좋은 인연 만들어요", cat: "DATING", catLabel: "솔로탈출" },
    { name: "주말 레크리에이션", desc: "신나게 놀면서 자연스럽게 친해져요", cat: "DATING", catLabel: "솔로탈출" },
    { name: "파주맘 육아 꿀팁", desc: "육아 고민 함께 나누고 정보 공유해요", cat: "PARENTING", catLabel: "육아/살림" },
    { name: "우리동네 벼룩시장", desc: "안 쓰는 물건 서로 나눠쓰고 바꿔써요", cat: "PARENTING", catLabel: "육아/살림" },
    { name: "파주 배드민턴 클럽", desc: "초보자 환영! 배드민턴으로 건강 챙겨요", cat: "SPORTS", catLabel: "구기 종목" },
    { name: "헤이리 예술 산책", desc: "예술 작품 감상하며 교양 쌓기", cat: "READING", catLabel: "독서/인문학" },
  ];

  return baseData.map((data, index) => ({
    id: String(index + 1),
    name: data.name,
    description: data.desc,
    category: data.cat,
    categoryLabel: data.catLabel,
    coverImage: `https://images.unsplash.com/${IMAGE_IDS[index % IMAGE_IDS.length]}?auto=format&fit=crop&w=800&q=80`,
    creator: {
      id: `user-${index}`,
      nickname: `파주사람${index + 1}`,
      profileImage: null,
    },
    memberCount: Math.floor(Math.random() * 100) + 10,
    postCount: Math.floor(Math.random() * 50) + 5,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const dummyGroups = generateDummyGroups();

export default function GroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 API 연동 시 여기서 fetch
    // 지금은 더미 데이터 필터링
    setIsLoading(true);
    setTimeout(() => {
      let filtered = dummyGroups;
      if (selectedCategory !== "ALL") {
        filtered = dummyGroups.filter((g) => g.category === selectedCategory);
      }
      setGroups(filtered);
      setIsLoading(false);
    }, 300); // 로딩 효과
  }, [selectedCategory]);

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="w-full">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-3xl font-bold text-white">참여형 소셜</h1>
          </div>
          <p className="text-gray-400">
            관심사가 맞는 분들과 함께 새로운 만남을 시작해보세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 space-y-4">
            {/* 검색창 */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="모임 이름이나 설명으로 검색..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 카테고리 버튼 (중앙 정렬 & 사이즈 확대) */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`px-6 py-3 rounded-full text-lg font-bold transition-all whitespace-nowrap ${selectedCategory === "ALL"
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 border border-neutral-700"
                  }`}
              >
                전체
              </button>
              {categoryGroups.flatMap(g => g.options).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCategory(option.value)}
                  className={`px-6 py-3 rounded-full text-lg font-bold transition-all whitespace-nowrap ${selectedCategory === option.value
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 border border-neutral-700"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 모임 목록 - 인스타그램 피드 스타일 (다크 테마) */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center w-full space-y-6">
              {filteredGroups.map((group, index) => (
                <div
                  key={group.id}
                  className="w-full max-w-[470px] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800"
                >
                  {/* 헤더: 프로필 + 닉네임 + 더보기 */}
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {group.creator.nickname.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {group.creator.nickname}
                        </div>
                        <div className="text-xs text-gray-500">
                          {group.categoryLabel} • {new Date(group.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">⋯</button>
                  </div>

                  {/* 이미지: 1:1 비율 */}
                  <div className="w-full aspect-square bg-neutral-800 relative">
                    <img
                      src={group.coverImage!}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 액션 바 */}
                  <div className="p-3 flex items-center space-x-4">
                    <button className="text-white hover:text-red-500 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button className="text-white hover:text-blue-500 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>
                    <button className="text-white hover:text-blue-500 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 본문 */}
                  <div className="px-3 pb-3">
                    <div className="mb-2">
                      <span className="font-bold text-white text-sm mr-2">{group.name}</span>
                      <span className="text-white text-sm">
                        {group.description}
                      </span>
                    </div>

                    <div className="text-gray-400 text-sm mb-1">
                      댓글 {group.postCount}개 모두 보기
                    </div>
                    <div className="text-xs text-gray-500">
                      멤버 {group.memberCount}명 참여중
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="bg-neutral-900 rounded-lg text-center py-12 border border-neutral-800 max-w-[500px] mx-auto w-full">
                <p className="text-gray-400 text-lg mb-4">
                  {searchQuery
                    ? "검색 결과가 없습니다."
                    : "해당 카테고리에 모임이 없습니다."}
                </p>
                <Link
                  href="/groups/create"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  첫 번째 모임 만들기
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
