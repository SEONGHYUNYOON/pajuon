"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRightIcon, TrophyIcon } from "@heroicons/react/24/outline";
import UserRankBadge from "@/components/user/UserRankBadge";
import RankProgress from "@/components/user/RankProgress";

interface DashboardData {
  user: {
    id: string;
    nickname: string;
    activityPoints: number;
    rank: string;
    profileImage: string | null;
  };
  rankInfo: {
    current: {
      rank: string;
      config: {
        level: number;
        name: string;
        requiredPoints: number;
        icon: string;
        color: string;
      };
    };
    next: {
      rank: string | null;
      config: {
        level: number;
        name: string;
        requiredPoints: number;
        icon: string;
        color: string;
      } | null;
      remainingPoints: number;
    };
  };
}

export default function UserDashboardWidget() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      loadDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [session, status]);

  const loadDashboardData = async () => {
    try {
      const response = await fetch("/api/user/dashboard");
      const data = await response.json();
      if (data.user) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!session?.user || !dashboardData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-orange-50 to-green-50 rounded-xl shadow-lg p-6 border-2 border-green-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {dashboardData.user.nickname?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {dashboardData.user.nickname}님, 안녕하세요!
            </h3>
            <p className="text-sm text-gray-600">오늘도 파주와 함께해요</p>
          </div>
        </div>
        <Link
          href="/my-page"
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          aria-label="마이페이지로 이동"
        >
          <ArrowRightIcon className="w-5 h-5 text-gray-600" />
        </Link>
      </div>

      {/* 현재 등급 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">현재 등급</span>
          </div>
          <UserRankBadge rank={dashboardData.user.rank as any} />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {dashboardData.rankInfo.current.config.name}
        </div>
        <div className="text-sm text-gray-600">
          LV.{dashboardData.rankInfo.current.config.level}
        </div>
      </div>

      {/* 등급 진행도 */}
      <div className="mb-4">
        <RankProgress points={dashboardData.user.activityPoints} />
      </div>

      {/* 다음 등급까지 */}
      {dashboardData.rankInfo.next.rank && (
        <div className="bg-white/60 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">다음 등급까지</span>
            <span className="text-sm font-bold text-green-600">
              {dashboardData.rankInfo.next.remainingPoints.toLocaleString()} P
            </span>
          </div>
          <div className="text-xs text-gray-600">
            {dashboardData.rankInfo.next.config?.name}까지 남았어요!
          </div>
        </div>
      )}

      {!dashboardData.rankInfo.next.rank && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-sm font-medium text-yellow-800">
            🎉 최고 등급에 도달하셨습니다!
          </div>
        </div>
      )}
    </div>
  );
}

