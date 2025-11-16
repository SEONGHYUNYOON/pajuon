import { StarIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/outline";

const partners = [
  {
    id: 1,
    name: "파주카페",
    category: "카페",
    location: "운정동",
    discount: "파주온 회원 10% 할인",
    image: "/partner1.jpg",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "헤이리 맛집",
    category: "음식점",
    location: "탄현면",
    discount: "파주온 회원 15% 할인",
    image: "/partner2.jpg",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 3,
    name: "파주서점",
    category: "서점",
    location: "교하동",
    discount: "파주온 회원 5,000원 쿠폰",
    image: "/partner3.jpg",
    rating: 4.3,
    reviews: 89,
  },
  {
    id: 4,
    name: "파주영화관",
    category: "영화관",
    location: "금촌동",
    discount: "파주온 회원 2,000원 할인",
    image: "/partner4.jpg",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 5,
    name: "파주PC방",
    category: "PC방",
    location: "문산읍",
    discount: "파주온 회원 1시간 무료",
    image: "/partner5.jpg",
    rating: 4.2,
    reviews: 67,
  },
  {
    id: 6,
    name: "파주헬스장",
    category: "헬스장",
    location: "운정동",
    discount: "파주온 회원 입회비 면제",
    image: "/partner6.jpg",
    rating: 4.7,
    reviews: 198,
  },
];

export default function CouponPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <TagIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">파주 쿠폰&제휴</h1>
          <p className="text-lg text-gray-600">
            파주온 제휴 가게에서 특별한 혜택을 받아보세요
          </p>
        </div>

        {/* 제휴 가게 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-orange-400 relative">
                <div className="absolute top-3 left-3 px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-medium">
                  제휴가게
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900">
                  {partner.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {partner.location}
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-1">
                    <TagIcon className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="font-semibold text-orange-700">혜택</span>
                  </div>
                  <p className="text-sm text-gray-900">{partner.discount}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900">{partner.rating}</span>
                    <span className="text-gray-500 ml-1">({partner.reviews})</span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    쿠폰 받기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 제휴 문의 안내 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제휴 가게가 되고 싶으신가요?</h2>
          <p className="text-gray-600 mb-6">
            파주온 제휴 프로그램에 참여하시면 더 많은 고객을 만날 수 있습니다
          </p>
          <button className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
            제휴 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
