"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Lock, User, ChevronRight, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">설정</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* 계정 설정 */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">계정</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-gray-900 font-medium">프로필 수정</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <span className="text-gray-900 font-medium">비밀번호 변경</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </section>

                {/* 알림 설정 */}
                <section>
                    <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">알림</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                                    <Bell className="w-4 h-4" />
                                </div>
                                <span className="text-gray-900 font-medium">푸시 알림</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={notificationsEnabled}
                                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* 기타 */}
                <section>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                    </button>
                </section>

                <div className="text-center text-xs text-gray-400 py-4">
                    버전 1.2.0
                </div>
            </div>
        </div>
    );
}
