import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 모임 상세 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { id: groupId } = await params;

    // groups 테이블이 아직 Supabase에 없을 수 있으므로 임시로 에러 반환
    // TODO: Supabase에 groups 테이블 생성 후 구현
    return NextResponse.json(
      { error: "모임 기능은 준비 중입니다." },
      { status: 503 }
    );

    // 아래는 groups 테이블이 생성된 후 사용할 코드
    /*
    const { data: group, error } = await supabase
      .from("groups")
      .select(`
        id,
        name,
        description,
        type,
        cover_image,
        created_at,
        creator:profiles!groups_creator_id_fkey(id, nickname, profile_image, citizen_rank),
        group_members(
          id,
          role,
          joined_at,
          user:profiles!group_members_user_id_fkey(id, nickname, profile_image, citizen_rank, activity_points)
        ),
        posts(
          id,
          title,
          content,
          category,
          view_count,
          created_at,
          author:profiles!posts_author_id_fkey(id, nickname, profile_image),
          comments(count)
        )
      `)
      .eq("id", groupId)
      .single();

    if (error || !group) {
      return NextResponse.json(
        { error: "모임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 현재 사용자가 가입한 모임인지 확인
    let isMember = false;
    let userRole = null;
    if (user) {
      const member = group.group_members?.find((m: any) => m.user?.id === user.id);
      isMember = !!member;
      userRole = member?.role || null;
    }

    return NextResponse.json({
      group: {
        ...group,
        isMember,
        userRole,
      },
    }, { status: 200 });
    */
  } catch (error) {
    console.error("Group detail error:", error);
    return NextResponse.json(
      { error: "모임 정보를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
