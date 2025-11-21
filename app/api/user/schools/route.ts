import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 사용자의 등록된 학교 목록 조회
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

    // 프로필에서 학교 정보 조회
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("school_elementary, school_middle, school_high")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "프로필을 불러오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 학교 정보를 배열로 변환 (빈 값 제외)
    const schools: string[] = [];
    if (profile?.school_elementary) {
      schools.push(`초등학교 ${profile.school_elementary}`);
    }
    if (profile?.school_middle) {
      schools.push(`중학교 ${profile.school_middle}`);
    }
    if (profile?.school_high) {
      schools.push(`고등학교 ${profile.school_high}`);
    }

    return NextResponse.json(
      { schools },
      { status: 200 }
    );
  } catch (error) {
    console.error("User schools error:", error);
    return NextResponse.json(
      { error: "학교 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
