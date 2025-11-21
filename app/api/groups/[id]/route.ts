import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 모임 상세 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const groupId = params.id;

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        creator: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
            rank: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                profileImage: true,
                rank: true,
                activityPoints: true,
              },
            },
          },
          orderBy: {
            joinedAt: "desc",
          },
        },
        posts: {
          where: {
            category: {
              in: ["hiking", "riding", "goji-soccer"],
            },
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
          take: 10, // 최근 10개만
        },
        _count: {
          select: {
            members: true,
            posts: true,
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "모임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 현재 사용자가 가입한 모임인지 확인
    let isMember = false;
    let userRole = null;
    if (session?.user?.id) {
      const member = group.members.find((m) => m.userId === session.user.id);
      isMember = !!member;
      userRole = member?.role || null;
    }

    return NextResponse.json({
      group: {
        ...group,
        isMember,
        userRole,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Group detail error:", error);
    return NextResponse.json(
      { error: "모임 정보를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

