"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, StarIcon, MagnifyingGlassIcon, PlusIcon, CameraIcon } from "@heroicons/react/24/outline";

const categories = ["전체", "맛집", "카페", "디저트", "브런치"];

const places = [
  {
    id: 1,
    name: "헤이리 예술마을",
    category: "핫플레이스",
    location: "파주시 탄현면 헤이리마을길",
    rating: 4.8,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    ],
    description: "예술과 문화가 함께하는 헤이리 예술마을입니다. 갤러리, 카페, 공방이 어우러진 아름다운 마을을 둘러보세요.",
    distance: "1.2km",
    highlights: ["갤러리 거리", "카페 거리", "공방 체험", "야외 조각공원"],
    openingHours: "10:00 - 18:00",
    bestTime: "봄, 가을",
  },
  {
    id: 2,
    name: "파주 출판단지",
    category: "핫플레이스",
    location: "파주시 문발동 출판문화정보산업단지",
    rating: 4.7,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
    ],
    description: "책의 향기가 가득한 출판단지입니다. 출판사 견학, 독서카페, 북카페 등 책과 함께하는 특별한 시간을 보낼 수 있습니다.",
    distance: "2.5km",
    highlights: ["출판사 견학", "독서카페", "북카페", "책 축제"],
    openingHours: "09:00 - 18:00",
    bestTime: "연중",
  },
  {
    id: 3,
    name: "헤이리 카페거리",
    category: "카페",
    location: "헤이리 마을",
    rating: 4.8,
    reviews: 189,
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
    ],
    description: "헤이리 마을의 아름다운 카페거리를 소개합니다. 각양각색의 독특한 카페들이 줄지어 있어 하루 종일 즐길 수 있습니다.",
    distance: "1.2km",
    highlights: ["테라스 카페", "갤러리 카페", "베이커리 카페"],
    openingHours: "10:00 - 20:00",
    bestTime: "봄, 가을",
  },
  {
    id: 4,
    name: "출판단지 독서카페",
    category: "카페",
    location: "출판단지",
    rating: 4.6,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    ],
    description: "조용하고 분위기 좋은 독서카페입니다. 책을 읽으며 여유로운 시간을 보낼 수 있는 공간입니다.",
    distance: "2.5km",
    highlights: ["조용한 분위기", "다양한 도서", "편안한 좌석"],
    openingHours: "09:00 - 22:00",
    bestTime: "연중",
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
            <div className="text-center">
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

        {/* 맛집/카페 목록 - 카드형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Link
              key={place.id}
              href={`/life/hot-place/${place.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* 이미지 슬라이더 */}
              <div className="h-64 bg-gradient-to-br from-green-400 to-orange-400 relative overflow-hidden">
                {place.images && place.images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img
                      src={place.images[0]}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {place.images.length > 1 && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 flex items-center">
                        <CameraIcon className="w-4 h-4 mr-1" />
                        {place.images.length}장
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CameraIcon className="w-16 h-16 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-semibold flex items-center shadow-lg">
                  <StarIcon className="w-4 h-4 mr-1 fill-current" />
                  {place.rating}
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                  {place.category}
                </div>
              </div>

              {/* 카드 내용 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {place.name}
                  </h3>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-1 text-green-500" />
                  <span className="truncate">{place.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>

                {/* 하이라이트 태그 */}
                {place.highlights && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* 하단 정보 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    <span className="font-semibold text-gray-900">{place.rating}</span>
                    <span className="text-gray-500 ml-1">({place.reviews})</span>
                  </div>
                  {place.openingHours && (
                    <span className="text-xs text-gray-500">{place.openingHours}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
