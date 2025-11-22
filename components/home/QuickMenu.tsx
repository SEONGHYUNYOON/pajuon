"use client";

import Link from "next/link";
import { Users, GraduationCap, Heart, Newspaper, Map, MessageCircle, Camera, Briefcase, Sun } from "lucide-react";

const menuItems = [
  {
    id: "community",
    label: "참여형 소셜",
    icon: Users,
    href: "/groups",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
  },
  {
    id: "school",
    label: "아이러브스쿨",
    icon: GraduationCap,
    href: "/school",
    color: "text-purple-500",
    hoverColor: "hover:text-purple-600",
  },
  {
    id: "events",
    label: "만남과 이벤트",
    icon: Heart,
    href: "/events",
    color: "text-pink-500",
    hoverColor: "hover:text-pink-600",
  },
  {
    id: "news",
    label: "파주 소식 & 핫플",
    icon: Newspaper,
    href: "/news",
    color: "text-orange-500",
    hoverColor: "hover:text-orange-600",
  },
  {
    id: "tourism",
    label: "관광 & 정보",
    icon: Map,
    href: "/tourism",
    color: "text-green-500",
    hoverColor: "hover:text-green-600",
  },
  {
    id: "neighborhood",
    label: "동네별 수다방",
    icon: MessageCircle,
    href: "/neighborhood",
    color: "text-indigo-500",
    hoverColor: "hover:text-indigo-600",
  },
  {
    id: "photo",
    label: "파주 사진전",
    icon: Camera,
    href: "/photo",
    color: "text-pink-600",
    hoverColor: "hover:text-pink-700",
  },
  {
    id: "jobs",
    label: "파주인",
    icon: Briefcase,
    href: "/jobs",
    color: "text-teal-500",
    hoverColor: "hover:text-teal-600",
  },
  {
    id: "life",
    label: "파주 Life",
    icon: Sun,
    href: "/life",
    color: "text-yellow-500",
    hoverColor: "hover:text-yellow-600",
  },
];

export default function QuickMenu() {
  return (
    <section className="bg-white py-6 px-4 rounded-3xl shadow-lg shadow-gray-200/50">
      <div className="w-full">
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center space-y-3 flex-1 transition-all hover:scale-105 active:scale-95"
              >
                <div className="w-16 h-16 bg-gray-50 active:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <Icon className={`w-8 h-8 ${item.color} ${item.hoverColor} transition-colors`} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
