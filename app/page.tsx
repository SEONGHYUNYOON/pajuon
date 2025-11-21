"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  SparklesIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import UserDashboardWidget from "@/components/dashboard/UserDashboardWidget";
import RecentActivity from "@/components/home/RecentActivity";

export default function Home() {
  // 더미 데이터 (실제로는 API에서 가져올 데이터)
  const newGroups = [
    { id: 1, name: "파주 산악회", category: "등산", members: 24, created: "2일 전" },
    { id: 2, name: "주말 자전거 라이딩", category: "라이딩", members: 18, created: "3일 전" },
    { id: 3, name: "조기축구회", category: "조기축구", members: 32, created: "5일 전" },
    { id: 4, name: "캠핑 모임", category: "캠핑", members: 15, created: "1주 전" },
  ];

  const hotPlaces = [
    { id: 1, title: "헤이리 예술마을 카페거리", place: "헤이리", likes: 156, images: 3 },
    { id: 2, title: "출판도시 독서카페", place: "출판도시", likes: 128, images: 5 },
    { id: 3, title: "마장호수 카페", place: "마장호수", likes: 89, images: 2 },
    { id: 4, title: "문산 맛집 골목", place: "문산", likes: 142, images: 4 },
  ];

  const events = [
    { id: 1, title: "미혼 선남선녀 미팅", date: "2024-12-15", location: "파주시민회관", status: "신청중" },
    { id: 2, title: "파주 지역축제", date: "2024-12-20", location: "운정호수공원", status: "신청중" },
  ];

  const marketItems = [
    { id: 1, title: "아이폰 14 프로 팝니다", price: 800000, location: "운정동", time: "2시간 전", type: "팝니다" },
    { id: 2, title: "무료 나눔 - 책상", price: 0, location: "교하동", time: "5시간 전", type: "나눔합니다" },
    { id: 3, title: "유모차 판매합니다", price: 200000, location: "문산읍", time: "1일 전", type: "팝니다" },
    { id: 4, title: "에어프라이어 삽니다", price: 50000, location: "금촌동", time: "1일 전", type: "삽니다" },
  ];

  const jobs = [
    { id: 1, title: "카페 서비스 직원 모집", company: "파주카페", location: "운정동", salary: "시급 10,000원", type: "파트타임" },
    { id: 2, title: "웹 개발자 채용", company: "파주IT기업", location: "교하동", salary: "면접 후 결정", type: "정규직" },
    { id: 3, title: "축제 행사 단기 알바", company: "파주축제위원회", location: "운정호수공원", salary: "일당 80,000원", type: "단기알바" },
    { id: 4, title: "편의점 야간 알바", company: "편의점 체인", location: "금촌동", salary: "시급 12,000원", type: "파트타임" },
  ];

  const localPosts = [
    { id: 1, title: "운정동 주민 모임 가입하세요", area: "운정", comments: 15, views: 234 },
    { id: 2, title: "교하동 이벤트 공유합니다", area: "교하", comments: 8, views: 156 },
    { id: 3, title: "금촌동 맛집 추천 받아요", area: "금촌", comments: 22, views: 345 },
    { id: 4, title: "문산 지역 축제 함께 가요", area: "문산", comments: 12, views: 189 },
  ];

  const popularVideos = [
    { id: 1, title: "파주 헤이리 마을 1일 VLOG", category: "VLOG", views: 1234, likes: 89 },
    { id: 2, title: "파주 맛집 투어 - 헤이리 카페거리", category: "맛집탐방", views: 2345, likes: 156 },
    { id: 3, title: "파주 축제 현장 후기", category: "행사후기", views: 987, likes: 67 },
    { id: 4, title: "DMZ 땅굴 관람 VLOG", category: "관광지", views: 1876, likes: 134 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-r from-paju-blue-dark to-paju-blue py-20 md:py-24 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-sm md:text-base text-white/90 mb-4 font-medium">
              파주 시민을 위한, 파주 시민에 의한
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              참여형 로컬 커뮤니티 플랫폼, 파주온
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                href="/groups"
                className="px-8 py-4 bg-white text-paju-blue rounded-lg font-semibold text-base md:text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
              >
                모임 찾기
              </Link>
              <Link
                href="/news"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold text-base md:text-lg hover:bg-white/20 transition-all shadow-md hover:shadow-lg"
              >
                파주 소식 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 유저 대시보드 위젯 */}
          <section className="mb-16">
            <UserDashboardWidget />
          </section>

          {/* 최근 활동 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">최근 활동</h2>
            <RecentActivity />
          </section>
          
          {/* 신규 개설 모임 */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">신규 개설 모임</h2>
              <Link
                href="/groups"
                className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
              >
                전체 보기
                <ArrowRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {newGroups.map((group, index) => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-paju-green/10 text-paju-green rounded-full text-xs font-medium">
                          {group.category}
                        </span>
                        <span className="text-xs text-gray-500">{group.created}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>👥 {group.members}명 참여</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        {/* 우리동네 핫플 베스트 후기 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">우리동네 핫플 베스트 후기</h2>
            <Link
              href="/news/hotplaces"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/news/hotplaces/${place.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-48 bg-gray-200 rounded-t-xl relative">
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                    📸 {place.images}장
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{place.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {place.place}
                  </div>
                  <div className="flex items-center text-sm text-paju-warm">
                    <span>❤️ {place.likes}개 좋아요</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ON-이벤트 공지 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ON-이벤트 공지</h2>
            <Link
              href="/events"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-gradient-to-r from-orange-500 to-green-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 text-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {event.status}
                  </span>
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 파주장터 최신 매물 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">파주장터 최신 매물</h2>
            <Link
              href="/life/market"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketItems.map((item) => (
              <Link
                key={item.id}
                href={`/life/market/${item.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="h-40 bg-gradient-to-r from-green-400 to-orange-400 relative">
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-green-600">
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
        </section>

        {/* 파주 일자리 최신 공고 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">파주 일자리 최신 공고</h2>
            <Link
              href="/life/jobs"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/life/jobs/${job.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 동네별 소모임 인기글 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">동네별 소모임 인기글</h2>
            <Link
              href="/community/local"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localPosts.map((post) => (
              <Link
                key={post.id}
                href={`/community/local/${post.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {post.area}동
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>조회 {post.views}</span>
                      <span className="text-green-600 font-medium">{post.comments}개 댓글</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 파주ON TV 인기 영상 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">파주ON TV 인기 영상</h2>
            <Link
              href="/play/tv"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVideos.map((video) => (
              <Link
                key={video.id}
                href={`/play/tv/${video.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="h-40 bg-gradient-to-r from-red-400 to-orange-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <VideoCameraIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
                    {video.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>조회 {video.views.toLocaleString()}</span>
                    <span>❤️ {video.likes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 오늘의 파주 핫이슈 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">오늘의 파주 핫이슈</h2>
            <Link
              href="/now/issue"
              className="flex items-center text-paju-blue hover:text-paju-blue-dark font-medium"
            >
              전체 보기
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/now/issue"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xs font-medium text-red-600">핫이슈</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  파주시, 2024년 지역경제 활성화 사업 추진
                </h3>
                <p className="text-xs text-gray-500">파주시청 보도자료 · 2시간 전</p>
              </Link>
              <Link
                href="/now/issue"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-blue-600">공지</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  운정호수공원 문화행사 개최 안내
                </h3>
                <p className="text-xs text-gray-500">파주시청 · 5시간 전</p>
              </Link>
              <Link
                href="/now/issue"
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-green-600">교통</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  파주시 주요 도로 교통 정보 (실시간)
                </h3>
                <p className="text-xs text-gray-500">교통정보센터 · 실시간</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 빠른 액션 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/school"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center border border-gray-100"
          >
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">아이러브스쿨</h3>
            <p className="text-gray-600">동문들과 만나 보세요</p>
          </Link>
          <Link
            href="/map"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center border border-gray-100"
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">파주MAP</h3>
            <p className="text-gray-600">지도로 파주를 탐험하세요</p>
          </Link>
          <Link
            href="/support"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 text-center border border-gray-100"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">고객센터</h3>
            <p className="text-gray-600">문의사항이 있으신가요?</p>
          </Link>
        </section>
        </div>
      </div>
    </div>
  );
}