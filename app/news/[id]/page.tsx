"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

// 더미 데이터
const newsDetails: Record<string, any> = {
  "1": {
    id: "1",
    title: "파주시, 2024년 지역경제 활성화 사업 추진",
    date: "2024-12-10",
    source: "파주시청 보도자료",
    content: `파주시가 내년 지역경제 활성화를 위한 다양한 사업을 추진한다고 발표했습니다.

주요 내용:
- 소상공인 지원 사업 확대
- 지역 상권 활성화 프로그램 운영
- 청년 창업 지원 강화

파주시 관계자는 "지역경제의 지속가능한 성장을 위해 다양한 정책을 마련했다"고 밝혔습니다.`,
    author: {
      nickname: "파주시청",
      profileImage: null,
    },
    comments: [
      {
        id: "1",
        author: "파주시민",
        content: "좋은 정책이네요! 많은 도움이 될 것 같습니다.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        author: "소상공인",
        content: "실질적인 지원이 필요합니다.",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

const generateNewsDetail = (id: string, title: string) => ({
  id,
  title,
  date: new Date().toISOString().split("T")[0],
  source: "파주시청",
  content: `${title}에 대한 상세 내용입니다.

파주시의 다양한 소식과 정보를 전달드립니다.

시민 여러분의 많은 관심과 참여 부탁드립니다.`,
  author: {
    nickname: "파주시청",
    profileImage: null,
  },
  comments: [
    {
      id: "1",
      author: "시민",
      content: "좋은 정보 감사합니다!",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
});

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const news = newsDetails[params.id] || generateNewsDetail(params.id, "파주시 뉴스");

  const handleComment = () => {
    if (!commentText.trim()) return;
    setCommentText("");
    alert("댓글이 작성되었습니다!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center h-16 px-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 line-clamp-1">파주 소식</h1>
      </div>

      {/* 본문 이미지 */}
      <div className="relative bg-gray-100">
        <img
          src={`https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80&random=${Math.random()}`}
          alt={news.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* 작성자 정보 */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {news.author.nickname.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{news.author.nickname}</div>
            <div className="text-sm text-gray-500">{news.date}</div>
          </div>
        </div>
      </div>

      {/* 본문 내용 */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{news.title}</h2>
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{news.content}</p>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="px-4 py-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          댓글 {news.comments.length}개
        </h3>
        <div className="space-y-4 mb-6">
          {news.comments.map((comment: any) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
          <span className="text-sm font-medium">공유</span>
        </button>
      </div>

      <div className="h-24"></div>
    </div>
  );
}

