"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  CalendarIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function DMZTourismPage() {
  const [selectedTab, setSelectedTab] = useState<"tunnel" | "security">("tunnel");

  const dmzTunnel = {
    name: "DMZ 제3땅굴",
    location: "경기도 파주시 문산읍",
    address: "경기도 파주시 문산읍 임진각로 148-53",
    hours: {
      summer: "09:00 - 17:00 (3월~10월)",
      winter: "09:00 - 16:00 (11월~2월)",
      closed: "매주 월요일 휴관",
    },
    phone: "031-940-3900",
    duration: "약 1시간",
    price: "성인 3,000원, 청소년 1,500원, 어린이 1,000원",
    description: `한반도 분단의 아픈 역사를 간직한 DMZ 제3땅굴입니다. 
    북한이 남침을 위해 만든 지하 땅굴로, 깊이 73m, 길이 1,635m에 달합니다.
    안전모를 착용하고 헬멧을 써야 하며, 편한 복장과 운동화를 권장합니다.`,
    tips: [
      {
        icon: "⏰",
        title: "관람 소요 시간",
        content: "땅굴 관람은 약 1시간 정도 소요됩니다. 안전모를 착용해야 하며, 편한 복장을 권장합니다.",
      },
      {
        icon: "📞",
        title: "예약 방법",
        content: "주말 및 공휴일에는 예약을 권장합니다. 평일은 당일 예약도 가능합니다. 전화 예약: 031-940-3900",
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "관람 가능 연령",
        content: "초등학생 이상부터 관람 가능하며, 보호자 동반이 필요합니다. 유아는 관람 불가입니다.",
      },
      {
        icon: "👟",
        title: "복장 안내",
        content: "땅굴 내부는 습하고 미끄러울 수 있으니 편한 복장과 운동화를 착용하세요. 하이힐이나 구두는 금지입니다.",
      },
      {
        icon: "📸",
        title: "촬영 안내",
        content: "땅굴 내부는 촬영이 제한됩니다. 지정된 구간에서만 사진 촬영이 가능합니다.",
      },
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.1234567890!2d126.7890123!3d37.9012345",
  };

  const securityTour = {
    name: "DMZ 안보 관광",
    location: "경기도 파주시 문산읍",
    programs: [
      {
        name: "DMZ 평화누리공원",
        duration: "2시간",
        price: "무료",
        description: "평화의 종, 전망대, 기념관 등을 둘러볼 수 있습니다.",
      },
      {
        name: "도라산역",
        duration: "1시간",
        price: "무료",
        description: "북한으로 가는 마지막 역인 도라산역을 관람할 수 있습니다.",
      },
      {
        name: "임진각 평화누리공원",
        duration: "1.5시간",
        price: "무료",
        description: "한반도 평화의 상징인 임진각을 둘러볼 수 있습니다.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <MapPinIcon className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DMZ 관광 가이드</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            파주 DMZ의 역사와 평화를 체험할 수 있는 관광 정보를 안내해드립니다.
            <br />
            <span className="text-sm text-gray-500">
              일반인도 쉽게 예약하고 방문할 수 있도록 상세한 정보를 제공합니다.
            </span>
          </p>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-sm p-1 inline-flex">
            <button
              onClick={() => setSelectedTab("tunnel")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === "tunnel"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              땅굴 관광
            </button>
            <button
              onClick={() => setSelectedTab("security")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === "security"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              안보 관광
            </button>
          </div>
        </div>

        {/* 땅굴 관광 */}
        {selectedTab === "tunnel" && (
          <div className="space-y-6">
            {/* 기본 정보 카드 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{dmzTunnel.name}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2 text-green-600" />
                    {dmzTunnel.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold mb-2">
                    {dmzTunnel.price}
                  </div>
                  <div className="text-sm text-gray-600">{dmzTunnel.duration}</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {dmzTunnel.description}
              </p>

              {/* 운영 시간 및 연락처 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">운영 시간</h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>{dmzTunnel.hours.summer}</div>
                    <div>{dmzTunnel.hours.winter}</div>
                    <div className="text-red-600 font-medium">{dmzTunnel.hours.closed}</div>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <PhoneIcon className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">예약 문의</h3>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{dmzTunnel.phone}</div>
                  <div className="text-xs text-gray-600 mt-1">전화 예약 가능</div>
                </div>
              </div>

              {/* 예약 방법 */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CalendarIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">예약 방법</h3>
                </div>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </span>
                    <span>전화 예약: {dmzTunnel.phone}로 전화하여 원하는 날짜와 시간을 예약합니다.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </span>
                    <span>온라인 예약: DMZ 관광 홈페이지에서 온라인 예약도 가능합니다.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      3
                    </span>
                    <span>당일 예약: 평일에는 당일 예약도 가능하나, 주말은 사전 예약을 권장합니다.</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* 방문 팁 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <InformationCircleIcon className="w-6 h-6 text-green-600 mr-2" />
                방문 전 알아두면 좋은 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dmzTunnel.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-lg p-4 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{tip.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 지도 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">위치 안내</h3>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">지도가 여기에 표시됩니다</p>
                  <p className="text-sm text-gray-500 mt-2">{dmzTunnel.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 안보 관광 */}
        {selectedTab === "security" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{securityTour.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                DMZ 안보 관광은 무료로 진행되며, 평화누리공원, 도라산역, 임진각 등을 둘러볼 수 있습니다.
                예약 없이도 방문 가능하지만, 단체 관광의 경우 사전 예약을 권장합니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {securityTour.programs.map((program, index) => (
                  <div
                    key={index}
                    className="border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        소요 시간: {program.duration}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">💰</span>
                        입장료: {program.price}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 주의사항 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">주의사항</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>신분증을 지참하시기 바랍니다. (안보 관광 시 필요)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>촬영이 제한되는 구간이 있으니 안내를 따라주세요.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>단체 관광의 경우 사전 예약을 권장합니다.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

