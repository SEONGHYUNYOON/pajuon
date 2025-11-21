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
    title: "미혼 선남선녀 미팅",
    date: "2024-12-15",
    time: "14:00 - 17:00",
    location: "파주시민회관 3층 대회의실",
    participants: 45,
    maxParticipants: 50,
    status: "신청중",
    type: "미팅",
  },
  {
    id: 2,
    title: "파주 지역축제",
    date: "2024-12-20",
    time: "10:00 - 18:00",
    location: "운정호수공원",
    participants: 120,
    maxParticipants: 200,
    status: "신청중",
    type: "축제",
  },
  {
    id: 3,
    title: "파주 시민 대토론회",
    date: "2024-12-25",
    time: "19:00 - 21:00",
    location: "파주시청 대강당",
    participants: 80,
    maxParticipants: 100,
    status: "신청중",
    type: "토론",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <PageHeader
          title="ON-이벤트"
          description="PAJU ON에서 주최하는 공식 이벤트에 참여해보세요"
          icon={<CalendarIcon className="w-8 h-8" />}
        />

        {/* 이벤트 캘린더 */}
        <div className="mb-12">
          <EventCalendar
            events={calendarEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>

        {/* 이벤트 목록 - 티켓 예매 사이트 스타일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              href={`/events/${event.id}`}
              padding="none"
              className="overflow-hidden"
            >
              {/* 티켓 스타일 헤더 */}
              <div className="h-48 bg-gradient-to-br from-paju-blue to-paju-green relative overflow-hidden">
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
    </div>
  );
}
