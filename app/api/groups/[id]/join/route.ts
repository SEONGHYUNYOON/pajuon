import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 모임 가입/탈퇴
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { id: groupId } = await params;

    // groups 테이블이 아직 Supabase에 없을 수 있으므로 임시로 에러 반환
    // TODO: Supabase에 groups 테이블 생성 후 구현
    return NextResponse.json(
      { error: "모임 기능은 준비 중입니다." },
      { status: 503 }
    );

    // 아래는 groups 테이블이 생성된 후 사용할 코드
    /*
    // 이미 가입한 모임인지 확인
    const { data: existingMember } = await supabase
      .from("group_members")
      .select("id")
      .eq("group_id", groupId)
      .eq("user_id", user.id)
      .single();

    if (existingMember) {
      return NextResponse.json(
        { error: "이미 가입한 모임입니다." },
        { status: 400 }
      );
    }

    // 모임 가입
    const { data: member, error } = await supabase
      .from("group_members")
      .insert({
        group_id: groupId,
        user_id: user.id,
        role: "MEMBER",
      })
      .select(`
        id,
        role,
        joined_at,
        user:profiles!group_members_user_id_fkey(id, nickname, profile_image, citizen_rank)
      `)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "모임 가입이 완료되었습니다.", member },
      { status: 200 }
    );
    */
  } catch (error) {
    console.error("Group join error:", error);
    return NextResponse.json(
      { error: "모임 가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 모임 탈퇴
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { id: groupId } = await params;

    // groups 테이블이 아직 Supabase에 없을 수 있으므로 임시로 에러 반환
    // TODO: Supabase에 groups 테이블 생성 후 구현
    return NextResponse.json(
      { error: "모임 기능은 준비 중입니다." },
      { status: 503 }
    );

    // 아래는 groups 테이블이 생성된 후 사용할 코드
    /*
    // 모임 탈퇴
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "모임 탈퇴가 완료되었습니다." },
      { status: 200 }
    );
    */
  } catch (error) {
    console.error("Group leave error:", error);
    return NextResponse.json(
      { error: "모임 탈퇴 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
