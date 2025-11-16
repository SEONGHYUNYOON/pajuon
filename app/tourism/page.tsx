"use client";

import { useState } from "react";
import { MapPinIcon, ClockIcon, QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/outline";

const attractions = [
  {
    id: 1,
    name: "DMZ 땅굴",
    category: "역사",
    image: "/dmz.jpg",
    location: "경기도 파주시 문산읍",
    hours: "09:00 - 17:00",
    description: "한반도 분단의 아픈 역사를 간직한 DMZ 제3땅굴입니다.",
    tips: [
      {
        question: "관람 소요 시간은 얼마나 걸리나요?",
        answer: "땅굴 관람은 약 1시간 정도 소요됩니다. 안전모를 착용해야 하며, 편한 복장을 권장합니다.",
      },
      {
        question: "예약이 필요한가요?",
        answer: "주말 및 공휴일에는 예약을 권장합니다. 평일은 당일 예약도 가능합니다.",
      },
      {
        question: "어린이도 관람 가능한가요?",
        answer: "초등학생 이상부터 관람 가능하며, 보호자 동반이 필요합니다.",
      },
    ],
    nearbyRestaurants: [
      { name: "통일촌 맛집", distance: "500m", type: "한식" },
      { name: "DMZ 카페", distance: "300m", type: "카페" },
      { name: "평화식당", distance: "600m", type: "한식" },
    ],
  },
  {
    id: 2,
    name: "임진각 평화누리공원",
    category: "평화/역사",
    image: "/imjingak.jpg",
    location: "경기도 파주시 문산읍",
    hours: "24시간 개방",
    description: "한반도 평화의 상징인 임진각 평화누리공원입니다.",
    tips: [
      {
        question: "무료 입장인가요?",
        answer: "네, 무료로 입장 가능합니다. 주차장은 유료입니다.",
      },
      {
        question: "주차 시설은 있나요?",
        answer: "대형 주차장이 있으며, 주말에는 만차일 수 있어 대중교통 이용을 권장합니다.",
      },
      {
        question: "관람 포인트는 무엇인가요?",
        answer: "평화의 종, 전망대, 기념관 등이 있으며, 특히 평화의 종은 방문객이 직접 치볼 수 있습니다.",
      },
    ],
    nearbyRestaurants: [
      { name: "임진각 맛집거리", distance: "200m", type: "다양" },
      { name: "통일박물관 카페", distance: "150m", type: "카페" },
    ],
  },
  {
    id: 3,
    name: "마장호수",
    category: "자연/휴양",
    image: "/majang.jpg",
    location: "경기도 파주시 탄현면",
    hours: "24시간 개방",
    description: "파주의 아름다운 자연을 만날 수 있는 마장호수입니다.",
    tips: [
      {
        question: "산책로가 있나요?",
        answer: "약 5km의 산책로가 있어 가족 단위 나들이에 적합합니다.",
      },
      {
        question: "낚시가 가능한가요?",
        answer: "낚시 금지 구역이 있으니 안내판을 확인하시기 바랍니다.",
      },
      {
        question: "계절별 추천 시기가 있나요?",
        answer: "봄의 벚꽃, 가을의 단풍이 특히 아름답습니다. 여름에는 수련이 피어 있습니다.",
      },
    ],
    nearbyRestaurants: [
      { name: "마장호수 카페", distance: "주변", type: "카페" },
      { name: "호수마을 식당", distance: "500m", type: "한식" },
    ],
  },
  {
    id: 4,
    name: "헤이리 예술마을",
    category: "문화/예술",
    image: "/heyri.jpg",
    location: "경기도 파주시 탄현면",
    hours: "10:00 - 18:00",
    description: "예술과 문화가 함께하는 헤이리 예술마을입니다.",
    tips: [
      {
        question: "입장료가 있나요?",
        answer: "마을 자체는 무료지만, 각 미술관/전시관은 별도 입장료가 있습니다.",
      },
      {
        question: "가장 추천하는 코스는?",
        answer: "갤러리 거리 → 카페 거리 → 미술관 순으로 둘러보시는 것을 권장합니다.",
      },
      {
        question: "주차는 어디에 하나요?",
        answer: "마을 내 여러 주차장이 있으며, 주말에는 만차일 수 있어 대중교통 이용을 권장합니다.",
      },
    ],
    nearbyRestaurants: [
      { name: "헤이리 카페거리", distance: "내부", type: "카페" },
      { name: "예술마을 식당", distance: "내부", type: "다양" },
    ],
  },
];

export default function TourismPage() {
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">파주ON 관광</h1>
          <p className="text-lg text-gray-600">
            파주의 아름다운 관광지를 만나보세요
          </p>
        </div>

        {/* 관광지 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
              onClick={() =>
                setSelectedAttraction(
                  selectedAttraction === attraction.id ? null : attraction.id
                )
              }
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-orange-400 relative">
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                  {attraction.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{attraction.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{attraction.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                  {attraction.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2 text-orange-500" />
                  {attraction.hours}
                </div>
              </div>

              {/* 상세 정보 (확장) */}
              {selectedAttraction === attraction.id && (
                <div className="px-6 pb-6 border-t border-gray-200 pt-6 space-y-6">
                  {/* 방문 팁 Q&A */}
                  <div>
                    <div className="flex items-center mb-4">
                      <QuestionMarkCircleIcon className="w-5 h-5 text-orange-500 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">방문 팁</h4>
                    </div>
                    <div className="space-y-3">
                      {attraction.tips.map((tip, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="font-medium text-gray-900 mb-2 flex items-start">
                            <span className="text-green-600 mr-2">Q.</span>
                            {tip.question}
                          </div>
                          <div className="text-gray-600 text-sm flex items-start">
                            <span className="text-orange-600 mr-2">A.</span>
                            {tip.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 주변 맛집 */}
                  <div>
                    <div className="flex items-center mb-4">
                      <StarIcon className="w-5 h-5 text-orange-500 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">주변 맛집</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {attraction.nearbyRestaurants.map((restaurant, index) => (
                        <div
                          key={index}
                          className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {restaurant.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>거리: {restaurant.distance}</div>
                            <div>종류: {restaurant.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
