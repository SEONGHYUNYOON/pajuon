import { prisma } from "./prisma";
import { getCurrentRank } from "./rankConfig";
import { UserRank } from "@prisma/client";

export enum PointAction {
  CREATE_POST = 10,
  CREATE_COMMENT = 2,
  DAILY_LOGIN = 1,
}

/**
 * 활동 점수에 따라 등급을 계산합니다.
 * @param points 활동 점수
 * @returns UserRank
 */
function calculateRank(points: number): UserRank {
  const { rank } = getCurrentRank(points);
  return rank;
}

/**
 * 사용자에게 활동 점수를 지급하고 등급을 자동으로 업데이트합니다.
 * @param userId 사용자 ID
 * @param action 포인트 지급 액션
 */
export async function grantPoints(userId: string, action: PointAction): Promise<void> {
  const points = action;

  // 활동 점수 업데이트
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: {
        increment: points,
      },
      activityPoints: {
        increment: points,
      },
    },
  });

  // 새로운 등급 계산
  const newRank = calculateRank(updatedUser.activityPoints);

  // 등급이 변경된 경우에만 업데이트
  if (updatedUser.rank !== newRank) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        rank: newRank,
      },
    });
  }
}

/**
 * 활동 점수를 직접 설정합니다 (관리자용 또는 특별 이벤트용).
 * @param userId 사용자 ID
 * @param points 설정할 활동 점수
 */
export async function setActivityPoints(userId: string, points: number): Promise<void> {
  const newRank = calculateRank(points);

  await prisma.user.update({
    where: { id: userId },
    data: {
      activityPoints: points,
      rank: newRank,
    },
  });
}

/**
 * 활동 점수를 증가시킵니다 (grantPoints와 동일하지만 등급 업데이트 포함).
 * @param userId 사용자 ID
 * @param points 증가시킬 점수
 */
export async function incrementActivityPoints(userId: string, points: number): Promise<void> {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      activityPoints: {
        increment: points,
      },
    },
  });

  const newRank = calculateRank(updatedUser.activityPoints);

  if (updatedUser.rank !== newRank) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        rank: newRank,
      },
    });
  }
}
