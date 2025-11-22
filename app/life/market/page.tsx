"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

// 이미지 다양화를 위한 고정된 이미지 ID 배열 (20개)
const IMAGE_IDS = [
  "photo-1505740420928-5e560c06d30e",
  "photo-1511632765486-a01980e01a18",
  "photo-1551632811-561732d1e306",
  "photo-1559339352-11d035aa65de",
  "photo-1509042239860-f550ce710b93",
  "photo-1544531586-fde5298cdd40",
  "photo-1481627834876-b7833e8f5570",
  "photo-1431324155629-1a6deb1dec8d",
  "photo-1488646953014-85cb44e25828",
  "photo-1478131143081-80f7f84ca84d",
  "photo-1544947950-fa07a98d237f",
  "photo-1526170375885-4d8ecf77b99f",
  "photo-1506905925346-21bda4d32df4",
  "photo-1519681393784-d120267933ba",
  "photo-1464822759844-d150ad90c88c",
  "photo-1506905925346-21bda4d32df4",
  "photo-1506443432602-ac2fcd6f54e0",
  "photo-1469474968028-56623f02e42e",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1441974231531-c6227db76b6e",
];

const tabs = ["팝니다", "삽니다", "나눔합니다"];

const categories = ["전체", "전자제품", "가구", "자동차", "부동산", "기타"];

