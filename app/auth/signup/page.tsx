"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AcademicCapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { createClient } from "@/utils/supabase/client";

const areas = ["운정", "금촌", "문산", "조리", "법원", "광탄", "탄현", "월롱", "적성", "파평", "장단"];
const schoolTypes = ["초등학교", "중학교", "고등학교"];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    birthDate: "",
    gender: "",
    area: "",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [nicknameCheck, setNicknameCheck] = useState<"unchecked" | "available" | "unavailable">("unchecked");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNicknameCheck = async () => {
    if (!formData.nickname || formData.nickname.trim() === "") {
      setErrors({ ...errors, nickname: "닉네임을 입력해주세요." });
      setNicknameMessage("닉네임을 입력해주세요.");
      setIsNicknameValid(false);
      return;
    }
    
    const trimmedNickname = formData.nickname.trim();
    
    if (trimmedNickname.length < 2) {
      setNicknameCheck("unavailable");
      setNicknameMessage("닉네임은 2자 이상이어야 합니다.");
      setIsNicknameValid(false);
      setErrors({ ...errors, nickname: "닉네임은 2자 이상이어야 합니다." });
      return;
    }

    // 로딩 상태 표시
    setNicknameCheck("unchecked");
    setNicknameMessage("확인 중...");

    try {
      const supabase = createClient();
      
      // 디버깅: API 요청 전 로그
      console.log("=== Nickname Check Debug ===");
      console.log("Checking nickname:", trimmedNickname);
      console.log("Supabase client created:", !!supabase);
      
      // API 요청 시작
      const requestStartTime = Date.now();
      const { data, error } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("nickname", trimmedNickname)
        .maybeSingle();

      const requestDuration = Date.now() - requestStartTime;
      console.log(`API request completed in ${requestDuration}ms`);

      // 에러 처리: 상세한 에러 정보 로그
      if (error) {
        console.error("=== Supabase Error Details ===");
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        console.error("Full error object:", JSON.stringify(error, null, 2));

        // 에러 타입별 처리
        if (error.code === "PGRST116" || error.code === "23505") {
          // PGRST116: No rows returned (이건 실제로는 에러가 아님, maybeSingle 사용 시)
          // 23505: Unique violation (중복)
          console.log("No duplicate found (available)");
          setNicknameCheck("available");
          setNicknameMessage("사용 가능한 닉네임입니다.");
          setIsNicknameValid(true);
          setErrors({ ...errors, nickname: "" });
          return;
        }

        // 네트워크 에러 체크
        const errorMessage = error.message?.toLowerCase() || "";
        if (errorMessage.includes("network") || 
            errorMessage.includes("fetch") || 
            errorMessage.includes("failed to fetch") ||
            error.code === "ECONNREFUSED") {
          console.error("Network error detected");
          setNicknameCheck("unavailable");
          setNicknameMessage("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
          setIsNicknameValid(false);
          setErrors({ ...errors, nickname: "네트워크 오류가 발생했습니다." });
          return;
        }

        // 404 Not Found 체크
        if (error.code === "PGRST301" || error.message?.includes("404")) {
          console.error("404 Not Found - Table or endpoint not found");
          setNicknameCheck("unavailable");
          setNicknameMessage("서버 오류: 테이블을 찾을 수 없습니다. 관리자에게 문의하세요.");
          setIsNicknameValid(false);
          setErrors({ ...errors, nickname: "서버 오류가 발생했습니다." });
          return;
        }

        // 500 Server Error 체크
        if (error.code === "500" || error.message?.includes("500")) {
          console.error("500 Server Error");
          setNicknameCheck("unavailable");
          setNicknameMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          setIsNicknameValid(false);
          setErrors({ ...errors, nickname: "서버 오류가 발생했습니다." });
          return;
        }

        // 기타 에러
        console.error("Unknown error:", error);
        setNicknameCheck("unavailable");
        setNicknameMessage(`오류: ${error.message || "알 수 없는 오류가 발생했습니다."}`);
        setIsNicknameValid(false);
        setErrors({ ...errors, nickname: "닉네임 확인 중 오류가 발생했습니다." });
        return;
      }

      // 성공 케이스 처리
      console.log("=== API Response ===");
      console.log("Data:", data);
      console.log("Data type:", typeof data);
      console.log("Data is null:", data === null);
      console.log("Data is undefined:", data === undefined);

      // data가 null 또는 undefined이면 사용 가능 (중복 없음)
      if (data === null || data === undefined || Object.keys(data).length === 0) {
        console.log("✅ Nickname is AVAILABLE:", trimmedNickname);
        setNicknameCheck("available");
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsNicknameValid(true); // 중요: 반드시 true로 설정
        setErrors({ ...errors, nickname: "" });
      } else {
        // data 객체가 존재하면 중복
        console.log("❌ Nickname is ALREADY TAKEN:", trimmedNickname);
        setNicknameCheck("unavailable");
        setNicknameMessage("이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
        setErrors({ ...errors, nickname: "이미 사용 중인 닉네임입니다." });
      }
    } catch (error: any) {
      // 예외 처리: catch 블록
      console.error("=== Catch Block Error ===");
      console.error("Error type:", typeof error);
      console.error("Error name:", error?.name);
      console.error("Error message:", error?.message);
      console.error("Error stack:", error?.stack);
      console.error("Full error:", JSON.stringify(error, null, 2));

      // 네트워크 에러 구분
      const errorMessage = (error?.message || "").toLowerCase();
      if (errorMessage.includes("network") || 
          errorMessage.includes("fetch") || 
          errorMessage.includes("failed to fetch") ||
          error?.code === "ECONNREFUSED") {
        setNicknameMessage("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
        setErrors({ ...errors, nickname: "네트워크 오류가 발생했습니다." });
      } else if (errorMessage.includes("404") || error?.status === 404) {
        setNicknameMessage("서버 오류: 엔드포인트를 찾을 수 없습니다.");
        setErrors({ ...errors, nickname: "서버 오류가 발생했습니다." });
      } else if (errorMessage.includes("500") || error?.status === 500) {
        setNicknameMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setErrors({ ...errors, nickname: "서버 오류가 발생했습니다." });
      } else {
        setNicknameMessage(`오류: ${error?.message || "알 수 없는 오류가 발생했습니다."}`);
        setErrors({ ...errors, nickname: "닉네임 확인 중 오류가 발생했습니다." });
      }
      
      setNicknameCheck("unavailable");
      setIsNicknameValid(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 4) {
      newErrors.password = "비밀번호는 4자 이상이어야 합니다.";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (!isNicknameValid) {
      newErrors.nickname = "닉네임 중복 확인을 해주세요.";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    }
    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }
    if (!formData.area) {
      newErrors.area = "사는 곳을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug: 회원가입 시도 로그
    console.log("회원가입 시도:", formData);

    // 간단한 validation (alert 사용)
    if (!formData.email) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!formData.password) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (formData.password.length < 4) {
      alert("비밀번호는 4자 이상이어야 합니다");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (!formData.birthDate) {
      alert("생년월일을 입력해주세요");
      return;
    }
    if (!formData.gender) {
      alert("성별을 선택해주세요");
      return;
    }
    if (!formData.area) {
      alert("사는 곳을 선택해주세요");
      return;
    }
    // 닉네임 중복 확인 체크 (닉네임이 입력된 경우에만)
    if (formData.nickname && !isNicknameValid) {
      alert("닉네임 중복 확인을 해주세요");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const supabase = createClient();

      // 1. Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nickname: formData.nickname,
            area: formData.area || null,
            birth_date: formData.birthDate || null,
            gender: formData.gender || null,
          },
        },
      });

      if (authError) {
        setErrors({ submit: authError.message || "회원가입 중 오류가 발생했습니다." });
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setErrors({ submit: "회원가입에 실패했습니다." });
        setIsLoading(false);
        return;
      }

      // 2. 프로필 정보 업데이트
      // 트리거로 자동 생성되지만, 추가 정보(닉네임, 지역 등)를 업데이트
      const profileUpdateData: {
        nickname: string;
        my_dongne?: string | null;
        birth_date?: string | null;
        gender?: string | null;
      } = {
        nickname: formData.nickname,
        my_dongne: formData.area || null,
        birth_date: formData.birthDate || null,
        gender: formData.gender || null,
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdateData)
        .eq("id", authData.user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        // 프로필 업데이트 실패해도 계정은 생성되었으므로 계속 진행
        // 나중에 사용자가 프로필 설정에서 수정할 수 있음
      }

      // 3. 가입 성공 알림 및 리다이렉트
      alert("가입 환영합니다!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ submit: "회원가입 중 오류가 발생했습니다." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex items-center justify-center">
              {/* 외부 글로우 효과 */}
              <span className="absolute inset-0 bg-gradient-to-br from-[#0D4FFF] via-[#3B82F6] to-[#60A5FA] rounded-full blur-md opacity-50 animate-pulse"></span>
              
              {/* On 배지 - 전원 버튼이 O를 대체 */}
              <span className="relative inline-flex items-center gap-0 bg-gradient-to-br from-[#0D4FFF] via-[#2563EB] to-[#1E40AF] text-white px-8 py-4 rounded-full text-3xl font-bold shadow-2xl transform hover:scale-110 hover:shadow-[#0D4FFF]/50 transition-all duration-300 leading-none">
                {/* 전원 버튼 아이콘 */}
                <span className="relative inline-flex items-center justify-center leading-none" style={{ width: '1em', height: '1em', marginRight: '-0.15em', verticalAlign: 'baseline' }}>
                  <svg 
                    className="w-full h-full text-white" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ display: 'inline-block', verticalAlign: 'baseline' }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="8" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    <path 
                      d="M12 8 L12 4" 
                      className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                    />
                  </svg>
                  {/* 발광 효과 */}
                  <span className="absolute inset-0 text-white opacity-40 animate-ping pointer-events-none">
                    <svg 
                      className="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8 L12 4" />
                    </svg>
                  </span>
                </span>
                
                {/* n 텍스트 */}
                <span className="relative z-10 font-bold leading-none">n</span>
                
                {/* 배경 움직이는 그라데이션 */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></span>
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">회원가입</h2>
          <p className="text-lg text-gray-600">
            파주온에 함께 해주세요
          </p>
          <p className="mt-1 text-sm text-gray-500">
            파주 시민을 위한, 파주 시민에 의한 커뮤니티
          </p>
        </div>

        {/* 회원가입 폼 */}
        <Card padding="lg">
          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 */}
            <Input
              label="이메일"
              type="email"
              required
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              required
              placeholder="4자 이상의 비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              error={errors.password}
              helperText="알파벳+숫자 조합 권장 (4자 이상)"
            />

            {/* 비밀번호 확인 */}
            <Input
              label="비밀번호 확인"
              type="password"
              required
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={(e) => {
                setFormData({ ...formData, passwordConfirm: e.target.value });
                setErrors({ ...errors, passwordConfirm: "" });
              }}
              error={errors.passwordConfirm}
            />

            {/* 닉네임 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임 <span className="text-red-500">*</span>
                <Badge variant="info" size="sm" className="ml-2">
                  동네별 소모임, 아이러브스쿨용
                </Badge>
              </label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  required
                  placeholder="닉네임을 입력하세요"
                  value={formData.nickname}
                  onChange={(e) => {
                    setFormData({ ...formData, nickname: e.target.value });
                    setNicknameCheck("unchecked");
                    setNicknameMessage("");
                    setIsNicknameValid(false);
                    setErrors({ ...errors, nickname: "" });
                  }}
                  error={errors.nickname}
                  className={nicknameCheck === "available" ? "border-green-500" : ""}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNicknameCheck}
                  className="whitespace-nowrap"
                >
                  중복 확인
                </Button>
              </div>
              {nicknameMessage && (
                <p className={`mt-1 text-sm ${
                  isNicknameValid ? "text-green-500" : "text-red-500"
                }`}>
                  {isNicknameValid ? "✓ " : "✗ "}{nicknameMessage}
                </p>
              )}
            </div>

            {/* 생년월일 */}
            <Input
              label="생년월일"
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => {
                setFormData({ ...formData, birthDate: e.target.value });
                setErrors({ ...errors, birthDate: "" });
              }}
              error={errors.birthDate}
            />

            {/* 성별 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                성별 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: "male" })}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                    formData.gender === "male"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: "female" })}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                    formData.gender === "female"
                      ? "bg-pink-50 border-pink-500 text-pink-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  여성
                </button>
              </div>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {/* 사는 곳 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사는 곳 <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                value={formData.area}
                onChange={(e) => {
                  setFormData({ ...formData, area: e.target.value });
                  setErrors({ ...errors, area: "" });
                }}
                required
              >
                <option value="">동네 선택</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
            </div>

            {/* 약관 동의 안내 */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 text-center">
                가입 시 이용약관 및 개인정보 처리방침에 동의한 것으로 간주합니다.
              </p>
            </div>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>

          {/* 로그인 링크 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 회원이신가요?{" "}
              <Link href="/auth/login" className="font-medium text-green-600 hover:text-green-700">
                로그인
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
