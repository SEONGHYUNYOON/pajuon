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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);

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


  const loadMessages = async () => {
    try {
      const supabase = createClient();
      // 단순화: profiles join 제거 (RLS 권한 오류 방지)
      const { data, error } = await supabase
        .from("banner_messages")
        .select("id, content, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Failed to fetch banner messages:", error);
        // 에러가 발생해도 계속 진행 (fallback으로 넘어감)
      }

      if (data && data.length > 0) {
        // user_id가 있으면 "파주 이웃", 없으면 "익명"으로 설정
        const messagesWithAuthor = data.map((msg) => ({
          ...msg,
          author: msg.user_id ? { nickname: "파주 이웃" } : undefined,
        }));
        setMessages(messagesWithAuthor as BannerMessage[]);
      } else {
        // Fallback: 하드코딩된 가상 데이터
        const fallbackMessages: BannerMessage[] = [
          {
            id: "fallback1",
            content: "🐶 잃어버린 강아지를 찾아요 ㅠㅠ 말티즈, 흰색, 운정에서 도망감 ㅠㅠ (사례금 있음)",
            created_at: new Date().toISOString(),
            user_id: "user1",
            author: { nickname: "파주 이웃" },
          },
          {
            id: "fallback2",
            content: "⚽ 조기축구회 신입 모집! 개발 환영, 공만 차도 좋아함",
            created_at: new Date(Date.now() - 3600000).toISOString(),
            user_id: "user2",
            author: { nickname: "파주 이웃" },
          },
          {
            id: "fallback3",
            content: "🚗 금촌역 사거리 접촉사고 목격자 찾습니다 (블박 영상 구함)",
            created_at: new Date(Date.now() - 7200000).toISOString(),
            user_id: "user3",
            author: { nickname: "파주 이웃" },
          },
        ];
        setMessages(fallbackMessages);
      }
    } catch (error) {
      console.error("Failed to load banner messages:", error);
      // 에러 시 하드코딩된 가상 데이터 표시
      const fallbackMessages: BannerMessage[] = [
        {
          id: "fallback1",
          content: "🐶 잃어버린 강아지를 찾아요 ㅠㅠ 말티즈, 흰색, 운정에서 도망감 ㅠㅠ (사례금 있음)",
          created_at: new Date().toISOString(),
          user_id: "user1",
          author: { nickname: "파주 이웃" },
        },
        {
          id: "fallback2",
          content: "⚽ 조기축구회 신입 모집! 개발 환영, 공만 차도 좋아함",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user_id: "user2",
          author: { nickname: "파주 이웃" },
        },
        {
          id: "fallback3",
          content: "🚗 금촌역 사거리 접촉사고 목격자 찾습니다 (블박 영상 구함)",
          created_at: new Date(Date.now() - 7200000).toISOString(),
          user_id: "user3",
          author: { nickname: "파주 이웃" },
        },
      ];
      setMessages(fallbackMessages);
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
    // 첫 번째 메시지를 기준으로 클릭 처리 (무한 스크롤이므로)
    const firstMsg = messages[0];
    if (!firstMsg || !firstMsg.user_id) {
      alert("쪽지를 보낼 수 없는 대상입니다");
      return;
    }

    if (currentUser && firstMsg.user_id === currentUser.id) {
      alert("쪽지를 보낼 수 없는 대상입니다");
      return;
    }

    // 채팅 Drawer 열기 (해당 작성자와의 채팅)
    window.dispatchEvent(new CustomEvent("openChatDrawer", { 
      detail: { userId: firstMsg.user_id } 
    }));
  };

  // Seamless 무한 스크롤을 위한 메시지 묶음 생성
  // 모든 메시지를 하나의 긴 문자열로 합친 후 2번 반복
  const createMessageString = (msgs: BannerMessage[]) => {
    return msgs.map((msg) => {
      const authorText = msg.author?.nickname ? ` (작성자: ${msg.author.nickname})` : "";
      return `📢 ${msg.content}${authorText}`;
    }).join("  •  "); // 메시지 간 구분자 (적당한 간격)
  };

  const messageString = messages.length > 0 ? createMessageString(messages) : "파주온에 오신 것을 환영합니다!";
  
  // 텍스트를 2번 복제하여 끊김 없는 루프 구현
  const duplicatedText = `${messageString}  •  ${messageString}  •  `;

  return (
    <>
      <section className="py-2 px-8 md:px-10 lg:px-12 bg-[#0D4FFF] text-white relative overflow-hidden" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-between gap-4">
          {/* 메시지 표시 - Seamless 무한 스크롤 */}
          <div 
            className="flex-1 overflow-hidden relative h-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="banner-ticker-container">
              <div 
                className={`banner-ticker-content ${isPaused ? 'banner-ticker-paused' : ''}`}
                onClick={handleMessageClick}
              >
                {/* 첫 번째 텍스트 묶음 */}
                <span className="banner-ticker-text inline-block whitespace-nowrap">
                  {duplicatedText}
                </span>
                {/* 두 번째 텍스트 묶음 (완전히 동일한 내용) */}
                <span className="banner-ticker-text inline-block whitespace-nowrap">
                  {duplicatedText}
                </span>
              </div>
            </div>
          </div>

          {/* 확성기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm hover:bg-gray-100 transition-colors flex-shrink-0 flex items-center gap-1"
            aria-label="메시지 등록"
          >
            <Megaphone className="w-4 h-4" />
            <span>확성기 신청</span>
          </button>
        </div>
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

