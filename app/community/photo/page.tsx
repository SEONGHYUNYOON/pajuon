"use client";

import { useState } from "react";
import Link from "next/link";
import {
    PhotoIcon,
    PlusIcon,
    HeartIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const categories = ["전체", "90년대 파주", "옛날 학교", "반려동물", "일상"];

const albums = [
    {
        id: 1,
        title: "1990년대 파주 시내 모습",
        category: "90년대 파주",
        author: "추억러버",
        date: "3일 전",
        images: 5,
        likes: 234,
        comments: 45,
        thumbnail: "/album1.jpg",
    },
    {
        id: 2,
        title: "파주초등학교 졸업사진",
        category: "옛날 학교",
        author: "동문회",
        date: "5일 전",
        images: 3,
        likes: 189,
        comments: 32,
        thumbnail: "/album2.jpg",
    },
    {
        id: 3,
        title: "우리 강아지 일상",
        category: "반려동물",
        author: "강아지맘",
        date: "1주 전",
        images: 8,
        likes: 156,
        comments: 28,
        thumbnail: "/album3.jpg",
    },
    {
        id: 4,
        title: "1980년대 파주 거리 풍경",
        category: "90년대 파주",
        author: "추억수집가",
        date: "1주 전",
        images: 4,
        likes: 267,
        comments: 56,
        thumbnail: "/album4.jpg",
    },
    {
        id: 5,
        title: "문산중학교 체육대회 사진",
        category: "옛날 학교",
        author: "동문",
        date: "2주 전",
        images: 6,
        likes: 145,
        comments: 23,
        thumbnail: "/album5.jpg",
    },
    {
        id: 6,
        title: "파주 일상 브런치",
        category: "일상",
        author: "일상러버",
        date: "2주 전",
        images: 7,
        likes: 98,
        comments: 15,
        thumbnail: "/album6.jpg",
    },
    {
        id: 7,
        title: "헤이리 마을 가을 풍경",
        category: "일상",
        author: "사진작가",
        date: "3주 전",
        images: 12,
        likes: 342,
        comments: 41,
        thumbnail: "/album7.jpg",
    },
    {
        id: 8,
        title: "우리집 고양이 냥냥이",
        category: "반려동물",
        author: "냥집사",
        date: "3주 전",
        images: 5,
        likes: 112,
        comments: 19,
        thumbnail: "/album8.jpg",
    },
    {
        id: 9,
        title: "금촌시장 옛날 모습",
        category: "90년대 파주",
        author: "토박이",
        date: "1달 전",
        images: 3,
        likes: 178,
        comments: 34,
        thumbnail: "/album9.jpg",
    },
    {
        id: 10,
        title: "임진각 평화누리공원 나들이",
        category: "일상",
        author: "나들이",
        date: "1달 전",
        images: 9,
        likes: 221,
        comments: 25,
        thumbnail: "/album10.jpg",
    },
    {
        id: 11,
        title: "봉일천고등학교 축제",
        category: "옛날 학교",
        author: "졸업생",
        date: "1달 전",
        images: 15,
        likes: 289,
        comments: 56,
        thumbnail: "/album11.jpg",
    },
    {
        id: 12,
        title: "운정 호수공원 야경",
        category: "일상",
        author: "야경꾼",
        date: "2달 전",
        images: 6,
        likes: 198,
        comments: 22,
        thumbnail: "/album12.jpg",
    },
    {
        id: 13,
        title: "교하 도서관 책 읽는 오후",
        category: "일상",
        author: "북웜",
        date: "2달 전",
        images: 4,
        likes: 87,
        comments: 12,
        thumbnail: "/album13.jpg",
    },
    {
        id: 14,
        title: "반려견과 함께하는 산책",
        category: "반려동물",
        author: "멍멍이",
        date: "2달 전",
        images: 7,
        likes: 134,
        comments: 21,
        thumbnail: "/album14.jpg",
    },
    {
        id: 15,
        title: "90년대 금촌역 앞",
        category: "90년대 파주",
        author: "역장님",
        date: "3달 전",
        images: 2,
        likes: 312,
        comments: 67,
        thumbnail: "/album15.jpg",
    },
    {
        id: 16,
        title: "율곡고등학교 졸업식",
        category: "옛날 학교",
        author: "율곡인",
        date: "3달 전",
        images: 10,
        likes: 156,
        comments: 34,
        thumbnail: "/album16.jpg",
    },
    {
        id: 17,
        title: "파주 출판단지 가을",
        category: "일상",
        author: "가을남자",
        date: "3달 전",
        images: 8,
        likes: 245,
        comments: 45,
        thumbnail: "/album17.jpg",
    },
    {
        id: 18,
        title: "우리집 햄스터 찌찍이",
        category: "반려동물",
        author: "햄찌",
        date: "4달 전",
        images: 3,
        likes: 78,
        comments: 11,
        thumbnail: "/album18.jpg",
    },
    {
        id: 19,
        title: "옛날 문산 터미널",
        category: "90년대 파주",
        author: "버스기사",
        date: "4달 전",
        images: 4,
        likes: 199,
        comments: 38,
        thumbnail: "/album19.jpg",
    },
    {
        id: 20,
        title: "광탄고등학교 체육대회",
        category: "옛날 학교",
        author: "체육부장",
        date: "5달 전",
        images: 12,
        likes: 167,
        comments: 29,
        thumbnail: "/album20.jpg",
    },
];

export default function PhotoPage() {
    const [activeCategory, setActiveCategory] = useState("전체");
    const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null);

    const filteredAlbums =
        activeCategory === "전체"
            ? albums
            : albums.filter((album) => album.category === activeCategory);

    return (
        <div className="py-8">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <PhotoIcon className="w-10 h-10 text-purple-500" />
                                <h1 className="text-4xl font-bold text-gray-900 text-center">파주 사진전</h1>
                            </div>
                            <p className="text-lg text-gray-600 text-center">
                                파주의 아름다운 순간들을 공유하는 갤러리입니다
                            </p>
                        </div>
                        <Link
                            href="/community/write?category=photo"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            사진 올리기
                        </Link>
                    </div>
                </div>

                {/* 카테고리 필터 (중앙 정렬 & 사이즈 확대) */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full text-lg font-bold transition-all whitespace-nowrap ${activeCategory === category
                                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 앨범 갤러리 */}
                {!selectedAlbum && (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredAlbums.map((album) => (
                            <div
                                key={album.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 cursor-pointer group"
                                onClick={() => setSelectedAlbum(album)}
                            >
                                <div className="aspect-square bg-gradient-to-r from-purple-400 to-pink-400 relative">
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                                        📸 {album.images}
                                    </div>
                                    {/* 실제 이미지 대신 그라디언트 사용 중 */}
                                    <div className="w-full h-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                        <HeartIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm">
                                        {album.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{album.author}</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                <HeartIcon className="w-3 h-3 mr-0.5 text-pink-500" />
                                                {album.likes}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 앨범 상세 (선택 시) */}
                {selectedAlbum && (
                    <div>
                        <button
                            onClick={() => setSelectedAlbum(null)}
                            className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                        >
                            ← 목록으로
                        </button>
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedAlbum.title}</h2>
                            <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span>{selectedAlbum.author}</span>
                                    <span>•</span>
                                    <span>{selectedAlbum.date}</span>
                                </div>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {selectedAlbum.category}
                                </span>
                            </div>

                            {/* 사진 갤러리 */}
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                {Array.from({ length: selectedAlbum.images }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"
                                    >
                                        {/* 실제로는 이미지 표시 */}
                                    </div>
                                ))}
                            </div>

                            {/* 댓글 영역 */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                    댓글 {selectedAlbum.comments}개
                                </h3>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((comment) => (
                                        <div key={comment} className="border-b border-gray-100 pb-3">
                                            <div className="flex items-start space-x-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                                    {comment}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900 mb-0.5">user{comment}</div>
                                                    <p className="text-xs text-gray-600">
                                                        멋진 사진이네요!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
