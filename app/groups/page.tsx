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

// 더미 데이터
const dummyGroups: Group[] = [
  {
    id: "1",
    name: "파주 주말 등산회",
    description: "매 주말 함께 등산하며 건강한 삶을 추구하는 모임입니다. 초보자 환영!",
    type: "HIKING",
    coverImage: "https://source.unsplash.com/random/800x600/?hiking,mountain&sig=1",
    creator: {
      id: "1",
      nickname: "등산러버",
      profileImage: null,
    },
    memberCount: 45,
    postCount: 23,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "운정 맛집 탐방대",
    description: "파주 맛집을 발굴하고 함께 먹으러 다니는 맛집 덕후 모임",
    type: "OTHER",
    coverImage: "https://source.unsplash.com/random/800x600/?food,restaurant&sig=2",
    creator: {
      id: "2",
      nickname: "맛집왕",
      profileImage: null,
    },
    memberCount: 120,
    postCount: 67,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "새벽 독서 모임",
    description: "평일 새벽 6시에 만나 함께 독서하고 인사이트를 나누는 모임",
    type: "OTHER",
    coverImage: "https://source.unsplash.com/random/800x600/?book,reading&sig=3",
    creator: {
      id: "3",
      nickname: "책벌레",
      profileImage: null,
    },
    memberCount: 28,
    postCount: 15,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "토요일 풋살",
    description: "토요일 오후 풋살을 즐기는 모임입니다. 체력 단련과 친목 도모!",
    type: "SOCCER",
    coverImage: "https://source.unsplash.com/random/800x600/?soccer,football&sig=4",
    creator: {
      id: "4",
      nickname: "축구매니아",
      profileImage: null,
    },
    memberCount: 32,
    postCount: 12,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "파주 자전거 라이딩",
    description: "주말에 함께 자전거 타며 파주 풍경을 즐기는 모임",
    type: "RIDING",
    coverImage: "https://source.unsplash.com/random/800x600/?bicycle,cycling&sig=5",
    creator: {
      id: "5",
      nickname: "라이더",
      profileImage: null,
    },
    memberCount: 56,
    postCount: 31,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "캠핑 모임",
    description: "계절마다 함께 캠핑하며 자연을 즐기는 모임입니다",
    type: "CAMPING",
    coverImage: "https://source.unsplash.com/random/800x600/?camping,tent&sig=6",
    creator: {
      id: "6",
      nickname: "캠퍼",
      profileImage: null,
    },
    memberCount: 38,
    postCount: 19,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

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
    <div className="min-h-screen bg-[#F3F4F6] py-8 px-4">
      <div className="w-full">
        {/* 헤더 */}
        <PageHeader
          title="함께해요 (모임)"
          description="관심사가 맞는 분들과 함께 새로운 만남을 시작해보세요"
          icon={<UserGroupIcon className="w-8 h-8" />}
          action={
            <Link
              href="/groups/create"
              className="flex items-center px-6 py-3 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              모임 만들기
            </Link>
          }
        />

        {/* 검색 및 필터 */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="모임 이름이나 설명으로 검색..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paju-blue focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <FilterChip
                key={category.value || "all"}
                label={category.label}
                isActive={selectedCategory === category.value}
                onClick={() => setSelectedCategory(category.value)}
              />
            ))}
          </div>
        </Card>

        {/* 모임 목록 - 프로필 카드 형태 */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  href={`/groups/${group.id}`}
                  padding="none"
                  className="overflow-hidden"
                >
                  {/* 커버 이미지 */}
                  <div className="w-full h-48 bg-gradient-to-br from-paju-blue to-paju-green relative overflow-hidden">
                    {group.coverImage ? (
                      <img
                        src={group.coverImage}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserGroupIcon className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    {/* 멤버수 뱃지 */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-paju-blue flex items-center">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      {group.memberCount}명
                    </div>
                  </div>

                  {/* 카드 내용 */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-paju-green/10 text-paju-green rounded-full text-xs font-medium">
                        {categories.find((c) => c.value === group.type)?.label || group.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>📝 {group.postCount}개 글</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/groups/${group.id}`;
                        }}
                        className="px-4 py-2 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors text-sm font-medium"
                      >
                        가입하기
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <Card className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  {searchQuery ? "검색 결과가 없습니다." : "등록된 모임이 없습니다."}
                </p>
                <Link
                  href="/groups/create"
                  className="inline-block px-6 py-3 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors"
                >
                  첫 번째 모임 만들기
                </Link>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
