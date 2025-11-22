"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  ShareIcon as ShareIconSolid,
} from "@heroicons/react/24/solid";

// 더미 데이터 - 상세 정보
const groupDetails: Record<string, any> = {
  "1": {
    id: "1",
    name: "파주 주말 등산회",
    description: "매 주말 함께 등산하며 건강한 삶을 추구하는 모임입니다. 초보자 환영!",
    type: "HIKING",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    creator: {
      id: "1",
      nickname: "등산러버",
      profileImage: null,
    },
    memberCount: 45,
    postCount: 23,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    content: `안녕하세요! 파주 주말 등산회 모임장입니다.

이번 주말 등산 일정을 공유드립니다.

📅 일정: 매주 토요일 오전 7시
📍 집결 장소: 파주시청 앞
🏔️ 코스: 매주 다른 코스로 다양하게 즐기고 있어요

초보자분들도 환영합니다! 체력 걱정 없으시고, 천천히 즐기면서 함께 올라갑니다.

등산 후에는 시원한 국밥으로 한끼 식사도 함께하고 있어요. 정말 좋은 친구들 많이 만나셨으면 좋겠습니다.

참여하고 싶으신 분들은 댓글로 참여 의사 밝혀주세요!`,
    comments: [
      {
        id: "1",
        author: "산악인",
        content: "다음주에도 참여할게요! 정말 좋은 모임이에요.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        author: "등산초보",
        content: "초보인데도 너무 잘 따라가게 도와주셔서 감사해요!",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        author: "파주시민",
        content: "다음 주 토요일 참여 가능한가요?",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

// 기본 더미 데이터 생성
const generateGroupDetail = (id: string, baseName: string) => ({
  id,
  name: baseName,
  description: `${baseName}에 대한 자세한 소개입니다. 많은 관심 부탁드려요!`,
  type: "OTHER",
  coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
  creator: {
    id: "1",
    nickname: "모임장",
    profileImage: null,
  },
  memberCount: 30 + Math.floor(Math.random() * 50),
  postCount: 10 + Math.floor(Math.random() * 20),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  content: `${baseName}에 오신 것을 환영합니다!

이 모임은 파주 지역 주민들이 함께 즐기며 소통하는 공간입니다.

📌 주요 활동
- 정기적인 모임 활동
- 다양한 이벤트와 행사
- 친목 도모를 위한 교류 활동

많은 관심과 참여 부탁드립니다. 함께 만들어가는 모임이 되었으면 좋겠습니다.

궁금한 점이 있으시면 언제든지 댓글로 문의해주세요!`,
  comments: [
    {
      id: "1",
      author: "회원1",
      content: "정말 좋은 모임이에요! 추천합니다.",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      author: "회원2",
      content: "언제 모임 하나요?",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      author: "회원3",
      content: "참여하고 싶습니다!",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ],
});

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const group = groupDetails[params.id] || generateGroupDetail(params.id, `모임 ${params.id}`);

  const handleComment = () => {
    if (!commentText.trim()) return;
    // 댓글 추가 로직 (실제로는 API 호출)
    setCommentText("");
    alert("댓글이 작성되었습니다!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 - 뒤로가기 + 제목 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center h-16 px-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 line-clamp-1">{group.name}</h1>
      </div>

      {/* 커버 이미지 */}
      <div className="relative h-64 bg-gray-100">
        <img
          src={`${group.coverImage}&random=${Math.random()}`}
          alt={group.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 작성자 정보 */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {group.creator.nickname.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{group.creator.nickname}</div>
            <div className="text-sm text-gray-500">
              {new Date(group.createdAt).toLocaleDateString("ko-KR")}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-5 h-5" />
              <span>{group.memberCount}명</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 내용 */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{group.name}</h2>
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{group.content}</p>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="px-4 py-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          댓글 {group.comments.length}개
        </h3>

        {/* 댓글 목록 */}
        <div className="space-y-4 mb-6">
          {group.comments.map((comment: any) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 댓글 작성 */}
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <button
              onClick={handleComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          {isLiked ? (
            <HeartIconSolid className="w-5 h-5" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">좋아요</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
          <ShareIcon className="w-5 h-5" />
          <span className="text-sm font-medium">공유하기</span>
        </button>
        <Link
          href={`/groups/${params.id}/chat`}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span className="text-sm font-medium">채팅하기</span>
        </Link>
      </div>

      {/* 하단 여백 (고정 바 때문) */}
      <div className="h-24"></div>
    </div>
  );
}
