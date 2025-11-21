import { UserRank } from "@prisma/client";

// Prisma Enum과 호환되는 타입
export type UserRankType = UserRank;

export interface RankConfig {
  level: number;
  name: string;
  requiredPoints: number;
  icon: string;
  color: string;
}

// Prisma Enum 값과 매핑
export const rankConfigs: Record<UserRank, RankConfig> = {
  NEWBIE: {
    level: 1,
    name: "파주새댁",
    requiredPoints: 0, // 기본값 (0점 이상)
    icon: "🌱",
    color: "gray",
  },
  JANG: {
    level: 2,
    name: "이장",
    requiredPoints: 100, // 100점 이상
    icon: "🏡",
    color: "green",
  },
  DONG: {
    level: 3,
    name: "동장",
    requiredPoints: 500, // 500점 이상
    icon: "🏘️",
    color: "blue",
  },
  MAYOR: {
    level: 4,
    name: "시장",
    requiredPoints: 1000, // 1000점 이상
    icon: "🏛️",
    color: "orange",
  },
  HONOR: {
    level: 5,
    name: "명예 시민",
    requiredPoints: 2000, // 2000점 이상
    icon: "⭐",
    color: "purple",
  },
};

/**
 * 포인트에 따른 현재 등급 계산
 */
export function getCurrentRank(points: number): {
  rank: UserRank;
  config: RankConfig;
} {
  // 역순으로 검사하여 가장 높은 등급 찾기
  const ranks: UserRank[] = ["HONOR", "MAYOR", "DONG", "JANG", "NEWBIE"];
  
  for (const rank of ranks) {
    if (points >= rankConfigs[rank].requiredPoints) {
      return { rank, config: rankConfigs[rank] };
    }
  }
  
  // 기본값은 NEWBIE
  return { rank: "NEWBIE", config: rankConfigs.NEWBIE };
}

/**
 * 다음 등급까지 필요한 포인트 계산
 */
export function getNextRank(points: number): {
  nextRank: UserRank | null;
  nextConfig: RankConfig | null;
  remainingPoints: number;
} {
  const { rank, config: currentConfig } = getCurrentRank(points);
  
  if (rank === "HONOR") {
    return { nextRank: null, nextConfig: null, remainingPoints: 0 };
  }
  
  const ranks: UserRank[] = ["NEWBIE", "JANG", "DONG", "MAYOR", "HONOR"];
  const currentIndex = ranks.indexOf(rank);
  const nextRank = ranks[currentIndex + 1] as UserRank;
  const nextConfig = rankConfigs[nextRank];
  
  const remainingPoints = nextConfig.requiredPoints - points;
  
  return { nextRank, nextConfig, remainingPoints };
}
