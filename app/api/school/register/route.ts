import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

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
    const { schoolType, schoolName } = body;

    if (!schoolType || !schoolName) {
      return NextResponse.json(
        { error: "학교 구분과 학교명은 필수입니다." },
        { status: 400 }
      );
    }

    // 학교가 DB에 있는지 확인 (없으면 생성)
    let school = await prisma.school.findFirst({
      where: {
        name: schoolName,
        type: schoolType,
      },
    });

    if (!school) {
      school = await prisma.school.create({
        data: {
          name: schoolName,
          type: schoolType,
        },
      });
    }

    // 사용자의 schoolOrigin 배열에 추가
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { schoolOrigin: true },
    });

    const schoolKey = `${schoolType} ${schoolName}`;
    const updatedSchoolOrigin = user?.schoolOrigin || [];
    
    // 이미 등록된 학교인지 확인
    if (updatedSchoolOrigin.includes(schoolKey)) {
      return NextResponse.json(
        { error: "이미 등록된 학교입니다." },
        { status: 400 }
      );
    }

    // schoolOrigin 배열에 추가
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        schoolOrigin: {
          set: [...updatedSchoolOrigin, schoolKey],
        },
        school: schoolKey, // 기존 호환성을 위해
      },
    });

    return NextResponse.json(
      {
        message: "학교 등록이 완료되었습니다.",
        school: {
          id: school.id,
          name: school.name,
          type: school.type,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("School registration error:", error);
    return NextResponse.json(
      { error: "학교 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

