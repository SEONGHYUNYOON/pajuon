"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhotoIcon,
  CalendarIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const groupTypeLabels: Record<string, string> = {
  HIKING: "등산",
  RIDING: "라이딩",
  SOCCER: "고지 축구",
  CAMPING: "캠핑",
  OTHER: "기타",
};

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [group, setGroup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "gallery" | "members">("posts");

  useEffect(() => {
    loadGroup();
  }, [params.id]);

  const loadGroup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/groups/${params.id}`);
      const data = await response.json();
      if (data.group) {
        setGroup(data.group);
      }
    } catch (error) {
      console.error("Failed to load group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    setIsJoining(true);
    try {
      const response = await fetch(`/api/groups/${params.id}/join`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        alert("모임 가입이 완료되었습니다!");
        loadGroup();
      } else {
        alert(data.error || "모임 가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Join error:", error);
      alert("모임 가입 중 오류가 발생했습니다.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm("정말 모임을 탈퇴하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/groups/${params.id}/join`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("모임 탈퇴가 완료되었습니다.");
        loadGroup();
      }
    } catch (error) {
      console.error("Leave error:", error);
      alert("모임 탈퇴 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">모임을 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 모임 헤더 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          {group.coverImage && (
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden">
              <img
                src={group.coverImage}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {groupTypeLabels[group.type] || group.type}
                </span>
                <span className="text-sm text-gray-500">
                  개설일: {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{group.name}</h1>
              <p className="text-lg text-gray-600 mb-6 whitespace-pre-line">{group.description}</p>
            </div>
            <div className="ml-6">
              {group.isMember ? (
                <button
                  onClick={handleLeave}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <XMarkIcon className="w-5 h-5 inline mr-2" />
                  탈퇴하기
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  <UserPlusIcon className="w-5 h-5 inline mr-2" />
                  {isJoining ? "가입 중..." : "가입하기"}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
            <div className="flex items-center text-gray-600">
              <UserGroupIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">{group._count?.members || group.members?.length || 0}명 참여</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">{group._count?.posts || group.posts?.length || 0}개 글</span>
            </div>
            <Link
              href={`/groups/${group.id}/chat`}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">채팅방 가기</span>
            </Link>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex space-x-1 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === "posts"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <DocumentTextIcon className="w-5 h-5 inline mr-2" />
              공지사항
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === "gallery"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <PhotoIcon className="w-5 h-5 inline mr-2" />
              활동 사진
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === "members"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <UserGroupIcon className="w-5 h-5 inline mr-2" />
              참여 멤버
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            {activeTab === "posts" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
                  {group.isMember && (
                    <Link
                      href={`/community/${group.type.toLowerCase()}/write?group=${group.id}`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      글쓰기
                    </Link>
                  )}
                </div>
                {group.posts && group.posts.length > 0 ? (
                  <div className="space-y-4">
                    {group.posts.map((post: any) => (
                      <Link
                        key={post.id}
                        href={`/community/${post.category}/${post.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{post.author.nickname}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>댓글 {post.comments?.length || 0}개</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    아직 게시글이 없습니다.
                  </div>
                )}
              </>
            )}

            {activeTab === "gallery" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">활동 사진</h2>
                <div className="text-center py-12 text-gray-500">
                  갤러리 기능은 추후 구현 예정입니다.
                </div>
              </div>
            )}

            {activeTab === "members" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  참여 멤버 ({group.members?.length || 0}명)
                </h2>
                {group.members && group.members.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.members.map((member: any) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white font-medium text-lg">
                          {member.user.nickname?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{member.user.nickname}</div>
                          <div className="text-xs text-gray-500">{member.user.rank}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(member.joinedAt).toLocaleDateString()} 가입
                          </div>
                        </div>
                        {member.role === "ADMIN" && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                            관리자
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    아직 멤버가 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 모임 정보 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">모임 정보</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">카테고리:</span>
                  <span className="ml-2 font-medium">{groupTypeLabels[group.type] || group.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">멤버 수:</span>
                  <span className="ml-2 font-medium">{group._count?.members || group.members?.length || 0}명</span>
                </div>
                <div>
                  <span className="text-gray-600">게시글 수:</span>
                  <span className="ml-2 font-medium">{group._count?.posts || group.posts?.length || 0}개</span>
                </div>
                <div>
                  <span className="text-gray-600">개설자:</span>
                  <span className="ml-2 font-medium">{group.creator.nickname}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
