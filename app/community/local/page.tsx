"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const areas = ["전체", "운정", "교하", "금촌", "문산", "기타"];

const posts = [
  {
    id: 1,
    title: "운정동 주민 모임 가입하세요",
    area: "운정",
    author: "운정러버",
    date: "1시간 전",
    comments: 15,
    views: 234,
  },
  {
    id: 2,
    title: "교하동 이벤트 공유합니다",
    area: "교하",
    author: "교하맘",
    date: "3시간 전",
    comments: 8,
    views: 156,
  },
  {
    id: 3,
    title: "금촌동 맛집 추천 받아요",
    area: "금촌",
    author: "금촌러버",
    date: "5시간 전",
    comments: 22,
    views: 345,
  },
  {
    id: 4,
    title: "문산 지역 축제 함께 가요",
    area: "문산",
    author: "문산러버",
    date: "1일 전",
    comments: 12,
    views: 189,
  },
  {
    id: 5,
    title: "운정동 공원 산책하실 분",
    area: "운정",
    author: "운정맘",
    date: "1일 전",
    comments: 6,
    views: 98,
  },
  {
    id: 6,
    title: "교하동 자전거 동호회 모집",
    area: "교하",
    author: "교하사이클",
    date: "2일 전",
    comments: 18,
    views: 267,
  },
];

export default function LocalCommunityPage() {
  const [activeArea, setActiveArea] = useState("전체");

  const filteredPosts =
    activeArea === "전체"
      ? posts
      : posts.filter((post) => post.area === activeArea);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <MapPinIcon className="w-10 h-10 text-green-500" />
                <h1 className="text-4xl font-bold text-gray-900">동네별 소모임</h1>
              </div>
              <p className="text-lg text-gray-600">
                우리 동네 사람들끼리 소통하는 공간입니다
              </p>
            </div>
            <Link
              href="/community/local/write"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              글쓰기
            </Link>
          </div>
        </div>

        {/* 동네 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">동네 선택</h2>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeArea === area
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {activeArea === "전체" ? "전체" : `${activeArea}동`} 게시판
              </h2>
              <div className="text-sm text-gray-500">
                총 {filteredPosts.length}개 글
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/community/local/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {post.area}동
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <span>{post.date}</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    <span className="text-green-600 font-medium">{post.comments}</span>
                    <span className="ml-1">댓글</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {activeArea === "전체" ? "등록된 글이 없습니다." : `${activeArea}동에 등록된 글이 없습니다.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
