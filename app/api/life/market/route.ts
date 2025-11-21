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
    const {
      type,
      title,
      price,
      description,
      location,
      images,
    } = body;

    // 유효성 검사
    if (!type || !title || !description) {
      return NextResponse.json(
        { error: "제목, 내용, 거래 유형은 필수입니다." },
        { status: 400 }
      );
    }

    // posts 테이블이 아직 Supabase에 없을 수 있으므로 임시로 에러 반환
    // TODO: Supabase에 posts 테이블 생성 후 구현
    return NextResponse.json(
      { error: "장터 기능은 준비 중입니다." },
      { status: 503 }
    );

    // 아래는 posts 테이블이 생성된 후 사용할 코드
    /*
    // Post 생성
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        title,
        content: description,
        category: "market",
        author_id: user.id,
        view_count: 0,
      })
      .select()
      .single();

    if (postError) {
      throw postError;
    }

    // MarketItem 생성
    const { error: marketError } = await supabase
      .from("market_items")
      .insert({
        post_id: post.id,
        price: type === "나눔합니다" ? 0 : price || 0,
        status: "FOR_SALE",
        location: location || null,
        images: images ? JSON.stringify(images) : null,
      });

    if (marketError) {
      throw marketError;
    }

    // 포인트 지급 (활동 점수 업데이트)
    const { error: pointsError } = await supabase.rpc("increment_activity_points", {
      user_id: user.id,
      points: 10, // 게시글 작성 포인트
    });

    return NextResponse.json(
      {
        message: "물품이 등록되었습니다.",
        post,
      },
      { status: 201 }
    );
    */
  } catch (error) {
    console.error("Market post creation error:", error);
    return NextResponse.json(
      { error: "물품 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const supabase = await createClient();

    // posts 테이블이 아직 Supabase에 없을 수 있으므로 임시로 빈 배열 반환
    // TODO: Supabase에 posts 테이블 생성 후 구현
    return NextResponse.json({
      posts: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
    });

    // 아래는 posts 테이블이 생성된 후 사용할 코드
    /*
    let query = supabase
      .from("posts")
      .select(`
        id,
        title,
        content,
        category,
        view_count,
        created_at,
        author:profiles!posts_author_id_fkey(id, nickname, profile_image),
        market_items(*)
      `)
      .eq("category", "market")
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    const { data: posts, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      posts: posts || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
    */
  } catch (error) {
    console.error("Market posts fetch error:", error);
    return NextResponse.json(
      { error: "물품 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
