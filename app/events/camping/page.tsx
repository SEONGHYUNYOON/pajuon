"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  FireIcon,
  PlusIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

interface CampingPost {
  id: string;
  title: string;
  content: string;
  location: string;
  startDate: string;
  endDate?: string;
  maxParticipants: number;
  currentParticipants: number;
  author: {
    nickname: string;
    profileImage?: string;
  };
  images?: string[];
  createdAt: string;
}

export default function CampingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<CampingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCampingPosts();
  }, []);

  const loadCampingPosts = async () => {
    setIsLoading(true);
    try {
      // 실제로는 API 호출
      // const response = await fetch("/api/events/camping/posts");
      // const data = await response.json();
      // setPosts(data.posts);
      
      // 더미 데이터
      setPosts([
        {
          id: "1",
          title: "파주 마장호수 캠핑 모임",
          content: "이번 주말 마장호수에서 캠핑을 즐겨요! 가족 단위로 참여 가능하며, 바베큐와 캠프파이어를 준비했습니다.",
          location: "마장호수 캠핑장",
          startDate: "2024-12-20",
          endDate: "2024-12-21",
          maxParticipants: 20,
          currentParticipants: 12,
          author: { nickname: "캠핑러버" },
          createdAt: "2024-12-10",
        },
        {
          id: "2",
          title: "운정호수공원 야외 캠핑",
          content: "운정호수공원에서 즐기는 야외 캠핑 모임입니다. 텐트와 장비는 개인 준비입니다.",
          location: "운정호수공원",
          startDate: "2024-12-25",
          maxParticipants: 15,
          currentParticipants: 8,
          author: { nickname: "야외파" },
          createdAt: "2024-12-11",
        },
      ]);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <FireIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">함께 캠핑하기</h1>
          <p className="text-lg text-gray-600">
            파주에서 즐기는 캠핑 모임에 참여해보세요. 새로운 인연과 추억을 만들어요!
          </p>
        </div>

        {/* 글쓰기 버튼 */}
        {session?.user && (
          <div className="mb-6 flex justify-end">
            <Link
              href="/events/camping/write"
              className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              캠핑 모집 글쓰기
            </Link>
          </div>
        )}

        {/* 캠핑 모집 게시판 */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">로딩 중...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/events/camping/${post.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                {/* 이미지 영역 */}
                <div className="h-48 bg-gradient-to-br from-orange-400 via-orange-500 to-green-500 relative">
                  {post.images && post.images.length > 0 ? (
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CameraIcon className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                    캠핑 모집
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-medium">
                    {post.currentParticipants}/{post.maxParticipants}명
                  </div>
                </div>

                {/* 내용 영역 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2 text-orange-500" />
                      {post.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-green-500" />
                      {post.startDate}
                      {post.endDate && ` ~ ${post.endDate}`}
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-2 text-blue-500" />
                      {post.currentParticipants}명 참여 중
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(post.currentParticipants / post.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>작성자: {post.author.nickname}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <FireIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">아직 캠핑 모집 글이 없습니다.</p>
            {session?.user && (
              <Link
                href="/events/camping/write"
                className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                첫 번째 캠핑 모집 글쓰기
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

