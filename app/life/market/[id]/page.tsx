"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinIcon, ClockIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentItem from "@/components/post/CommentItem";
import { type UserRank } from "@/components/user/UserRankBadge";

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  // 실제로는 params.id로 API 호출하여 데이터를 가져와야 함
  const post = {
    id: params.id,
    title: "아이폰 14 프로 팝니다",
    price: 800000,
    location: "운정동",
    description: "거의 새것 같은 상태입니다. 케이스와 액정보호필름도 함께 드립니다.",
    author: {
      nickname: "파주사랑꾼",
      rank: "jang" as UserRank,
      avatar: "",
    },
    date: "2024-12-10",
    views: 123,
    status: "판매중",
    images: 3,
  };

  const comments = [
    {
      id: 1,
      author: {
        nickname: "구매자123",
        rank: "newbie" as UserRank,
        avatar: "",
      },
      content: "가격 협상 가능할까요?",
      date: "2시간 전",
    },
    {
      id: 2,
      author: {
        nickname: "스마트폰러버",
        rank: "dong" as UserRank,
        avatar: "",
      },
      content: "좋은 물건이네요! 관심있습니다.",
      date: "1시간 전",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/life/market"
          className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
        >
          ← 목록으로
        </Link>

        {/* 작성자 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <AuthorInfo
              nickname={post.author.nickname}
              rank={post.author.rank}
              avatar={post.author.avatar}
              showAvatar={true}
            />
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
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {post.status}
            </span>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-green-600 mb-4">
              {post.price.toLocaleString()}원
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPinIcon className="w-5 h-5 mr-2" />
              {post.location}
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: post.images }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-r from-green-400 to-orange-400 rounded-lg"
              >
                {/* 실제로는 이미지 표시 */}
              </div>
            ))}
          </div>

          {/* 상세 설명 */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">상세 설명</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.description}</p>
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
