"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NewspaperIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface ActivityPost {
  id: string;
  title: string;
  content: string;
  author: {
    nickname: string;
    profileImage?: string | null;
  };
  commentCount: number;
  viewCount: number;
  createdAt: string;
}

interface RecentActivityData {
  news: ActivityPost[];
  hiking: ActivityPost[];
  alumni: ActivityPost[];
}

export default function RecentActivity() {
  const [activityData, setActivityData] = useState<RecentActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  const loadRecentActivity = async () => {
    try {
      const response = await fetch("/api/home/recent-activity");
      const data = await response.json();
      setActivityData(data);
    } catch (error) {
      console.error("Failed to load recent activity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activityData) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 파주 뉴스 */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <NewspaperIcon className="w-6 h-6 text-paju-blue" />
            <h3 className="text-lg font-bold text-gray-900">파주 뉴스</h3>
          </div>
          <Link
            href="/news"
            className="text-sm text-paju-blue hover:text-paju-blue-dark font-medium"
          >
            더보기 →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {activityData.news.length > 0 ? (
            activityData.news.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.id}`}
                className="block p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author.nickname}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center">
                      <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDate(post.createdAt)}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              아직 게시글이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 등산 모임 */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-paju-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">등산 모임</h3>
          </div>
          <Link
            href="/community/hiking"
            className="text-sm text-paju-blue hover:text-paju-blue-dark font-medium"
          >
            더보기 →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {activityData.hiking.length > 0 ? (
            activityData.hiking.map((post) => (
              <Link
                key={post.id}
                href={`/community/hiking/${post.id}`}
                className="block p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author.nickname}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center">
                      <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDate(post.createdAt)}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              아직 게시글이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 활발한 동창회 */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="w-6 h-6 text-paju-warm" />
            <h3 className="text-lg font-bold text-gray-900">활발한 동창회</h3>
          </div>
          <Link
            href="/school"
            className="text-sm text-paju-blue hover:text-paju-blue-dark font-medium"
          >
            더보기 →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {activityData.alumni.length > 0 ? (
            activityData.alumni.map((post) => (
              <Link
                key={post.id}
                href={`/community/school-alumni/${post.id}`}
                className="block p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author.nickname}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center">
                      <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDate(post.createdAt)}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              아직 게시글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

