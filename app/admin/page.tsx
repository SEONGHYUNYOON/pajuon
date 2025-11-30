"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Users, FileText, MessageSquare, Trash2, AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminPage() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [stats, setStats] = useState({
        users: 0,
        posts: 0,
        comments: 0,
    });
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        // Check if user has admin role
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin") {
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        setIsAdmin(true);
        loadDashboardData();
    };

    const loadDashboardData = async () => {
        setLoading(true);
        const supabase = createClient();

        try {
            // Load stats (approximate counts for performance)
            const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
            const { count: postCount } = await supabase.from("posts").select("*", { count: "exact", head: true });
            const { count: commentCount } = await supabase.from("comments").select("*", { count: "exact", head: true });

            setStats({
                users: userCount || 0,
                posts: postCount || 0,
                comments: commentCount || 0,
            });

            // Load recent posts
            const { data: posts } = await supabase
                .from("posts")
                .select("*, profiles(nickname)")
                .order("created_at", { ascending: false })
                .limit(10);

            setRecentPosts(posts || []);
        } catch (error) {
            console.error("Failed to load admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId: string) => {
        if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

        const supabase = createClient();
        const { error } = await supabase.from("posts").delete().eq("id", postId);

        if (error) {
            alert("삭제 실패: " + error.message);
        } else {
            alert("게시글이 삭제되었습니다.");
            loadDashboardData();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAdmin === false) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h1>
                <p className="text-gray-500 mb-6">관리자만 접근할 수 있는 페이지입니다.</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-100 shadow-sm flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">ADMIN</span>
                    관리자 대시보드
                </h1>
                <button
                    onClick={loadDashboardData}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <RefreshCw className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <div className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">총 사용자</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.users.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">총 게시글</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.posts.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">총 댓글</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.comments.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Posts Management */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">최근 게시글 관리</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3 font-medium">제목</th>
                                    <th className="px-6 py-3 font-medium">작성자</th>
                                    <th className="px-6 py-3 font-medium">작성일</th>
                                    <th className="px-6 py-3 font-medium text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            게시글이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    recentPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                                                <p className="text-xs text-gray-500 line-clamp-1">{post.content}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {post.profiles?.nickname || "알 수 없음"}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-500">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="삭제"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
