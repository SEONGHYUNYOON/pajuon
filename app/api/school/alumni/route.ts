import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 같은 학교 출신 회원 목록 조회
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

    // 같은 학교 출신 회원 조회
    const alumni = await prisma.user.findMany({
      where: {
        schoolOrigin: {
          has: schoolName,
        },
        id: {
          not: session.user.id, // 자신 제외
        },
      },
      select: {
        id: true,
        nickname: true,
        profileImage: true,
        rank: true,
        activityPoints: true,
      },
      orderBy: {
        activityPoints: "desc",
      },
    });

    return NextResponse.json({ alumni }, { status: 200 });
  } catch (error) {
    console.error("Alumni list error:", error);
    return NextResponse.json(
      { error: "동문 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

