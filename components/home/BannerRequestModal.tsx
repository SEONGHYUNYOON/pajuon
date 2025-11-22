"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface BannerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BannerRequestModal({
  isOpen,
  onClose,
  onSuccess,
}: BannerRequestModalProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (content.length > 20) {
      alert("메시지는 20자 이하로 입력해주세요.");
      return;
    }

    try {
      const supabase = createClient();
      
      // 로그인 상태 확인
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      setIsSubmitting(true);

      // 배너 메시지 등록
      const { error } = await supabase
        .from("banner_messages")
        .insert({
          content: content.trim(),
          user_id: user.id,
        });

      if (error) {
        throw error;
      }

      // 성공
      setContent("");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to submit banner message:", error);
      alert(error.message || "메시지 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* 헤더 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              📢 실시간 제보 메시지 등록
            </h2>
            <p className="text-sm text-gray-600">
              파주 시민들에게 알릴 내용을 20자 이내로 적어주세요.
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={content}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    setContent(value);
                  }
                }}
                placeholder="예: 자유로 교통 정체 제보, 분실물 찾습니다 등..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4FFF] focus:border-transparent"
                maxLength={20}
                required
              />
              <div className="flex justify-end items-center mt-2">
                <span className={`text-xs font-medium ${
                  content.length >= 18 ? "text-red-500" : "text-gray-400"
                }`}>
                  {content.length}/20
                </span>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="flex-1 px-4 py-3 bg-[#0D4FFF] text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

