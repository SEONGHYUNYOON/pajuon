"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FireIcon,
  NewspaperIcon,
  BellIcon,
  TruckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const hotIssues = [
  {
    id: 1,
    title: "파주시, 2024년 지역경제 활성화 사업 추진",
    type: "뉴스",
    source: "파주시청 보도자료",
    date: "2024-12-10",
    views: 1234,
    icon: NewspaperIcon,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "운정호수공원 문화행사 개최 안내",
    type: "공지",
    source: "파주시청",
    date: "2024-12-09",
    views: 856,
    icon: BellIcon,
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "파주시 주요 도로 교통 정보 (실시간)",
    type: "교통",
    source: "교통정보센터",
    date: "2024-12-10",
    views: 2341,
    icon: TruckIcon,
    color: "bg-green-500",
  },
];

const news = [
  {
    id: 1,
    title: "파주시 공공시설 이용 안내",
    type: "공지",
    date: "2024-12-08",
    summary: "파주시 주요 공공시설 이용 시간 및 방법 안내입니다...",
  },
  {
    id: 2,
    title: "파주 지역 축제 일정 안내",
    type: "이벤트",
    date: "2024-12-07",
    summary: "12월 파주 지역에서 열리는 다양한 축제 일정을 안내합니다...",
  },
  {
    id: 3,
    title: "파주시 대중교통 개편안 발표",
    type: "뉴스",
    date: "2024-12-06",
    summary: "2025년 파주시 대중교통 개편안이 발표되었습니다...",
  },
];

const trafficInfo = [
  { route: "문산-파주", status: "원활", time: "15분", delay: 0 },
  { route: "운정-교하", status: "약간 지연", time: "25분", delay: 5 },
  { route: "금촌-문산", status: "원활", time: "20분", delay: 0 },
];

export default function IssuePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <FireIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">오늘의 파주</h1>
          <p className="text-lg text-gray-600">
            파주의 실시간 핫이슈와 중요한 정보를 한눈에 확인하세요
          </p>
        </div>

        {/* 핫이슈 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FireIcon className="w-6 h-6 text-orange-500 mr-2" />
            파주 핫이슈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotIssues.map((issue) => {
              const Icon = issue.icon;
              return (
                <Link
                  key={issue.id}
                  href={`/news/official/${issue.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
                >
                  <div className={`w-12 h-12 ${issue.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {issue.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {issue.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{issue.source}</span>
                    <span>조회 {issue.views}</span>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">{issue.date}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 파주ON 소식 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <NewspaperIcon className="w-6 h-6 text-green-500 mr-2" />
                  파주ON 소식
                </h2>
                <Link
                  href="/news"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  전체 보기 →
                </Link>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/official/${item.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 실시간 교통정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="w-6 h-6 text-blue-500 mr-2" />
                실시간 교통정보
              </h2>
              <div className="space-y-3">
                {trafficInfo.map((traffic, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{traffic.route}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          traffic.status === "원활"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {traffic.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      소요시간: {traffic.time}
                      {traffic.delay > 0 && (
                        <span className="ml-2 text-orange-600">(+{traffic.delay}분 지연)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500 text-center">
                * API 연동 준비 중
              </div>
            </div>
          </div>
        </div>

        {/* 주요 공지 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BellIcon className="w-6 h-6 text-orange-500 mr-2" />
            주요 공지
          </h2>
          <div className="space-y-3">
            {[
              "파주시청 주요 일정 안내",
              "시민 여러분의 의견을 기다립니다 - 시정 제안",
              "2025년 파주시 예산안 공개",
            ].map((notice, index) => (
              <Link
                key={index}
                href="#"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{notice}</span>
                  <span className="text-sm text-gray-500">2024-12-10</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
