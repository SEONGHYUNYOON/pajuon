"use client";

import { useState } from "react";
import Link from "next/link";
import { AcademicCapIcon, PlusIcon } from "@heroicons/react/24/outline";

const tabs = ["육아정보", "학원정보", "키즈카페/놀이터"];

const posts = [
  {
    id: 1,
    title: "파주 지역 어린이집 추천 좀 해주세요",
    category: "육아정보",
    author: "파주맘",
    date: "2시간 전",
    comments: 12,
    views: 156,
  },
  {
    id: 2,
    title: "운정동 영어학원 정보 공유",
    category: "학원정보",
    author: "학부모123",
    date: "5시간 전",
    comments: 8,
    views: 89,
  },
  {
    id: 3,
    title: "헤이리 키즈카페 방문 후기",
    category: "키즈카페/놀이터",
    author: "육아러버",
    date: "1일 전",
    comments: 15,
    views: 234,
  },
  {
    id: 4,
    title: "파주 지역 체험학습 장소 추천",
    category: "육아정보",
    author: "체험맘",
    date: "1일 전",
    comments: 6,
    views: 67,
  },
  {
    id: 5,
    title: "교하동 수학학원 비교 후기",
    category: "학원정보",
    author: "수학맘",
    date: "2일 전",
    comments: 20,
    views: 145,
  },
  {
    id: 6,
    title: "운정호수공원 놀이터 시설 정보",
    category: "키즈카페/놀이터",
    author: "놀이터러버",
    date: "2일 전",
    comments: 9,
    views: 112,
  },
];

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("육아정보");

  const filteredPosts = posts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <AcademicCapIcon className="w-10 h-10 text-orange-500" />
                <h1 className="text-4xl font-bold text-gray-900">파주 육아/교육</h1>
              </div>
              <p className="text-lg text-gray-600">육아와 교육 정보를 공유하는 공간입니다</p>
            </div>
            <Link
              href="/life/education/write"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              글쓰기
            </Link>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/life/education/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>작성자: {post.author}</span>
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
            <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">등록된 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
