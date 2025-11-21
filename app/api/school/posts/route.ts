import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 동창 게시판 게시글 조회 (같은 학교 출신만)
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

    // 현재 사용자의 프로필에서 학교 정보 확인
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("school_elementary, school_middle, school_high")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "프로필을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 학교명에서 타입 제거 (예: "초등학교 파주초등학교" -> "파주초등학교")
    const schoolNameOnly = schoolName.replace(/^(초등학교|중학교|고등학교)\s+/, "");

    // 현재 사용자가 해당 학교 출신인지 확인
    const isAlumni = 
      profile.school_elementary === schoolNameOnly ||
      profile.school_middle === schoolNameOnly ||
      profile.school_high === schoolNameOnly;

    if (!isAlumni) {
      return NextResponse.json(
        { error: "해당 학교 동문만 접근할 수 있습니다." },
        { status: 403 }
      );
    }

    // posts 테이블이 아직 Supabase에 없을 수 있으므로 임시로 빈 배열 반환
    // TODO: Supabase에 posts 테이블 생성 후 구현
    return NextResponse.json({ posts: [] }, { status: 200 });

    // 아래는 posts 테이블이 생성된 후 사용할 코드
    /*
    // 같은 학교 출신 회원들의 ID 목록
    const { data: alumni, error: alumniError } = await supabase
      .from("profiles")
      .select("id")
      .or(`school_elementary.eq.${schoolNameOnly},school_middle.eq.${schoolNameOnly},school_high.eq.${schoolNameOnly}`);

    if (alumniError) {
      throw alumniError;
    }

    const alumniIdList = alumni?.map((p) => p.id) || [];

    if (alumniIdList.length === 0) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    // 동창 게시판 게시글 조회
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        content,
        category,
        view_count,
        created_at,
        author:profiles!posts_author_id_fkey(id, nickname, profile_image, citizen_rank),
        comments(count)
      `)
      .in("author_id", alumniIdList)
      .eq("category", "school-alumni")
      .order("created_at", { ascending: false });

    if (postsError) {
      throw postsError;
    }

    const formattedPosts = posts?.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      viewCount: post.view_count,
      createdAt: post.created_at,
      author: post.author,
      commentCount: post.comments?.[0]?.count || 0,
    })) || [];

    return NextResponse.json({ posts: formattedPosts }, { status: 200 });
    */
  } catch (error) {
    console.error("School posts error:", error);
    return NextResponse.json(
      { error: "게시글을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
