"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, PlusIcon, CameraIcon } from "@heroicons/react/24/outline";

const tabs = ["산책친구", "병원/미용후기", "용품나눔"];

const posts = [
  {
    id: 1,
    title: "운정호수공원 반려견 산책 같이 하실 분",
    category: "산책친구",
    author: "강아지맘",
    date: "2시간 전",
    comments: 8,
    views: 123,
    pet: "골든리트리버, 3세",
  },
  {
    id: 2,
    title: "파주동물병원 진료 후기",
    category: "병원/미용후기",
    author: "고양이집사",
    date: "5시간 전",
    comments: 15,
    views: 234,
    pet: "페르시안, 5세",
  },
  {
    id: 3,
    title: "강아지 장난감 무료 나눔합니다",
    category: "용품나눔",
    author: "반려동물러버",
    date: "1일 전",
    comments: 12,
    views: 189,
    pet: "중형견용",
  },
  {
    id: 4,
    title: "교하동 반려견 미용샵 추천 받아요",
    category: "병원/미용후기",
    author: "반려인1",
    date: "1일 전",
    comments: 20,
    views: 256,
    pet: "시츄, 2세",
  },
  {
    id: 5,
    title: "금촌동 주말 산책 친구 구합니다",
    category: "산책친구",
    author: "애견맘",
    date: "2일 전",
    comments: 6,
    views: 98,
    pet: "비숑프리제, 4세",
  },
  {
    id: 6,
    title: "강아지 배변패드 나눔합니다",
    category: "용품나눔",
    author: "반려가족",
    date: "2일 전",
    comments: 18,
    views: 167,
    pet: "소형견용",
  },
  {
    id: 7,
    title: "문산읍 저녁 산책 메이트 구해요",
    category: "산책친구",
    author: "문산댁",
    date: "3일 전",
    comments: 4,
    views: 76,
    pet: "말티즈, 2세",
  },
  {
    id: 8,
    title: "고양이 캣타워 드림합니다",
    category: "용품나눔",
    author: "냥이사랑",
    date: "3일 전",
    comments: 25,
    views: 312,
    pet: "대형",
  },
  {
    id: 9,
    title: "운정 24시 동물병원 추천좀요",
    category: "병원/미용후기",
    author: "다급해요",
    date: "4일 전",
    comments: 32,
    views: 450,
    pet: "푸들, 6세",
  },
  {
    id: 10,
    title: "강아지 수제간식 같이 만드실 분",
    category: "산책친구",
    author: "요리왕",
    date: "4일 전",
    comments: 11,
    views: 134,
    pet: "포메라니안, 1세",
  },
  {
    id: 11,
    title: "이동장 무료로 드려요",
    category: "용품나눔",
    author: "천사",
    date: "5일 전",
    comments: 9,
    views: 156,
    pet: "소형",
  },
  {
    id: 12,
    title: "교하 애견카페 후기입니다",
    category: "병원/미용후기",
    author: "카페탐방",
    date: "5일 전",
    comments: 14,
    views: 223,
    pet: "웰시코기, 3세",
  },
];

export default function PetCommunityPage() {
  const [activeTab, setActiveTab] = useState("산책친구");

  const filteredPosts = posts.filter((post) => post.category === activeTab);

  return (
    <div className="py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <HeartIcon className="w-10 h-10 text-pink-500" />
                <h1 className="text-4xl font-bold text-gray-900">반려동물ON</h1>
              </div>
              <p className="text-lg text-gray-600">
                반려동물과 함께하는 행복한 삶을 공유하는 공간입니다
              </p>
            </div>
            <Link
              href="/community/pet/write"
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
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab
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
                href={`/community/pet/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-2 space-x-3">
                    <span>🐾 {post.pet}</span>
                    <span>작성자: {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500 space-x-4">
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
            <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">등록된 글이 없습니다.</p>
          </div>
        )}

        {/* 반려동물 갤러리 링크 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
          <CameraIcon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">반려동물 사진 갤러리</h2>
          <p className="text-gray-600 mb-4">귀여운 반려동물 사진을 공유해보세요</p>
          <Link
            href="/play/album?filter=pet"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
          >
            갤러리 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
