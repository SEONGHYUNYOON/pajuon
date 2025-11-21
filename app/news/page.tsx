"use client";

import { useState } from "react";
import Link from "next/link";
import { NewspaperIcon, MapPinIcon, FireIcon, StarIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/components/ui/PageHeader";
import TabButton from "@/components/ui/TabButton";
import Card from "@/components/ui/Card";

const tabs = [
  { id: "official", name: "파주 공식 뉴스", icon: NewspaperIcon },
  { id: "hotplaces", name: "우리동네 핫플", icon: FireIcon },
];

const officialNews = [
  {
    id: 1,
    title: "파주시, 2024년 지역경제 활성화 사업 추진",
    date: "2024-12-10",
    source: "파주시청 보도자료",
    summary: "파주시가 내년 지역경제 활성화를 위한 다양한 사업을 추진한다고 발표했습니다...",
  },
  {
    id: 2,
    title: "운정호수공원 문화행사 개최 안내",
    date: "2024-12-09",
    source: "파주시청 보도자료",
    summary: "운정호수공원에서 다채로운 문화행사가 개최됩니다...",
  },
  {
    id: 3,
    title: "파주시 공공시설 이용 안내",
    date: "2024-12-08",
    source: "파주시청 보도자료",
    summary: "파주시 주요 공공시설 이용 시간 및 방법 안내입니다...",
  },
];

const hotPlaces = [
  {
    id: 1,
    title: "헤이리 예술마을 카페거리",
    place: "헤이리 마을",
    author: "파주러버",
    date: "2024-12-10",
    likes: 156,
    images: 3,
    description: "헤이리 마을의 아름다운 카페거리를 소개합니다. 각양각색의 독특한 분위기의 카페들이 가득합니다...",
  },
  {
    id: 2,
    title: "출판도시 독서카페",
    place: "출판도시",
    author: "책좋아",
    date: "2024-12-09",
    likes: 128,
    images: 5,
    description: "조용하고 분위기 좋은 독서카페입니다. 책과 함께 즐거운 시간을 보낼 수 있어요...",
  },
  {
    id: 3,
    title: "마장호수 카페",
    place: "마장호수",
    author: "여행러버",
    date: "2024-12-08",
    likes: 89,
    images: 2,
    description: "마장호수를 바라보며 즐기는 커피는 최고입니다. 특히 일몰 시간대가 강력 추천!...",
  },
  {
    id: 4,
    title: "문산 맛집 골목",
    place: "문산",
    author: "먹방러버",
    date: "2024-12-07",
    likes: 142,
    images: 4,
    description: "문산역 근처에 숨겨진 맛집들을 발견했습니다. 정말 맛있어요!...",
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("official");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <PageHeader
          title="파주ON 소식"
          description="파주의 최신 소식과 핫플레이스를 만나보세요"
          icon={<NewspaperIcon className="w-8 h-8" />}
        />

        {/* 탭 */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.name}
                icon={<Icon className="w-5 h-5" />}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            );
          })}
        </div>

        {/* 콘텐츠 */}
        {activeTab === "official" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officialNews.map((news) => (
              <Card key={news.id} href={`/news/official/${news.id}`}>
                <div className="flex items-center text-xs text-paju-blue mb-3">
                  <NewspaperIcon className="w-4 h-4 mr-1" />
                  {news.source}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{news.summary}</p>
                <div className="text-xs text-gray-500">{news.date}</div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                파주의 맛집, 카페, 명소를 시민 여러분이 직접 소개해주세요
              </p>
              <Link
                href="/news/hotplaces/create"
                className="px-4 py-2 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors text-sm font-medium"
              >
                후기 작성하기
              </Link>
            </div>
            {/* 매거진 레이아웃 - 3열 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotPlaces.map((place) => (
                <Card
                  key={place.id}
                  href={`/news/hotplaces/${place.id}`}
                  padding="none"
                  className="overflow-hidden"
                >
                  {/* 이미지 */}
                  <div className="h-64 bg-gradient-to-br from-paju-green to-paju-warm relative overflow-hidden">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                      📸 {place.images}장
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-paju-warm text-white rounded-full text-sm font-medium">
                      ❤️ {place.likes}
                    </div>
                  </div>
                  {/* 카드 내용 */}
                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPinIcon className="w-4 h-4 mr-1 text-paju-blue" />
                      {place.place}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {place.title}
                    </h3>
                    {/* 별점 (더미) */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">4.5</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{place.author}</span>
                      <span>{place.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
