import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 모임 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // HIKING, RIDING, SOCCER 등

    const groups = await prisma.group.findMany({
      where: type ? { type: type as any } : undefined,
      include: {
        creator: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            posts: true,
            members: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const groupsWithCounts = groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      type: group.type,
      coverImage: group.coverImage,
      creator: group.creator,
      memberCount: group._count.members,
      postCount: group._count.posts,
      createdAt: group.createdAt,
    }));

    return NextResponse.json({ groups: groupsWithCounts }, { status: 200 });
  } catch (error) {
    console.error("Groups list error:", error);
    return NextResponse.json(
      { error: "모임 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 모임 생성
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
    const { name, description, type, coverImage } = body;

    if (!name || !description || !type) {
      return NextResponse.json(
        { error: "모임명, 설명, 유형은 필수입니다." },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name,
        description,
        type: type as any,
        coverImage: coverImage || null,
        creatorId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "ADMIN",
          },
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    console.error("Group creation error:", error);
    return NextResponse.json(
      { error: "모임 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

