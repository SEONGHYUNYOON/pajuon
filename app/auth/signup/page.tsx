"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, LockClosedIcon, UserIcon, MapPinIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const areas = ["운정동", "교하동", "금촌동", "문산읍", "탄현면", "기타"];
const schoolTypes = ["초등학교", "중학교", "고등학교"];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    area: "",
    schoolType: "",
    schoolName: "",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [nicknameCheck, setNicknameCheck] = useState<"unchecked" | "available" | "unavailable">("unchecked");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNicknameCheck = async () => {
    if (!formData.nickname) {
      setErrors({ ...errors, nickname: "닉네임을 입력해주세요." });
      return;
    }
    
    if (formData.nickname.length < 2) {
      setNicknameCheck("unavailable");
      setErrors({ ...errors, nickname: "닉네임은 2자 이상이어야 합니다." });
      return;
    }

    try {
      const response = await fetch(`/api/auth/check-nickname?nickname=${encodeURIComponent(formData.nickname)}`);
      const data = await response.json();
      
      if (data.available) {
        setNicknameCheck("available");
        setErrors({ ...errors, nickname: "" });
      } else {
        setNicknameCheck("unavailable");
        setErrors({ ...errors, nickname: "이미 사용 중인 닉네임입니다." });
      }
    } catch (error) {
      setNicknameCheck("unavailable");
      setErrors({ ...errors, nickname: "닉네임 확인 중 오류가 발생했습니다." });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (nicknameCheck !== "available") {
      newErrors.nickname = "닉네임 중복 확인을 해주세요.";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "이용약관에 동의해주세요.";
    }
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "개인정보 처리방침에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
          area: formData.area || null,
          schoolType: formData.schoolType || null,
          schoolName: formData.schoolName || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ ...errors, submit: data.error || "회원가입 중 오류가 발생했습니다." });
        return;
      }

      // 회원가입 성공 후 자동 로그인
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
        router.refresh();
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ ...errors, submit: "회원가입 중 오류가 발생했습니다." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">ON</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">
            파주온에 함께 해주세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일 *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 *
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="8자 이상의 비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인 *
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.passwordConfirm ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.passwordConfirm}
                  onChange={(e) => {
                    setFormData({ ...formData, passwordConfirm: e.target.value });
                    setErrors({ ...errors, passwordConfirm: "" });
                  }}
                />
              </div>
              {errors.passwordConfirm && <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm}</p>}
            </div>

            {/* 닉네임 */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                닉네임 * (동네별 소모임, 아이러브스쿨용)
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    required
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.nickname ? "border-red-300" : "border-gray-300"
                    } ${nicknameCheck === "available" ? "border-green-500" : ""}`}
                    placeholder="닉네임을 입력하세요"
                    value={formData.nickname}
                    onChange={(e) => {
                      setFormData({ ...formData, nickname: e.target.value });
                      setNicknameCheck("unchecked");
                      setErrors({ ...errors, nickname: "" });
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNicknameCheck}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
                >
                  중복 확인
                </button>
              </div>
              {nicknameCheck === "available" && (
                <p className="mt-1 text-sm text-green-600">사용 가능한 닉네임입니다.</p>
              )}
              {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname}</p>}
            </div>

            {/* 내 동네 설정 */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                내 동네 설정 (동네별 소모임용)
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="area"
                  name="area"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                >
                  <option value="">선택해주세요 (선택사항)</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">동네별 소모임에서 주로 활동하는 지역을 선택해주세요</p>
            </div>

            {/* 출신 학교 인증 */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                출신 학교 인증 (아이러브스쿨용, 선택사항)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <AcademicCapIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    value={formData.schoolType}
                    onChange={(e) => setFormData({ ...formData, schoolType: e.target.value })}
                  >
                    <option value="">학교 구분 선택</option>
                    {schoolTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="학교명을 입력하세요"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  disabled={!formData.schoolType}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                * 학교 인증은 회원가입 후에도 가능합니다 (아이러브스쿨 메뉴에서 인증)
              </p>
            </div>

            {/* 이용약관 동의 */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className="h-5 w-5 mt-0.5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={formData.agreeTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, agreeTerms: e.target.checked });
                    setErrors({ ...errors, agreeTerms: "" });
                  }}
                />
                <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-700">
                  <Link href="/support/terms" className="text-green-600 hover:text-green-700 underline">
                    이용약관
                  </Link>
                  에 동의합니다 (필수)
                </label>
              </div>
              {errors.agreeTerms && <p className="text-sm text-red-600 ml-8">{errors.agreeTerms}</p>}

              <div className="flex items-start">
                <input
                  id="agreePrivacy"
                  name="agreePrivacy"
                  type="checkbox"
                  required
                  className="h-5 w-5 mt-0.5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={formData.agreePrivacy}
                  onChange={(e) => {
                    setFormData({ ...formData, agreePrivacy: e.target.checked });
                    setErrors({ ...errors, agreePrivacy: "" });
                  }}
                />
                <label htmlFor="agreePrivacy" className="ml-3 text-sm text-gray-700">
                  <Link href="/support/privacy" className="text-green-600 hover:text-green-700 underline">
                    개인정보 처리방침
                  </Link>
                  에 동의합니다 (필수)
                </label>
              </div>
              {errors.agreePrivacy && <p className="text-sm text-red-600 ml-8">{errors.agreePrivacy}</p>}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              회원가입
            </button>
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
        </div>
      </div>
    </div>
  );
}
