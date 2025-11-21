import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentRank, getNextRank } from "@/lib/rankConfig";

// 사용자 대시보드 정보 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    // 프로필 정보 조회
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, nickname, activity_points, citizen_rank, profile_image")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const activityPoints = profile.activity_points || 0;
    const { rank, config: currentConfig } = getCurrentRank(activityPoints);
    const { nextRank, nextConfig, remainingPoints } = getNextRank(activityPoints);

    return NextResponse.json({
      user: {
        id: profile.id,
        nickname: profile.nickname,
        activityPoints: activityPoints,
        rank: profile.citizen_rank || "파주새댁",
        profileImage: profile.profile_image,
      },
      rankInfo: {
        current: {
          rank,
          config: currentConfig,
        },
        next: {
          rank: nextRank,
          config: nextConfig,
          remainingPoints,
        },
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "대시보드 정보를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
