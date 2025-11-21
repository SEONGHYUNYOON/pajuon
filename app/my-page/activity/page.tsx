"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentTextIcon, ChatBubbleLeftRightIcon, BookmarkIcon } from "@heroicons/react/24/outline";

function ActivityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) {
        router.push("/auth/login");
        return;
      }
      setIsLoggedIn(true);
    }

    const tab = searchParams.get("tab") || "posts";
    setActiveTab(tab);
  }, [router, searchParams]);

  // 임시 데이터 (실제로는 API에서 가져옴)
  const myPosts = [
    { id: 1, title: "파주 맛집 추천합니다", category: "맛집/카페", date: "2024-12-10", views: 123, comments: 5 },
    { id: 2, title: "운정동 주민 모임 공지", category: "동네별 소모임", date: "2024-12-09", views: 234, comments: 12 },
  ];

  const myComments = [
    { id: 1, postTitle: "파주 장터 물품 팝니다", content: "좋은 물건이네요!", date: "2024-12-10", postId: 1 },
    { id: 2, postTitle: "파주 일자리 공고", content: "지원하고 싶습니다", date: "2024-12-09", postId: 2 },
  ];

  const myScraps = [
    { id: 1, title: "파주 관광지 추천", category: "관광", date: "2024-12-08" },
    { id: 2, title: "파주 쿠폰 정보", category: "쿠폰", date: "2024-12-07" },
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/my-page"
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← 마이페이지로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">내 활동</h1>
        </div>

        {/* 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2 border border-gray-100">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === "posts"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>내가 쓴 글</span>
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === "comments"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>내가 쓴 댓글</span>
          </button>
          <button
            onClick={() => setActiveTab("scraps")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === "scraps"
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookmarkIcon className="w-5 h-5" />
            <span>스크랩한 글</span>
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {activeTab === "posts" && (
            <div className="divide-y divide-gray-200">
              {myPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{post.date}</span>
                        <span>조회 {post.views}</span>
                        <span>댓글 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {myPosts.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  작성한 글이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="divide-y divide-gray-200">
              {myComments.map((comment) => (
                <Link
                  key={comment.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">원글: </span>
                    <span className="text-sm font-medium text-gray-900">{comment.postTitle}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">{comment.date}</div>
                </Link>
              ))}
              {myComments.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  작성한 댓글이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "scraps" && (
            <div className="divide-y divide-gray-200">
              {myScraps.map((scrap) => (
                <Link
                  key={scrap.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          {scrap.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{scrap.title}</h3>
                      </div>
                      <div className="text-sm text-gray-500">{scrap.date}</div>
                    </div>
                  </div>
                </Link>
              ))}
              {myScraps.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  스크랩한 글이 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩 중...</div>}>
      <ActivityContent />
    </Suspense>
  );
}
