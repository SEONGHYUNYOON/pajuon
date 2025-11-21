import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";

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

    // 이메일 중복 확인
    const { data: existingUserByEmail } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const { data: existingUserByNickname } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("nickname", nickname)
      .single();

    if (existingUserByNickname) {
      return NextResponse.json(
        { error: "이미 사용 중인 닉네임입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const { data: user, error } = await supabase
      .from("profiles")
      .insert({
        email,
        password: hashedPassword,
        nickname,
        my_dongne: area || null,
        school: schoolType && schoolName ? `${schoolType} ${schoolName}` : null,
        points: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "회원가입 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
