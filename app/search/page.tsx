"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// 더미 검색 결과 데이터
const dummyResults = [
    { id: 1, title: "파주 맛집 리스트 2023", type: "매거진", link: "/community/tourism/1" },
    { id: 2, title: "헤이리 마을 주차 꿀팁", type: "생활정보", link: "/community/life" },
    { id: 3, title: "운정 호수공원 야경 산책", type: "명소", link: "/community/tourism/2" },
    { id: 4, title: "주말 나들이 코스 추천", type: "매거진", link: "/community/tourism/3" },
    { id: 5, title: "분위기 좋은 카페 추천", type: "카페", link: "/community/tourism/4" },
    { id: 6, title: "조리읍 맛집 탐방", type: "맛집", link: "/community/tourism/5" },
    { id: 7, title: "조리 도서관 운영 시간", type: "생활정보", link: "/community/life" },
];

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<typeof dummyResults>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setHasSearched(true);
        // 더미 검색 로직: 검색어가 포함된 결과 필터링
        const filtered = dummyResults.filter(item =>
            item.title.includes(query) || item.type.includes(query)
        );
        setResults(filtered);
    };

    return (
        <div className="min-h-screen bg-white p-4 flex flex-col items-center pt-20">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">통합 검색</h1>
                <form onSubmit={handleSearch} className="relative mb-10">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="검색어를 입력하세요..."
                        className="w-full p-4 pl-14 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-lg"
                        autoFocus
                    />
                    <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-bold"
                    >
                        검색
                    </button>
                </form>

                {hasSearched ? (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold mb-4">
                            '{query}' 검색 결과 ({results.length}건)
                        </h2>
                        {results.length > 0 ? (
                            results.map((result) => (
                                <Link
                                    key={result.id}
                                    href={result.link}
                                    className="block p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                                            {result.type}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                                <p className="mb-2">검색 결과가 없습니다.</p>
                                <p className="text-sm">다른 검색어로 다시 시도해보세요.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold mb-4">추천 검색어</h2>
                        <div className="flex flex-wrap gap-2">
                            {["파주 맛집", "헤이리 마을", "운정 호수공원", "주말 나들이", "카페 추천", "조리"].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setQuery(tag);
                                        // 바로 검색 실행 효과
                                        setHasSearched(true);
                                        const filtered = dummyResults.filter(item =>
                                            item.title.includes(tag) || item.type.includes(tag)
                                        );
                                        setResults(filtered);
                                    }}
                                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
