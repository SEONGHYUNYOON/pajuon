"use client";

import { useState } from "react";
import {
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    XMarkIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartIconSolid,
    CheckBadgeIcon
} from "@heroicons/react/24/solid";

// 더미 데이터: 사용자 정보
const userProfile = {
    id: "user1",
    nickname: "파주지킴이",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200",
    badge: "이장님",
    stats: {
        posts: 128,
        followers: 3540,
        following: 210,
    },
    bio: "파주의 숨은 명소를 찾아다니는 파주 토박이입니다. 📸\n맛집, 카페, 산책로 정보 공유해요!",
    isMe: false, // 내 프로필 여부 (더미)
};

// 더미 데이터: 게시물 목록
const posts = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${[
        "1516483638261-f4dbaf036963", // Cinque Terre
        "1523906834658-6e24ef2386f9", // Venice
        "1476514525535-07fb3b4ae5f1", // Switzerland
        "1500530855697-b586d89ba3ee", // Paris
        "1502602898657-3e91760cbb34", // Paris 2
        "1499678329028-101435549a4e", // Italy
        "1504198458649-3128b932f49e", // Norway
        "1534234828563-02d93023296e", // Hallstatt
        "1467269204594-9661b134dd2b", // Germany
        "1470770841072-f978cf4d019e", // Austria
        "1501785888041-af3ef285b470", // Lake
        "1493246507139-91e8fad9978e", // Mountains
    ][i % 12]}?auto=format&fit=crop&w=600&h=600&q=80`,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 50),
    content: `파주의 아름다운 풍경 ${i + 1}번째 사진입니다. #파주 #여행 #풍경`,
    date: "2일 전",
}));

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("photos");
    const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-4xl mx-auto">

                {/* 1. 프로필 헤더 */}
                <div className="px-4 py-8 md:px-8 md:py-10 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                        {/* 아바타 */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                                <img
                                    src={userProfile.avatar}
                                    alt={userProfile.nickname}
                                    className="w-full h-full rounded-full object-cover border-4 border-white"
                                />
                            </div>
                        </div>

                        {/* 정보 섹션 */}
                        <div className="flex-1 text-center md:text-left w-full">
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                                <h1 className="text-2xl font-light text-gray-900 flex items-center gap-2">
                                    {userProfile.nickname}
                                    <CheckBadgeIcon className="w-6 h-6 text-blue-500" title={userProfile.badge} />
                                </h1>

                                <div className="flex gap-2">
                                    {userProfile.isMe ? (
                                        <button className="px-4 py-1.5 bg-gray-100 text-gray-900 font-medium rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                            프로필 편집
                                        </button>
                                    ) : (
                                        <>
                                            <button className="px-6 py-1.5 bg-blue-500 text-white font-medium rounded-lg text-sm hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200">
                                                팔로우
                                            </button>
                                            <button className="px-4 py-1.5 bg-gray-100 text-gray-900 font-medium rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                                메시지
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* 스탯 (PC) */}
                            <div className="hidden md:flex items-center gap-8 mb-4 text-base">
                                <div className="flex gap-1">
                                    <span className="font-semibold text-gray-900">게시물</span>
                                    <span className="font-bold text-gray-900">{userProfile.stats.posts}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-semibold text-gray-900">팔로워</span>
                                    <span className="font-bold text-gray-900">{userProfile.stats.followers}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-semibold text-gray-900">팔로잉</span>
                                    <span className="font-bold text-gray-900">{userProfile.stats.following}</span>
                                </div>
                            </div>

                            {/* 자기소개 */}
                            <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                                {userProfile.bio}
                            </div>
                        </div>
                    </div>

                    {/* 스탯 (모바일) */}
                    <div className="flex md:hidden items-center justify-around mt-6 py-4 border-t border-gray-100 text-sm">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-lg">{userProfile.stats.posts}</span>
                            <span className="text-gray-500">게시물</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-lg">{userProfile.stats.followers}</span>
                            <span className="text-gray-500">팔로워</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-gray-900 text-lg">{userProfile.stats.following}</span>
                            <span className="text-gray-500">팔로잉</span>
                        </div>
                    </div>
                </div>

                {/* 2. 탭 네비게이션 */}
                <div className="flex border-b border-gray-200">
                    {[
                        { id: "photos", label: "📸 사진첩" },
                        { id: "posts", label: "📝 작성글" },
                        { id: "guestbook", label: "📖 방명록" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 text-sm font-medium tracking-wide transition-all uppercase ${activeTab === tab.id
                                    ? "border-b-2 border-gray-900 text-gray-900"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 3. 콘텐츠 영역 (사진첩 그리드) */}
                {activeTab === "photos" && (
                    <div className="grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="relative aspect-square group cursor-pointer overflow-hidden bg-gray-100"
                                onClick={() => setSelectedPost(post)}
                            >
                                <img
                                    src={post.image}
                                    alt={`Post ${post.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold">
                                    <div className="flex items-center gap-2">
                                        <HeartIconSolid className="w-6 h-6" />
                                        <span>{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 탭: 작성글/방명록 (준비중) */}
                {activeTab !== "photos" && (
                    <div className="py-20 text-center text-gray-500">
                        <p className="text-lg">아직 게시물이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* 4. 게시물 상세 모달 */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
                    <div
                        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 모달 이미지 */}
                        <div className="md:w-3/5 bg-black flex items-center justify-center">
                            <img
                                src={selectedPost.image}
                                alt="Post Detail"
                                className="max-h-[50vh] md:max-h-[90vh] w-full object-contain"
                            />
                        </div>

                        {/* 모달 내용 */}
                        <div className="md:w-2/5 flex flex-col h-[50vh] md:h-auto">
                            {/* 헤더 */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img src={userProfile.avatar} alt={userProfile.nickname} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-sm text-gray-900">{userProfile.nickname}</span>
                                </div>
                                <button onClick={() => setSelectedPost(null)}>
                                    <EllipsisHorizontalIcon className="w-6 h-6 text-gray-900" />
                                </button>
                            </div>

                            {/* 본문 & 댓글 (스크롤) */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                        <img src={userProfile.avatar} alt={userProfile.nickname} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold mr-2">{userProfile.nickname}</span>
                                        <span className="text-gray-800">{selectedPost.content}</span>
                                        <div className="text-xs text-gray-400 mt-1">{selectedPost.date}</div>
                                    </div>
                                </div>

                                {/* 더미 댓글 */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"></div>
                                        <div className="text-sm">
                                            <span className="font-bold mr-2">user_{i}</span>
                                            <span className="text-gray-800">사진 정말 멋지네요! 👍</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 액션 버튼 */}
                            <div className="p-4 border-t border-gray-100">
                                <div className="flex items-center gap-4 mb-2">
                                    <HeartIcon className="w-7 h-7 text-gray-900 hover:text-red-500 cursor-pointer transition-colors" />
                                    <ChatBubbleOvalLeftIcon className="w-7 h-7 text-gray-900 cursor-pointer" />
                                </div>
                                <div className="font-bold text-sm mb-1">좋아요 {selectedPost.likes}개</div>
                                <div className="text-xs text-gray-400 uppercase">2일 전</div>
                            </div>
                        </div>

                        {/* 닫기 버튼 (모바일) */}
                        <button
                            className="absolute top-2 right-2 md:hidden text-white drop-shadow-md"
                            onClick={() => setSelectedPost(null)}
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
