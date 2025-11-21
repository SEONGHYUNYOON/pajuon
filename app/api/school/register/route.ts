import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { schoolType, schoolName } = body;

    if (!schoolType || !schoolName) {
      return NextResponse.json(
        { error: "학교 구분과 학교명은 필수입니다." },
        { status: 400 }
      );
    }

    // 현재 프로필 조회
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("school_elementary, school_middle, school_high")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "프로필을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 이미 등록된 학교인지 확인
    if (schoolType === "초등학교" && profile.school_elementary === schoolName) {
      return NextResponse.json(
        { error: "이미 등록된 학교입니다." },
        { status: 400 }
      );
    }
    if (schoolType === "중학교" && profile.school_middle === schoolName) {
      return NextResponse.json(
        { error: "이미 등록된 학교입니다." },
        { status: 400 }
      );
    }
    if (schoolType === "고등학교" && profile.school_high === schoolName) {
      return NextResponse.json(
        { error: "이미 등록된 학교입니다." },
        { status: 400 }
      );
    }

    // 학교 정보 업데이트
    const updateData: {
      school_elementary?: string;
      school_middle?: string;
      school_high?: string;
    } = {};

    if (schoolType === "초등학교") {
      updateData.school_elementary = schoolName;
    } else if (schoolType === "중학교") {
      updateData.school_middle = schoolName;
    } else if (schoolType === "고등학교") {
      updateData.school_high = schoolName;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(
      {
        message: "학교 등록이 완료되었습니다.",
        school: {
          name: schoolName,
          type: schoolType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("School registration error:", error);
    return NextResponse.json(
      { error: "학교 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
