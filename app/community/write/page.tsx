"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function WriteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "free";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("로그인이 필요합니다.");
                router.push("/auth/login");
                return;
            }

            // TODO: 실제 DB에 저장하는 로직 구현 (posts 테이블 필요)
            // const { error } = await supabase.from('posts').insert({ ... });

            // 임시 성공 처리
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("게시글이 등록되었습니다. (데모)");
            router.push(`/community/${category}`);
        } catch (error) {
            console.error("Error:", error);
            alert("오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                </label>
                <select
                    id="category"
                    value={category}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                >
                    <option value={category}>{category}</option>
                </select>
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    제목
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="제목을 입력하세요"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    내용
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="내용을 입력하세요"
                    required
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    취소
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-[#0D4FFF] text-white rounded-lg hover:bg-[#0A3FD9] disabled:bg-gray-400 transition-colors"
                >
                    {isSubmitting ? "등록 중..." : "등록하기"}
                </button>
            </div>
        </form>
    );
}

export default function WritePage() {
    return (
        <div className="bg-white">
            <div className="px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">글쓰기</h1>
                <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl"></div>}>
                    <WriteForm />
                </Suspense>
            </div>
        </div>
    );
}
