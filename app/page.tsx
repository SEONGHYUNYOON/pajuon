"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import QuickMenu from "@/components/home/QuickMenu";
import LiveStation from "@/components/realtime/LiveStation";
import StoryRail from "@/components/home/StoryRail";
import NoticeBanner from "@/components/home/NoticeBanner";
import Header from "@/components/layout/Header";

// 이미지 다양화를 위한 고정된 이미지 ID 배열 (20개)
const IMAGE_IDS = [
  "photo-1505740420928-5e560c06d30e", // 헤드폰
  "photo-1511632765486-a01980e01a18", // 도시
  "photo-1551632811-561732d1e306", // 등산
  "photo-1559339352-11d035aa65de", // 커피
  "photo-1509042239860-f550ce710b93", // 책
  "photo-1544531586-fde5298cdd40", // 행사
  "photo-1481627834876-b7833e8f5570", // 독서
  "photo-1431324155629-1a6deb1dec8d", // 운동
  "photo-1488646953014-85cb44e25828", // 자전거
  "photo-1478131143081-80f7f84ca84d", // 캠핑
  "photo-1544947950-fa07a98d237f", // 카메라
  "photo-1526170375885-4d8ecf77b99f", // 일몰
  "photo-1506905925346-21bda4d32df4", // 호수
  "photo-1519681393784-d120267933ba", // 산
  "photo-1464822759844-d150ad90c88c", // 해변
  "photo-1506905925346-21bda4d32df4", // 자연
  "photo-1506443432602-ac2fcd6f54e0", // 숲
  "photo-1469474968028-56623f02e42e", // 자연
  "photo-1470071459604-3b5ec3a7fe05", // 산
  "photo-1441974231531-c6227db76b6e", // 풍경
];

