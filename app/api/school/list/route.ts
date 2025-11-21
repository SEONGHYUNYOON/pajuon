import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const schools = await prisma.school.findMany({
      where: type ? { type } : undefined,
      orderBy: [
        { type: "asc" },
        { name: "asc" },
      ],
    });

    return NextResponse.json({ schools }, { status: 200 });
  } catch (error) {
    console.error("School list error:", error);
    return NextResponse.json(
      { error: "학교 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

