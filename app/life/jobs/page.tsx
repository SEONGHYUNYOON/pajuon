"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const tabs = ["정규직", "파트타임/알바", "단기알바"];

const jobs = [
  {
    id: 1,
    title: "카페 서비스 직원 모집",
    company: "파주카페",
    type: "파트타임/알바",
    location: "운정동",
    salary: "시급 10,000원",
    workTime: "주 3일, 5시간",
    posted: "1일 전",
  },
  {
    id: 2,
    title: "웹 개발자 채용 (정규직)",
    company: "파주IT기업",
    type: "정규직",
    location: "교하동",
    salary: "면접 후 결정",
    workTime: "주 5일, 9-6시",
    posted: "2일 전",
  },
  {
    id: 3,
    title: "축제 행사 단기 알바",
    company: "파주축제위원회",
    type: "단기알바",
    location: "운정호수공원",
    salary: "일당 80,000원",
    workTime: "12월 20-22일",
    posted: "3일 전",
  },
  {
    id: 4,
    title: "편의점 야간 알바",
    company: "편의점 체인",
    type: "파트타임/알바",
    location: "금촌동",
    salary: "시급 12,000원",
    workTime: "야간 10시-6시",
    posted: "4일 전",
  },
  {
    id: 5,
    title: "마케팅 담당자 (정규직)",
    company: "파주중소기업",
    type: "정규직",
    location: "문산읍",
    salary: "면접 후 결정",
    workTime: "주 5일, 유연근무",
    posted: "5일 전",
  },
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("정규직");

  const filteredJobs = jobs.filter((job) => job.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">파주 일자리</h1>
              <p className="text-lg text-gray-600">파주 지역 일자리 정보를 확인하세요</p>
            </div>
            <Link
              href="/life/jobs/write"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              채용공고 등록
            </Link>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 채용 공고 목록 */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/life/jobs/${job.id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{job.company}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-4 h-4 mr-2 text-orange-500" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2 text-blue-500" />
                      {job.workTime}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 ml-4">{job.posted}</div>
              </div>
            </Link>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">등록된 채용공고가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
