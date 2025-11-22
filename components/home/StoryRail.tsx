"use client";

import { Plus } from "lucide-react";

// 더미 스토리 데이터 (10개)
const stories = [
  { id: 1, name: "임진각", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80" },
  { id: 2, name: "헤이리", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop&q=80" },
  { id: 3, name: "출판도시", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop&q=80" },
  { id: 4, name: "운정호수", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80" },
  { id: 5, name: "마장호수", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop&q=80" },
  { id: 6, name: "금촌동", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop&q=80" },
  { id: 7, name: "문산읍", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop&q=80" },
  { id: 8, name: "교하동", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&q=80" },
  { id: 9, name: "적성면", image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=200&h=200&fit=crop&q=80" },
  { id: 10, name: "탄현면", image: "https://images.unsplash.com/photo-1464822759844-d150ad90c88c?w=200&h=200&fit=crop&q=80" },
];

export default function StoryRail() {
  return (
    <section className="bg-white py-4 px-4 rounded-2xl shadow-sm mb-4">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* 내 스토리+ 버튼 */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-600 font-medium">내 스토리</span>
        </div>

        {/* 스토리 아이템들 */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              {/* 그라데이션 테두리 */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 font-medium truncate max-w-[60px] sm:max-w-[80px]">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

