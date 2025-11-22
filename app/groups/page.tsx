"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "@/components/ui/PageHeader";
import FilterChip from "@/components/ui/FilterChip";
import Card from "@/components/ui/Card";

const categories = [
  { label: "전체", value: null },
  { label: "등산", value: "HIKING" },
  { label: "라이딩", value: "RIDING" },
  { label: "고지 축구", value: "SOCCER" },
  { label: "캠핑", value: "CAMPING" },
  { label: "기타", value: "OTHER" },
];

interface Group {
  id: string;
  name: string;
  description: string;
  type: string;
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

// 더미 데이터 - 20개 이상 확충
const baseGroups: Omit<Group, "id">[] = [
  {
    name: "파주 주말 등산회",
    description: "매 주말 함께 등산하며 건강한 삶을 추구하는 모임입니다. 초보자 환영!",
    type: "HIKING",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "1", nickname: "등산러버", profileImage: null },
    memberCount: 45,
    postCount: 23,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "운정 맛집 탐방대",
    description: "파주 맛집을 발굴하고 함께 먹으러 다니는 맛집 덕후 모임",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    creator: { id: "2", nickname: "맛집왕", profileImage: null },
    memberCount: 120,
    postCount: 67,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "새벽 독서 모임",
    description: "평일 새벽 6시에 만나 함께 독서하고 인사이트를 나누는 모임",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    creator: { id: "3", nickname: "책벌레", profileImage: null },
    memberCount: 28,
    postCount: 15,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "토요일 풋살",
    description: "토요일 오후 풋살을 즐기는 모임입니다. 체력 단련과 친목 도모!",
    type: "SOCCER",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "4", nickname: "축구매니아", profileImage: null },
    memberCount: 32,
    postCount: 12,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "파주 자전거 라이딩",
    description: "주말에 함께 자전거 타며 파주 풍경을 즐기는 모임",
    type: "RIDING",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "5", nickname: "라이더", profileImage: null },
    memberCount: 56,
    postCount: 31,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "캠핑 모임",
    description: "계절마다 함께 캠핑하며 자연을 즐기는 모임입니다",
    type: "CAMPING",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "6", nickname: "캠퍼", profileImage: null },
    memberCount: 38,
    postCount: 19,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "파주 러닝크루",
    description: "아침 달리기를 함께하는 건강한 라이프스타일 모임",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "7", nickname: "러너", profileImage: null },
    memberCount: 67,
    postCount: 34,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "파주 사진 동호회",
    description: "파주의 아름다운 풍경을 함께 찍고 공유하는 사진 모임",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    creator: { id: "8", nickname: "포토그래퍼", profileImage: null },
    memberCount: 52,
    postCount: 89,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "파주 반려동물 모임",
    description: "반려동물과 함께하는 산책 및 모임 활동",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    creator: { id: "9", nickname: "펫러버", profileImage: null },
    memberCount: 78,
    postCount: 45,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: "파주 요가 클래스",
    description: "주 2회 함께하는 요가 클래스, 초보자부터 고급자까지 환영",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    creator: { id: "10", nickname: "요가선생", profileImage: null },
    memberCount: 34,
    postCount: 22,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// 더미 데이터를 20개 이상으로 확장
const dummyGroups: Group[] = Array.from({ length: 24 }, (_, i) => {
  const base = baseGroups[i % baseGroups.length];
  return {
    ...base,
    id: String(i + 1),
    name: `${base.name}${i >= baseGroups.length ? ` ${Math.floor(i / baseGroups.length) + 1}기` : ""}`,
    memberCount: base.memberCount + Math.floor(Math.random() * 30),
    postCount: base.postCount + Math.floor(Math.random() * 20),
    createdAt: new Date(Date.now() - (i * 2) * 24 * 60 * 60 * 1000).toISOString(),
  };
});

export default function GroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, [selectedCategory]);

  const loadGroups = async () => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `/api/groups?type=${selectedCategory}`
        : "/api/groups";
      const response = await fetch(url);
      const data = await response.json();
      
      // API에서 가져온 데이터가 없거나 비어있으면 더미 데이터 사용
      if (data.groups && data.groups.length > 0) {
        setGroups(data.groups);
      } else {
        // 카테고리 필터링 적용
        const filtered = selectedCategory
          ? dummyGroups.filter((g) => g.type === selectedCategory)
          : dummyGroups;
        setGroups(filtered);
      }
    } catch (error) {
      console.error("Failed to load groups:", error);
      // 에러 발생 시에도 더미 데이터 사용
      const filtered = selectedCategory
        ? dummyGroups.filter((g) => g.type === selectedCategory)
        : dummyGroups;
      setGroups(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="w-full">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">함께해요 (모임)</h1>
            <Link
              href="/groups/create"
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              모임 만들기
            </Link>
          </div>
          <p className="text-gray-400">관심사가 맞는 분들과 함께 새로운 만남을 시작해보세요</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-neutral-900 rounded-lg p-6 mb-8 border border-neutral-800">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="모임 이름이나 설명으로 검색..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value || "all"}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 모임 목록 - 인스타그램 피드 스타일 (다크 테마) */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="max-w-2xl mx-auto space-y-6">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-neutral-900 rounded-lg overflow-hidden"
                >
                  {/* 헤더: 프로필 + 닉네임 + 더보기 */}
                  <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        {group.creator.nickname.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{group.creator.nickname}</div>
                        <div className="text-xs text-gray-500">{new Date(group.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button className="text-white text-xl font-bold">⋯</button>
                  </div>

                  {/* 이미지: 1:1 비율 */}
                  <div className="w-full aspect-square bg-neutral-800 relative">
                    {group.coverImage ? (
                      <img
                        src={`${group.coverImage}&random=${Math.random()}`}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserGroupIcon className="w-16 h-16 text-neutral-600" />
                      </div>
                    )}
                  </div>

                  {/* 액션 바: 하트, 댓글, 공유 (이미지 바로 아래) */}
                  <div className="p-3 flex items-center space-x-4 border-b border-neutral-800">
                    <button className="text-white hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="text-white hover:text-blue-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                    <button className="text-white hover:text-blue-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>

                  {/* 본문: 아이디 + 본문 */}
                  <div className="p-3">
                    <div className="mb-2">
                      <Link href={`/groups/${group.id}`} className="font-semibold text-white text-sm hover:underline">
                        {group.creator.nickname}
                      </Link>
                      <span className="text-white text-sm ml-2">
                        {group.description.length > 100 ? (
                          <>
                            {group.description.substring(0, 100)}...
                            <button className="text-gray-400 ml-1">더보기</button>
                          </>
                        ) : (
                          group.description
                        )}
                      </span>
                    </div>

                    {/* 댓글 미리보기 */}
                    <button className="text-gray-400 text-sm mb-2 hover:text-gray-300">
                      댓글 {group.postCount}개 모두 보기
                    </button>

                    <div className="text-xs text-gray-500 mt-2">
                      멤버 {group.memberCount}명
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="bg-neutral-900 rounded-lg text-center py-12 border border-neutral-800">
                <p className="text-gray-400 text-lg mb-4">
                  {searchQuery ? "검색 결과가 없습니다." : "등록된 모임이 없습니다."}
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
