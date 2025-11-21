"use client";

import Link from "next/link";
import { Users, Newspaper, Flame, ShoppingBag, Map, Heart } from "lucide-react";
import WeatherBanner from "@/components/home/WeatherBanner";

export default function Home() {
  // 더미 데이터
  const hotIssues = [
    { id: 1, title: "파주시 지역경제 활성화 사업 추진", category: "뉴스", time: "2시간 전" },
    { id: 2, title: "운정호수공원 문화행사 개최 안내", category: "공지", time: "5시간 전" },
    { id: 3, title: "파주시 주요 도로 교통 정보", category: "교통", time: "실시간" },
    { id: 4, title: "파주 시민의 날 기념 행사", category: "이벤트", time: "1일 전" },
  ];

  const hotPlaces = [
    { id: 1, title: "헤이리 예술마을 카페거리", likes: 156 },
    { id: 2, title: "출판도시 독서카페", likes: 128 },
    { id: 3, title: "마장호수 카페 일몰 명소", likes: 89 },
    { id: 4, title: "문산 맛집 골목", likes: 142 },
  ];

  const marketItems = [
    { id: 1, title: "아이폰 14 프로 팝니다", price: 800000, location: "운정동", time: "2시간 전" },
    { id: 2, title: "무료 나눔 - 책상", price: 0, location: "교하동", time: "5시간 전" },
    { id: 3, title: "유모차 판매합니다", price: 200000, location: "문산읍", time: "1일 전" },
    { id: 4, title: "에어프라이어 삽니다", price: 50000, location: "금촌동", time: "1일 전" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 날씨 배너 - 초슬림 */}
      <WeatherBanner />

      {/* 메인 메뉴 - 퀵 아이콘 */}
      <section className="px-4 py-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-5 gap-3">
            <Link
              href="/groups"
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">모임</span>
            </Link>
            
            <Link
              href="/news"
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Newspaper className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">소식</span>
            </Link>
            
            <Link
              href="/life/hot-place"
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-secondary" />
              </div>
              <span className="text-xs font-medium text-gray-700">핫플</span>
            </Link>
            
            <Link
              href="/life/market"
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-secondary" />
              </div>
              <span className="text-xs font-medium text-gray-700">장터</span>
            </Link>
            
            <Link
              href="/map"
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Map className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">지도</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 배너 - "파주에서 뭐 하고 놀까?" */}
      <section className="px-4 py-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            파주에서
            <br />
            뭐 하고 놀까?
          </h1>
        </div>
      </section>

      {/* 실시간 핫이슈 - 가로 스크롤 */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">실시간 핫이슈</h2>
            <Link href="/now/issue" className="text-xs text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex space-x-3" style={{ width: "max-content" }}>
              {hotIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/now/issue/${issue.id}`}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* 이미지 */}
                  <div className="w-full h-32 relative">
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-lg">
                        {issue.category}
                      </span>
                      <span className="text-xs text-gray-400">{issue.time}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {issue.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 중고장터 - 당근마켓 스타일 */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">중고거래</h2>
            <Link href="/life/market" className="text-xs text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="space-y-0 divide-y divide-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm">
            {marketItems.map((item) => (
              <Link
                key={item.id}
                href={`/life/market/${item.id}`}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors"
              >
                {/* 썸네일 */}
                <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-500 mb-1">
                    <span>{item.location}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    {item.price === 0 ? "무료나눔" : `${item.price.toLocaleString()}원`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 우리동네 핫플 - 2열 그리드 사진 카드 */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">우리동네 핫플</h2>
            <Link href="/life/hot-place" className="text-xs text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5">
            {hotPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/life/hot-place/${place.id}`}
                className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 이미지 */}
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
                
                {/* 하단 정보 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">{place.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs">{place.likes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 여백 */}
      <div className="h-16"></div>
    </div>
  );
}
