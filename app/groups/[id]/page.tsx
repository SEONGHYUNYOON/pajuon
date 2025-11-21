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
  MapPinIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "@/components/ui/PageHeader";
import TabButton from "@/components/ui/TabButton";
import Card from "@/components/ui/Card";

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
  const [activeTab, setActiveTab] = useState<"posts" | "gallery" | "schedule">("posts");

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
        <Card className="mb-6 overflow-hidden p-0">
          {group.coverImage && (
            <div className="w-full h-64 bg-gradient-to-br from-paju-blue to-paju-green overflow-hidden">
              <img
                src={group.coverImage}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-4 py-1 bg-paju-green/10 text-paju-green rounded-full text-sm font-medium">
                    {groupTypeLabels[group.type] || group.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    개설일: {new Date(group.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{group.name}</h1>
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
                    className="px-6 py-3 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors font-medium disabled:opacity-50"
                  >
                    <UserPlusIcon className="w-5 h-5 inline mr-2" />
                    {isJoining ? "가입 중..." : "가입하기"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
              <div className="flex items-center text-gray-600">
                <UserGroupIcon className="w-5 h-5 mr-2 text-paju-blue" />
                <span className="font-medium">{group._count?.members || group.members?.length || 0}명 참여</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-paju-blue" />
                <span className="font-medium">{group._count?.posts || group.posts?.length || 0}개 글</span>
              </div>
              <Link
                href={`/groups/${group.id}/chat`}
                className="flex items-center text-paju-blue hover:text-paju-blue-dark"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">채팅방 가기</span>
              </Link>
            </div>
          </div>
        </Card>

        {/* 탭 메뉴 */}
        <div className="flex space-x-2 mb-6">
          <TabButton
            id="posts"
            label="공지사항"
            icon={<DocumentTextIcon className="w-5 h-5" />}
            isActive={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          />
          <TabButton
            id="gallery"
            label="사진첩"
            icon={<PhotoIcon className="w-5 h-5" />}
            isActive={activeTab === "gallery"}
            onClick={() => setActiveTab("gallery")}
          />
          <TabButton
            id="schedule"
            label="일정"
            icon={<CalendarIcon className="w-5 h-5" />}
            isActive={activeTab === "schedule"}
            onClick={() => setActiveTab("schedule")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2">
            {activeTab === "posts" && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
                  {group.isMember && (
                    <Link
                      href={`/community/${group.type.toLowerCase()}/write?group=${group.id}`}
                      className="px-4 py-2 bg-paju-blue text-white rounded-lg hover:bg-paju-blue-dark transition-colors text-sm font-medium"
                    >
                      글쓰기
                    </Link>
                  )}
                </div>
                {group.posts && group.posts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {group.posts.map((post: any) => (
                      <Link
                        key={post.id}
                        href={`/community/${post.category}/${post.id}`}
                        className="block p-4 hover:bg-gray-50 transition-colors"
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
              </Card>
            )}

            {activeTab === "gallery" && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">사진첩</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <PhotoIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "schedule" && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">일정</h2>
                <div className="space-y-4">
                  {[
                    { date: "2024-12-20", title: "정기 모임", location: "운정호수공원" },
                    { date: "2024-12-27", title: "연말 모임", location: "파주시민회관" },
                  ].map((event, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <CalendarIcon className="w-5 h-5 text-paju-blue" />
                        <span className="font-semibold text-gray-900">{event.date}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 모임 정보 */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">모임 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">카테고리:</span>
                  <span className="font-medium">{groupTypeLabels[group.type] || group.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">멤버 수:</span>
                  <span className="font-medium">{group._count?.members || group.members?.length || 0}명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">게시글 수:</span>
                  <span className="font-medium">{group._count?.posts || group.posts?.length || 0}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">개설자:</span>
                  <span className="font-medium">{group.creator.nickname}</span>
                </div>
              </div>
            </Card>

            {/* 참여 멤버 미리보기 */}
            {group.members && group.members.length > 0 && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  참여 멤버 ({group.members.length}명)
                </h3>
                <div className="space-y-3">
                  {group.members.slice(0, 5).map((member: any) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-paju-blue to-paju-green rounded-full flex items-center justify-center text-white font-medium">
                        {member.user.nickname?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{member.user.nickname}</div>
                        {member.role === "ADMIN" && (
                          <div className="text-xs text-paju-blue">관리자</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
