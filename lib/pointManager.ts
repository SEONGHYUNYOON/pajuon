import { getCurrentRank, UserRank } from "./rankConfig";

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

  // Supabase를 사용하여 활동 점수 업데이트
  // TODO: Supabase 클라이언트를 사용하여 구현
  // const supabase = await createClient();
  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select("activity_points, citizen_rank")
  //   .eq("id", userId)
  //   .single();
  //
  // if (profile) {
  //   const newPoints = (profile.activity_points || 0) + points;
  //   const newRank = calculateRank(newPoints);
  //
  //   await supabase
  //     .from("profiles")
  //     .update({
  //       activity_points: newPoints,
  //       citizen_rank: newRank,
  //     })
  //     .eq("id", userId);
  // }
}

/**
 * 활동 점수를 직접 설정합니다 (관리자용 또는 특별 이벤트용).
 * @param userId 사용자 ID
 * @param points 설정할 활동 점수
 */
export async function setActivityPoints(userId: string, points: number): Promise<void> {
  const newRank = calculateRank(points);

  // Supabase를 사용하여 활동 점수 설정
  // TODO: Supabase 클라이언트를 사용하여 구현
  // const supabase = await createClient();
  // await supabase
  //   .from("profiles")
  //   .update({
  //     activity_points: points,
  //     citizen_rank: newRank,
  //   })
  //   .eq("id", userId);
}

/**
 * 활동 점수를 증가시킵니다 (grantPoints와 동일하지만 등급 업데이트 포함).
 * @param userId 사용자 ID
 * @param points 증가시킬 점수
 */
export async function incrementActivityPoints(userId: string, points: number): Promise<void> {
  // Supabase를 사용하여 활동 점수 증가
  // TODO: Supabase 클라이언트를 사용하여 구현
  // const supabase = await createClient();
  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select("activity_points, citizen_rank")
  //   .eq("id", userId)
  //   .single();
  //
  // if (profile) {
  //   const newPoints = (profile.activity_points || 0) + points;
  //   const newRank = calculateRank(newPoints);
  //
  //   await supabase
  //     .from("profiles")
  //     .update({
  //       activity_points: newPoints,
  //       citizen_rank: newRank,
  //     })
  //     .eq("id", userId);
  // }
}
