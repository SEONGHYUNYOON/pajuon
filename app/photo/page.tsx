"use client";

import { useState } from "react";
import { Heart, X, Camera } from "lucide-react";
import Link from "next/link";

// 이미지 다양화를 위한 고정된 이미지 ID 배열 (감성적인 사진들)
const PHOTO_IDS = [
  "photo-1506905925346-21bda4d32df4", // 자연
  "photo-1519681393784-d120267933ba", // 산
  "photo-1469474968028-56623f02e42e", // 자연
  "photo-1470071459604-3b5ec3a7fe05", // 산
  "photo-1441974231531-c6227db76b6e", // 풍경
  "photo-1506443432602-ac2fcd6f54e0", // 숲
  "photo-1464822759844-d150ad90c88c", // 해변
  "photo-1511632765486-a01980e01a18", // 도시
  "photo-1509042239860-f550ce710b93", // 책
  "photo-1544531586-fde5298cdd40", // 행사
  "photo-1551632811-561732d1e306", // 등산
  "photo-1559339352-11d035aa65de", // 커피
  "photo-1481627834876-b7833e8f5570", // 독서
  "photo-1431324155629-1a6deb1dec8d", // 운동
  "photo-1488646953014-85cb44e25828", // 자전거
  "photo-1478131143081-80f7f84ca84d", // 캠핑
  "photo-1544947950-fa07a98d237f", // 카메라
  "photo-1526170375885-4d8ecf77b99f", // 일몰
  "photo-1512924577693-90b8b05c0c63", // 풍경
  "photo-1476514525535-07fb3b4ae5f1", // 자연
  "photo-1469474968028-56623f02e42e", // 자연
  "photo-1470071459604-3b5ec3a7fe05", // 산
  "photo-1441974231531-c6227db76b6e", // 풍경
  "photo-1506443432602-ac2fcd6f54e0", // 숲
];

// 더미 사진 데이터 (30개)
const photos = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  image: `https://images.unsplash.com/${PHOTO_IDS[i % PHOTO_IDS.length]}?w=800&h=${600 + (i % 3) * 200}&fit=crop&q=80`,
  likes: Math.floor(Math.random() * 500) + 10,
  author: `파주시민${i + 1}`,
  location: ["임진각", "헤이리", "출판도시", "운정호수", "마장호수", "금촌동", "문산읍", "교하동"][i % 8],
}));

export default function PhotoPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedPhotoData = selectedPhoto ? photos.find((p) => p.id === selectedPhoto) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">📸</span>
            파주 사진전
          </h1>
          <Link
            href="/photo/upload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
          >
            <Camera className="w-5 h-5" />
            <span className="hidden sm:inline">사진 올리기</span>
          </Link>
        </div>
      </div>

      {/* 갤러리 - Masonry Layout (3열 그리드) */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-1">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer aspect-square overflow-hidden"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <img
                src={photo.image}
                alt={`${photo.location} 사진`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              
              {/* 호버 시 오버레이 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white">
                  <Heart
                    className={`w-6 h-6 ${
                      likedPhotos.has(photo.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                    onClick={(e) => toggleLike(photo.id, e)}
                  />
                  <span className="font-semibold">
                    {likedPhotos.has(photo.id) ? photo.likes + 1 : photo.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 (사진 크게 보기) */}
      {selectedPhotoData && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhotoData.image}
                alt={`${selectedPhotoData.location} 사진`}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              
              {/* 사진 정보 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-semibold text-lg">{selectedPhotoData.author}</p>
                    <p className="text-sm text-gray-300">{selectedPhotoData.location}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedPhotoData.id, e);
                    }}
                    className="flex items-center gap-2 hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-7 h-7 ${
                        likedPhotos.has(selectedPhotoData.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                    <span className="font-semibold text-lg">
                      {likedPhotos.has(selectedPhotoData.id)
                        ? selectedPhotoData.likes + 1
                        : selectedPhotoData.likes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

