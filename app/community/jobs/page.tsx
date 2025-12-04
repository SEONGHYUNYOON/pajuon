"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Plus, Pencil } from "lucide-react";

const jobCategories = [
  { id: "all", label: "전체" },
  { id: "restaurant", label: "카페/식당" },
  { id: "education", label: "교육/학원" },
  { id: "office", label: "사무/관리" },
  { id: "production", label: "생산/건설" },
  { id: "service", label: "서비스/판매" },
  { id: "other", label: "기타" },
];

interface Job {
  id: number;
  title: string;
  category: string;
  type: "part-time" | "full-time" | "daily";
  wage: string;
  location: string;
  hours: string;
  company: string;
  description: string;
  createdAt: Date;
}

// 더미 데이터 생성기
const generateJobs = (): Job[] => {
  const jobs: Job[] = [];
  const locations = ["운정동", "금촌동", "문산읍", "교하동", "탄현면", "광탄면", "월롱면"];
  const companies = ["스타벅스", "파주학원", "LG디스플레이 협력사", "GS25", "파주시청", "이마트", "쿠팡 물류센터"];

  const categoryData = {
    restaurant: ["카페 알바", "홀서빙", "주방보조", "바리스타", "제과제빵"],
    education: ["영어 강사", "수학 강사", "학원 차량 운행", "보조 교사", "채점 알바"],
    office: ["사무보조", "경리/회계", "총무", "데이터 입력", "비서"],
    production: ["생산직", "포장/검수", "물류센터", "지게차 운전", "건설 현장"],
    service: ["편의점", "매장 관리", "캐셔", "주차 관리", "청소"],
    other: ["배달", "단기 알바", "행사 보조", "모델", "기타"],
  };

  let idCounter = 1;

  Object.entries(categoryData).forEach(([catId, titles]) => {
    // 각 카테고리별 5개 이상 생성
    for (let i = 0; i < 6; i++) {
      const title = titles[i % titles.length];
      const type = Math.random() > 0.6 ? "full-time" : Math.random() > 0.3 ? "part-time" : "daily";
      const wage = type === "daily"
        ? `일급 ${10 + Math.floor(Math.random() * 10)}만원`
        : type === "full-time"
          ? `월급 ${200 + Math.floor(Math.random() * 100)}만원`
          : `시급 ${10000 + Math.floor(Math.random() * 5000)}원`;

      jobs.push({
        id: idCounter++,
        title: `${title} 구합니다 (${i + 1})`,
        category: catId,
        type: type,
        wage: wage,
        location: locations[Math.floor(Math.random() * locations.length)],
        hours: type === "full-time" ? "09:00 - 18:00" : "협의 가능",
        company: companies[Math.floor(Math.random() * companies.length)],
        description: "성실하고 책임감 강하신 분 모집합니다. 초보 가능.",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      });
    }
  });

  return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const jobs = generateJobs();

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredJobs = selectedCategory === "all"
    ? jobs
    : jobs.filter(job => job.category === selectedCategory);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#F8F9FA] py-6">
      <div className="w-full max-w-xl px-4 space-y-5">
        {/* 헤더 */}
        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">👔 파주인</h1>
          <p className="text-gray-500 text-sm">파주 지역 구인구직 정보</p>
        </div>

        {/* 필터 - 중앙 정렬 & 사이즈 확대 */}
        <div className="flex flex-wrap justify-center gap-3 px-2">
          {jobCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-lg font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                ? "bg-[#FF6F0F] text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
            >
              {cat.label}
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
                    {job.createdAt.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                  </span>
                </div>

                {/* 중단: 급여 정보 - 당근마켓 스타일 */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-bold text-[#FF6F0F]">{job.wage}</span>
                  </div>

                  {/* 지역 정보 - 더 직관적으로 */}
                  <div className="flex items-center gap-2 mb-2.5 px-2 py-1.5 bg-gray-50 rounded-lg w-fit">
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
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${job.type === "full-time"
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : job.type === "part-time"
                      ? "bg-[#E3F2FD] text-[#1565C0]"
                      : "bg-[#FFF3E0] text-[#E65100]"
                    }`}>
                    {job.type === "full-time" ? "정규직" : job.type === "part-time" ? "알바" : "일용직"}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {jobCategories.find(c => c.id === job.category)?.label}
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

