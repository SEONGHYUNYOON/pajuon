"use client";

import { useState } from "react";
import {
  MapIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const filters = [
  { id: "food", name: "맛집/카페", icon: "🍽️", count: 156 },
  { id: "partner", name: "제휴가게", icon: "🎁", count: 45 },
  { id: "tourism", name: "관광지", icon: "🏞️", count: 23 },
  { id: "report", name: "신고센터", icon: "⚠️", count: 12 },
];

const places = [
  {
    id: 1,
    name: "헤이리 예술마을 카페",
    type: "food",
    category: "맛집/카페",
    location: "탄현면",
    lat: 37.765,
    lng: 126.685,
    rating: 4.8,
  },
  {
    id: 2,
    name: "파주카페 (제휴가게)",
    type: "partner",
    category: "제휴가게",
    location: "운정동",
    lat: 37.723,
    lng: 126.759,
    rating: 4.6,
  },
  {
    id: 3,
    name: "DMZ 땅굴",
    type: "tourism",
    category: "관광지",
    location: "문산읍",
    lat: 37.901,
    lng: 126.747,
    rating: 4.9,
  },
  {
    id: 4,
    name: "운정동 보도블록 파손 신고",
    type: "report",
    category: "신고센터",
    location: "운정동",
    lat: 37.725,
    lng: 126.761,
    rating: null,
  },
];

export default function MapPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<typeof places[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredPlaces = places.filter(
    (place) =>
      (activeFilters.length === 0 || activeFilters.includes(place.type)) &&
      (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.includes(searchQuery))
  );

  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* 사이드바 */}
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-10 overflow-y-auto">
        <div className="p-6">
          {/* 헤더 */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <MapIcon className="w-8 h-8 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">파주MAP</h1>
            </div>
            <p className="text-sm text-gray-600">
              파주의 모든 장소를 지도에서 확인하세요
            </p>
          </div>

          {/* 검색 */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="장소나 지역으로 검색..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 필터 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">필터</h2>
            <div className="space-y-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeFilters.includes(filter.id)
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{filter.icon}</span>
                    <span className="font-medium text-gray-900">{filter.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{filter.count}개</span>
                </button>
              ))}
            </div>
          </div>

          {/* 장소 목록 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              장소 목록 ({filteredPlaces.length})
            </h2>
            <div className="space-y-3">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlace?.id === place.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{place.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {place.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {place.location}
                  </div>
                  {place.rating && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-400">⭐</span>
                      <span className="ml-1">{place.rating}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="absolute left-80 right-0 top-0 bottom-0">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-orange-100 flex items-center justify-center relative">
          {/* 실제로는 네이버/카카오 지도 API를 여기에 임베드 */}
          <div className="text-center">
            <MapIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">지도 API 연동 준비</h3>
            <p className="text-gray-600 mb-4">
              네이버/카카오 지도 API와 연동하여 <br />
              실제 지도를 표시합니다
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-left">
              <h4 className="font-semibold text-gray-900 mb-3">지도 기능:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 장소 필터링 및 검색</li>
                <li>• 마커 클릭 시 상세 정보</li>
                <li>• 현재 위치 표시</li>
                <li>• 경로 검색 및 길찾기</li>
                <li>• 클러스터링 (장소가 많을 때)</li>
              </ul>
            </div>
          </div>

          {/* 선택된 장소 정보 카드 */}
          {selectedPlace && (
            <div className="absolute bottom-6 left-6 right-6 max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 z-20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedPlace.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {selectedPlace.location}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {selectedPlace.rating && (
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 font-medium">{selectedPlace.rating}</span>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  상세 보기
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  길찾기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
