"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// 카테고리 매핑
const CATEGORY_NAMES: Record<string, string> = {
    news: "파주 소식 & 핫플",
    neighborhood: "동네별 수다방",
    life: "파주 Life",
    jobs: "파주인",
    groups: "참여형 소셜",
    events: "만남과 이벤트",
    photo: "파주 사진전",
    tourism: "관광 & 정보",
    school: "아이러브스쿨",
    market: "파주팔아요",
};

export default function CommunityBoard() {
    const params = useParams();
    const category = params.category as string;
    const categoryName = CATEGORY_NAMES[category] || "커뮤니티";

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                    <Link
                        href={`/community/write?category=${category}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0D4FFF] text-white rounded-lg hover:bg-[#0A3FD9] transition-colors"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                        글쓰기
                    </Link>
                </div>

                {/* 게시글 목록 (더미) */}
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Link
                            key={i}
                            href={`/community/${category}/${i}`}
                            className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                    {categoryName} 게시글 제목입니다. ({i})
                                </span>
                                <span className="text-xs text-gray-500">1시간 전</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>작성자{i}</span>
                                <span>·</span>
                                <span>조회 {i * 123}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center text-gray-500 text-sm">
                    게시글이 더 이상 없습니다.
                </div>
            </div>
        </div>
    );
}
