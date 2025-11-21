import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getCurrentRank, getNextRank } from "@/lib/rankConfig";

// 사용자 대시보드 정보 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        nickname: true,
        activityPoints: true,
        rank: true,
        profileImage: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { rank, config: currentConfig } = getCurrentRank(user.activityPoints);
    const { nextRank, nextConfig, remainingPoints } = getNextRank(user.activityPoints);

    return NextResponse.json({
      user: {
        id: user.id,
        nickname: user.nickname,
        activityPoints: user.activityPoints,
        rank: user.rank,
        profileImage: user.profileImage,
      },
      rankInfo: {
        current: {
          rank,
          config: currentConfig,
        },
        next: {
          rank: nextRank,
          config: nextConfig,
          remainingPoints,
        },
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "대시보드 정보를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

