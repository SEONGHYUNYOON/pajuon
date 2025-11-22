"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper, BuildingOffice2Icon, BusIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const tabs = [
  { id: "news", label: "파주 News", icon: Newspaper },
  { id: "hospital", label: "병원/약국", icon: BuildingOffice2Icon },
  { id: "transport", label: "교통/버스", icon: BusIcon },
  { id: "meal", label: "오늘의 급식", icon: BookOpenIcon },
];

// 더미 데이터: 병원/약국
const hospitals = [
  {
    id: 1,
    name: "파주시 병원 야간진료",
    type: "야간진료",
    location: "운정동",
    hours: "18:00-22:00",
    phone: "031-940-1000",
    description: "야간 응급진료 가능",
  },
  {
    id: 2,
    name: "금촌 휴일지킴이 약국",
    type: "약국",
    location: "금촌동",
    hours: "휴일 09:00-18:00",
    phone: "031-940-2000",
    description: "공휴일에도 영업",
  },
  {
    id: 3,
    name: "운정 소아과 야간진료",
    type: "야간진료",
    location: "운정동",
    hours: "19:00-21:00",
    phone: "031-940-3000",
    description: "소아 응급 진료",
  },
  {
    id: 4,
    name: "문산 내과 야간진료",
    type: "야간진료",
    location: "문산읍",
    hours: "18:00-22:00",
    phone: "031-940-4000",
    description: "내과 야간 진료",
  },
];

// 더미 데이터: 교통/버스
const transportPosts = [
  {
    id: 1,
    title: "M버스 시간표 업데이트 안내",
    category: "버스정보",
    content: "파주 M버스 시간표가 12월부터 변경됩니다.",
    time: "2시간 전",
    views: 156,
  },
  {
    id: 2,
    title: "자유로 교통 정체 제보",
    category: "교통정보",
    content: "자유로 파주방면 심각한 정체 중입니다.",
    time: "30분 전",
    views: 89,
  },
  {
    id: 3,
    title: "운정동 버스 정류장 위치 변경",
    category: "버스정보",
    content: "운정동 버스 정류장이 새로운 위치로 이동했습니다.",
    time: "1일 전",
    views: 234,
  },
];

// 더미 데이터: 오늘의 급식
const mealBoards = [
  {
    id: 1,
    school: "운정초등학교",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    school: "금촌중학교",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 3,
    school: "문산고등학교",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop&q=80",
  },
];

export default function LifePage() {
  const [activeTab, setActiveTab] = useState<string>("news");

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏥 파주 Life</h1>
          <p className="text-gray-600">생활에 필요한 모든 정보</p>
        </div>

        {/* 탭 */}
        <div className="mb-6 flex justify-center flex-wrap gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-gray-900 shadow-md"
                    : "bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="mt-8">
          {activeTab === "news" && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">파주 News는 기존 뉴스 페이지로 이동되었습니다.</p>
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                파주 소식 & 핫플 보기
              </Link>
            </div>
          )}

          {activeTab === "hospital" && (
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{hospital.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          hospital.type === "야간진료"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                          {hospital.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{hospital.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>📍 {hospital.location}</span>
                    <span>🕐 {hospital.hours}</span>
                    <span>📞 {hospital.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "transport" && (
            <div className="space-y-4">
              {transportPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/life/transport/${post.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.time}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm">{post.content}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">조회 {post.views}</div>
                </Link>
              ))}
              <Link
                href="/life/transport/report"
                className="block mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center hover:bg-blue-100 transition-colors"
              >
                <p className="text-blue-600 font-semibold">📢 실시간 교통 상황 제보하기</p>
              </Link>
            </div>
          )}

          {activeTab === "meal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealBoards.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={meal.image}
                    alt={`${meal.school} 급식`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{meal.school}</h3>
                    <p className="text-sm text-gray-500">{meal.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

