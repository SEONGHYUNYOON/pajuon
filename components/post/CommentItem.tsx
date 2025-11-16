"use client";

import AuthorInfo from "./AuthorInfo";
import { type UserRank } from "@/components/user/UserRankBadge";

interface CommentItemProps {
  id: number;
  author: {
    nickname: string;
    rank: UserRank | "newbie";
    avatar?: string;
  };
  content: string;
  date: string;
  onReply?: (commentId: number) => void;
}

export default function CommentItem({
  id,
  author,
  content,
  date,
  onReply,
}: CommentItemProps) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <div className="flex items-start justify-between mb-2">
        <AuthorInfo
          nickname={author.nickname}
          rank={author.rank}
          avatar={author.avatar}
          showAvatar={true}
        />
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-gray-700 mb-3">{content}</p>
      {onReply && (
        <button
          onClick={() => onReply(id)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          답글
        </button>
      )}
    </div>
  );
}
