"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPinIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";

const areas = ["전체", "운정", "교하", "금촌", "문산", "기타"];



export default function LocalCommunityPage() {
  const [activeArea, setActiveArea] = useState("전체");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const supabase = createClient();

      let query = supabase
        .from("posts")
        .select("*, profiles(nickname)")
        .order("created_at", { ascending: false });

      if (activeArea !== "전체") {
        query = query.eq("area", activeArea);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data.map(post => ({
          id: post.id,
          title: post.title,
          area: post.area,
          author: post.profiles?.nickname || "익명",
          date: new Date(post.created_at).toLocaleDateString(),
          comments: 0, // 댓글 수 쿼리 필요
          views: post.views
        })));
      }
      setLoading(false);
    };

    fetchPosts();
  }, [activeArea]);

  const filteredPosts = posts;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <MapPinIcon className="w-10 h-10 text-green-500" />
                <h1 className="text-4xl font-bold text-gray-900">동네별 소모임</h1>
              </div>
              <p className="text-lg text-gray-600">
                우리 동네 사람들끼리 소통하는 공간입니다
              </p>
            </div>
            <Link
              href="/community/local/write"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              글쓰기
            </Link>
          </div>
        </div>

        {/* 동네 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">동네 선택</h2>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeArea === area
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {activeArea === "전체" ? "전체" : `${activeArea}동`} 게시판
              </h2>
              <div className="text-sm text-gray-500">
                총 {filteredPosts.length}개 글
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/community/local/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {post.area}동
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <span>{post.date}</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    <span className="text-green-600 font-medium">{post.comments}</span>
                    <span className="ml-1">댓글</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {activeArea === "전체" ? "등록된 글이 없습니다." : `${activeArea}동에 등록된 글이 없습니다.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
