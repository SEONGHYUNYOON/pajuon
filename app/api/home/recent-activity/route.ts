import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 최근 활동 조회 (파주 뉴스, 등산 모임, 동창회)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // posts 테이블이 아직 Supabase에 없을 수 있으므로 임시로 빈 배열 반환
    // TODO: Supabase에 posts 테이블 생성 후 구현
    return NextResponse.json({
      news: [],
      hiking: [],
      alumni: [],
    }, { status: 200 });

    // 아래는 posts 테이블이 생성된 후 사용할 코드
    /*
    interface PostWithAuthor {
      id: string;
      title: string;
      content: string;
      viewCount: number;
      createdAt: string;
      author: {
        id: string;
        nickname: string;
        profileImage: string | null;
      };
      comments: { id: string }[];
    }

    // 파주 뉴스 최신 글
    const { data: newsPosts } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        content,
        view_count,
        created_at,
        author:profiles!posts_author_id_fkey(id, nickname, profile_image),
        comments(id)
      `)
      .eq("category", "news")
      .order("created_at", { ascending: false })
      .limit(3);

    // 등산 모임 최신 글
    const { data: hikingPosts } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        content,
        view_count,
        created_at,
        author:profiles!posts_author_id_fkey(id, nickname, profile_image),
        comments(id)
      `)
      .eq("category", "hiking")
      .order("created_at", { ascending: false })
      .limit(3);

    // 동창회 게시판 최신 글
    const { data: alumniPosts } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        content,
        view_count,
        created_at,
        author:profiles!posts_author_id_fkey(id, nickname, profile_image),
        comments(id)
      `)
      .eq("category", "school-alumni")
      .order("created_at", { ascending: false })
      .limit(3);

    const formatPost = (post: PostWithAuthor) => ({
      id: post.id,
      title: post.title,
      content: post.content.substring(0, 100) + "...",
      author: post.author,
      commentCount: post.comments?.length || 0,
      viewCount: post.viewCount,
      createdAt: post.createdAt,
    });

    return NextResponse.json({
      news: (newsPosts || []).map(formatPost),
      hiking: (hikingPosts || []).map(formatPost),
      alumni: (alumniPosts || []).map(formatPost),
    }, { status: 200 });
    */
  } catch (error) {
    console.error("Recent activity error:", error);
    return NextResponse.json(
      { error: "최근 활동을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
