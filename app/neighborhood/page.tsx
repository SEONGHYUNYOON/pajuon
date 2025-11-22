"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

// 동네별 수다방 탭 (생활권 기준)
const neighborhoods = [
  { id: "all", label: "전체", areas: [] },
  { id: "unjeong", label: "운정", areas: ["운정동", "교하동", "와동동"] },
  { id: "geumchon", label: "금촌", areas: ["금촌동", "금릉동", "야동동"] },
  { id: "munsan", label: "문산", areas: ["문산읍"] },
  { id: "jori", label: "조리", areas: ["조리읍"] },
  { id: "beobwon", label: "법원", areas: ["법원읍"] },
  { id: "paju", label: "파주", areas: ["파주읍"] },
  { id: "gwangtan", label: "광탄", areas: ["광탄면"] },
  { id: "tanhyeon", label: "탄현", areas: ["탄현면"] },
  { id: "wolrong", label: "월롱", areas: ["월롱면"] },
  { id: "jeokseong", label: "적성", areas: ["적성면"] },
  { id: "papyeong", label: "파평", areas: ["파평면"] },
  { id: "jangdan", label: "장단", areas: ["장단면"] },
];

// 더미 게시글 데이터 (20개 이상)
const generatePosts = () => {
  const posts = [];
  const categories = ["일상", "맛집", "질문", "정보", "나눔"];
  const neighborhoodsList = neighborhoods.slice(1); // "전체" 제외

  for (let i = 1; i <= 24; i++) {
    const randomNeighborhood = neighborhoodsList[Math.floor(Math.random() * neighborhoodsList.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTime = ["방금 전", "5분 전", "10분 전", "30분 전", "1시간 전", "2시간 전", "3시간 전", "1일 전"][Math.floor(Math.random() * 8)];

    posts.push({
      id: i,
      title: `${randomNeighborhood.label} 지역 ${randomCategory} 이야기`,
      content: `${randomNeighborhood.label} 지역에서 일어나는 다양한 이야기를 공유합니다.`,
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
  return posts;
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
          <p className="text-gray-600">생활권별로 모인 우리 동네 이야기</p>
        </div>

        {/* 탭 (중앙 정렬) - 알약 모양 버튼 */}
        <div className="mb-6 flex justify-center flex-wrap gap-3">
          {neighborhoods.map((neighborhood) => (
            <button
              key={neighborhood.id}
              onClick={() => setSelectedNeighborhood(neighborhood.id)}
              className={`py-2 px-4 rounded-full text-lg font-bold whitespace-nowrap transition-all ${
                selectedNeighborhood === neighborhood.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {neighborhood.label}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">등록된 게시글이 없습니다.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/neighborhood/${post.id}`}
                className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                    {post.neighborhoodLabel}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.time}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 text-center">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 text-center">
                  {post.content}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>조회 {post.views}</span>
                  <span>댓글 {post.comments}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

