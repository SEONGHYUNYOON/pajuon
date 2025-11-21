import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 모임 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // HIKING, RIDING, SOCCER 등

    const supabase = await createClient();

    // groups 테이블이 아직 Supabase에 없을 수 있으므로 임시로 빈 배열 반환
    // TODO: Supabase에 groups 테이블 생성 후 구현
    return NextResponse.json({ groups: [] }, { status: 200 });

    // 아래는 groups 테이블이 생성된 후 사용할 코드
    /*
    let query = supabase
      .from("groups")
      .select(`
        id,
        name,
        description,
        type,
        cover_image,
        created_at,
        creator:profiles!groups_creator_id_fkey(id, nickname, profile_image),
        group_members(count),
        posts(count)
      `)
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }

    const { data: groups, error } = await query;

    if (error) {
      throw error;
    }

    const groupsWithCounts = groups?.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      type: group.type,
      coverImage: group.cover_image,
      creator: group.creator,
      memberCount: group.group_members?.[0]?.count || 0,
      postCount: group.posts?.[0]?.count || 0,
      createdAt: group.created_at,
    })) || [];

    return NextResponse.json({ groups: groupsWithCounts }, { status: 200 });
    */
  } catch (error) {
    console.error("Groups list error:", error);
    return NextResponse.json(
      { error: "모임 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 모임 생성
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
    const { name, description, type, coverImage } = body;

    if (!name || !description || !type) {
      return NextResponse.json(
        { error: "모임명, 설명, 유형은 필수입니다." },
        { status: 400 }
      );
    }

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
      .insert({
        name,
        description,
        type,
        cover_image: coverImage || null,
        creator_id: user.id,
      })
      .select(`
        id,
        name,
        description,
        type,
        cover_image,
        created_at,
        creator:profiles!groups_creator_id_fkey(id, nickname, profile_image)
      `)
      .single();

    if (error) {
      throw error;
    }

    // 모임 생성자 자동 가입 (ADMIN 역할)
    await supabase.from("group_members").insert({
      group_id: group.id,
      user_id: user.id,
      role: "ADMIN",
    });

    return NextResponse.json({ group }, { status: 201 });
    */
  } catch (error) {
    console.error("Group creation error:", error);
    return NextResponse.json(
      { error: "모임 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
