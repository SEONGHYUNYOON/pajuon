"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";

interface PostItem {
  id: string | number;
  title: string;
  category?: string;
  commentCount: number;
  createdAt: string;
  author?: string;
  views?: number;
}

interface BoardListWidgetProps {
  title: string;
  href?: string;
  posts: PostItem[];
  showCategory?: boolean;
}

export default function BoardListWidget({
  title,
  href,
  posts,
  showCategory = true,
}: BoardListWidgetProps) {
  const formatTime = (dateString: string) => {
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
    return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  };

  return (
    <Card className="overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {href && (
          <Link
            href={href}
            className="flex items-center text-paju-blue hover:text-paju-blue-dark text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            더보기
          </Link>
        )}
      </div>

      {/* 리스트 */}
      <div className="divide-y divide-gray-100">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              {/* 카테고리 뱃지 */}
              {showCategory && post.category && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded whitespace-nowrap">
                  {post.category}
                </span>
              )}

              {/* 글 제목 */}
              <span className="flex-1 text-sm text-gray-900 hover:text-paju-blue line-clamp-1">
                {post.title}
              </span>

              {/* 댓글 수 & 작성 시간 */}
              <div className="flex items-center gap-3 text-xs">
                {post.commentCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded font-medium">
                    {post.commentCount}
                  </span>
                )}
                <span className="text-gray-500 whitespace-nowrap">
                  {formatTime(post.createdAt)}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 text-sm">
            게시글이 없습니다.
          </div>
        )}
      </div>
    </Card>
  );
}

