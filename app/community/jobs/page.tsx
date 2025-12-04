"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseIcon, PlusIcon, UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

const tabs = ["구인", "구직"];

const jobOffers = [
    { id: 1, title: "운정 카페 주말 알바 구합니다", company: "운정커피", location: "운정동", pay: "시급 10,000원", date: "방금 전", views: 12 },
    { id: 2, title: "금촌 식당 홀서빙 직원 모집", company: "금촌식당", location: "금촌동", pay: "월 250만원", date: "1시간 전", views: 45 },
    { id: 3, title: "문산 물류센터 단기 알바", company: "문산물류", location: "문산읍", pay: "일급 120,000원", date: "2시간 전", views: 89 },
    { id: 4, title: "교하 학원 수학 강사님 모십니다", company: "교하수학", location: "교하동", pay: "협의", date: "3시간 전", views: 34 },
    { id: 5, title: "편의점 야간 스태프 구인", company: "GS25 파주점", location: "금촌동", pay: "시급 11,000원", date: "5시간 전", views: 67 },
    { id: 6, title: "배달 라이더 모집합니다", company: "파주배달", location: "전지역", pay: "건당 지급", date: "6시간 전", views: 112 },
    { id: 7, title: "헤이리 예술마을 갤러리 직원", company: "헤이리갤러리", location: "탄현면", pay: "월 230만원", date: "1일 전", views: 156 },
    { id: 8, title: "출판단지 북카페 매니저", company: "북카페", location: "문발동", pay: "월 260만원", date: "1일 전", views: 201 },
    { id: 9, title: "요양보호사 선생님 구합니다", company: "파주요양원", location: "조리읍", pay: "시급 12,000원", date: "2일 전", views: 78 },
    { id: 10, title: "영어유치원 보조교사 모집", company: "키즈잉글리쉬", location: "운정동", pay: "월 220만원", date: "2일 전", views: 95 },
    { id: 11, title: "LG디스플레이 협력사 생산직", company: "협력사", location: "월롱면", pay: "월 300만원", date: "3일 전", views: 340 },
    { id: 12, title: "롯데아울렛 매장 판매직", company: "의류매장", location: "문발동", pay: "월 240만원", date: "3일 전", views: 180 },
];

const jobSeekers = [
    { id: 1, title: "주말 카페 알바 구합니다", name: "김**", location: "운정동", experience: "경력 1년", date: "방금 전", views: 8 },
    { id: 2, title: "홀서빙 경력 있습니다", name: "이**", location: "금촌동", experience: "경력 3년", date: "30분 전", views: 23 },
    { id: 3, title: "단기 알바 찾습니다", name: "박**", location: "교하동", experience: "무관", date: "1시간 전", views: 45 },
    { id: 4, title: "운전직 일자리 구합니다", name: "최**", location: "문산읍", experience: "1종보통", date: "2시간 전", views: 67 },
    { id: 5, title: "사무보조 아르바이트 희망", name: "정**", location: "운정동", experience: "컴활1급", date: "4시간 전", views: 34 },
    { id: 6, title: "주방 보조 일자리 찾아요", name: "강**", location: "금촌동", experience: "경력 6개월", date: "5시간 전", views: 56 },
    { id: 7, title: "과외 학생 구합니다 (수학)", name: "조**", location: "교하동", experience: "대학생", date: "1일 전", views: 89 },
    { id: 8, title: "청소/가사 도우미 가능합니다", name: "윤**", location: "조리읍", experience: "경력 5년", date: "1일 전", views: 45 },
    { id: 9, title: "등하원 도우미 구직", name: "장**", location: "운정동", experience: "육아경력", date: "2일 전", views: 32 },
    { id: 10, title: "편의점 평일 오전 알바 희망", name: "임**", location: "문산읍", experience: "경력 2년", date: "2일 전", views: 78 },
    { id: 11, title: "건설 현장 일용직 찾습니다", name: "한**", location: "파주전역", experience: "이수증O", date: "3일 전", views: 120 },
    { id: 12, title: "반려동물 산책 알바 합니다", name: "오**", location: "운정동", experience: "반려인", date: "3일 전", views: 56 },
];

export default function JobsPage() {
    const [activeTab, setActiveTab] = useState("구인");

    const posts = activeTab === "구인" ? jobOffers : jobSeekers;

    return (
        <div className="py-8">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <BriefcaseIcon className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-gray-900 text-center">파주인</h1>
                            </div>
                            <p className="text-lg text-gray-600 text-center">
                                파주의 모든 일자리 정보를 한눈에 확인하세요
                            </p>
                        </div>
                        <Link
                            href="/community/jobs/write"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            글쓰기
                        </Link>
                    </div>
                </div>

                {/* 탭 */}
                <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 게시글 목록 */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {activeTab} 게시판
                            </h2>
                            <div className="text-sm text-gray-500">
                                총 {posts.length}개 글
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/community/jobs/${post.id}`}
                                className="block p-6 hover:bg-gray-50 transition-colors text-center"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="mb-2 w-full">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${activeTab === "구인" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                                }`}>
                                                {activeTab === "구인" ? post.location : post.location}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {activeTab === "구인" ? (post as any).company : (post as any).name}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 truncate px-4">{post.title}</h3>
                                    </div>

                                    <div className="flex items-center justify-center text-sm text-gray-600 mb-2 space-x-3">
                                        {activeTab === "구인" ? (
                                            <>
                                                <BuildingOfficeIcon className="w-4 h-4" />
                                                <span className="font-medium text-blue-600">{(post as any).pay}</span>
                                            </>
                                        ) : (
                                            <>
                                                <UserIcon className="w-4 h-4" />
                                                <span className="font-medium text-orange-600">{(post as any).experience}</span>
                                            </>
                                        )}
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>

                                    <div className="flex items-center justify-center text-sm text-gray-500">
                                        <span>조회 {post.views}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
