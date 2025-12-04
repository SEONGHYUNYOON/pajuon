"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Plus } from "lucide-react";

const categories = [
  { id: "all", label: "전체보기", icon: "🔍" },
  { id: "coffee", label: "가벼운 번개", icon: "☕" },
  { id: "blind_date", label: "설레는 소개팅", icon: "💘" },
  { id: "activity", label: "취미로 썸타기", icon: "🏃" },
  { id: "party", label: "공식 이벤트", icon: "🎉" },
  { id: "review", label: "커플 후기", icon: "💖" },
];

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: "recruiting" | "closing" | "closed";
  tags: string[];
  image: string;
  genderRatio?: string; // 성비 (e.g., "5:5")
}

const generateEvents = (): Event[] => {
  const events: Event[] = [];
  const locations = ["운정 호수공원", "헤이리 예술마을", "야당역", "금촌 로터리", "출판단지"];

  const categoryData = {
    coffee: ["퇴근 후 커피 한잔", "주말 브런치 모임", "맛집 탐방 번개", "디저트 투어", "심야 카페 수다"],
    blind_date: ["2030 직장인 소개팅", "3:3 미팅 하실 분", "주말 1:1 소개팅", "크리스마스 대비 미팅", "설레는 첫 만남"],
    activity: ["주말 등산 데이트", "한강 라이딩 썸", "볼링 치며 친해져요", "원데이 베이킹 클래스", "반려견 산책 데이트"],
    party: ["파주 솔로 탈출 파티", "와인 스탠딩 파티", "가면 무도회", "루프탑 맥주 파티", "연말 네트워킹 파티"],
    review: ["저희 커플 됐어요!", "소개팅 성공 후기", "파주ON 덕분에 만났습니다", "100일 기념 후기", "결혼합니다💕"],
  };

  let idCounter = 1;

  Object.entries(categoryData).forEach(([catId, titles]) => {
    for (let i = 0; i < 5; i++) {
      const title = titles[i % titles.length];
      const status = Math.random() > 0.7 ? "closing" : Math.random() > 0.2 ? "recruiting" : "closed";

      events.push({
        id: idCounter++,
        title: `${title} ${i + 1}`,
        category: catId,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        time: "19:00",
        location: locations[Math.floor(Math.random() * locations.length)],
        participants: Math.floor(Math.random() * 20) + 2,
        maxParticipants: Math.floor(Math.random() * 20) + 10,
        status: status,
        tags: ["#2030", "#직장인", "#매너필수"],
        image: `https://images.unsplash.com/photo-${[
          "1511795409834-ef04bbd61622", // party
          "1529156069898-49953e39b3ac", // friends
          "1482517967863-00e15c9b44be", // christmas
          "1544531586-fde5298cdd40", // festival
          "1552664730-d307ca884978", // discussion
        ][i % 5]}?auto=format&fit=crop&w=800&q=80`,
        genderRatio: catId === "blind_date" || catId === "party" ? "5:5" : undefined,
      });
    }
  });

  return events.sort((a, b) => b.status.localeCompare(a.status)); // 모집중 우선
};

const events = generateEvents();

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-pink-50/30 py-8">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 - 핑크/코랄 그라디언트 */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 opacity-90"></div>
          <div className="relative z-10 p-10 text-center text-white">
            <p className="text-lg font-medium mb-2 opacity-90">파주에서 시작되는 설렘</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">만남과 이벤트</h1>
            <p className="text-white/80 max-w-xl mx-auto">
              새로운 인연을 찾고 계신가요? 파주ON에서 설레는 만남을 시작해보세요.
            </p>
          </div>
          {/* 장식용 원 */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300/20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-8 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm ${selectedCategory === cat.id
                  ? "bg-rose-500 text-white shadow-rose-200 ring-2 ring-rose-300"
                  : "bg-white text-gray-600 hover:bg-rose-50 border border-gray-100"
                }`}
            >
              <span className="mr-2 text-lg">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 이벤트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* 이미지 영역 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* 뱃지 */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {event.status === "recruiting" && (
                    <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
                      모집중
                    </span>
                  )}
                  {event.status === "closing" && (
                    <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                      마감임박
                    </span>
                  )}
                  {event.genderRatio && (
                    <span className="px-2.5 py-1 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                      성비 {event.genderRatio}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center text-xs font-medium mb-1 opacity-90">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                    {event.date} {event.time}
                  </div>
                  <div className="flex items-center text-xs font-medium opacity-90">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>

              {/* 컨텐츠 영역 */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                    {categories.find(c => c.id === event.category)?.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                  {event.title}
                </h3>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <UserGroupIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                      <span>{event.participants}/{event.maxParticipants}명</span>
                    </div>
                    <button className="text-sm font-bold text-rose-500 flex items-center group-hover:translate-x-1 transition-transform">
                      참여하기
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 플로팅 작성 버튼 */}
        <Link
          href="/events/new"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-rose-500 text-white rounded-full px-8 py-4 shadow-lg shadow-rose-500/30 hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 z-50 font-bold text-lg"
          onClick={(e) => {
            e.preventDefault();
            alert("준비 중입니다");
          }}
        >
          <SparklesIcon className="w-6 h-6" />
          설레는 만남 주최하기
        </Link>
      </div>
    </div>
  );
}
