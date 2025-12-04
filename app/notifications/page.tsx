"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white px-4 py-6 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Bell className="w-6 h-6 text-gray-900" />
                    알림
                </h1>
            </div>

            <div className="p-4 flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">새로운 알림이 없습니다</h2>
                <p className="text-gray-500 text-sm">
                    새로운 소식이 도착하면 이곳에서 알려드릴게요.
                </p>
            </div>
        </div>
    );
}
