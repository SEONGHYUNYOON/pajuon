"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, HeartIcon, ChatBubbleLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
import { Plus } from "lucide-react";

const categories = [
  { id: "all", label: "전체", icon: "🗺️" },
  { id: "cafe", label: "카페/빵지순례", icon: "☕" },
  { id: "food", label: "로컬 찐맛집", icon: "🍜" },
  { id: "attraction", label: "명소/관광", icon: "🏞️" },
  { id: "kids_pet", label: "아이/펫", icon: "👨‍👩‍👧" },
  { id: "living", label: "생활정보", icon: "📢" },
];

interface Place {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
  isHot?: boolean;
}

const generatePlaces = (): Place[] => {
  const places: Place[] = [];
  const locations = ["야당동", "운정동", "헤이리", "출판단지", "문산읍", "탄현면"];

  const categoryData = {
    cafe: ["더티트렁크", "말똥도넛", "레드파이프", "앤드테라스", "버터킹콩빵공장"],
    food: ["심학산 도토리국수", "파주 닭국수", "장어 맛집", "매운탕 골목", "두부 마을"],
    attraction: ["임진각 평화누리", "마장호수 출렁다리", "감악산", "벽초지 수목원", "프로방스 마을"],
    kids_pet: ["퍼스트가든", "하니랜드", "운정 호수공원", "애견 운동장", "키즈 카페"],
    living: ["파주 보건소", "야간 약국", "도서관 이용 팁", "쓰레기 배출 안내", "버스 노선 변경"],
  };

  let idCounter = 1;

  Object.entries(categoryData).forEach(([catId, titles]) => {
    for (let i = 0; i < 5; i++) {
      const title = titles[i % titles.length];
      const isHot = Math.random() > 0.8;

      places.push({
        id: idCounter++,
        title: `${title} ${i + 1}`,
        category: catId,
        location: locations[Math.floor(Math.random() * locations.length)],
        image: `https://images.unsplash.com/photo-${[
          "1554118811-1e0d58224f24", // cafe
          "1555939594-58d7cb561ad1", // food
          "1476514525535-07fb3b4ae5f1", // nature
          "1519331379826-f10be5486c6f", // park
          "1577563908411-92169b1d332e", // info
        ][i % 5]}?auto=format&fit=crop&w=800&q=80`,
        tags: ["#주차가능", "#뷰맛집", "#데이트", "#가족과함께"].sort(() => 0.5 - Math.random()).slice(0, 2),
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 10,
        isHot: isHot,
      });
    }
  });

  return places.sort((a, b) => b.likes - a.likes);
};

const places = generatePlaces();

export default function TourismPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPlaces = selectedCategory === "all"
    ? places
    : places.filter(place => place.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">관광 & 정보</h1>
          <p className="text-gray-600 text-lg">파주의 핫플레이스와 생활 정보를 한눈에</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${selectedCategory === cat.id
                  ? "bg-gray-900 text-white shadow-md transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 매거진 스타일 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredPlaces.map((place) => (
            <Link
              key={place.id}
              href={`/tourism/${place.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* 썸네일 이미지 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {place.isHot && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                    HOT
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                  <div className="flex gap-2 mb-1">
                    {place.tags.map((tag, i) => (
                      <span key={i} className="text-xs text-white/90 font-medium bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 컨텐츠 */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {categories.find(c => c.id === place.category)?.label}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <MapPinIcon className="w-3 h-3 mr-1" />
                    {place.location}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {place.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center hover:text-red-500 transition-colors">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      {place.likes}
                    </div>
                    <div className="flex items-center hover:text-blue-500 transition-colors">
                      <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                      {place.comments}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900">
                    <span className="sr-only">공유하기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 플로팅 글쓰기 버튼 */}
        <Link
          href="/tourism/write"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full px-6 py-3.5 shadow-lg hover:bg-black active:scale-95 transition-all flex items-center gap-2 z-50"
          onClick={(e) => {
            e.preventDefault();
            alert("준비 중입니다");
          }}
        >
          <CameraIcon className="w-5 h-5" />
          <span className="font-semibold">정보 공유하기</span>
        </Link>
      </div>
    </div>
  );
}
