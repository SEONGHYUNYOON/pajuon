"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import EventCalendar from "@/components/events/EventCalendar";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

const events = [
  {
    id: 1,
    title: "💝 이번 주말 3:3 미팅 (여성 마감임박)",
    date: "2024-12-15",
    time: "14:00 - 17:00",
    location: "파주시민회관 3층 대회의실",
    participants: 45,
    maxParticipants: 50,
    status: "신청중",
    type: "미팅",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", // 친구 모임/미팅
    isMatchmaking: true,
  },
  {
    id: 2,
    title: "직장인 솔로 탈출 파티",
    date: "2024-12-22",
    time: "19:00 - 22:00",
    location: "헤이리 예술마을 카페",
    participants: 28,
    maxParticipants: 40,
    status: "신청중",
    type: "미팅",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", // 파티/모임
    isMatchmaking: true,
  },
  {
    id: 3,
    title: "파주 지역축제",
    date: "2024-12-20",
    time: "10:00 - 18:00",
    location: "운정호수공원",
    participants: 120,
    maxParticipants: 200,
    status: "신청중",
    type: "축제",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80", // 축제/행사
    isMatchmaking: false,
  },
  {
    id: 4,
    title: "파주 시민 대토론회",
    date: "2024-12-25",
    time: "19:00 - 21:00",
    location: "파주시청 대강당",
    participants: 80,
    maxParticipants: 100,
    status: "신청중",
    type: "토론",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", // 토론/회의
    isMatchmaking: false,
  },
  {
    id: 5,
    title: "💕 크리스마스 특별 미팅",
    date: "2024-12-24",
    time: "18:00 - 21:00",
    location: "출판도시 레스토랑",
    participants: 32,
    maxParticipants: 50,
    status: "신청중",
    type: "미팅",
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=800&q=80", // 크리스마스/데코레이션
    isMatchmaking: true,
  },
];

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 더미 이벤트 데이터 (실제로는 API에서 가져옴)
  const calendarEvents = events.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    startDate: new Date(event.date),
    type: event.type === "미팅" ? "MATCHMAKING" : "OTHER",
  }));

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // 해당 날짜의 이벤트 필터링 등
  };

  const handleEventClick = (event: any) => {
    // 이벤트 상세 페이지로 이동
    window.location.href = `/events/${event.id}`;
  };

  // 미팅 이벤트와 일반 이벤트 분리
  const matchmakingEvents = events.filter((e) => e.isMatchmaking);
  const regularEvents = events.filter((e) => !e.isMatchmaking);

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-8" style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
      <div className="w-full max-w-7xl mx-auto">
        {/* 헤더 */}
        <PageHeader
          title="ON-이벤트"
          description="PAJU ON에서 주최하는 공식 이벤트에 참여해보세요"
          icon={<CalendarIcon className="w-8 h-8" />}
        />

        {/* 이벤트 캘린더 */}
        <div className="mb-8">
          <EventCalendar
            events={calendarEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>

        {/* 선남선녀 미팅 섹션 - 강조 */}
        {matchmakingEvents.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-6 shadow-lg shadow-gray-200/50 border border-pink-200">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">💖</span>
              <h2 className="text-2xl font-bold text-gray-900">선남선녀 미팅</h2>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                HOT
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchmakingEvents.map((event) => (
                <Card
                  key={event.id}
                  href={`/events/${event.id}`}
                  padding="none"
                  className="overflow-hidden border-2 border-pink-200"
                >
                  {/* 티켓 스타일 헤더 */}
                  <div className="h-48 bg-gradient-to-br from-pink-400 to-rose-400 relative overflow-hidden">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-pink-600 border border-pink-300">
                      💕 {event.type}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                      모집중
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <TicketIcon className="w-12 h-12 text-white/30" />
                    </div>
                  </div>

              {/* 티켓 내용 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center text-gray-700">
                    <CalendarIcon className="w-5 h-5 mr-2 text-paju-blue" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-2 text-paju-blue" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPinIcon className="w-5 h-5 mr-2 text-paju-blue" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <UserGroupIcon className="w-5 h-5 mr-2 text-paju-blue" />
                    <span>
                      {event.participants}/{event.maxParticipants}명 참여
                    </span>
                  </div>
                </div>

                {/* 참여 진행률 */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-pink-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${(event.participants / event.maxParticipants) * 100}%`,
                    }}
                  />
                </div>

                {/* 참여 신청 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/events/${event.id}`;
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors font-semibold shadow-lg"
                >
                  💖 참여 신청하기
                </button>
              </div>
            </Card>
              ))}
            </div>
          </div>
        )}

        {/* 일반 이벤트 섹션 */}
        {regularEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">다른 이벤트</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => (
                <Card
                  key={event.id}
                  href={`/events/${event.id}`}
                  padding="none"
                  className="overflow-hidden"
                >
                  {/* 티켓 스타일 헤더 */}
                  <div className="h-48 bg-gradient-to-br from-paju-blue to-paju-green relative overflow-hidden">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                      {event.type}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-paju-warm text-white rounded-full text-xs font-medium">
                      {event.status}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <TicketIcon className="w-12 h-12 text-white/30" />
                    </div>
                  </div>

                  {/* 티켓 내용 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center text-gray-700">
                        <CalendarIcon className="w-5 h-5 mr-2 text-paju-blue" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <ClockIcon className="w-5 h-5 mr-2 text-paju-blue" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPinIcon className="w-5 h-5 mr-2 text-paju-blue" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <UserGroupIcon className="w-5 h-5 mr-2 text-paju-blue" />
                        <span>
                          {event.participants}/{event.maxParticipants}명 참여
                        </span>
                      </div>
                    </div>

                    {/* 참여 진행률 */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-paju-blue h-2 rounded-full transition-all"
                        style={{
                          width: `${(event.participants / event.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>

                    {/* 참여 신청 버튼 */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/events/${event.id}`;
                      }}
                      className="w-full px-4 py-3 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors font-semibold"
                    >
                      참여 신청하기
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
