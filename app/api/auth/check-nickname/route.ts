import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get("nickname");

    if (!nickname) {
      return NextResponse.json(
        { error: "닉네임을 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: existingUser, error } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("nickname", nickname)
      .single();

    return NextResponse.json({
      available: !existingUser,
    });
  } catch (error) {
    console.error("Nickname check error:", error);
    return NextResponse.json(
      { error: "닉네임 확인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
