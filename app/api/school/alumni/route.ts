import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 같은 학교 출신 회원 목록 조회
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

    const { searchParams } = new URL(request.url);
    const schoolName = searchParams.get("school");

    if (!schoolName) {
      return NextResponse.json(
        { error: "학교명이 필요합니다." },
        { status: 400 }
      );
    }

    // 학교명에서 타입 제거 (예: "초등학교 파주초등학교" -> "파주초등학교")
    const schoolNameOnly = schoolName.replace(/^(초등학교|중학교|고등학교)\s+/, "");

    // 같은 학교 출신 회원 조회
    const { data: alumni, error: alumniError } = await supabase
      .from("profiles")
      .select("id, nickname, profile_image, citizen_rank, activity_points")
      .or(`school_elementary.eq.${schoolNameOnly},school_middle.eq.${schoolNameOnly},school_high.eq.${schoolNameOnly}`)
      .neq("id", user.id) // 자신 제외
      .order("activity_points", { ascending: false });

    if (alumniError) {
      throw alumniError;
    }

    interface AlumniProfile {
      id: string;
      nickname: string;
      profile_image: string | null;
      citizen_rank: string | null;
      activity_points: number | null;
    }

    const formattedAlumni = (alumni || []).map((alumnus: AlumniProfile) => ({
      id: alumnus.id,
      nickname: alumnus.nickname,
      profileImage: alumnus.profile_image,
      rank: alumnus.citizen_rank || "파주새댁",
      activityPoints: alumnus.activity_points || 0,
    }));

    return NextResponse.json({ alumni: formattedAlumni }, { status: 200 });
  } catch (error) {
    console.error("Alumni list error:", error);
    return NextResponse.json(
      { error: "동문 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