const baseItems = [
  // 전자제품 - 팝니다
  { id: 1, title: "아이폰 14 프로 팝니다", price: 800000, location: "운정동", time: "2시간 전", images: 1, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1523275335684-37898b6af30" },
  { id: 7, title: "LG 세탁기 판매", price: 150000, location: "교하동", time: "3시간 전", images: 1, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1558618666-fcd25c85cd64" },
  { id: 11, title: "냉장고 팝니다", price: 300000, location: "운정동", time: "4시간 전", images: 2, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1556912172-45b7abe8b7e8" },
  { id: 14, title: "컴퓨터 팝니다", price: 500000, location: "문산읍", time: "5시간 전", images: 3, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1496181133206-80ce9b88a853" },
  { id: 17, title: "가전제품 팝니다", price: 250000, location: "금촌동", time: "6시간 전", images: 2, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1558618666-fcd25c85cd64" },
  { id: 19, title: "노트북 팝니다", price: 600000, location: "운정동", time: "7시간 전", images: 2, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1496181133206-80ce9b88a853" },
  { id: 23, title: "에어컨 팝니다", price: 350000, location: "운정동", time: "5시간 전", images: 2, type: "팝니다", category: "전자제품", status: "판매중", imageId: "photo-1558618666-fcd25c85cd64" },
  
  // 가구 - 팝니다
  { id: 21, title: "소파 팝니다", price: 400000, location: "금촌동", time: "4시간 전", images: 3, type: "팝니다", category: "가구", status: "판매중", imageId: "photo-1631889992176-9a26b96e95a3" },
  
  // 자동차 - 팝니다
  { id: 34, title: "현대 아반떼 판매합니다", price: 12000000, location: "운정동", time: "1일 전", images: 3, type: "팝니다", category: "자동차", status: "판매중", imageId: "photo-1549317661-bd32c8ce0db2" },
  { id: 35, title: "기아 K5 팝니다", price: 15000000, location: "교하동", time: "2일 전", images: 3, type: "팝니다", category: "자동차", status: "판매중", imageId: "photo-1550355291-bbee04a84627" },
  { id: 36, title: "현대 소나타 판매", price: 18000000, location: "금촌동", time: "3일 전", images: 3, type: "팝니다", category: "자동차", status: "판매중", imageId: "photo-1492144534655-ae79c964c9d7" },
  
  // 부동산 - 팝니다
  { id: 25, title: "운정동 아파트 매매", price: 350000000, location: "운정동", time: "3시간 전", images: 2, type: "팝니다", category: "부동산", status: "판매중", imageId: "photo-1564013799919-ab600027ffc6" },
  { id: 26, title: "교하동 원룸 전세", price: 50000000, location: "교하동", time: "5시간 전", images: 2, type: "팝니다", category: "부동산", status: "판매중", imageId: "photo-1522708323590-d24dbb6b0267" },
  { id: 27, title: "금촌동 단독주택 매매", price: 280000000, location: "금촌동", time: "1일 전", images: 3, type: "팝니다", category: "부동산", status: "판매중", imageId: "photo-1568605114967-8130f3a36994" },
  { id: 28, title: "문산읍 상가 임대", price: 5000000, location: "문산읍", time: "2일 전", images: 2, type: "팝니다", category: "부동산", status: "판매중", imageId: "photo-1486406146926-c627a92ad1ab" },
  { id: 29, title: "운정동 오피스텔 전세", price: 80000000, location: "운정동", time: "6시간 전", images: 2, type: "팝니다", category: "부동산", status: "판매중", imageId: "photo-1522708323590-d24dbb6b0267" },
  
  // 기타 - 팝니다
  { id: 4, title: "유모차 판매합니다", price: 200000, location: "문산읍", time: "1일 전", images: 3, type: "팝니다", category: "기타", status: "판매중", imageId: "photo-1555252333-9f8e92e65df9" },
  { id: 6, title: "자전거 팝니다", price: 150000, location: "교하동", time: "2일 전", images: 1, type: "팝니다", category: "기타", status: "판매중", imageId: "photo-1488646953014-85cb44e25828" },
  { id: 10, title: "자전거 판매", price: 80000, location: "문산읍", time: "1시간 전", images: 1, type: "팝니다", category: "기타", status: "판매중", imageId: "photo-1488646953014-85cb44e25828" },
  
  // 전자제품 - 삽니다
  { id: 3, title: "에어프라이어 삽니다", price: 50000, location: "금촌동", time: "1일 전", images: 1, type: "삽니다", category: "전자제품", status: "구매중", imageId: "photo-1556912172-45b7abe8b7e8" },
  { id: 8, title: "노트북 삽니다", price: 0, location: "운정동", time: "30분 전", images: 1, type: "삽니다", category: "전자제품", status: "구매중", imageId: "photo-1496181133206-80ce9b88a853" },
  { id: 16, title: "스마트폰 삽니다", price: 200000, location: "교하동", time: "1일 전", images: 1, type: "삽니다", category: "전자제품", status: "구매중", imageId: "photo-1523275335684-37898b6af30" },
  { id: 20, title: "모니터 삽니다", price: 150000, location: "교하동", time: "1일 전", images: 1, type: "삽니다", category: "전자제품", status: "구매중", imageId: "photo-1496181133206-80ce9b88a853" },
  
  // 가구 - 삽니다
  { id: 13, title: "책상 삽니다", price: 100000, location: "금촌동", time: "3시간 전", images: 1, type: "삽니다", category: "가구", status: "구매중", imageId: "photo-1586023492125-27b2c045efd7" },
  { id: 24, title: "의자 삽니다", price: 50000, location: "교하동", time: "1일 전", images: 1, type: "삽니다", category: "가구", status: "구매중", imageId: "photo-1631889992176-9a26b96e95a3" },
  
  // 자동차 - 삽니다
  { id: 37, title: "중형차 구매하고 싶어요", price: 10000000, location: "운정동", time: "5시간 전", images: 1, type: "삽니다", category: "자동차", status: "구매중", imageId: "photo-1549317661-bd32c8ce0db2" },
  { id: 38, title: "경차 삽니다", price: 5000000, location: "교하동", time: "1일 전", images: 1, type: "삽니다", category: "자동차", status: "구매중", imageId: "photo-1550355291-bbee04a84627" },
  
  // 부동산 - 삽니다
  { id: 30, title: "운정동 아파트 구매", price: 300000000, location: "운정동", time: "4시간 전", images: 1, type: "삽니다", category: "부동산", status: "구매중", imageId: "photo-1564013799919-ab600027ffc6" },
  { id: 31, title: "교하동 원룸 전세", price: 40000000, location: "교하동", time: "1일 전", images: 1, type: "삽니다", category: "부동산", status: "구매중", imageId: "photo-1522708323590-d24dbb6b0267" },
  { id: 32, title: "금촌동 단독주택 구매", price: 250000000, location: "금촌동", time: "2일 전", images: 1, type: "삽니다", category: "부동산", status: "구매중", imageId: "photo-1568605114967-8130f3a36994" },
  { id: 33, title: "문산읍 토지 구매", price: 80000000, location: "문산읍", time: "3일 전", images: 1, type: "삽니다", category: "부동산", status: "구매중", imageId: "photo-1486406146926-c627a92ad1ab" },
  
  // 나눔합니다 - 전자제품
  { id: 15, title: "TV 무료나눔", price: 0, location: "운정동", time: "2일 전", images: 2, type: "나눔합니다", category: "전자제품", status: "나눔중", imageId: "photo-1544947950-fa07a98d237f" },
  
  // 나눔합니다 - 가구
  { id: 2, title: "무료 나눔 - 책상", price: 0, location: "교하동", time: "5시간 전", images: 2, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1586023492125-27b2c045efd7" },
  { id: 5, title: "무료 나눔 - 옷장", price: 0, location: "운정동", time: "2일 전", images: 2, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1631889992176-9a26b96e95a3" },
  { id: 9, title: "침대 프레임 무료나눔", price: 0, location: "금촌동", time: "6시간 전", images: 2, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1631889992176-9a26b96e95a3" },
  { id: 12, title: "의자 무료나눔", price: 0, location: "교하동", time: "1일 전", images: 1, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1631889992176-9a26b96e95a3" },
  { id: 18, title: "책장 무료나눔", price: 0, location: "문산읍", time: "3시간 전", images: 1, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1509042239860-f550ce710b93" },
  { id: 22, title: "옷장 무료나눔", price: 0, location: "문산읍", time: "2일 전", images: 2, type: "나눔합니다", category: "가구", status: "나눔중", imageId: "photo-1631889992176-9a26b96e95a3" },
  
  // 나눔합니다 - 기타
  { id: 39, title: "자전거 무료나눔", price: 0, location: "운정동", time: "4시간 전", images: 1, type: "나눔합니다", category: "기타", status: "나눔중", imageId: "photo-1488646953014-85cb44e25828" },
];

const items = baseItems;

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState("팝니다");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.type === activeTab &&
      (activeCategory === "전체" || item.category === activeCategory) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8 text-center">
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

        {/* 카테고리 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 bg-gray-50"
              }`}
            >
              {category}
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
          {filteredItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/life/market/${item.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={`https://images.unsplash.com/${item.imageId || IMAGE_IDS[index % IMAGE_IDS.length]}?w=400&q=80&auto=format&fit=crop`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                  {item.status}
                </div>
                {item.images > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                    📸 {item.images}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-blue-500/90 backdrop-blur-sm rounded text-xs font-medium text-white">
                  {item.category}
                </div>
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
