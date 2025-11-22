"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Plus, Pencil } from "lucide-react";

const jobTypes = [
  { id: "all", label: "전체" },
  { id: "part-time", label: "알바" },
  { id: "full-time", label: "정규직" },
  { id: "daily", label: "일용직" },
];

// 더미 구인구직 데이터 (10개)
const jobs = [
  {
    id: 1,
    title: "운정 카페 주말 알바",
    type: "part-time",
    wage: "시급 1.2만원",
    location: "운정동",
    hours: "주말 10:00-18:00",
    company: "카페 파주",
    description: "주말 근무 가능하신 분 모집합니다. 경력 무관, 친절하신 분 우대",
  },
  {
    id: 2,
    title: "문산 물류센터 당일지급",
    type: "daily",
    wage: "일당 15만원",
    location: "문산읍",
    hours: "평일 09:00-18:00",
    company: "문산 물류센터",
    description: "당일 지급, 체력 좋으신 분 우대. 경력 무관",
  },
  {
    id: 3,
    title: "운정동 치킨집 주방 알바",
    type: "part-time",
    wage: "시급 1.1만원",
    location: "운정동",
    hours: "평일 저녁 18:00-22:00",
    company: "BBQ 운정점",
    description: "저녁 시간대 근무 가능하신 분. 주 3일 이상",
  },
  {
    id: 4,
    title: "파주시청 행정직 채용",
    type: "full-time",
    wage: "월급 280만원",
    location: "금촌동",
    hours: "평일 09:00-18:00",
    company: "파주시청",
    description: "대학 졸업 이상, 행정 관련 자격증 우대",
  },
  {
    id: 5,
    title: "금촌동 PC방 주말 알바",
    type: "part-time",
    wage: "시급 1.0만원",
    location: "금촌동",
    hours: "주말 12:00-20:00",
    company: "네트워크 PC방",
    description: "주말 근무 가능하신 대학생 우대",
  },
  {
    id: 6,
    title: "출판도시 인쇄소 일용직",
    type: "daily",
    wage: "일당 12만원",
    location: "출판도시",
    hours: "평일 08:00-17:00",
    company: "파주 인쇄소",
    description: "인쇄 작업 보조, 당일 지급",
  },
  {
    id: 7,
    title: "헤이리 카페 주말 알바",
    type: "part-time",
    wage: "시급 1.3만원",
    location: "헤이리 예술마을",
    hours: "주말 11:00-19:00",
    company: "카페 헤이리",
    description: "예술마을 카페 근무, 고객 서비스 우수자 우대",
  },
  {
    id: 8,
    title: "운정동 백화점 판매직",
    type: "full-time",
    wage: "월급 240만원 + 성과금",
    location: "운정동",
    hours: "평일 10:00-20:00 (교대근무)",
    company: "파주백화점",
    description: "의류 판매 경력 우대, 고객 서비스 마인드 중요",
  },
  {
    id: 9,
    title: "교하동 중국집 배달",
    type: "part-time",
    wage: "시급 1.1만원 + 배달비",
    location: "교하동",
    hours: "평일 저녁 17:00-22:00",
    company: "중화요리",
    description: "오토바이 면허 필수, 배달 경험 우대",
  },
  {
    id: 10,
    title: "파주시청 청소 일용직",
    type: "daily",
    wage: "일당 10만원",
    location: "금촌동",
    hours: "평일 06:00-10:00",
    company: "파주시청",
    description: "청소 작업, 조용한 시간대 근무",
  },
];

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredJobs = selectedType === "all"
    ? jobs
    : jobs.filter(job => job.type === selectedType);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#F8F9FA] py-6">
      <div className="w-full max-w-xl px-4 space-y-5">
        {/* 헤더 */}
        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">👔 파주인</h1>
          <p className="text-gray-500 text-sm">파주 지역 구인구직 정보</p>
        </div>

        {/* 필터 - 당근마켓 스타일 */}
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {jobTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedType === type.id
                  ? "bg-[#FF6F0F] text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* 구인구직 카드 리스트 - 당근마켓 스타일 */}
        <div className="space-y-3 mb-24">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-400 text-base">등록된 구인구직이 없어요</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 active:scale-[0.98]"
              >
                {/* 상단: 제목 + 작성일 */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 flex-1 pr-3 leading-snug">{job.title}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {new Date().toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                  </span>
                </div>

                {/* 중단: 급여 정보 - 당근마켓 스타일 */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-bold text-[#FF6F0F]">{job.wage}</span>
                  </div>
                  
                  {/* 지역 정보 - 더 직관적으로 */}
                  <div className="flex items-center gap-2 mb-2.5 px-2 py-1.5 bg-gray-50 rounded-lg">
                    <MapPinIcon className="w-4 h-4 text-[#FF6F0F] flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">{job.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span>{job.hours}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{job.company}</p>
                </div>

                {/* 하단: 태그 뱃지 - 당근마켓 스타일 */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    job.type === "full-time"
                      ? "bg-[#E8F5E9] text-[#2E7D32]"
                      : job.type === "part-time"
                      ? "bg-[#E3F2FD] text-[#1565C0]"
                      : "bg-[#FFF3E0] text-[#E65100]"
                  }`}>
                    {jobTypes.find(t => t.id === job.type)?.label}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* 플로팅 공고 등록 버튼 - 당근마켓 스타일 */}
      <Link
        href="/jobs/new"
        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#FF6F0F] text-white rounded-full px-6 py-3.5 shadow-lg hover:bg-[#E85A00] active:scale-95 transition-all flex items-center gap-2 z-50 max-w-xl mx-auto"
        onClick={(e) => {
          e.preventDefault();
          alert("준비 중입니다");
        }}
      >
        <Plus className="w-5 h-5" />
        <span className="font-semibold">공고 등록</span>
      </Link>
    </main>
  );
}

