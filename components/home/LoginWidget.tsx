"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import { getCurrentRank, getNextRank } from "@/lib/rankConfig";

export default function LoginWidget() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = status === "authenticated" && !!session;
  const userNickname = session?.user?.name || "";
  const userId = session?.user?.id || "";

  // 임시 포인트 데이터 (실제로는 API에서 가져옴)
  const userPoints = 750;
  const { rank } = getCurrentRank(userPoints);
  const { nextRank, nextConfig, remainingPoints } = getNextRank(userPoints);
  const rankLabels: Record<string, string> = {
    NEWBIE: "파주새댁",
    JANG: "이장",
    DONG: "동장",
    MAYOR: "시장",
    HONOR: "명예시민",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      } else {
        router.refresh();
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  // 로그인 전
  if (!isLoggedIn) {
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">로그인</h3>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paju-blue focus:border-transparent"
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paju-blue focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-paju-blue text-white rounded-lg font-semibold hover:bg-paju-blue-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/auth/signup"
              className="flex items-center justify-center text-paju-blue hover:text-paju-blue-dark text-sm font-medium"
            >
              회원가입
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  // 로그인 후
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">내 정보</h3>
          <Link
            href="/my-page"
            className="text-paju-blue hover:text-paju-blue-dark text-sm font-medium"
          >
            수정
          </Link>
        </div>

        {/* 인사말 */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">안녕하세요,</p>
          <p className="text-lg font-bold text-gray-900">
            <span className="text-paju-blue">[{rankLabels[rank] || "파주새댁"}]</span>{" "}
            {userNickname}님!
          </p>
        </div>

        {/* 활동 점수 게이지바 */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>활동 점수</span>
            <span className="font-semibold text-paju-blue">{userPoints}점</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-paju-blue h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((userPoints / (nextConfig?.requiredPoints || 1000)) * 100, 100)}%`,
              }}
            />
          </div>
          {nextConfig && (
            <p className="text-xs text-gray-500 mt-1">
              {remainingPoints}점 더 모으면 {rankLabels[nextRank || ""]} 등급
            </p>
          )}
        </div>

        {/* 버튼 */}
        <Link
          href="/my-page"
          className="block w-full px-4 py-2 bg-paju-blue text-white rounded-lg font-semibold hover:bg-paju-blue-dark transition-colors text-center"
        >
          내 정보 수정
        </Link>
      </div>
    </Card>
  );
}

