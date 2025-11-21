import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 실제 프로덕션에서는 AWS S3, Cloudinary 등 사용
// 여기서는 간단하게 로컬 파일 시스템 또는 외부 스토리지 연동 예시
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 없습니다." },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "이미지 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "파일 크기는 10MB 이하여야 합니다." },
        { status: 400 }
      );
    }

    // 실제 프로덕션에서는 다음 중 하나를 사용:
    // 1. AWS S3: @aws-sdk/client-s3 사용
    // 2. Cloudinary: cloudinary SDK 사용
    // 3. Vercel Blob: @vercel/blob 사용
    // 4. Supabase Storage: supabase.storage 사용
    
    // 여기서는 임시로 Base64 인코딩하여 반환 (실제로는 S3 등에 업로드)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    // 실제로는 S3 URL을 반환해야 함
    // 예시: const s3Url = await uploadToS3(buffer, file.name);
    
    // 임시로 Base64 데이터 URL 반환 (실제 프로덕션에서는 제거)
    const imageUrl = dataUrl;

    return NextResponse.json({
      url: imageUrl,
      fileName: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "이미지 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
