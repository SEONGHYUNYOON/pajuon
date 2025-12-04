"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, PhotoIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function TourismWritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("cafe");

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="flex items-center mb-8">
                    <Link href="/tourism" className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">정보 공유하기</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    {/* 카테고리 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            <option value="cafe">카페/빵지순례</option>
                            <option value="food">로컬 찐맛집</option>
                            <option value="attraction">명소/관광</option>
                            <option value="kids_pet">아이/펫</option>
                            <option value="living">생활정보</option>
                        </select>
                    </div>

                    {/* 제목 입력 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력해주세요"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* 위치 태그 입력 (요청사항) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">위치 태그</label>
                        <div className="relative">
                            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="장소나 위치를 입력해주세요 (예: 운정호수공원)"
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">정확한 위치를 입력하면 지도에 표시됩니다.</p>
                    </div>

                    {/* 사진 첨부 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">사진 첨부</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                            <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">클릭하여 사진을 업로드하세요</p>
                        </div>
                    </div>

                    {/* 내용 입력 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="상세한 정보를 공유해주세요"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-48 resize-none"
                        />
                    </div>

                    {/* 등록 버튼 */}
                    <button
                        className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-black transition-colors shadow-lg"
                        onClick={() => alert("준비 중입니다")}
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}
