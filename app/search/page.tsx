"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // 검색 로직 구현 (나중에)
        alert(`"${query}" 검색 결과가 없습니다.`);
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-2xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6 text-center">통합 검색</h1>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="검색어를 입력하세요..."
                        className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        autoFocus
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        검색
                    </button>
                </form>

                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-4">추천 검색어</h2>
                    <div className="flex flex-wrap gap-2">
                        {["파주 맛집", "헤이리 마을", "운정 호수공원", "주말 나들이", "카페 추천"].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
