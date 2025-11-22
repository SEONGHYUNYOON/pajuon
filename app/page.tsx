"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import QuickMenu from "@/components/home/QuickMenu";
import LiveStation from "@/components/realtime/LiveStation";

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
    { id: 5, title: "LG 세탁기 판매", price: 150000, location: "교하동", time: "3시간 전" },
    { id: 6, title: "노트북 삽니다", price: 0, location: "운정동", time: "30분 전" },
    { id: 7, title: "침대 프레임 무료나눔", price: 0, location: "금촌동", time: "6시간 전" },
    { id: 8, title: "자전거 판매", price: 80000, location: "문산읍", time: "1시간 전" },
  ];

  // 실시간 파주 톡 (텍스트 리스트)
  const hotPosts = [
    { id: 1, title: "파주시청 앞 버스 정류장 새로 설치됐네요", category: "소식", views: 234, time: "5분 전" },
    { id: 2, title: "운정동에 새로운 카페 생겼어요! 추천합니다", category: "맛집", views: 189, time: "12분 전" },
    { id: 3, title: "파주시 공원에서 강아지 산책 잘 가는 곳 알려주세요", category: "질문", views: 156, time: "18분 전" },
    { id: 4, title: "금촌역 근처 주차장 추천 부탁드립니다", category: "질문", views: 145, time: "23분 전" },
    { id: 5, title: "헤이리 예술마을 축제 행사 정보 공유", category: "이벤트", views: 298, time: "30분 전" },
    { id: 6, title: "파주시민회관 콘서트 후기", category: "후기", views: 167, time: "45분 전" },
    { id: 7, title: "출판도시 독서 모임 참여하실 분?", category: "모임", views: 234, time: "1시간 전" },
    { id: 8, title: "파주 맛집 베스트 10 추천받아요", category: "맛집", views: 456, time: "1시간 전" },
    { id: 9, title: "문산시장 저렴한 야채 파는 곳", category: "정보", views: 178, time: "2시간 전" },
    { id: 10, title: "파주시 버스 시간표 변경 안내", category: "소식", views: 312, time: "2시간 전" },
    { id: 11, title: "운정호수공원 야경 추천합니다", category: "여행", views: 267, time: "3시간 전" },
    { id: 12, title: "파주 지역 축구 모임 새로 시작합니다", category: "모임", views: 189, time: "3시간 전" },
  ];

  // 오늘의 모임 (가로 스크롤)
  const todayGroups = [
    { id: 1, name: "주말 등산 모임", members: 45, category: "등산", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "맛집 탐방대", members: 32, category: "맛집", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "독서 모임", members: 28, category: "독서", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "토요일 풋살", members: 22, category: "운동", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "자전거 라이딩", members: 35, category: "라이딩", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "캠핑 모임", members: 41, category: "캠핑", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 프로모션 배너 */}
      <section className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg mx-4 md:mx-6 lg:mx-8 mt-4">
        <img
          src={`https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80&random=${Math.random()}`}
          alt="파주 프로모션"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 md:px-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              파주에서 만나요
            </h1>
            <p className="text-base md:text-lg text-white/90">
              함께 만들어가는 파주 커뮤니티
            </p>
          </div>
        </div>
      </section>

      {/* 퀵 메뉴 - 가로 배치 */}
      <div className="py-4 px-4 md:px-6 lg:px-8">
        <QuickMenu />
      </div>

      {/* 실시간 파주 톡 - 텍스트 리스트 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🔥 실시간 파주 톡</h2>
            <Link href="/community" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 divide-y divide-gray-100">
            {hotPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {post.title}
                    </h3>
                  </div>
                  <div className="ml-4 text-xs text-gray-400">
                    조회 {post.views}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 실시간 핫이슈 - 가로 스크롤 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">실시간 핫이슈</h2>
            <Link href="/now/issue" className="text-xs text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex space-x-3" style={{ width: "max-content" }}>
              {hotIssues.map((issue, index) => (
                <Link
                  key={issue.id}
                  href={`/now/issue/${issue.id}`}
                  className="flex-shrink-0 w-64 bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
                >
                  {/* 이미지 */}
                  <div className="bg-white">
                    <img
                      src={`https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80&random=${Math.random()}`}
                      alt={issue.title}
                      className="w-full h-32 object-cover"
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

      {/* 중고장터 - 4열 그리드 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">중고거래</h2>
            <Link href="/life/market" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {marketItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/life/market/${item.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
              >
                {/* 썸네일 */}
                <div className="aspect-square bg-gray-100">
                  <img
                    src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&random=${Math.random()}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 텍스트 */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                    {item.title}
                  </h3>
                  <div className="text-base font-bold text-gray-900 mb-1">
                    {item.price === 0 ? "무료나눔" : `${item.price.toLocaleString()}원`}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{item.location}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 파주시 행사 & 강연 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🏛️ 파주시 행사 & 강연</h2>
            <Link href="/events" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {[
                { id: 1, title: "[강연] 김영하 작가와 함께하는 북토크", location: "지혜의숲", date: "11.25", category: "강연" },
                { id: 2, title: "[축제] 파주 장단콩 축제 개막식", location: "임진각 광장", date: "11.28", category: "축제" },
                { id: 3, title: "[교육] 우리 아이 코딩 교실 모집", location: "운정행정센터", date: "12.01", category: "교육" },
                { id: 4, title: "[공연] 파주 필하모닉 오케스트라 정기연주회", location: "시민회관", date: "12.10", category: "공연" },
              ].map((event, index) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
                >
                  {/* 이미지 */}
                  <div className="h-40 bg-gray-100">
                    <img
                      src={`https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80&random=${Math.random()}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 내용 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                        {event.category}
                      </span>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center">
                      📍 {event.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 우리동네 핫플 - 큰 그리드 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">우리동네 핫플</h2>
            <Link href="/life/hot-place" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotPlaces.map((place, index) => (
              <Link
                key={place.id}
                href={`/life/hot-place/${place.id}`}
                className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
              >
                {/* 이미지 */}
                <div className="bg-white w-full h-full">
                  <img
                    src={`https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&random=${Math.random()}`}
                    alt={place.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
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

      {/* 오늘의 모임 - 가로 스크롤 */}
      <section className="py-6 px-4 md:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">오늘의 모임</h2>
            <Link href="/groups" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {todayGroups.map((group, index) => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
                >
                  {/* 이미지 */}
                  <div className="h-40 bg-gray-100">
                    <img
                      src={`${group.image}&random=${Math.random()}`}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 내용 */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                        {group.category}
                      </span>
                      <span className="text-xs text-gray-500">{group.members}명</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {group.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 여백 */}
      <div className="h-16"></div>

      {/* 실시간 라이브 위젯 */}
      <LiveStation />
    </div>
  );
}
