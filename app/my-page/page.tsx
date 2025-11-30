"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DocumentTextIcon, ChatBubbleLeftRightIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import UserRankBadge, { type UserRank } from "@/components/user/UserRankBadge";
import RankProgress from "@/components/user/RankProgress";
import { getCurrentRank } from "@/lib/rankConfig";

export default function MyPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    area: "",
    points: 750, // 임시 데이터 (실제로는 API에서 가져옴)
    avatar: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();

      // 1. 세션 확인
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setIsLoggedIn(true);

      // 2. 프로필 정보 가져오기
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserInfo({
          nickname: profile.nickname || user.email?.split("@")[0] || "사용자",
          email: user.email || "",
          area: profile.location || "",
          points: profile.activity_points || 0,
          avatar: "", // 프로필 이미지는 별도 스토리지 로직 필요 (일단 비워둠)
        });
      } else {
        // 프로필이 없는 경우 기본값
        setUserInfo({
          nickname: user.email?.split("@")[0] || "사용자",
          email: user.email || "",
          area: "",
          points: 0,
          avatar: "",
        });
      }
    };

    fetchUserData();
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  const { rank } = getCurrentRank(userInfo.points);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userInfo.nickname?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userInfo.nickname}</h1>
                <UserRankBadge rank={rank} />
              </div>
              <div className="text-gray-600 mb-1">{userInfo.email}</div>
              {userInfo.area && (
                <div className="text-sm text-gray-500">📍 {userInfo.area}</div>
              )}
            </div>
            <Link
              href="/my-page/settings"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              프로필 수정
            </Link>
          </div>

          {/* 등급 진행도 */}
          <RankProgress points={userInfo.points} />
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex border-b border-gray-200">
            <Link
              href="/my-page/activity"
              className="flex-1 px-6 py-4 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b-2 border-green-500 text-green-600"
            >
              내 활동
            </Link>
            <Link
              href="/my-page/settings"
              className="flex-1 px-6 py-4 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              내 정보 수정
            </Link>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/my-page/activity?tab=posts"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <DocumentTextIcon className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">내가 쓴 글</h3>
            <p className="text-sm text-gray-600">작성한 게시글을 확인하세요</p>
          </Link>
          <Link
            href="/my-page/activity?tab=comments"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">내가 쓴 댓글</h3>
            <p className="text-sm text-gray-600">작성한 댓글을 확인하세요</p>
          </Link>
          <Link
            href="/my-page/activity?tab=scraps"
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <BookmarkIcon className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">스크랩한 글</h3>
            <p className="text-sm text-gray-600">저장한 글을 확인하세요</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
