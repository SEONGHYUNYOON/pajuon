"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserIcon, LockClosedIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) {
        router.push("/auth/login");
        return;
      }
      setIsLoggedIn(true);

      // 사용자 정보 로드
      const nickname = localStorage.getItem("userNickname") || "";
      const email = localStorage.getItem("userEmail") || "";

      setFormData({
        nickname,
        email,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      });
    }
  }, [router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출
    localStorage.setItem("userNickname", formData.nickname);
    alert("닉네임이 변경되었습니다.");
    router.refresh();
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      setErrors({ ...errors, currentPassword: "현재 비밀번호를 입력해주세요." });
      return;
    }

    if (!formData.newPassword) {
      setErrors({ ...errors, newPassword: "새 비밀번호를 입력해주세요." });
      return;
    }

    if (formData.newPassword.length < 8) {
      setErrors({ ...errors, newPassword: "비밀번호는 8자 이상이어야 합니다." });
      return;
    }

    if (formData.newPassword !== formData.newPasswordConfirm) {
      setErrors({ ...errors, newPasswordConfirm: "비밀번호가 일치하지 않습니다." });
      return;
    }

    // 실제로는 API 호출
    alert("비밀번호가 변경되었습니다.");
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
    setErrors({});
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/my-page"
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← 마이페이지로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">내 정보 수정</h1>
        </div>

        {/* 프로필 사진 변경 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">프로필 사진</h2>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                formData.nickname?.charAt(0) || "U"
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                사진 변경
              </label>
              <p className="text-sm text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능합니다</p>
            </div>
          </div>
        </div>

        {/* 닉네임 변경 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">닉네임 변경</h2>
          <form onSubmit={handleNicknameUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              닉네임 변경
            </button>
          </form>
        </div>

        {/* 비밀번호 변경 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">비밀번호 변경</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 비밀번호
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.currentPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.currentPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, currentPassword: e.target.value });
                    setErrors({ ...errors, currentPassword: "" });
                  }}
                />
              </div>
              {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.newPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, newPassword: e.target.value });
                    setErrors({ ...errors, newPassword: "" });
                  }}
                />
              </div>
              {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새 비밀번호 확인
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.newPasswordConfirm ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.newPasswordConfirm}
                  onChange={(e) => {
                    setFormData({ ...formData, newPasswordConfirm: e.target.value });
                    setErrors({ ...errors, newPasswordConfirm: "" });
                  }}
                />
              </div>
              {errors.newPasswordConfirm && <p className="mt-1 text-sm text-red-600">{errors.newPasswordConfirm}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              비밀번호 변경
            </button>
          </form>
        </div>

        {/* 이메일 (읽기 전용) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">이메일</h2>
          <div className="text-gray-600">{formData.email}</div>
          <p className="text-sm text-gray-500 mt-2">이메일은 변경할 수 없습니다</p>
        </div>
      </div>
    </div>
  );
}
