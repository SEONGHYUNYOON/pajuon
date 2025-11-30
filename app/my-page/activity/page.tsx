"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentTextIcon, ChatBubbleLeftRightIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";

function ActivityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [myComments, setMyComments] = useState<any[]>([]);
  const [myScraps, setMyScraps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // 1. 세션 확인
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setIsLoggedIn(true);

      try {
        setLoading(true);

        // 2. 내가 쓴 글 가져오기
        const { data: postsData } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false });

        if (postsData) {
          setMyPosts(postsData.map(post => ({
            id: post.id,
            title: post.title,
            category: post.category,
            date: new Date(post.created_at).toLocaleDateString(),
            views: post.views,
            comments: 0 // 댓글 수는 별도 쿼리 필요하지만 일단 0으로
          })));
        }

        // 3. 내가 쓴 댓글 가져오기
        const { data: commentsData } = await supabase
          .from("comments")
          .select("*, posts(title)")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false });

        if (commentsData) {
          setMyComments(commentsData.map(comment => ({
            id: comment.id,
            postTitle: comment.posts?.title || "삭제된 게시글",
            content: comment.content,
            date: new Date(comment.created_at).toLocaleDateString(),
            postId: comment.post_id
          })));
        }

        // 4. 스크랩한 글 가져오기
        const { data: scrapsData } = await supabase
          .from("scraps")
          .select("*, posts(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (scrapsData) {
          setMyScraps(scrapsData.map(scrap => ({
            id: scrap.id,
            title: scrap.posts?.title || "삭제된 게시글",
            category: scrap.posts?.category || "기타",
            date: new Date(scrap.created_at).toLocaleDateString()
          })));
        }

      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const tab = searchParams.get("tab") || "posts";
    setActiveTab(tab);
  }, [router, searchParams]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/my-page"
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← 마이페이지로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">내 활동</h1>
        </div>

        {/* 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex space-x-2 border border-gray-100">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === "posts"
              ? "bg-green-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>내가 쓴 글</span>
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === "comments"
              ? "bg-green-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>내가 쓴 댓글</span>
          </button>
          <button
            onClick={() => setActiveTab("scraps")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === "scraps"
              ? "bg-green-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <BookmarkIcon className="w-5 h-5" />
            <span>스크랩한 글</span>
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {activeTab === "posts" && (
            <div className="divide-y divide-gray-200">
              {myPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{post.date}</span>
                        <span>조회 {post.views}</span>
                        <span>댓글 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {myPosts.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  작성한 글이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="divide-y divide-gray-200">
              {myComments.map((comment) => (
                <Link
                  key={comment.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">원글: </span>
                    <span className="text-sm font-medium text-gray-900">{comment.postTitle}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">{comment.date}</div>
                </Link>
              ))}
              {myComments.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  작성한 댓글이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "scraps" && (
            <div className="divide-y divide-gray-200">
              {myScraps.map((scrap) => (
                <Link
                  key={scrap.id}
                  href={`#`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          {scrap.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{scrap.title}</h3>
                      </div>
                      <div className="text-sm text-gray-500">{scrap.date}</div>
                    </div>
                  </div>
                </Link>
              ))}
              {myScraps.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  스크랩한 글이 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩 중...</div>}>
      <ActivityContent />
    </Suspense>
  );
}
