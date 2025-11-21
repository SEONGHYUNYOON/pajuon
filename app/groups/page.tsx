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
      if (data.groups) {
        setGroups(data.groups);
      }
    } catch (error) {
      console.error("Failed to load groups:", error);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
