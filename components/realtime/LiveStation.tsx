"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Users } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface ChatMessage {
  id: string;
  nickname: string;
  message: string;
  timestamp: number;
}

// 랜덤 닉네임 생성
const generateNickname = () => {
  const adjectives = ["귀여운", "멋진", "행복한", "똑똑한", "용감한", "친절한", "즐거운", "밝은"];
  const nouns = ["토끼", "펭귄", "강아지", "고양이", "곰", "사자", "호랑이", "여우"];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${randomAdj}${randomNoun}${number}`;
};

export default function LiveStation() {
  const [isOpen, setIsOpen] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);
  const supabaseRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 닉네임 초기화
  useEffect(() => {
    if (!nickname) {
      const savedNickname = localStorage.getItem("pajuon_nickname");
      if (savedNickname) {
        setNickname(savedNickname);
      } else {
        const newNickname = generateNickname();
        setNickname(newNickname);
        localStorage.setItem("pajuon_nickname", newNickname);
      }
    }
  }, [nickname]);

  // Supabase Realtime 연결
  useEffect(() => {
    if (!nickname) return;

    const supabase = createClient();
    supabaseRef.current = supabase;

    try {
      // 채널 생성 (Broadcast + Presence 사용)
      const channel = supabase
        .channel("live_chat_paju", {
          config: {
            broadcast: { self: true },
            presence: { key: nickname },
          },
        })
        .on("presence", { event: "sync" }, () => {
          try {
            const presenceState = channel.presenceState();
            const count = Object.keys(presenceState).length;
            setOnlineCount(count > 0 ? count : 1);
          } catch (error) {
            console.error("Presence sync error:", error);
          }
        })
        .on("presence", { event: "join" }, () => {
          try {
            const presenceState = channel.presenceState();
            const count = Object.keys(presenceState).length;
            setOnlineCount(count > 0 ? count : 1);
          } catch (error) {
            console.error("Presence join error:", error);
          }
        })
        .on("presence", { event: "leave" }, () => {
          try {
            const presenceState = channel.presenceState();
            const count = Object.keys(presenceState).length;
            setOnlineCount(count > 0 ? count : 1);
          } catch (error) {
            console.error("Presence leave error:", error);
          }
        })
        .on(
          "broadcast",
          { event: "message" },
          ({ payload }: { payload: ChatMessage }) => {
            setMessages((prev) => {
              // 중복 메시지 방지
              if (prev.some((msg) => msg.id === payload.id)) {
                return prev;
              }
              return [...prev, payload];
            });
          }
        )
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            setIsConnected(true);
            // Presence 트랙 시작
            await channel.track({
              nickname: nickname,
              online_at: new Date().toISOString(),
            });
            setOnlineCount(1);
          } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
            setIsConnected(false);
          }
        });

      channelRef.current = channel;

      return () => {
        if (channelRef.current) {
          channelRef.current.untrack();
          channelRef.current.unsubscribe();
        }
      };
    } catch (error) {
      console.error("Supabase Realtime connection error:", error);
      setIsConnected(false);
    }
  }, [nickname]);

  // 메시지 전송
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !channelRef.current || !nickname) return;

    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      nickname,
      message: inputMessage.trim(),
      timestamp: Date.now(),
    };

    // Broadcast로 메시지 전송
    await channelRef.current.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });

    setInputMessage("");
    scrollToBottom();
  };

  // 최근 메시지만 유지 (메모리 관리)
  useEffect(() => {
    if (messages.length > 50) {
      setMessages((prev) => prev.slice(-50));
    }
  }, [messages.length]);

  // 창 크기 및 위치 상태
  const [size, setSize] = useState({ width: 380, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  // 리사이징 핸들러
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return;

      const { startX, startY, startWidth, startHeight } = resizeRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // 최소 크기 제한 (300x400)
      const newWidth = Math.max(300, startWidth + deltaX);
      const newHeight = Math.max(400, startHeight - deltaY); // 위로 늘어나므로 deltaY를 뺌

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      document.body.style.cursor = "default";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };
    document.body.style.cursor = "nwse-resize";
  };

  // 채팅창 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating 버튼 (좌측 상단 또는 하단) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-4 z-50 bg-white rounded-full shadow-lg shadow-gray-200/50 p-4 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        aria-label="실시간 채팅 열기"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          {onlineCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {onlineCount > 99 ? "99+" : onlineCount}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            실시간 채팅
          </span>
          {onlineCount > 0 && (
            <span className="text-xs text-green-600 flex items-center space-x-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>{onlineCount}명 접속 중</span>
            </span>
          )}
        </div>
      </button>

      {/* 채팅 패널 */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-6 left-4 z-50 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 flex flex-col border border-gray-100 transition-all duration-75 ease-out"
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            maxHeight: '80vh',
            maxWidth: '90vw'
          }}
        >
          {/* 리사이즈 핸들 (우측 상단 모서리) */}
          <div
            className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize z-50 opacity-0 hover:opacity-100"
            onMouseDown={startResize}
          />
          {/* 리사이즈 핸들 (우측 상단 아이콘) */}
          <div
            className="absolute -top-2 -right-2 w-8 h-8 cursor-nesw-resize z-50 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
            onMouseDown={startResize}
            title="크기 조절"
          >
            <div className="w-4 h-4 border-t-2 border-r-2 border-gray-400 rounded-tr-sm" />
          </div>

          {/* 헤더 */}
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-3xl flex items-center justify-between shrink-0 cursor-move"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Users className="w-5 h-5" />
                {isConnected && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">파주 LIVE</span>
                {onlineCount > 0 && (
                  <span className="text-xs text-white/80">
                    🟢 {onlineCount}명 접속 중
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="채팅 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>아직 메시지가 없습니다.</p>
                <p className="text-xs mt-1">첫 메시지를 보내보세요! 💬</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.nickname === nickname ? "items-end" : "items-start"
                    }`}
                >
                  {msg.nickname !== nickname && (
                    <span className="text-xs text-gray-500 mb-1">{msg.nickname}</span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.nickname === nickname
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-900 shadow-sm"
                      }`}
                  >
                    <p className="text-sm break-all leading-relaxed">{msg.message}</p>
                    <span
                      className={`text-xs mt-1 block ${msg.nickname === nickname ? "text-blue-100" : "text-gray-400"
                        }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-3xl shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                maxLength={200}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || !isConnected}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium whitespace-nowrap"
              >
                전송
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              내 닉네임: <span className="font-medium">{nickname}</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
