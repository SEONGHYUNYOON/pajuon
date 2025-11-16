"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, StarIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

const categories = ["전체", "맛집", "카페", "디저트", "브런치"];

const places = [
  {
    id: 1,
    name: "헤이리 예술마을 카페거리",
    category: "카페",
    location: "헤이리 마을",
    rating: 4.8,
    reviews: 156,
    images: 3,
    description: "헤이리 마을의 아름다운 카페거리를 소개합니다...",
    distance: "1.2km",
  },
  {
    id: 2,
    name: "출판도시 독서카페",
    category: "카페",
    location: "출판도시",
    rating: 4.6,
    reviews: 128,
    images: 5,
    description: "조용하고 분위기 좋은 독서카페입니다...",
    distance: "2.5km",
  },
  {
    id: 3,
    name: "문산 맛집 골목",
    category: "맛집",
    location: "문산",
    rating: 4.7,
    reviews: 234,
    images: 4,
    description: "문산역 근처에 숨겨진 맛집들을 발견했습니다...",
    distance: "3.1km",
  },
  {
    id: 4,
    name: "마장호수 카페",
    category: "카페",
    location: "마장호수",
    rating: 4.5,
    reviews: 89,
    images: 2,
    description: "마장호수를 바라보며 즐기는 커피는 최고입니다...",
    distance: "4.3km",
  },
];

export default function HotPlacePage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = places.filter(
    (place) =>
      (activeCategory === "전체" || place.category === activeCategory) &&
      (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">파주 맛집/카페</h1>
              <p className="text-lg text-gray-600">파주의 맛집과 카페를 발견하세요</p>
            </div>
            <Link
              href="/news/hotplaces/create"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              후기 작성
            </Link>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="맛집이나 카페 이름으로 검색..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 지도 기반 탐색 (준비 중) */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-2 border-dashed border-gray-300 text-center">
          <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">지도로 맛집 찾기</h3>
          <p className="text-gray-600 mb-4">지도에서 파주의 맛집과 카페를 한눈에 확인하세요</p>
          <Link
            href="/map?filter=food"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            지도에서 보기
          </Link>
        </div>

        {/* 맛집/카페 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Link
              key={place.id}
              href={`/life/hot-place/${place.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-orange-400 relative">
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                  📸 {place.images}장
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-medium">
                  ⭐ {place.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {place.location}
                  <span className="ml-2 text-gray-400">· {place.distance}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{place.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{place.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900">{place.rating}</span>
                    <span className="text-gray-500 ml-1">({place.reviews})</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {place.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
