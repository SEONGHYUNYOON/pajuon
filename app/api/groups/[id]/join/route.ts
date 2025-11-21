import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 모임 가입
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const groupId = params.id;

    // 이미 가입한 모임인지 확인
    const existingMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "이미 가입한 모임입니다." },
        { status: 400 }
      );
    }

    // 모임 가입
    const member = await prisma.groupMember.create({
      data: {
        groupId,
        userId: session.user.id,
        role: "MEMBER",
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
            rank: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "모임 가입이 완료되었습니다.", member },
      { status: 200 }
    );
  } catch (error) {
    console.error("Group join error:", error);
    return NextResponse.json(
      { error: "모임 가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 모임 탈퇴
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const groupId = params.id;

    // 모임 탈퇴
    await prisma.groupMember.delete({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    return NextResponse.json(
      { message: "모임 탈퇴가 완료되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Group leave error:", error);
    return NextResponse.json(
      { error: "모임 탈퇴 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

