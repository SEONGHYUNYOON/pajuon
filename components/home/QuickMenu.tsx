"use client";

import Link from "next/link";
import { Users, GraduationCap, Heart, Newspaper, Map, MessageCircle, Camera, Briefcase, Sun, ShoppingBag } from "lucide-react";

const menuItems = [
  {
    id: "news",
    label: "파주 소식 & 핫플",
    icon: Newspaper,
    href: "/community/news",
    color: "text-orange-500",
    hoverColor: "hover:text-orange-600",
  },
  {
    id: "neighborhood",
    label: "동네별 수다방",
    icon: MessageCircle,
    href: "/community/neighborhood",
    color: "text-indigo-500",
    hoverColor: "hover:text-indigo-600",
  },
  {
    id: "life",
    label: "파주 Life",
    icon: Sun,
    href: "/community/life",
    color: "text-yellow-500",
    hoverColor: "hover:text-yellow-600",
  },
  {
    id: "jobs",
    label: "파주인",
    icon: Briefcase,
    href: "/community/jobs",
    color: "text-teal-500",
    hoverColor: "hover:text-teal-600",
  },
  {
    id: "groups",
    label: "참여형 소셜",
    icon: Users,
    href: "/community/groups",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
  },
  {
    id: "events",
    label: "만남과 이벤트",
    icon: Heart,
    href: "/community/events",
    color: "text-pink-500",
    hoverColor: "hover:text-pink-600",
  },
  {
    id: "photo",
    label: "파주 사진전",
    icon: Camera,
    href: "/community/photo",
    color: "text-pink-600",
    hoverColor: "hover:text-pink-700",
  },
  {
    id: "tourism",
    label: "관광 & 정보",
    icon: Map,
    href: "/community/tourism",
    color: "text-green-500",
    hoverColor: "hover:text-green-600",
  },
  {
    id: "school",
    label: "아이러브스쿨",
    icon: GraduationCap,
    href: "/community/school",
    color: "text-purple-500",
    hoverColor: "hover:text-purple-600",
  },
  {
    id: "market",
    label: "파주팔아요",
    icon: ShoppingBag,
    href: "/life/market",
    color: "text-emerald-500",
    hoverColor: "hover:text-emerald-600",
  },
];

export default function QuickMenu() {
  return (
    <section className="bg-slate-900 py-6 px-4 rounded-3xl shadow-none border border-slate-800">
      <div className="w-full">
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 md:gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center space-y-2 flex-1 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 group-hover:from-yellow-300 group-hover:via-red-400 group-hover:to-purple-500 transition-all shadow-sm">
                  <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-900">
                    <Icon className={`w-7 h-7 ${item.color} transition-colors`} />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-300 text-center leading-tight">
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
