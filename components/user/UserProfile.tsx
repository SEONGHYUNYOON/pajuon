"use client";

import UserRankBadge, { UserRank } from "./UserRankBadge";

interface UserProfileProps {
  nickname: string;
  rank: UserRank;
  points: number;
  avatar?: string;
}

const rankThresholds: Record<UserRank, number> = {
  newbie: 0,
  jang: 100,
  dong: 500,
  mayor: 2000,
  honor: 5000,
};

export default function UserProfile({
  nickname,
  rank,
  points,
  avatar,
}: UserProfileProps) {
  const nextRank = Object.keys(rankThresholds).find(
    (r) => rankThresholds[r as UserRank] > points
  ) as UserRank | undefined;

  const nextRankPoints = nextRank ? rankThresholds[nextRank] : 0;
  const progress = nextRank
    ? ((points - rankThresholds[rank]) / (nextRankPoints - rankThresholds[rank])) * 100
    : 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {avatar || nickname.charAt(0)}
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{nickname}</h3>
            <UserRankBadge rank={rank} />
          </div>
          <div className="text-sm text-gray-600">
            활동 포인트: <span className="font-semibold text-green-600">{points}점</span>
          </div>
        </div>
      </div>

      {nextRank && (
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">다음 등급까지</span>
            <span className="font-medium text-gray-900">
              {nextRankPoints - points}점 필요
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
