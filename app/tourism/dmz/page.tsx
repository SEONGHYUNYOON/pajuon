"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type TabType = "tunnel" | "dora" | "imjin";

interface TourInfo {
  name: string;
  subtitle: string;
  hours: string;
  closed: string;
  price: {
    adult: string;
    youth: string;
    child: string;
  };
  phone: string;
  duration: string;
  address: string;
  description: string;
}

export default function DMZTourismPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("tunnel");

  const tourData: Record<TabType, TourInfo> = {
    tunnel: {
      name: "제3땅굴",
      subtitle: "한반도 분단의 아픈 역사를 간직한 지하 땅굴",
      hours: "09:00 - 17:00 (3월~10월) / 09:00 - 16:00 (11월~2월)",
      closed: "매주 월요일 휴관",
      price: {
        adult: "3,000원",
        youth: "1,500원",
        child: "1,000원",
      },
      phone: "031-940-3900",
      duration: "약 1시간",
      address: "경기도 파주시 문산읍 임진각로 148-53",
      description:
        "북한이 남침을 위해 만든 지하 땅굴로, 깊이 73m, 길이 1,635m에 달합니다. 안전모를 착용하고 헬멧을 써야 하며, 편한 복장과 운동화를 권장합니다.",
    },
    dora: {
      name: "도라전망대",
      subtitle: "북한을 직접 바라볼 수 있는 최북단 전망대",
      hours: "09:00 - 17:00 (연중 무휴)",
      closed: "연중 무휴",
      price: {
        adult: "무료",
        youth: "무료",
        child: "무료",
      },
      phone: "031-940-3900",
      duration: "약 30분",
      address: "경기도 파주시 문산읍 임진각로 148-53",
      description:
        "DMZ 내 최북단에 위치한 전망대로, 북한의 개성시를 직접 바라볼 수 있습니다. 망원경을 통해 북한의 모습을 관찰할 수 있으며, 평화의 의미를 되새길 수 있는 장소입니다.",
    },
    imjin: {
      name: "임진각",
      subtitle: "한반도 평화의 상징, 임진각 평화누리공원",
      hours: "09:00 - 18:00 (연중 무휴)",
      closed: "연중 무휴",
      price: {
        adult: "무료",
        youth: "무료",
        child: "무료",
      },
      phone: "031-940-3900",
      duration: "약 1.5시간",
      address: "경기도 파주시 문산읍 임진각로 148-53",
      description:
        "한반도 평화의 상징인 임진각 평화누리공원입니다. 평화의 종, 전망대, 기념관 등을 둘러볼 수 있으며, 가족 단위 관광객에게 인기 있는 장소입니다.",
    },
  };

  const currentTour = tourData[selectedTab];

  const tips = [
    {
      icon: ClockIcon,
      title: "관람 소요 시간",
      content: currentTour.duration,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: ExclamationTriangleIcon,
      title: "복장 안내",
      content: "편한 복장과 운동화를 착용하세요. 하이힐이나 구두는 금지입니다.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: CheckCircleIcon,
      title: "신분증 지참",
      content: "안보 관광 시 신분증을 반드시 지참하시기 바랍니다.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: UserGroupIcon,
      title: "관람 가능 연령",
      content: "초등학생 이상부터 관람 가능하며, 보호자 동반이 필요합니다.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 탭 메뉴 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 gap-1">
            {(
              [
                { id: "tunnel" as TabType, label: "제3땅굴" },
                { id: "dora" as TabType, label: "도라전망대" },
                { id: "imjin" as TabType, label: "임진각" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                  selectedTab === tab.id
                    ? "bg-paju-blue text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero & Info Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          {/* 타이틀 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTour.name}</h1>
            <p className="text-lg text-gray-600">{currentTour.subtitle}</p>
          </div>

          {/* 정보 그리드 (4열) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* 운영 시간 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-5 h-5 text-paju-blue mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm">운영 시간</h3>
              </div>
              <p className="text-sm text-gray-700">{currentTour.hours}</p>
            </div>

            {/* 휴무일 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <CalendarIcon className="w-5 h-5 text-paju-blue mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm">휴무일</h3>
              </div>
              <p className="text-sm text-gray-700">{currentTour.closed}</p>
            </div>

            {/* 관람 요금 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <CurrencyDollarIcon className="w-5 h-5 text-paju-blue mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm">관람 요금</h3>
              </div>
              <p className="text-sm text-gray-700">
                {currentTour.price.adult === "무료"
                  ? "무료"
                  : `성인 ${currentTour.price.adult}`}
              </p>
            </div>

            {/* 문의 전화 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <PhoneIcon className="w-5 h-5 text-paju-blue mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm">문의 전화</h3>
              </div>
              <p className="text-sm text-gray-700 font-medium">{currentTour.phone}</p>
            </div>
          </div>

          {/* 가격표 */}
          {currentTour.price.adult !== "무료" && (
            <div className="bg-paju-blue/5 rounded-lg p-6 mb-8 border border-paju-blue/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">관람 요금 상세</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">성인</p>
                  <p className="text-xl font-bold text-paju-blue">{currentTour.price.adult}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">청소년</p>
                  <p className="text-xl font-bold text-paju-blue">{currentTour.price.youth}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">어린이</p>
                  <p className="text-xl font-bold text-paju-blue">{currentTour.price.child}</p>
                </div>
              </div>
            </div>
          )}

          {/* 설명 */}
          <p className="text-gray-700 leading-relaxed">{currentTour.description}</p>
        </div>

        {/* 예약 가이드 (강조) */}
        <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <CalendarIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">예약 방법</h2>
          </div>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">전화 예약</p>
                <p className="text-gray-700">
                  {currentTour.phone}로 전화하여 원하는 날짜와 시간을 예약합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">온라인 예약</p>
                <p className="text-gray-700">
                  DMZ 관광 홈페이지에서 온라인 예약도 가능합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">당일 예약</p>
                <p className="text-gray-700">
                  평일에는 당일 예약도 가능하나, 주말은 사전 예약을 권장합니다.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* 방문 팁 (카드형) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">방문 전 알아두면 좋은 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className={`${tip.bgColor} border rounded-lg p-4 border-gray-200`}
                >
                  <div className="flex items-start">
                    <Icon className={`w-6 h-6 ${tip.color} mr-3 flex-shrink-0 mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-700">{tip.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 위치 안내 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">위치 안내</h2>
          <div className="flex items-center text-gray-700 mb-4">
            <MapPinIcon className="w-5 h-5 text-paju-blue mr-2" />
            <span>{currentTour.address}</span>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">지도가 여기에 표시됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
