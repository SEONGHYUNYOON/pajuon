import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 선남선녀 미팅 신청
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { eventId, age, gender, introduction } = body;

    if (!eventId || !age || !gender || !introduction) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 이벤트 확인
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || event.type !== "MATCHMAKING") {
      return NextResponse.json(
        { error: "미팅 이벤트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 이미 신청했는지 확인
    const existingParticipant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: session.user.id,
        },
      },
    });

    if (existingParticipant) {
      return NextResponse.json(
        { error: "이미 신청한 이벤트입니다." },
        { status: 400 }
      );
    }

    // 사용자 정보 업데이트 (선택적 - 추가 정보 저장용)
    // 실제로는 별도 테이블에 저장하는 것이 좋습니다
    const participant = await prisma.eventParticipant.create({
      data: {
        eventId,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "미팅 신청이 완료되었습니다. 관리자 승인 후 참가 가능합니다.",
        participant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Matchmaking apply error:", error);
    return NextResponse.json(
      { error: "신청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

