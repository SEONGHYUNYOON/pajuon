"use client";

import { useState } from "react";
import Link from "next/link";
import { VideoCameraIcon, PlayIcon, PlusIcon, EyeIcon } from "@heroicons/react/24/outline";

const categories = ["전체", "VLOG", "맛집탐방", "행사후기", "관광지"];

const videos = [
  {
    id: 1,
    title: "파주 헤이리 마을 1일 VLOG",
    category: "VLOG",
    author: "파주러버",
    date: "2일 전",
    views: 1234,
    likes: 89,
    thumbnail: "/video1.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "파주 맛집 투어 - 헤이리 카페거리",
    category: "맛집탐방",
    author: "먹방러버",
    date: "3일 전",
    views: 2345,
    likes: 156,
    thumbnail: "/video2.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "파주 축제 현장 후기",
    category: "행사후기",
    author: "행사러버",
    date: "5일 전",
    views: 987,
    likes: 67,
    thumbnail: "/video3.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "DMZ 땅굴 관람 VLOG",
    category: "관광지",
    author: "여행러버",
    date: "1주 전",
    views: 1876,
    likes: 134,
    thumbnail: "/video4.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "파주 출판도시 책방 탐방",
    category: "VLOG",
    author: "독서러버",
    date: "1주 전",
    views: 1456,
    likes: 98,
    thumbnail: "/video5.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "마장호수 일출 명소",
    category: "관광지",
    author: "사진러버",
    date: "2주 전",
    views: 2134,
    likes: 178,
    thumbnail: "/video6.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function TVPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos =
    activeCategory === "전체"
      ? videos
      : videos.filter((video) => video.category === activeCategory);

  const sortedVideos = [...filteredVideos].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <VideoCameraIcon className="w-10 h-10 text-red-500" />
                <h1 className="text-4xl font-bold text-gray-900">파주ON TV</h1>
              </div>
              <p className="text-lg text-gray-600">
                파주 관련 영상 콘텐츠를 공유하는 공간입니다
              </p>
            </div>
            <Link
              href="/play/tv/upload"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              영상 등록
            </Link>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 인기 영상 */}
        {!selectedVideo && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">인기 영상</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedVideos.slice(0, 8).map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="h-48 bg-gradient-to-r from-green-400 to-orange-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayIcon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
                      {video.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>{video.author}</span>
                      <span>{video.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-3">
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {video.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <span>❤️ {video.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 영상 재생 (선택 시) */}
        {selectedVideo && (
          <div className="mb-8">
            <button
              onClick={() => setSelectedVideo(null)}
              className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
              ← 목록으로
            </button>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                {/* 실제로는 YouTube 임베드 사용 */}
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>작성자: {selectedVideo.author}</span>
                  <span>{selectedVideo.date}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {selectedVideo.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    {selectedVideo.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <span>❤️ {selectedVideo.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
