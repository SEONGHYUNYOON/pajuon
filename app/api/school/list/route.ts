import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 학교 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // schools 테이블이 아직 Supabase에 없을 수 있으므로 임시로 빈 배열 반환
    // TODO: Supabase에 schools 테이블 생성 후 구현
    return NextResponse.json({ schools: [] }, { status: 200 });

    // 아래는 schools 테이블이 생성된 후 사용할 코드
    /*
    const supabase = await createClient();

    let query = supabase
      .from("schools")
      .select("id, name, type, address, district")
      .order("type", { ascending: true })
      .order("name", { ascending: true });

    if (type) {
      query = query.eq("type", type);
    }

    const { data: schools, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ schools: schools || [] }, { status: 200 });
    */
  } catch (error) {
    console.error("School list error:", error);
    return NextResponse.json(
      { error: "학교 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
