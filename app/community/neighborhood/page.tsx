"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

// 동네별 수다방 탭 (행정구역 기준)
const neighborhoods = [
  { id: "all", label: "전체" },
  { id: "unjeong", label: "운정" },
  { id: "geumchon", label: "금촌" },
  { id: "munsan", label: "문산" },
  { id: "gyoha", label: "교하" },
  { id: "jori", label: "조리" },
  { id: "beobwon", label: "법원" },
  { id: "paju", label: "파주" },
  { id: "gwangtan", label: "광탄" },
  { id: "tanhyeon", label: "탄현" },
  { id: "wolrong", label: "월롱" },
  { id: "jeokseong", label: "적성" },
  { id: "papyeong", label: "파평" },
  { id: "jangdan", label: "장단" },
];

// 더미 게시글 데이터 (20개 이상)
const generatePosts = () => {
  const posts = [];
  const categories = ["일상", "맛집", "질문", "정보", "나눔"];
  const neighborhoodsList = neighborhoods.slice(1); // "전체" 제외

  for (let i = 1; i <= 30; i++) {
    const randomNeighborhood = neighborhoodsList[Math.floor(Math.random() * neighborhoodsList.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTime = ["방금 전", "5분 전", "10분 전", "30분 전", "1시간 전", "2시간 전", "3시간 전", "1일 전"][Math.floor(Math.random() * 8)];

    posts.push({
      id: i,
      title: `${randomNeighborhood.label} 주민분들 질문있어요 (${i})`,
      content: `${randomNeighborhood.label} 지역 맛집 추천 부탁드립니다. 가족이랑 가기 좋은 곳으로요!`,
      neighborhood: randomNeighborhood.id,
      neighborhoodLabel: randomNeighborhood.label,
      category: randomCategory,
      author: `파주시민${i}`,
      views: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 30),
      time: randomTime,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const allPosts = generatePosts();

export default function NeighborhoodPage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");

  const filteredPosts = selectedNeighborhood === "all"
    ? allPosts
    : allPosts.filter(post => post.neighborhood === selectedNeighborhood);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 - 컬러풀한 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 tracking-tighter mb-2">
            동네별 수다방
          </h1>
          <p className="text-gray-600">우리 동네 이웃들과 소소한 이야기를 나눠보세요</p>
        </div>

        {/* 탭 (중앙 정렬 & 사이즈 확대) */}
        <div className="mb-10 flex justify-center flex-wrap gap-3">
          {neighborhoods.map((neighborhood) => (
            <button
              key={neighborhood.id}
              onClick={() => setSelectedNeighborhood(neighborhood.id)}
              className={`py-3 px-6 rounded-full text-lg font-bold whitespace-nowrap transition-all ${selectedNeighborhood === neighborhood.id
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {neighborhood.label}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">등록된 게시글이 없습니다.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/neighborhood/${post.id}`}
                className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">
                    {post.neighborhoodLabel}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">{post.time}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-3 border-t border-gray-50 pt-3">
                  <span className="font-medium text-gray-500">{post.author}</span>
                  <div className="flex items-center gap-3 ml-auto">
                    <span>조회 {post.views}</span>
                    <span className="text-blue-500 font-medium">댓글 {post.comments}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

