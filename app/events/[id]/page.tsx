"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // 실제로는 params.id로 API 호출하여 데이터를 가져와야 함
  const event = {
    id: params.id,
    title: "미혼 선남선녀 미팅",
    date: "2024-12-15",
    time: "14:00 - 17:00",
    location: "파주시민회관 3층 대회의실",
    address: "경기도 파주시 시청로 50",
    participants: 45,
    maxParticipants: 50,
    status: "신청중",
    type: "미팅",
    description: `파주 지역 미혼 남녀를 위한 특별한 만남의 시간입니다. 
    자연스러운 레크레이션과 대화를 통해 새로운 인연을 만들어보세요.
    즐거운 게임과 활동을 통해 부담 없이 서로를 알아갈 수 있습니다.`,
    mc: {
      name: "김파주",
      title: "프로 MC",
      description: "다수의 미팅 행사 MC 경력 보유, 따뜻하고 친근한 진행 스타일",
    },
    schedule: [
      { time: "14:00", activity: "입장 및 네트워킹" },
      { time: "14:30", activity: "오프닝 및 레크레이션 시작" },
      { time: "15:00", activity: "팀별 게임 활동" },
      { time: "15:30", activity: "자유 대화 시간" },
      { time: "16:00", activity: "조별 만남" },
      { time: "16:30", activity: "마무리 및 네트워킹" },
      { time: "17:00", activity: "행사 종료" },
    ],
  };
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    introduction: "",
    maritalStatus: "single", // 미혼 확인용
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    if (formData.maritalStatus !== "single") {
      alert("미팅 이벤트는 미혼 분들만 신청 가능합니다.");
      return;
    }

    if (!formData.age || !formData.gender || !formData.introduction) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/events/matchmaking/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: params.id,
          age: parseInt(formData.age),
          gender: formData.gender,
          introduction: formData.introduction,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("미팅 신청이 완료되었습니다! 관리자 승인 후 참가 가능합니다.");
        setFormData({ age: "", gender: "", introduction: "", maritalStatus: "single" });
      } else {
        alert(data.error || "신청 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert("신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 이벤트 헤더 */}
        <div className="bg-gradient-to-r from-orange-500 to-green-500 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                {event.status}
              </span>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <div className="space-y-2 text-lg">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {event.date} {event.time}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  {event.participants}/{event.maxParticipants}명
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full"
              style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 행사 개요 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">행사 개요</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* 레크레이션 MC 소개 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">레크레이션 MC 소개</h2>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  MC
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.mc.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{event.mc.title}</p>
                  <p className="text-gray-600">{event.mc.description}</p>
                </div>
              </div>
            </div>

            {/* 일정 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">행사 일정</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-20 text-right">
                      <div className="text-lg font-semibold text-orange-600">{item.time}</div>
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-200 last:border-0">
                      <div className="font-medium text-gray-900">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 참가 신청 폼 (미팅 이벤트인 경우) */}
          {event.type === "미팅" && (
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl shadow-sm p-6 sticky top-24 border-2 border-pink-200">
                <div className="flex items-center mb-4">
                  <HeartIcon className="w-6 h-6 text-pink-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">미팅 신청</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  미혼 남녀만 신청 가능합니다. 정확한 정보를 입력해주세요.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      결혼 상태 *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    >
                      <option value="single">미혼</option>
                      <option value="married">기혼</option>
                      <option value="divorced">이혼</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      나이 *
                    </label>
                    <input
                      type="number"
                      required
                      min="20"
                      max="50"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="만 나이를 입력해주세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      성별 *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "MALE" })}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          formData.gender === "MALE"
                            ? "border-pink-500 bg-pink-100 text-pink-700"
                            : "border-gray-300 hover:border-pink-300"
                        }`}
                      >
                        남성
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "FEMALE" })}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          formData.gender === "FEMALE"
                            ? "border-pink-500 bg-pink-100 text-pink-700"
                            : "border-gray-300 hover:border-pink-300"
                        }`}
                      >
                        여성
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자기소개 *
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formData.introduction}
                      onChange={(e) =>
                        setFormData({ ...formData, introduction: e.target.value })
                      }
                      placeholder="자신을 소개해주세요. 취미, 직업, 성격 등을 자유롭게 작성해주세요."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.introduction.length}/500자
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.maritalStatus !== "single"}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-lg hover:from-pink-700 hover:to-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "신청 중..." : "미팅 신청하기"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    신청 후 관리자 승인을 거쳐 참가가 확정됩니다
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
