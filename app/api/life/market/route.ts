import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { grantPoints, PointAction } from "@/lib/pointManager";

export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
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

    // Post 생성
    const post = await prisma.post.create({
      data: {
        title,
        content: description,
        category: "market",
        authorId: session.user.id,
        viewCount: 0,
        marketItem: {
          create: {
            price: type === "나눔합니다" ? 0 : price || 0,
            status: type === "팝니다" ? "FOR_SALE" : type === "삽니다" ? "FOR_SALE" : "FOR_SALE",
            location: location || null,
            images: images ? JSON.stringify(images) : null,
          },
        },
      },
      include: {
        marketItem: true,
      },
    });

    // 포인트 지급
    await grantPoints(session.user.id, PointAction.CREATE_POST);

    return NextResponse.json(
      {
        message: "물품이 등록되었습니다.",
        post,
      },
      { status: 201 }
    );
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
    const skip = (page - 1) * limit;

    const where: any = {
      category: "market",
    };

    // 타입별 필터링 (실제로는 MarketItem의 status 또는 type 필드 사용)
    // 여기서는 간단하게 처리

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              nickname: true,
              profileImage: true,
            },
          },
          marketItem: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Market posts fetch error:", error);
    return NextResponse.json(
      { error: "물품 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
