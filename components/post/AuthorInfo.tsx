"use client";

import UserRankBadge, { type UserRank } from "@/components/user/UserRankBadge";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface AuthorInfoProps {
  nickname: string;
  rank: UserRank | "newbie";
  avatar?: string;
  className?: string;
  showAvatar?: boolean;
}

export default function AuthorInfo({
  nickname,
  rank,
  avatar,
  className = "",
  showAvatar = true,
}: AuthorInfoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showAvatar && (
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={nickname} className="w-full h-full object-cover" />
          ) : (
            nickname.charAt(0)
          )}
        </div>
      )}
      <span className="font-medium text-gray-900">{nickname}</span>
      <UserRankBadge rank={rank === "newbie" ? "NEWBIE" : rank} />
    </div>
  );
}
