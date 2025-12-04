"use client";

import { useState } from "react";
import {
    MagnifyingGlassIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon
} from "@heroicons/react/24/outline";
import {
    BuildingLibraryIcon,
    TruckIcon,
    MegaphoneIcon,
    AcademicCapIcon,
    PlusIcon
} from "@heroicons/react/24/solid";

// 카테고리 데이터
const categories = [
    { id: "hospital", label: "병원/약국", icon: "🏥", color: "bg-red-100 text-red-600" },
    { id: "public", label: "행정/민원", icon: "🏛️", color: "bg-blue-100 text-blue-600" },
    { id: "traffic", label: "교통/주차", icon: "🚌", color: "bg-green-100 text-green-600" },
    { id: "news", label: "생활뉴스", icon: "📢", color: "bg-orange-100 text-orange-600" },
    { id: "education", label: "교육/도서관", icon: "🏫", color: "bg-purple-100 text-purple-600" },
];

// 더미 데이터
const lifeInfos = [
    {
        id: 1,
        category: "hospital",
        title: "365일 야간 진료 소아과 안내",
        tags: ["#야간진료", "#소아과", "#운정"],
        summary: "운정신도시 내 평일 야간 9시, 주말/공휴일 오후 6시까지 진료하는 소아과 목록입니다. 급한 아이들 진료 시 참고하세요.",
        phone: "031-940-0000",
        location: "파주시 운정동 일대",
        time: "평일 09:00 - 21:00",
        date: "2023.11.20",
    },
    {
        id: 2,
        category: "public",
        title: "운정3동 행정복지센터 주말 운영 안내",
        tags: ["#행정", "#무인발급기", "#운정동"],
        summary: "이번 주말 서버 점검으로 인해 무인민원발급기 사용이 일시 중단됩니다. 급한 서류는 미리 발급받으시기 바랍니다.",
        phone: "031-940-1234",
        location: "운정3동 행정복지센터",
        time: "이번 주 토/일 전일",
        date: "2023.11.22",
    },
    {
        id: 3,
        category: "traffic",
        title: "M7111 버스 노선 변경 안내",
        tags: ["#버스", "#광역버스", "#노선변경"],
        summary: "12월 1일부터 M7111 광역버스 노선이 일부 변경됩니다. 산내마을 정류장이 추가되어 출근길 편의가 개선될 예정입니다.",
        phone: "031-000-0000",
        location: "산내마을 정류장",
        time: "첫차 05:00 / 막차 23:30",
        date: "2023.11.23",
    },
    {
        id: 4,
        category: "news",
        title: "파주페이 인센티브 10% 상향",
        tags: ["#파주페이", "#지역화폐", "#혜택"],
        summary: "연말을 맞아 파주페이 충전 인센티브가 기존 6%에서 10%로 한시적 상향됩니다. 예산 소진 시 조기 종료될 수 있습니다.",
        phone: "1577-0000",
        location: "경기지역화폐 앱",
        time: "12.01 ~ 12.31",
        date: "2023.11.24",
    },
    {
        id: 5,
        category: "education",
        title: "한빛도서관 겨울방학 독서교실 모집",
        tags: ["#도서관", "#겨울방학", "#초등학생"],
        summary: "겨울방학을 맞이하여 초등학생 대상 독서교실 참여자를 모집합니다. 선착순 접수이며 재료비는 무료입니다.",
        phone: "031-940-5678",
        location: "한빛도서관 문화강좌실",
        time: "접수: 12.05 ~ 마감시",
        date: "2023.11.25",
    },
    {
        id: 6,
        category: "hospital",
        title: "주말/공휴일 지킴이 약국 리스트",
        tags: ["#약국", "#주말운영", "#금촌"],
        summary: "금촌 로터리 부근 주말 및 공휴일에도 문을 여는 약국 리스트입니다. 상비약 구매 시 확인하세요.",
        phone: "119 (안내)",
        location: "금촌동 일대",
        time: "약국별 상이",
        date: "2023.11.21",
    },
    {
        id: 7,
        category: "traffic",
        title: "운정역 공영주차장 확장 공사",
        tags: ["#주차장", "#공사안내", "#운정역"],
        summary: "운정역 환승주차장 확장을 위한 공사가 시작됩니다. 공사 기간 동안 일부 구역 주차가 제한되니 대중교통 이용을 권장합니다.",
        phone: "031-940-4321",
        location: "운정역 공영주차장",
        time: "공사기간: ~ 2024.03",
        date: "2023.11.26",
    },
];

export default function LifeInfoPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredInfos = lifeInfos.filter((info) => {
        const matchesCategory = selectedCategory === "all" || info.category === selectedCategory;
        const matchesSearch = info.title.includes(searchQuery) || info.tags.some(tag => tag.includes(searchQuery));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 헤더 */}
            <div className="bg-white px-6 pt-8 pb-6 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">파주 Life</h1>
                <p className="text-gray-600 text-sm">파주 시민을 위한 실생활 정보 허브</p>

                {/* 검색바 */}
                <div className="mt-6 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                        type="text"
                        placeholder="궁금한 생활 정보를 검색해보세요 (예: 야간 약국)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* 퀵 메뉴 (아이콘 그리드 - 중앙 정렬 & 사이즈 확대) */}
            <div className="bg-white px-4 pb-8 mb-4 border-b border-gray-100">
                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)}
                            className={`flex flex-col items-center p-4 rounded-2xl transition-all ${selectedCategory === cat.id ? "bg-blue-50 ring-4 ring-blue-100 transform scale-105" : "hover:bg-gray-50"
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3 ${cat.color} bg-opacity-20 shadow-sm`}>
                                {cat.icon}
                            </div>
                            <span className={`text-base font-bold text-center ${selectedCategory === cat.id ? "text-blue-700" : "text-gray-700"
                                }`}>
                                {cat.label.split("/")[0]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 정보 리스트 */}
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        {selectedCategory === "all" ? "최신 생활 정보" : categories.find(c => c.id === selectedCategory)?.label}
                    </h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">
                        전체보기
                    </button>
                </div>

                <div className="space-y-4">
                    {filteredInfos.length > 0 ? (
                        filteredInfos.map((info) => (
                            <div key={info.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-2 mb-2">
                                        {info.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">{info.date}</span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                    {info.title}
                                </h3>

                                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                                    {info.summary}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500 border-t border-gray-50 pt-3">
                                    <div className="flex items-center gap-1">
                                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                                        <span>{info.phone}</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-3 bg-gray-300"></div>
                                    <div className="flex items-center gap-1">
                                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                                        <span>{info.location}</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-3 bg-gray-300"></div>
                                    <div className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4 text-gray-400" />
                                        <span>{info.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>

            {/* 글쓰기 버튼 (플로팅) */}
            <button
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                onClick={() => alert("준비 중입니다")}
            >
                <PlusIcon className="w-6 h-6" />
            </button>
        </div>
    );
}
