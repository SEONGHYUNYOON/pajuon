import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 동창 게시판 게시글 조회 (같은 학교 출신만)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
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

    // 현재 사용자가 해당 학교 출신인지 확인
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { schoolOrigin: true },
    });

    if (!user?.schoolOrigin.includes(schoolName)) {
      return NextResponse.json(
        { error: "해당 학교 동문만 접근할 수 있습니다." },
        { status: 403 }
      );
    }

    // 같은 학교 출신 회원들의 ID 목록
    const alumniIds = await prisma.user.findMany({
      where: {
        schoolOrigin: {
          has: schoolName,
        },
      },
      select: { id: true },
    });

    const alumniIdList = alumniIds.map((u) => u.id);

    // 동창 게시판 게시글 조회
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: alumniIdList,
        },
        category: "school-alumni", // 동창 게시판 카테고리
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
            rank: true,
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
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("School posts error:", error);
    return NextResponse.json(
      { error: "게시글을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

