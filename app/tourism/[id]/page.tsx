"use client";

import { MapPinIcon, HeartIcon, ShareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TourismDetailPage({ params }: { params: { id: string } }) {
    // 더미 데이터 (실제로는 API 호출)
    const place = {
        id: params.id,
        title: "임진각 평화누리공원",
        category: "명소/관광",
        location: "경기도 파주시 문산읍 마정리 618-13",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
        description: "넓은 잔디 언덕과 바람개비가 있는 평화로운 공원입니다. 가족 나들이나 데이트 코스로 인기가 많으며, 평화의 종과 다양한 조형물을 감상할 수 있습니다.",
        tags: ["#주차가능", "#뷰맛집", "#가족과함께", "#산책로"],
        likes: 1240,
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* 히어로 이미지 섹션 */}
            <div className="relative h-[40vh] md:h-[50vh] w-full">
                <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Link
                    href="/tourism"
                    className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="max-w-7xl mx-auto w-full">
                        <span className="px-2 py-1 bg-blue-600 text-xs font-bold rounded mb-2 inline-block">
                            {place.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{place.title}</h1>
                        <div className="flex items-center text-sm opacity-90">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {place.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 태그 & 액션 버튼 */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-8">
                    <div className="flex gap-2">
                        {place.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
                            <HeartIcon className="w-5 h-5 text-red-500" />
                            <span className="font-medium">{place.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
                            <ShareIcon className="w-5 h-5" />
                            <span className="font-medium">공유</span>
                        </button>
                    </div>
                </div>

                {/* 상세 설명 */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">상세 정보</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {place.description}
                    </p>
                </div>

                {/* 지도 (Placeholder) */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">위치 안내</h2>
                    <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                        <div className="text-center text-gray-400">
                            <MapPinIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>지도가 표시될 영역입니다</p>
                            <p className="text-sm mt-1">{place.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
