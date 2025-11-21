import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 사용자의 등록된 학교 목록 조회
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
      select: { schoolOrigin: true },
    });

    return NextResponse.json(
      { schools: user?.schoolOrigin || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("User schools error:", error);
    return NextResponse.json(
      { error: "학교 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

