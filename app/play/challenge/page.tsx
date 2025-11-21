"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrophyIcon,
  CameraIcon,
  FireIcon,
  StarIcon,
  PlusIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const currentChallenge = {
  id: 1,
  title: "파주 노을 사진 인증",
  description: "파주의 아름다운 노을을 사진으로 담아 인증해주세요. 가장 아름다운 노을 사진을 선정하여 포인트를 지급합니다.",
  period: "2024년 12월",
  reward: "1등: 10,000포인트, 2등: 5,000포인트, 3등: 3,000포인트",
  participants: 156,
  submissions: 89,
};

const rankings = [
  { rank: 1, nickname: "노을러버", points: 2450, submission: "운정호수 노을" },
  { rank: 2, nickname: "사진맨", points: 1890, submission: "마장호수 일몰" },
  { rank: 3, nickname: "일출러버", points: 1567, submission: "헤이리 노을" },
  { rank: 4, nickname: "파주사진가", points: 1234, submission: "문산 노을" },
  { rank: 5, nickname: "노을수집가", points: 987, submission: "교하 노을" },
];

const submissions = [
  {
    id: 1,
    author: "노을러버",
    image: "/challenge1.jpg",
    title: "운정호수 노을",
    likes: 234,
    points: 2450,
    date: "2일 전",
  },
  {
    id: 2,
    author: "사진맨",
    image: "/challenge2.jpg",
    title: "마장호수 일몰",
    likes: 189,
    points: 1890,
    date: "3일 전",
  },
  {
    id: 3,
    author: "일출러버",
    image: "/challenge3.jpg",
    title: "헤이리 노을",
    likes: 156,
    points: 1567,
    date: "4일 전",
  },
  {
    id: 4,
    author: "파주사진가",
    image: "/challenge4.jpg",
    title: "문산 노을",
    likes: 123,
    points: 1234,
    date: "5일 전",
  },
  {
    id: 5,
    author: "노을수집가",
    image: "/challenge5.jpg",
    title: "교하 노을",
    likes: 98,
    points: 987,
    date: "6일 전",
  },
];

export default function ChallengePage() {
  const [activeTab, setActiveTab] = useState<"info" | "submissions" | "ranking">("info");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <TrophyIcon className="w-10 h-10 text-yellow-500" />
                <h1 className="text-4xl font-bold text-gray-900">이달의 챌린지</h1>
              </div>
              <p className="text-lg text-gray-600">
                매월 운영자가 제시하는 미션에 참여하고 포인트를 받아보세요
              </p>
            </div>
            <Link
              href="/play/challenge/submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              인증하기
            </Link>
          </div>
        </div>

        {/* 현재 챌린지 카드 */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <FireIcon className="w-6 h-6" />
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {currentChallenge.period}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">{currentChallenge.title}</h2>
              <p className="text-lg text-white/90 mb-4">{currentChallenge.description}</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="font-semibold mb-2">🏆 보상</p>
                <p className="text-sm">{currentChallenge.reward}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="font-semibold">{currentChallenge.participants}명</span> 참여중
            </div>
            <div>
              <span className="font-semibold">{currentChallenge.submissions}개</span> 인증샷
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "info"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            챌린지 정보
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "submissions"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            인증샷 ({currentChallenge.submissions})
          </button>
          <button
            onClick={() => setActiveTab("ranking")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "ranking"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            랭킹
          </button>
        </div>

        {/* 콘텐츠 영역 */}
        {activeTab === "info" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">챌린지 상세 정보</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">참여 방법</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>파주의 아름다운 노을 사진을 촬영합니다</li>
                  <li>"인증하기" 버튼을 클릭하여 사진을 업로드합니다</li>
                  <li>사진 설명과 촬영 장소를 입력합니다</li>
                  <li>다른 참가자들의 사진에 좋아요와 댓글을 남깁니다</li>
                  <li>좋아요와 댓글이 많은 순서대로 포인트가 지급됩니다</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">유의사항</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>본인이 직접 촬영한 사진만 인증 가능합니다</li>
                  <li>타인의 사진 도용 시 참여 자격이 박탈됩니다</li>
                  <li>챌린지 기간 내에만 인증 가능합니다</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="h-64 bg-gradient-to-r from-orange-400 to-red-400 relative">
                  <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                    ⭐ {submission.points}P
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{submission.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>작성자: {submission.author}</span>
                    <span>{submission.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <HeartIcon className="w-4 h-4 mr-1 text-pink-500" />
                    {submission.likes}개 좋아요
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "ranking" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">참여자 랭킹 (포인트 기반)</h3>
            <div className="space-y-4">
              {rankings.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg border-2 ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center mr-4">
                    {index === 0 && <TrophyIcon className="w-8 h-8 text-yellow-500" />}
                    {index === 1 && <TrophyIcon className="w-8 h-8 text-gray-400" />}
                    {index === 2 && <TrophyIcon className="w-8 h-8 text-orange-600" />}
                    {index >= 3 && (
                      <span className="text-2xl font-bold text-gray-600">{user.rank}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{user.nickname}</div>
                    <div className="text-sm text-gray-600">{user.submission}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{user.points}P</div>
                    <div className="text-xs text-gray-500">포인트</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
