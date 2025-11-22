"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: {
    nickname: string;
    profile_image?: string;
  };
  receiver?: {
    nickname: string;
    profile_image?: string;
  };
}

interface ChatConversation {
  userId: string;
  nickname: string;
  profileImage?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export default function ChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();
    setupKeyboardShortcut();
  }, []);

  useEffect(() => {
    if (user && isOpen) {
      loadConversations();
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (selectedChat && user) {
      loadMessages(selectedChat);
      subscribeToMessages(selectedChat);
    }
  }, [selectedChat, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkUser = async () => {
    try {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Failed to check user:", error);
    }
  };

  const setupKeyboardShortcut = () => {
    // Cmd/Ctrl + K로 채팅 열기
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  };

  const loadConversations = async () => {
    if (!user) return;

    try {
      const supabase = createClient();
      
      // 나에게 온 메시지 그룹화
      const { data: receivedMessages } = await supabase
        .from("messages")
        .select("*, sender:profiles!sender_id(nickname, profile_image)")
        .eq("receiver_id", user.id)
        .order("created_at", { ascending: false });

      // 내가 보낸 메시지 그룹화
      const { data: sentMessages } = await supabase
        .from("messages")
        .select("*, receiver:profiles!receiver_id(nickname, profile_image)")
        .eq("sender_id", user.id)
        .order("created_at", { ascending: false });

      // 대화 상대별로 그룹화
      const conversationMap = new Map<string, ChatConversation>();

      // 받은 메시지 처리
      if (receivedMessages) {
        receivedMessages.forEach((msg: any) => {
          const otherUserId = msg.sender_id;
          if (!conversationMap.has(otherUserId)) {
            conversationMap.set(otherUserId, {
              userId: otherUserId,
              nickname: msg.sender?.nickname || "알 수 없음",
              profileImage: msg.sender?.profile_image,
              lastMessage: msg.content,
              lastMessageTime: msg.created_at,
              unreadCount: msg.is_read ? 0 : 1,
            });
          } else {
            const conv = conversationMap.get(otherUserId)!;
            if (!conv.lastMessageTime || new Date(msg.created_at) > new Date(conv.lastMessageTime)) {
              conv.lastMessage = msg.content;
              conv.lastMessageTime = msg.created_at;
            }
            if (!msg.is_read) conv.unreadCount++;
          }
        });
      }

      // 보낸 메시지 처리
      if (sentMessages) {
        sentMessages.forEach((msg: any) => {
          const otherUserId = msg.receiver_id;
          if (!conversationMap.has(otherUserId)) {
            conversationMap.set(otherUserId, {
              userId: otherUserId,
              nickname: msg.receiver?.nickname || "알 수 없음",
              profileImage: msg.receiver?.profile_image,
              lastMessage: msg.content,
              lastMessageTime: msg.created_at,
              unreadCount: 0,
            });
          } else {
            const conv = conversationMap.get(otherUserId)!;
            if (!conv.lastMessageTime || new Date(msg.created_at) > new Date(conv.lastMessageTime)) {
              conv.lastMessage = msg.content;
              conv.lastMessageTime = msg.created_at;
            }
          }
        });
      }

      setConversations(Array.from(conversationMap.values()).sort((a, b) => {
        const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
        const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
        return timeB - timeA;
      }));
    } catch (error) {
      console.error("Failed to load conversations:", error);
      // 더미 데이터 (개발용)
      setConversations([
        {
          userId: "user1",
          nickname: "파주시민1",
          lastMessage: "안녕하세요!",
          lastMessageTime: new Date().toISOString(),
          unreadCount: 2,
        },
        {
          userId: "user2",
          nickname: "파주시민2",
          lastMessage: "네, 좋습니다!",
          lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
          unreadCount: 0,
        },
      ]);
    }
  };

  const loadMessages = async (otherUserId: string) => {
    if (!user) return;

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("messages")
        .select("*, sender:profiles!sender_id(nickname, profile_image), receiver:profiles!receiver_id(nickname, profile_image)")
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order("created_at", { ascending: true });

      if (data) {
        setMessages(data as Message[]);
        
        // 읽음 처리
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("receiver_id", user.id)
          .eq("sender_id", otherUserId)
          .eq("is_read", false);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      // 더미 메시지
      setMessages([
        {
          id: "1",
          sender_id: otherUserId,
          receiver_id: user.id,
          content: "안녕하세요!",
          is_read: true,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  };

  const subscribeToMessages = (otherUserId: string) => {
    if (!user) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`chat:${user.id}:${otherUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id}))`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
          
          // 읽음 처리
          if (newMessage.receiver_id === user.id) {
            supabase
              .from("messages")
              .update({ is_read: true })
              .eq("id", newMessage.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedChat || !user) return;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: selectedChat,
          content: messageInput.trim(),
          is_read: false,
        })
        .select()
        .single();

      if (error) throw error;

      setMessages((prev) => [...prev, data as Message]);
      setMessageInput("");
      loadConversations(); // 대화 목록 새로고침
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("메시지 전송에 실패했습니다.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectedConversation = conversations.find((c) => c.userId === selectedChat);

  if (!user) {
    return null; // 로그인하지 않으면 채팅 숨김
  }

  return (
    <>
      {/* 트리거 버튼 (숨김) */}
      <button
        id="chat-drawer-trigger"
        className="hidden"
        onClick={() => setIsOpen(true)}
      />

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {!selectedChat ? (
          /* 채팅 목록 */
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">채팅함</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">채팅 내역이 없습니다.</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.userId}
                    onClick={() => setSelectedChat(conv.userId)}
                    className="w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">
                      {conv.profileImage ? (
                        <img
                          src={conv.profileImage}
                          alt={conv.nickname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                          {conv.nickname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{conv.nickname}</span>
                        {conv.unreadCount > 0 && (
                          <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      {conv.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          /* 채팅방 */
          <div className="flex flex-col h-full">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {selectedConversation?.profileImage ? (
                  <img
                    src={selectedConversation.profileImage}
                    alt={selectedConversation.nickname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedConversation?.nickname.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{selectedConversation?.nickname}</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* 메시지 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isMine = message.sender_id === user.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isMine
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${isMine ? "text-blue-100" : "text-gray-500"}`}>
                        {new Date(message.created_at).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

