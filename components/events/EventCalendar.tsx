"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  type: string;
}

interface EventCalendarProps {
  events: Event[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

export default function EventCalendar({ events, onDateClick, onEventClick }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 월의 첫 번째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 특정 날짜에 이벤트가 있는지 확인
  const getEventsForDate = (date: number) => {
    const checkDate = new Date(year, month, date);
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
      
      return (
        checkDate >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
        checkDate <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate())
      );
    });
  };

  // 오늘인지 확인
  const isToday = (date: number) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: number) => {
    const clickedDate = new Date(year, month, date);
    onDateClick?.(clickedDate);
  };

  // 이벤트 클릭 핸들러
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick?.(event);
  };

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  // 빈 칸 생성
  const emptyDays = Array(startingDayOfWeek).fill(null);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="이전 달"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {year}년 {monthNames[month]}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="다음 달"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          오늘
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className={`text-center text-sm font-semibold py-2 ${
              day === "일" ? "text-red-500" : day === "토" ? "text-blue-500" : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {/* 빈 칸 */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}

        {/* 날짜 칸 */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
          const dayEvents = getEventsForDate(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className={`aspect-square border-2 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-50 ${
                isTodayDate
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  isTodayDate ? "text-green-700" : "text-gray-900"
                }`}
              >
                {date}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className={`text-xs px-1.5 py-0.5 rounded truncate cursor-pointer ${
                      event.type === "MATCHMAKING"
                        ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                        : event.type === "CAMPING"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 px-1">
                    +{dayEvents.length - 2}개
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-100 rounded mr-2"></div>
            <span className="text-gray-600">미팅</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-100 rounded mr-2"></div>
            <span className="text-gray-600">캠핑</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 rounded mr-2"></div>
            <span className="text-gray-600">기타</span>
          </div>
        </div>
      </div>
    </div>
  );
}

