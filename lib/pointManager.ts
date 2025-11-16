import { prisma } from "./prisma";

export enum PointAction {
  CREATE_POST = 10,
  CREATE_COMMENT = 2,
  DAILY_LOGIN = 1,
}

/**
 * 사용자에게 포인트를 지급합니다.
 * @param userId 사용자 ID
 * @param action 포인트 지급 액션
 */
export async function grantPoints(userId: string, action: PointAction): Promise<void> {
  const points = action;

  await prisma.user.update({
    where: { id: userId },
    data: {
      points: {
        increment: points,
      },
    },
  });
}
