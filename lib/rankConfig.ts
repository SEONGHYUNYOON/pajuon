export type UserRank = "newbie" | "jang" | "dong" | "mayor" | "honor";

export interface RankConfig {
  level: number;
  name: string;
  requiredPoints: number;
  icon: string;
  color: string;
}

export const rankConfigs: Record<UserRank, RankConfig> = {
  newbie: {
    level: 2,
    name: "파주새댁",
    requiredPoints: 100,
    icon: "🌱",
    color: "gray",
  },
  jang: {
    level: 3,
    name: "이장",
    requiredPoints: 500,
    icon: "🏡",
    color: "green",
  },
  dong: {
    level: 4,
    name: "동장",
    requiredPoints: 1000,
    icon: "🏘️",
    color: "blue",
  },
  mayor: {
    level: 5,
    name: "파주시장",
    requiredPoints: 2000,
    icon: "🏛️",
    color: "orange",
  },
  honor: {
    level: 6,
    name: "명예시민",
    requiredPoints: 5000,
    icon: "⭐",
    color: "purple",
  },
};

// 기본 등급 (0점)
export const defaultRank: RankConfig = {
  level: 1,
  name: "파주새싹",
  requiredPoints: 0,
  icon: "🌿",
  color: "gray",
};

/**
 * 포인트에 따른 현재 등급 계산
 */
export function getCurrentRank(points: number): {
  rank: UserRank | "default";
  config: RankConfig;
} {
  // 역순으로 검사하여 가장 높은 등급 찾기
  const ranks: UserRank[] = ["honor", "mayor", "dong", "jang", "newbie"];
  
  for (const rank of ranks) {
    if (points >= rankConfigs[rank].requiredPoints) {
      return { rank, config: rankConfigs[rank] };
    }
  }
  
  return { rank: "default", config: defaultRank };
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
  
  if (rank === "honor") {
    return { nextRank: null, nextConfig: null, remainingPoints: 0 };
  }
  
  const ranks: UserRank[] = ["newbie", "jang", "dong", "mayor", "honor"];
  const currentIndex = ranks.indexOf(rank as UserRank);
  const nextRank = ranks[currentIndex + 1] as UserRank;
  const nextConfig = rankConfigs[nextRank];
  
  const remainingPoints = nextConfig.requiredPoints - points;
  
  return { nextRank, nextConfig, remainingPoints };
}
