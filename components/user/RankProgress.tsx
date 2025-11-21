"use client";

import { getCurrentRank, getNextRank, rankConfigs } from "@/lib/rankConfig";
import { UserRank } from "@prisma/client";

interface RankProgressProps {
  points: number;
}

export default function RankProgress({ points }: RankProgressProps) {
  const { rank, config: currentConfig } = getCurrentRank(points);
  const { nextRank, nextConfig, remainingPoints } = getNextRank(points);

  const effectiveConfig = rankConfigs[rank];

  const progressPercentage = nextConfig
    ? ((points - effectiveConfig.requiredPoints) /
        (nextConfig.requiredPoints - effectiveConfig.requiredPoints)) *
      100
    : 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{effectiveConfig.icon}</div>
          <div>
            <div className="text-sm text-gray-600">현재 등급</div>
            <div className="text-xl font-bold text-gray-900">
              LV.{effectiveConfig.level} {effectiveConfig.name}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">활동 포인트</div>
          <div className="text-xl font-bold text-green-600">{points.toLocaleString()} P</div>
        </div>
      </div>

      {nextConfig && (
        <>
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">
                다음 등급({nextConfig.name})까지
              </span>
              <span className="font-medium text-gray-900">
                {remainingPoints > 0 ? `${remainingPoints.toLocaleString()} P` : "완료"}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all ${
                effectiveConfig.color === "green"
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : effectiveConfig.color === "blue"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                  : effectiveConfig.color === "orange"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600"
                  : effectiveConfig.color === "purple"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {effectiveConfig.requiredPoints.toLocaleString()} P (현재)
            </span>
            <span>
              {nextConfig.requiredPoints.toLocaleString()} P (목표)
            </span>
          </div>
        </>
      )}

      {!nextConfig && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-yellow-800 font-medium">
            🎉 최고 등급에 도달하셨습니다!
          </div>
        </div>
      )}
    </div>
  );
}
