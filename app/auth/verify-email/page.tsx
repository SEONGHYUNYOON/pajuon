"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (!email || resendCooldown > 0) return;

    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        alert("이메일 재전송 중 오류가 발생했습니다: " + error.message);
      } else {
        setResendCooldown(60); // 60초 쿨다운
        alert("인증 이메일을 다시 전송했습니다.");
      }
    } catch (error) {
      console.error("Resend email error:", error);
      alert("이메일 재전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card padding="lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">이메일 확인 필요</h2>
            <p className="text-gray-600 mb-6">
              {email ? (
                <>
                  <span className="font-semibold text-green-600">{email}</span>로
                  <br />
                  인증 이메일을 보냈습니다.
                </>
              ) : (
                "인증 이메일을 확인해주세요."
              )}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              이메일의 링크를 클릭하여 계정을 활성화해주세요.
              <br />
              이메일이 보이지 않으면 스팸 폴더를 확인해주세요.
            </p>

            {email && (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `${resendCooldown}초 후 재전송 가능`
                    : "인증 이메일 다시 보내기"}
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link href="/auth/login">
                <Button variant="ghost" fullWidth>
                  로그인 페이지로 돌아가기
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

