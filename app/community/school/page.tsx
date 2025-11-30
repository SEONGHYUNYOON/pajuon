"use client";

import { useState } from "react";
import { GraduationCap, Search, Users, ChevronRight } from "lucide-react";

export default function SchoolPage() {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [year, setYear] = useState("");
    const [major, setMajor] = useState("");

    // 더미 데이터
    const schools = ["파주초등학교", "금촌초등학교", "문산초등학교", "봉일천초등학교"];
    const alumni = [
        { id: 1, name: "김철수", year: "2000년 졸업", status: "동창회장" },
        { id: 2, name: "이영희", year: "2000년 졸업", status: "총무" },
        { id: 3, name: "박민수", year: "2001년 졸업", status: "" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 헤더 */}
            <div className="bg-white px-4 py-6 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">아이러브스쿨</h1>
                </div>
                <p className="text-sm text-gray-500">그때 그 시절, 우리들의 추억 찾기</p>
            </div>

            <div className="p-4 space-y-6">
                {/* 학교 찾기/등록 */}
                {!selectedSchool ? (
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">나의 모교 찾기</h2>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="학교 이름을 검색하세요"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-gray-400 font-medium ml-1">추천 학교</p>
                                {schools.map((school) => (
                                    <button
                                        key={school}
                                        onClick={() => setSelectedSchool(school)}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors flex items-center justify-between group"
                                    >
                                        <span>{school}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* 선택된 학교 정보 */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-purple-200">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{selectedSchool}</h2>
                                    <p className="text-purple-100 text-sm">총 동문 1,234명</p>
                                </div>
                                <button
                                    onClick={() => setSelectedSchool(null)}
                                    className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                                >
                                    학교 변경
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                    <p className="text-xs text-purple-200 mb-1">나의 기수</p>
                                    <select
                                        className="w-full bg-transparent text-white font-bold border-none p-0 focus:ring-0 cursor-pointer"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        <option value="" className="text-gray-900">선택하세요</option>
                                        <option value="2000" className="text-gray-900">2000년 졸업</option>
                                        <option value="2001" className="text-gray-900">2001년 졸업</option>
                                    </select>
                                </div>
                                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                                    <p className="text-xs text-purple-200 mb-1">학과/반</p>
                                    <input
                                        type="text"
                                        placeholder="입력하세요"
                                        className="w-full bg-transparent text-white font-bold placeholder-purple-300/50 border-none p-0 focus:ring-0"
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 동창 목록 */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    우리 동창들
                                </h3>
                                <button className="text-xs text-purple-600 font-medium hover:underline">전체보기</button>
                            </div>

                            <div className="space-y-4">
                                {alumni.map((person) => (
                                    <div key={person.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                {person.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{person.name}</p>
                                                <p className="text-xs text-gray-500">{person.year}</p>
                                            </div>
                                        </div>
                                        {person.status && (
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
                                                {person.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
