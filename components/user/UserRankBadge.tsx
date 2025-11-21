"use client";

import { UserRank } from "@/lib/rankConfig";

export type { UserRank };

interface UserRankBadgeProps {
  rank: UserRank;
  className?: string;
}

const rankConfig: Record<UserRank, { name: string; color: string; icon: string }> = {
  NEWBIE: {
    name: "파주새댁",
    color: "text-gray-600 bg-gray-100",
    icon: "🌱",
  },
  JANG: {
    name: "이장",
    color: "text-green-700 bg-green-100",
    icon: "🏡",
  },
  DONG: {
    name: "동장",
    color: "text-blue-700 bg-blue-100",
    icon: "🏘️",
  },
  MAYOR: {
    name: "시장",
    color: "text-orange-700 bg-orange-100",
    icon: "🏛️",
  },
  HONOR: {
    name: "명예 시민",
    color: "text-purple-700 bg-purple-100",
    icon: "⭐",
  },
};

export default function UserRankBadge({ rank, className = "" }: UserRankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.name}
    </span>
  );
}
