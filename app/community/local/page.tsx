"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const areas = ["전체", "운정", "교하", "금촌", "문산", "기타"];

const dummyPosts = [
  {
    id: 1,
    title: "운정 호수공원 야간 산책 모임",
    area: "운정",
    author: "산책러",
    date: "1시간 전",
    views: 123,
    comments: 5
  },
  {
    id: 2,
    title: "금촌 로타리 맛집 탐방대 모집",
    area: "금촌",
    author: "먹깨비",
    date: "2시간 전",
    views: 89,
    comments: 3
  },
  {
    id: 3,
    title: "문산 자유시장 장보기 함께해요",
    area: "문산",
    author: "알뜰주부",
    date: "3시간 전",
    views: 67,
    comments: 8
  },
  {
    id: 4,
    title: "교하 도서관 독서 동아리",
    area: "교하",
    author: "책벌레",
    date: "5시간 전",
    views: 156,
    comments: 12
  },
  {
    id: 5,
    title: "주말 축구 하실 분 구합니다",
    area: "운정",
    author: "FC파주",
    date: "1일 전",
    views: 230,
    comments: 15
  },
  {
    id: 6,
    title: "탄현면 헤이리 커피 번개",
    area: "기타",
    author: "커피조아",
    date: "1일 전",
    views: 98,
    comments: 6
  },
  {
    id: 7,
    title: "조리읍 봉일천 배드민턴 모임",
    area: "기타",
    author: "민턴왕",
    date: "1일 전",
    views: 145,
    comments: 9
  },
  {
    id: 8,
    title: "월롱면 LG디스플레이 카풀 구해요",
    area: "기타",
    author: "직장인",
    date: "2일 전",
    views: 312,
    comments: 4
  },
  {
    id: 9,
    title: "운정 가람마을 육아 소통해요",
    area: "운정",
    author: "육아맘",
    date: "2일 전",
    views: 201,
    comments: 23
  },
  {
    id: 10,
    title: "금촌 역전앞 포장마차 같이 가실분",
    area: "금촌",
    author: "술고래",
    date: "2일 전",
    views: 178,
    comments: 11
  },
  {
    id: 11,
    title: "문산 당동리 영화 관람 모임",
    area: "문산",
    author: "무비무비",
    date: "3일 전",
    views: 134,
    comments: 7
  },
  {
    id: 12,
    title: "교하 심학산 등산 메이트",
    area: "교하",
    author: "산사람",
    date: "3일 전",
    views: 167,
    comments: 14
  }
];

export default function LocalCommunityPage() {
  const [activeArea, setActiveArea] = useState("전체");

  const filteredPosts = activeArea === "전체"
    ? dummyPosts
    : dummyPosts.filter(post => post.area === activeArea);

  return (
    <div className="py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <MapPinIcon className="w-10 h-10 text-green-500" />
                <h1 className="text-4xl font-bold text-gray-900 text-center">동네별 소모임</h1>
              </div>
              <p className="text-lg text-gray-600 text-center">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">동네 선택</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeArea === area
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
                className="block p-6 hover:bg-gray-50 transition-colors text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-2">
                      {post.area}동
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <span>{post.date}</span>
                    <span>조회 {post.views}</span>
                    <span className="text-green-600 font-medium">댓글 {post.comments}</span>
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
