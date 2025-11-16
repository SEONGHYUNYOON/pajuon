"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

const tabs = ["팝니다", "삽니다", "나눔합니다"];

const items = [
  {
    id: 1,
    title: "아이폰 14 프로 팝니다",
    price: 800000,
    location: "운정동",
    time: "2시간 전",
    images: 1,
    type: "팝니다",
    status: "판매중",
  },
  {
    id: 2,
    title: "무료 나눔 - 책상",
    price: 0,
    location: "교하동",
    time: "5시간 전",
    images: 2,
    type: "나눔합니다",
    status: "나눔중",
  },
  {
    id: 3,
    title: "에어프라이어 삽니다",
    price: 50000,
    location: "금촌동",
    time: "1일 전",
    images: 1,
    type: "삽니다",
    status: "구매중",
  },
  {
    id: 4,
    title: "유모차 판매합니다",
    price: 200000,
    location: "문산읍",
    time: "1일 전",
    images: 3,
    type: "팝니다",
    status: "판매중",
  },
  {
    id: 5,
    title: "무료 나눔 - 옷장",
    price: 0,
    location: "운정동",
    time: "2일 전",
    images: 2,
    type: "나눔합니다",
    status: "나눔중",
  },
  {
    id: 6,
    title: "자전거 팝니다",
    price: 150000,
    location: "교하동",
    time: "2일 전",
    images: 1,
    type: "팝니다",
    status: "판매중",
  },
];

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState("팝니다");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.type === activeTab &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">파주장터</h1>
          <p className="text-lg text-gray-600">중고 물품 거래와 나눔을 해보세요</p>
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

        {/* 검색 및 글쓰기 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="물품명이나 지역으로 검색..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link
              href="/life/market/write"
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              글쓰기
            </Link>
          </div>
        </div>

        {/* 물품 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/life/market/${item.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-orange-400 relative">
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                  {item.status}
                </div>
                {item.images > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                    📸 {item.images}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-green-600">
                    {item.price === 0 ? "무료나눔" : `${item.price.toLocaleString()}원`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                  <span>{item.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg mb-4">등록된 물품이 없습니다.</p>
            <Link
              href="/life/market/write"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              첫 번째 물품 등록하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
