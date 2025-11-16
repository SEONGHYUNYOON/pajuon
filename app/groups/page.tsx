"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const categories = ["전체", "등산", "라이딩", "조기축구", "캠핑", "독서", "요리", "영화", "기타"];
const groups = [
  { id: 1, name: "파주 산악회", category: "등산", members: 24, posts: 156, created: "2일 전", description: "주말 등산을 즐기는 모임입니다" },
  { id: 2, name: "주말 자전거 라이딩", category: "라이딩", members: 18, posts: 89, created: "3일 전", description: "자전거를 타며 파주를 둘러봅니다" },
  { id: 3, name: "조기축구회", category: "조기축구", members: 32, posts: 234, created: "5일 전", description: "매주 일요일 아침 축구 모임" },
  { id: 4, name: "캠핑 모임", category: "캠핑", members: 15, posts: 67, created: "1주 전", description: "계절별 캠핑을 즐기는 모임" },
  { id: 5, name: "독서 모임", category: "독서", members: 22, posts: 145, created: "2주 전", description: "월 1회 독서 토론 모임" },
  { id: 6, name: "요리 모임", category: "요리", members: 19, posts: 98, created: "3주 전", description: "다양한 요리를 함께 만들어요" },
];

export default function GroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = groups.filter((group) => {
    const matchesCategory = selectedCategory === "전체" || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">함께해요 (모임)</h1>
          <p className="text-lg text-gray-600">
            관심사가 맞는 분들과 함께 새로운 만남을 시작해보세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="모임 이름이나 설명으로 검색..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link
              href="/groups/create"
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              모임 만들기
            </Link>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 모임 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Link
              key={group.id}
              href={`/groups/${group.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {group.category}
                </span>
                <span className="text-xs text-gray-500">{group.created}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>👥 {group.members}명</span>
                  <span>📝 {group.posts}개 글</span>
                </div>
                <div className="flex items-center text-green-600">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                  채팅방
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            <Link
              href="/groups/create"
              className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              첫 번째 모임 만들기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
