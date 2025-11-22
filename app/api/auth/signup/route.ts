import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, nickname, area, schoolType, schoolName } = body;

    // 유효성 검사
    if (!email || !password || !nickname) {
      return NextResponse.json(
        { error: "이메일, 비밀번호, 닉네임은 필수입니다." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 닉네임 중복 확인 (profiles 테이블에서 확인)
    const { data: existingUserByNickname } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("nickname", nickname)
      .maybeSingle();

    if (existingUserByNickname) {
      return NextResponse.json(
        { error: "이미 사용 중인 닉네임입니다." },
        { status: 400 }
      );
    }

    // Supabase Auth로 사용자 생성
    // raw_user_meta_data에 추가 정보 저장 (트리거가 profiles 테이블에 자동 생성)
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          area: area || null,
          school_type: schoolType || null,
          school_name: schoolName || null,
        },
        emailRedirectTo: `${request.nextUrl.origin}/auth/verify-email`,
      },
    });

    if (signUpError) {
      console.error("Supabase signUp error:", signUpError);
      
      // 이메일 중복 에러 처리
      if (signUpError.message.includes("already registered") || signUpError.message.includes("already exists")) {
        return NextResponse.json(
          { error: "이미 사용 중인 이메일입니다." },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: signUpError.message || "회원가입 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "회원가입에 실패했습니다." },
        { status: 500 }
      );
    }

    // 트리거가 프로필을 생성하므로 약간 대기 후 프로필 확인
    await new Promise(resolve => setTimeout(resolve, 500));

    // 프로필 확인
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, nickname")
      .eq("id", authData.user.id)
      .maybeSingle();

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          nickname: profile?.nickname || nickname,
        },
        requiresEmailConfirmation: !authData.session, // 세션이 없으면 이메일 확인 필요
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
