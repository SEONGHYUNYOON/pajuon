import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 최근 활동 조회 (파주 뉴스, 등산 모임, 동창회)
export async function GET(request: NextRequest) {
  try {
    // 파주 뉴스 최신 글
    const newsPosts = await prisma.post.findMany({
      where: {
        category: "news",
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    // 등산 모임 최신 글
    const hikingPosts = await prisma.post.findMany({
      where: {
        category: "hiking",
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    // 동창회 게시판 최신 글 (school-alumni 카테고리)
    const alumniPosts = await prisma.post.findMany({
      where: {
        category: "school-alumni",
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json({
      news: newsPosts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content.substring(0, 100) + "...",
        author: post.author,
        commentCount: post.comments.length,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      })),
      hiking: hikingPosts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content.substring(0, 100) + "...",
        author: post.author,
        commentCount: post.comments.length,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      })),
      alumni: alumniPosts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content.substring(0, 100) + "...",
        author: post.author,
        commentCount: post.comments.length,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      })),
    }, { status: 200 });
  } catch (error) {
    console.error("Recent activity error:", error);
    return NextResponse.json(
      { error: "최근 활동을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

