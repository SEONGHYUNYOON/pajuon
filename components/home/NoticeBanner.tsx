"use client";

import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import BannerRequestModal from "./BannerRequestModal";

interface BannerMessage {
  id: string;
  content: string;
  created_at: string;
}

export default function NoticeBanner() {
  const [messages, setMessages] = useState<BannerMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadMessages();
    subscribeToMessages();
  }, []);

  // 자동 스크롤 (5초마다)
  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const loadMessages = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("banner_messages")
        .select("id, content, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(data);
        setCurrentMessageIndex(0);
      } else {
        // 기본 환영 메시지
        setMessages([{
          id: "default",
          content: "파주온에 오신 것을 환영합니다!",
          created_at: new Date().toISOString(),
        }]);
      }
    } catch (error) {
      console.error("Failed to load banner messages:", error);
      // 에러 시 기본 메시지 표시
      setMessages([{
        id: "default",
        content: "파주온에 오신 것을 환영합니다!",
        created_at: new Date().toISOString(),
      }]);
    }
  };

  const subscribeToMessages = () => {
    const supabase = createClient();
    const channel = supabase
      .channel("banner_messages_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "banner_messages",
        },
        (payload) => {
          // 새 메시지 추가 시 목록 새로고침
          loadMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleModalSuccess = () => {
    // 모달에서 메시지 등록 성공 시 목록 새로고침
    loadMessages();
  };

  const currentMessage = messages[currentMessageIndex]?.content || "파주온에 오신 것을 환영합니다!";

  return (
    <>
      <section className="py-2 px-8 md:px-10 lg:px-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          {/* 메시지 표시 */}
          <div className="flex-1 overflow-hidden relative h-8">
            <div
              key={currentMessageIndex}
              className="absolute inset-0 flex items-center animate-slide-in whitespace-nowrap"
            >
              <span className="text-sm font-medium">
                📢 {currentMessage}
              </span>
            </div>
          </div>

          {/* 확성기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm hover:bg-gray-100 transition-colors flex-shrink-0 flex items-center gap-1"
            aria-label="메시지 등록"
          >
            <Megaphone className="w-4 h-4" />
            <span>확성기 신청</span>
          </button>
        </div>

        {/* 애니메이션 스타일 */}
        <style jsx>{`
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.5s ease-out;
          }
        `}</style>
      </section>

      {/* 모달 */}
      <BannerRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}