export default function Home() {
  // 더미 데이터 - 각 항목에 맞는 이미지 ID 지정
  const hotIssues = [
    { id: 1, title: "파주시 지역경제 활성화 사업 추진", category: "뉴스", time: "2시간 전", imageId: "photo-1511632765486-a01980e01a18" }, // 도시
    { id: 2, title: "운정호수공원 문화행사 개최 안내", category: "공지", time: "5시간 전", imageId: "photo-1506905925346-21bda4d32df4" }, // 호수
    { id: 3, title: "파주시 주요 도로 교통 정보", category: "교통", time: "실시간", imageId: "photo-1488646953014-85cb44e25828" }, // 자전거/교통
    { id: 4, title: "파주 시민의 날 기념 행사", category: "이벤트", time: "1일 전", imageId: "photo-1544531586-fde5298cdd40" }, // 행사
  ];

  const hotPlaces = [
    { id: 1, title: "헤이리 예술마을 카페거리", likes: 156, imageId: "photo-1559339352-11d035aa65de" }, // 커피/카페
    { id: 2, title: "출판도시 독서카페", likes: 128, imageId: "photo-1509042239860-f550ce710b93" }, // 책/독서
    { id: 3, title: "마장호수 카페 일몰 명소", likes: 89, imageId: "photo-1526170375885-4d8ecf77b99f" }, // 일몰
    { id: 4, title: "문산 맛집 골목", likes: 142, imageId: "photo-1512058564366-18510be2db19" }, // 음식/맛집
  ];

  const marketItems = [
    { id: 1, title: "아이폰 14 프로 팝니다", price: 800000, location: "운정동", time: "2시간 전", imageId: "photo-1523275335684-37898b6baf30" }, // 스마트폰
    { id: 2, title: "무료 나눔 - 책상", price: 0, location: "교하동", time: "5시간 전", imageId: "photo-1586023492125-27b2c045efd7" }, // 책상/가구
    { id: 3, title: "유모차 판매합니다", price: 200000, location: "문산읍", time: "1일 전", imageId: "photo-1555252333-9f8e92e65df9" }, // 유모차
    { id: 4, title: "에어프라이어 삽니다", price: 50000, location: "금촌동", time: "1일 전", imageId: "photo-1556912172-45b7abe8b7e8" }, // 주방용품
    { id: 5, title: "LG 세탁기 판매", price: 150000, location: "교하동", time: "3시간 전", imageId: "photo-1558618666-fcd25c85cd64" }, // 가전제품
    { id: 6, title: "노트북 삽니다", price: 0, location: "운정동", time: "30분 전", imageId: "photo-1496181133206-80ce9b88a853" }, // 노트북
    { id: 7, title: "침대 프레임 무료나눔", price: 0, location: "금촌동", time: "6시간 전", imageId: "photo-1631889992176-9a26b96e95a3" }, // 침대/가구
    { id: 8, title: "자전거 판매", price: 80000, location: "문산읍", time: "1시간 전", imageId: "photo-1488646953014-85cb44e25828" }, // 자전거
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

  // 오늘의 모임 (가로 스크롤) - 각 모임 성격에 맞는 이미지
  const todayGroups = [
    { id: 1, name: "주말 등산 모임", members: 45, category: "등산", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" }, // 등산
    { id: 2, name: "맛집 탐방대", members: 32, category: "맛집", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80" }, // 맛집
    { id: 3, name: "독서 모임", members: 28, category: "독서", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" }, // 독서
    { id: 4, name: "토요일 풋살", members: 22, category: "운동", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80" }, // 운동
    { id: 5, name: "자전거 라이딩", members: 35, category: "라이딩", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" }, // 자전거
    { id: 6, name: "캠핑 모임", members: 41, category: "캠핑", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80" }, // 캠핑
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-20 overflow-x-hidden">
      {/* 메인 배너 섹션 */}
      <section className="relative w-full bg-slate-900 pt-0 pb-0 rounded-b-[2rem] shadow-none overflow-hidden h-[200px]">
        <img
          src={`https://images.unsplash.com/${IMAGE_IDS[1]}?w=1200&q=80&auto=format&fit=crop`}
          alt="파주 프로모션"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center" style={{ paddingLeft: '4rem', paddingRight: '2.5rem' }}>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
              파주On 파주에 오다
            </h1>
          </div>
        </div>
      </section>

      {/* 실시간 제보 배너 */}
      <NoticeBanner />

      {/* 스토리 레일 */}
      <section className="py-4 px-8 md:px-10 lg:px-12">
        <StoryRail />
      </section>

      {/* 퀵 메뉴 - 가로 배치 */}
      <div className="py-4 px-8 md:px-10 lg:px-12">
        <QuickMenu />
      </div>

      {/* 실시간 파주 톡 - 텍스트 리스트 */}
      <section className="py-6 px-8 md:px-10 lg:px-12" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">🔥 실시간 파주 톡</h2>
            <Link href="/community" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>
          <div className="bg-slate-900 rounded-2xl shadow-none divide-y divide-slate-800">
            {hotPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block p-4 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* 카테고리 뱃지 (좌측 고정) */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.time}</span>
                  </div>

                  {/* 제목 (중앙 정렬 & 공간 차지) */}
                  <h3 className="flex-1 text-center text-sm font-semibold text-white truncate px-4">
                    {post.title}
                  </h3>

                  {/* 조회수 (우측 고정) */}
                  <div className="flex-shrink-0 text-xs text-slate-500">
                    조회 {post.views}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 실시간 핫이슈 - 가로 스크롤 */}
      <section className="py-6 px-8 md:px-10 lg:px-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">실시간 핫이슈</h2>
            <Link href="/now/issue" className="text-xs text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex space-x-3" style={{ width: "max-content" }}>
              {hotIssues.map((issue, index) => (
                <Link
                  key={issue.id}
                  href={`/now/issue/${issue.id}`}
                  className="flex-shrink-0 w-64 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  {/* 이미지 */}
                  <div className="bg-slate-900">
                    <img
                      src={`https://images.unsplash.com/${issue.imageId}?w=600&q=80&auto=format&fit=crop`}
                      alt={issue.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="p-4 text-center flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-lg">
                        {issue.category}
                      </span>
                      <span className="text-xs text-slate-400">{issue.time}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white line-clamp-2">
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
      <section className="py-6 px-8 md:px-10 lg:px-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">중고거래</h2>
            <Link href="/life/market" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {marketItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/life/market/${item.id}`}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                {/* 썸네일 */}
                <div className="aspect-square bg-slate-800">
                  <img
                    src={`https://images.unsplash.com/${item.imageId}?w=400&q=80&auto=format&fit=crop`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 텍스트 */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white mb-1 line-clamp-2 min-h-[2.5rem]">
                    {item.title}
                  </h3>
                  <div className="text-base font-bold text-white mb-1">
                    {item.price === 0 ? "무료나눔" : `${item.price.toLocaleString()}원`}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
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
      <section className="py-6 px-8 md:px-10 lg:px-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">🏛️ 파주시 행사 & 강연</h2>
            <Link href="/events" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {[
                { id: 1, title: "[강연] 김영하 작가와 함께하는 북토크", location: "지혜의숲", date: "11.25", category: "강연", imageId: "photo-1509042239860-f550ce710b93" }, // 책/강연
                { id: 2, title: "[축제] 파주 장단콩 축제 개막식", location: "임진각 광장", date: "11.28", category: "축제", imageId: "photo-1544531586-fde5298cdd40" }, // 행사/축제
                { id: 3, title: "[교육] 우리 아이 코딩 교실 모집", location: "운정행정센터", date: "12.01", category: "교육", imageId: "photo-1516321318423-f06f85e504b3" }, // 교육/코딩
                { id: 4, title: "[공연] 파주 필하모닉 오케스트라 정기연주회", location: "시민회관", date: "12.10", category: "공연", imageId: "photo-1470225620780-dba8ba36b745" }, // 공연/콘서트
              ].map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="flex-shrink-0 w-72 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  {/* 이미지 */}
                  <div className="h-40 bg-slate-800">
                    <img
                      src={`https://images.unsplash.com/${event.imageId}?w=600&q=80&auto=format&fit=crop`}
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
                      <span className="text-xs text-slate-400">{event.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center">
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
      <section className="py-6 px-8 md:px-10 lg:px-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">우리동네 핫플</h2>
            <Link href="/life/hot-place" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotPlaces.map((place, index) => (
              <Link
                key={place.id}
                href={`/life/hot-place/${place.id}`}
                className="relative aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                {/* 이미지 */}
                <div className="bg-slate-900 w-full h-full">
                  <img
                    src={`https://images.unsplash.com/${place.imageId}?w=600&q=80&auto=format&fit=crop`}
                    alt={place.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 하단 정보 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-white font-semibold text-sm mb-1">{place.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs">{place.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 오늘의 모임 - 가로 스크롤 */}
      <section className="py-6 px-8 md:px-10 lg:px-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">오늘의 모임</h2>
            <Link href="/groups" className="text-sm text-gray-500 hover:text-primary">
              더보기
            </Link>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {todayGroups.map((group, index) => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="flex-shrink-0 w-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  {/* 이미지 */}
                  <div className="h-40 bg-slate-800">
                    <img
                      src={group.image}
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
                      <span className="text-xs text-slate-400">{group.members}명</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white line-clamp-2">
                      {group.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 여백 및 버전 표시 */}
      <div className="py-8 text-center text-slate-600 text-xs">
        v1.2 (Updated)
      </div>

      {/* 실시간 라이브 위젯 */}
      <LiveStation />
    </div>
  );
}
