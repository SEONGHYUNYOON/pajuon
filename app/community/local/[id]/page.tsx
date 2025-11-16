"use client";

import Link from "next/link";
import { MapPinIcon, ClockIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentItem from "@/components/post/CommentItem";
import { type UserRank } from "@/components/user/UserRankBadge";

export default function LocalPostDetailPage({ params }: { params: { id: string } }) {
  // 실제로는 params.id로 API 호출하여 데이터를 가져와야 함
  const post = {
    id: params.id,
    title: "운정동 주민 모임 가입하세요",
    area: "운정",
    content: `운정동에 거주하시는 주민분들을 위한 모임입니다. 
    
정기적으로 모임을 가져 지역 소통과 친목을 도모하고 있습니다. 
관심 있으신 분들은 댓글로 연락주세요!`,
    author: {
      nickname: "운정러버",
      rank: "jang" as UserRank,
      avatar: "",
    },
    date: "2024-12-10",
    views: 234,
    comments: 15,
  };

  const comments = [
    {
      id: 1,
      author: {
        nickname: "운정맘",
        rank: "newbie" as UserRank,
        avatar: "",
      },
      content: "저도 가입하고 싶어요! 어떻게 참여하나요?",
      date: "1시간 전",
    },
    {
      id: 2,
      author: {
        nickname: "운정주민",
        rank: "dong" as UserRank,
        avatar: "",
      },
      content: "좋은 모임이네요. 언제 모임인가요?",
      date: "30분 전",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/community/local"
          className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
        >
          ← 목록으로
        </Link>

        {/* 작성자 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {post.area}동
              </span>
              <AuthorInfo
                nickname={post.author.nickname}
                rank={post.author.rank}
                avatar={post.author.avatar}
                showAvatar={true}
              />
            </div>
            <div className="text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {post.date}
                </span>
                <span>조회 {post.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 게시물 상세 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              <ChatBubbleLeftRightIcon className="w-6 h-6 inline mr-2" />
              댓글 {comments.length}개
            </h2>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                author={comment.author}
                content={comment.content}
                date={comment.date}
                onReply={(id) => console.log("Reply to", id)}
              />
            ))}
          </div>

          {/* 댓글 작성 */}
          <div className="border-t border-gray-200 pt-6">
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
              rows={4}
              placeholder="댓글을 작성하세요..."
            />
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              댓글 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
