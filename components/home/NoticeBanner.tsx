"use client";

import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import BannerRequestModal from "./BannerRequestModal";

interface BannerMessage {
  id: string;
  content: string;
  created_at: string;
  user_id: string | null;
  author?: {
    nickname: string;
  };
}

export default function NoticeBanner() {
  const [messages, setMessages] = useState<BannerMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    checkCurrentUser();
    loadMessages();
    subscribeToMessages();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to check user:", error);
    }
  };

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
        .select("id, content, created_at, user_id, author:profiles!user_id(nickname)")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Failed to fetch banner messages:", error);
        throw error;
      }

      if (data && data.length > 0) {
        setMessages(data as BannerMessage[]);
        setCurrentMessageIndex(0);
      } else {
        // Fallback: 하드코딩된 가상 데이터
        const fallbackMessages: BannerMessage[] = [
          {
            id: "fallback1",
            content: "강아지 찾아요! 운정동에서 잃어버렸습니다",
            created_at: new Date().toISOString(),
            user_id: "user1",
            author: { nickname: "운정주민1" },
          },
          {
            id: "fallback2",
            content: "자유로 교통 정체 제보 - 심각함",
            created_at: new Date(Date.now() - 3600000).toISOString(),
            user_id: "user2",
            author: { nickname: "파주시민2" },
          },
          {
            id: "fallback3",
            content: "분실물 찾습니다 - 갈색 지갑",
            created_at: new Date(Date.now() - 7200000).toISOString(),
            user_id: "user3",
            author: { nickname: "금촌주민3" },
          },
          {
            id: "fallback4",
            content: "파주온에 오신 것을 환영합니다!",
            created_at: new Date().toISOString(),
            user_id: null,
          },
        ];
        setMessages(fallbackMessages);
        setCurrentMessageIndex(0);
      }
    } catch (error) {
      console.error("Failed to load banner messages:", error);
      // 에러 시 하드코딩된 가상 데이터 표시
      const fallbackMessages: BannerMessage[] = [
        {
          id: "fallback1",
          content: "강아지 찾아요! 운정동에서 잃어버렸습니다",
          created_at: new Date().toISOString(),
          user_id: "user1",
          author: { nickname: "운정주민1" },
        },
        {
          id: "fallback2",
          content: "자유로 교통 정체 제보 - 심각함",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user_id: "user2",
          author: { nickname: "파주시민2" },
        },
        {
          id: "fallback3",
          content: "파주온에 오신 것을 환영합니다!",
          created_at: new Date().toISOString(),
          user_id: null,
        },
      ];
      setMessages(fallbackMessages);
      setCurrentMessageIndex(0);
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

  const handleMessageClick = () => {
    const currentMsg = messages[currentMessageIndex];
    if (!currentMsg || !currentMsg.user_id) {
      alert("쪽지를 보낼 수 없는 대상입니다");
      return;
    }

    if (currentUser && currentMsg.user_id === currentUser.id) {
      alert("쪽지를 보낼 수 없는 대상입니다");
      return;
    }

    // 채팅 Drawer 열기 (해당 작성자와의 채팅)
    window.dispatchEvent(new CustomEvent("openChatDrawer", { 
      detail: { userId: currentMsg.user_id } 
    }));
  };

  const currentMessage = messages[currentMessageIndex];
  const messageContent = currentMessage?.content || "파주온에 오신 것을 환영합니다!";
  const authorNickname = currentMessage?.author?.nickname;

  return (
    <>
      <section className="py-2 px-8 md:px-10 lg:px-12 bg-[#0D4FFF] text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          {/* 메시지 표시 */}
          <div className="flex-1 overflow-hidden relative h-8">
            <button
              onClick={handleMessageClick}
              className="absolute inset-0 flex items-center animate-slide-in whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity w-full text-left"
              key={currentMessageIndex}
            >
              <span className="text-sm font-medium">
                📢 {messageContent}
                {authorNickname && (
                  <span className="ml-2 text-xs opacity-80">
                    (작성자: {authorNickname})
                  </span>
                )}
              </span>
            </button>
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
          @keyframes scroll {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          .animate-slide-in {
            animation: slide-in 0.8s ease-out;
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

