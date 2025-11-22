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
];

export default function AlbumPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null);

  const filteredAlbums =
    activeCategory === "전체"
      ? albums
      : albums.filter((album) => album.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <PhotoIcon className="w-10 h-10 text-purple-500" />
                <h1 className="text-4xl font-bold text-gray-900 text-center">파주 추억앨범</h1>
              </div>
              <p className="text-lg text-gray-600 text-center">
                90년대 파주, 옛날 학교 사진 등 추억의 사진을 올리고 소통하는 공간입니다
              </p>
            </div>
            <Link
              href="/play/album/create"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              앨범 만들기
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

        {/* 앨범 갤러리 */}
        {!selectedAlbum && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="h-64 bg-gradient-to-r from-purple-400 to-pink-400 relative">
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-900">
                    📸 {album.images}장
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium">
                    {album.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {album.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>{album.author}</span>
                    <span>{album.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-3">
                    <div className="flex items-center">
                      <HeartIcon className="w-4 h-4 mr-1 text-pink-500" />
                      {album.likes}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1 text-blue-500" />
                      {album.comments}
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedAlbum.title}</h2>
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>작성자: {selectedAlbum.author}</span>
                  <span>{selectedAlbum.date}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {selectedAlbum.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <HeartIcon className="w-4 h-4 mr-1 text-pink-500" />
                    {selectedAlbum.likes}
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1 text-blue-500" />
                    {selectedAlbum.comments}
                  </div>
                </div>
              </div>

              {/* 사진 갤러리 */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
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
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  댓글 {selectedAlbum.comments}개
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((comment) => (
                    <div key={comment} className="border-b border-gray-100 pb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                          {comment}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">댓글 작성자 {comment}</div>
                          <p className="text-gray-600 mb-2">
                            정말 추억이 돋네요! 저도 비슷한 사진이 있는데 올려볼게요.
                          </p>
                          <div className="text-xs text-gray-500">{comment}시간 전</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="댓글을 작성하세요..."
                  />
                  <button className="mt-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
