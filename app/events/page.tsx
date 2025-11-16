import Link from "next/link";
import { CalendarIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const events = [
  {
    id: 1,
    title: "미혼 선남선녀 미팅",
    date: "2024-12-15",
    time: "14:00 - 17:00",
    location: "파주시민회관 3층 대회의실",
    participants: 45,
    maxParticipants: 50,
    status: "신청중",
    type: "미팅",
  },
  {
    id: 2,
    title: "파주 지역축제",
    date: "2024-12-20",
    time: "10:00 - 18:00",
    location: "운정호수공원",
    participants: 120,
    maxParticipants: 200,
    status: "신청중",
    type: "축제",
  },
  {
    id: 3,
    title: "파주 시민 대토론회",
    date: "2024-12-25",
    time: "19:00 - 21:00",
    location: "파주시청 대강당",
    participants: 80,
    maxParticipants: 100,
    status: "신청중",
    type: "토론",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <CalendarIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ON-이벤트</h1>
          <p className="text-lg text-gray-600">
            PAJU ON에서 주최하는 공식 이벤트에 참여해보세요
          </p>
        </div>

        {/* 이벤트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-r from-orange-500 to-green-500 relative">
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                  {event.type}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                  {event.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-orange-500" />
                    {event.date} {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-2 text-blue-500" />
                    {event.participants}/{event.maxParticipants}명
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(event.participants / event.maxParticipants) * 100}%`,
                    }}
                  ></div>
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  참가 신청하기
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
