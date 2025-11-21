"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { MapPinIcon, ChatBubbleLeftRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import Card from "./Card";
import Badge from "./Badge";

interface PostCardProps {
  id: string;
  title: string;
  content?: string;
  author: {
    nickname: string;
    profileImage?: string | null;
  };
  commentCount?: number;
  viewCount?: number;
  createdAt: string;
  category?: string;
  location?: string;
  href: string;
  imageUrl?: string;
  className?: string;
}

export default function PostCard({
  id,
  title,
  content,
  author,
  commentCount = 0,
  viewCount = 0,
  createdAt,
  category,
  location,
  href,
  imageUrl,
  className = "",
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString();
  };

  return (
    <Card href={href} className={className}>
      {imageUrl && (
        <div className="h-48 bg-gradient-to-br from-green-400 to-orange-400 relative overflow-hidden rounded-t-xl -m-6 mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {category && (
            <div className="absolute top-4 left-4">
              <Badge variant="success" size="sm">
                {category}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {content && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {content}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{author.nickname}</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-600">
            {location && (
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {location}
              </div>
            )}
            <div className="flex items-center">
              <EyeIcon className="w-4 h-4 mr-1" />
              {viewCount}
            </div>
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
              {commentCount}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

