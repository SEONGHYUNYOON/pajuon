import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 선남선녀 미팅 신청
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user || authError) {
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

    // events 테이블이 아직 Supabase에 없을 수 있으므로 임시로 에러 반환
    // TODO: Supabase에 events 테이블 생성 후 구현
    return NextResponse.json(
      { error: "이벤트 기능은 준비 중입니다." },
      { status: 503 }
    );

    // 아래는 events 테이블이 생성된 후 사용할 코드
    /*
    // 이벤트 확인
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id, type")
      .eq("id", eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "이벤트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (event.type !== "MATCHMAKING") {
      return NextResponse.json(
        { error: "미팅 이벤트가 아닙니다." },
        { status: 400 }
      );
    }

    // 이미 신청했는지 확인
    const { data: existingParticipant } = await supabase
      .from("event_participants")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .single();

    if (existingParticipant) {
      return NextResponse.json(
        { error: "이미 신청한 이벤트입니다." },
        { status: 400 }
      );
    }

    // 이벤트 참가자 생성
    const { data: participant, error: participantError } = await supabase
      .from("event_participants")
      .insert({
        event_id: eventId,
        user_id: user.id,
        status: "PENDING",
        // 추가 정보는 별도 테이블에 저장하는 것이 좋습니다
        // matchmaking_applications 테이블 생성 권장
      })
      .select()
      .single();

    if (participantError) {
      throw participantError;
    }

    return NextResponse.json(
      {
        message: "미팅 신청이 완료되었습니다. 관리자 승인 후 참가 가능합니다.",
        participant,
      },
      { status: 200 }
    );
    */
  } catch (error) {
    console.error("Matchmaking apply error:", error);
    return NextResponse.json(
      { error: "신청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
