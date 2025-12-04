"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PencilSquareIcon, ShoppingBagIcon, CalendarIcon, UserGroupIcon, MapIcon, NewspaperIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

// 카테고리 매핑
const CATEGORY_NAMES: Record<string, string> = {
    news: "파주 소식 & 핫플",
    neighborhood: "동네별 수다방",
    life: "파주 Life",
    jobs: "파주인",
    groups: "참여형 소셜",
    events: "만남과 이벤트",
    photo: "파주 사진전",
    tourism: "관광 & 정보",
    school: "아이러브스쿨",
    market: "파주팔아요",
};

// 더미 데이터 생성기
const getDummyData = (category: string) => {
    const common = { date: "방금 전", views: 123, author: "파주주민" };

    switch (category) {
        case "news":
            return [
                { id: 1, title: "운정 호수공원 불꽃축제 일정 안내", ...common, views: 1250, author: "파주시청" },
                { id: 2, title: "GTX-A 운정역 개통 예정일 확정", ...common, views: 3400, author: "교통뉴스" },
                { id: 3, title: "금촌 로타리 맛집 '파주식당' 솔직 후기", ...common, views: 890, author: "맛탐정" },
                { id: 4, title: "헤이리 마을 주말 플리마켓 열립니다", ...common, views: 560, author: "헤이리" },
                { id: 5, title: "파주 롯데아울렛 주말 할인 행사 정보", ...common, views: 1100, author: "쇼핑왕" },
                { id: 6, title: "문산 자유시장 5일장 풍경", ...common, views: 450, author: "시장통" },
                { id: 7, title: "야당역 앞 새로 생긴 카페 가보셨나요?", ...common, views: 780, author: "카페인" },
                { id: 8, title: "파주 출판단지 북페스티벌 개최", ...common, views: 670, author: "책벌레" },
                { id: 9, title: "임진각 평화곤돌라 야간 개장 소식", ...common, views: 920, author: "여행가" },
                { id: 10, title: "운정 건강공원 물놀이장 운영 시간", ...common, views: 1500, author: "육아맘" },
                { id: 11, title: "금릉역 앞 도로 공사 안내", ...common, views: 340, author: "안전제일" },
                { id: 12, title: "파주 장단콩 축제 자원봉사자 모집", ...common, views: 230, author: "봉사단" },
            ];
        case "market":
            return [
                { id: 1, title: "아이폰 14 프로 맥스 팝니다", price: "1,100,000원", location: "운정동", ...common, image: "📱" },
                { id: 2, title: "스타벅스 쿠폰 싸게 드려요", price: "3,500원", location: "교하동", ...common, image: "☕" },
                { id: 3, title: "자전거 (하이브리드) 상태 굿", price: "150,000원", location: "금촌동", ...common, image: "🚲" },
                { id: 4, title: "캠핑 의자 2개 일괄 판매", price: "40,000원", location: "문산읍", ...common, image: "🪑" },
                { id: 5, title: "LG 공기청정기 퓨리케어", price: "250,000원", location: "운정동", ...common, image: "💨" },
                { id: 6, title: "아기 침대 (이케아)", price: "50,000원", location: "조리읍", ...common, image: "🛏️" },
                { id: 7, title: "닌텐도 스위치 OLED 풀박스", price: "300,000원", location: "금촌동", ...common, image: "🎮" },
                { id: 8, title: "여성 골프채 풀세트", price: "450,000원", location: "탄현면", ...common, image: "⛳" },
                { id: 9, title: "책상 무료 나눔합니다", price: "무료", location: "운정동", ...common, image: "📚" },
                { id: 10, title: "갤럭시 워치5 44mm", price: "180,000원", location: "교하동", ...common, image: "⌚" },
                { id: 11, title: "전동 킥보드 팝니다", price: "200,000원", location: "야당동", ...common, image: "🛴" },
                { id: 12, title: "에어팟 프로 2세대 미개봉", price: "280,000원", location: "운정동", ...common, image: "🎧" },
            ];
        case "life":
            return [
                { id: 1, title: "운정에서 서울 출퇴근 꿀팁 공유해요", ...common, views: 560, author: "출퇴근러" },
                { id: 2, title: "주말에 아이랑 갈만한 곳 추천 부탁드려요", ...common, views: 340, author: "육아대디" },
                { id: 3, title: "파주페이 가맹점 어디어디 있나요?", ...common, views: 230, author: "알뜰살뜰" },
                { id: 4, title: "층간소음 때문에 너무 스트레스 받네요 ㅠㅠ", ...common, views: 450, author: "고통받는자" },
                { id: 5, title: "금촌 야시장 먹거리 추천해주세요", ...common, views: 120, author: "배고파" },
                { id: 6, title: "운정 호수공원 조깅 코스 추천", ...common, views: 210, author: "런닝맨" },
                { id: 7, title: "이사짐 센터 괜찮은 곳 있나요?", ...common, views: 180, author: "이사준비" },
                { id: 8, title: "파주 도서관 대출증 만드는 법", ...common, views: 150, author: "독서왕" },
                { id: 9, title: "심학산 등산 난이도 어떤가요?", ...common, views: 290, author: "등린이" },
                { id: 10, title: "운정 이마트 휴무일 언제인가요?", ...common, views: 410, author: "장보기" },
                { id: 11, title: "겨울철 보일러 동파 방지 팁", ...common, views: 330, author: "맥가이버" },
                { id: 12, title: "동네 헬스장 가격 정보 공유합니다", ...common, views: 250, author: "헬창" },
            ];
        case "events":
            return [
                { id: 1, title: "이번 주 토요일 운정 호수공원 버스킹", ...common, views: 120, author: "음악인" },
                { id: 2, title: "파주 독서 모임 신규 회원 모집", ...common, views: 230, author: "북클럽" },
                { id: 3, title: "주말 유기견 봉사활동 함께해요", ...common, views: 180, author: "천사들" },
                { id: 4, title: "헤이리 영화 감상회 초대합니다", ...common, views: 90, author: "씨네필" },
                { id: 5, title: "직장인 저녁 러닝 크루 모집", ...common, views: 150, author: "러너" },
                { id: 6, title: "파주 맛집 탐방대 3기 모집", ...common, views: 340, author: "미식가" },
                { id: 7, title: "원데이 베이킹 클래스 수강생 모집", ...common, views: 210, author: "빵굽는사람" },
                { id: 8, title: "주말 풋살 매치 상대 구합니다", ...common, views: 110, author: "FC운정" },
                { id: 9, title: "영어 회화 스터디 (초급반)", ...common, views: 190, author: "영어쌤" },
                { id: 10, title: "보드게임 모임 이번주 금요일", ...common, views: 130, author: "보드게이머" },
                { id: 11, title: "새벽 기상 챌린지 '미라클 모닝'", ...common, views: 250, author: "아침형인간" },
                { id: 12, title: "주말 등산 모임 (감악산)", ...common, views: 170, author: "산악회" },
            ];
        case "tourism":
            return [
                { id: 1, title: "파주 당일치기 여행 코스 추천 BEST 5", ...common, views: 1200, author: "여행작가" },
                { id: 2, title: "임진각 평화누리공원 인생샷 명소", ...common, views: 890, author: "포토그래퍼" },
                { id: 3, title: "헤이리 예술마을 숨은 맛집 지도", ...common, views: 670, author: "맛지도" },
                { id: 4, title: "파주 출판단지 지혜의 숲 이용 꿀팁", ...common, views: 540, author: "책사랑" },
                { id: 5, title: "마장호수 출렁다리 주차 정보", ...common, views: 1100, author: "드라이버" },
                { id: 6, title: "벽초지 수목원 봄꽃 축제 후기", ...common, views: 450, author: "꽃놀이" },
                { id: 7, title: "프로방스 마을 야경 데이트 코스", ...common, views: 780, author: "커플" },
                { id: 8, title: "감악산 출렁다리 등산 코스 안내", ...common, views: 320, author: "등산객" },
                { id: 9, title: "파주 프리미엄 아울렛 쇼핑 리스트", ...common, views: 950, author: "쇼퍼" },
                { id: 10, title: "율곡 수목원 가을 단풍 구경", ...common, views: 410, author: "가을남자" },
                { id: 11, title: "오두산 통일전망대 관람 안내", ...common, views: 230, author: "역사쌤" },
                { id: 12, title: "파주 장단콩 웰빙마루 체험 후기", ...common, views: 180, author: "웰빙" },
            ];
        case "groups":
            return [
                { id: 1, title: "2030 파주 직장인 소모임", ...common, views: 450, author: "운영진" },
                { id: 2, title: "파주 맘카페 정모 후기", ...common, views: 670, author: "파주맘" },
                { id: 3, title: "주말 배드민턴 클럽 회원 모집", ...common, views: 230, author: "민턴사랑" },
                { id: 4, title: "파주 사진 동호회 '뷰파인더'", ...common, views: 340, author: "찍사" },
                { id: 5, title: "반려견 산책 모임 '댕댕이'", ...common, views: 560, author: "개통령" },
                { id: 6, title: "파주 맛집 탐방 동아리", ...common, views: 410, author: "먹방" },
                { id: 7, title: "독서 토론 모임 '책과 콩나무'", ...common, views: 190, author: "문학소녀" },
                { id: 8, title: "주식 투자 스터디 모집", ...common, views: 890, author: "개미" },
                { id: 9, title: "파주 풋살 클럽 매치 일정", ...common, views: 210, author: "축구왕" },
                { id: 10, title: "볼링 동호회 신입 회원 환영", ...common, views: 150, author: "스트라이크" },
                { id: 11, title: "자전거 라이딩 크루 모집", ...common, views: 280, author: "라이더" },
                { id: 12, title: "영화 관람 소모임", ...common, views: 170, author: "무비" },
            ];
        default:
            return Array.from({ length: 12 }).map((_, i) => ({
                id: i + 1,
                title: `${CATEGORY_NAMES[category] || "게시글"} 관련 재미있는 이야기 ${i + 1}`,
                ...common,
                views: 100 + i * 10,
                author: `사용자${i + 1}`
            }));
    }
};

export default function CommunityBoard() {
    const params = useParams();
    const category = params.category as string;
    const categoryName = CATEGORY_NAMES[category] || "커뮤니티";
    const posts = getDummyData(category);

    // 아이콘 매핑
    const getIcon = () => {
        switch (category) {
            case "market": return <ShoppingBagIcon className="w-10 h-10 text-orange-500" />;
            case "events": return <CalendarIcon className="w-10 h-10 text-red-500" />;
            case "groups": return <UserGroupIcon className="w-10 h-10 text-blue-500" />;
            case "tourism": return <MapIcon className="w-10 h-10 text-green-500" />;
            case "news": return <NewspaperIcon className="w-10 h-10 text-purple-500" />;
            default: return <ChatBubbleOvalLeftEllipsisIcon className="w-10 h-10 text-gray-500" />;
        }
    };

    return (
        <div className="py-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            {getIcon()}
                            <h1 className="text-3xl font-bold text-gray-900 text-center">{categoryName}</h1>
                        </div>
                        <p className="text-gray-600 text-center">
                            {categoryName}에 대한 다양한 이야기를 나눠보세요
                        </p>
                    </div>
                    <Link
                        href={`/community/write?category=${category}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0D4FFF] text-white rounded-lg hover:bg-[#0A3FD9] transition-colors"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                        글쓰기
                    </Link>
                </div>

                {/* 게시글 목록 */}
                {category === "market" ? (
                    // 마켓은 그리드 뷰
                    <div className="grid grid-cols-2 gap-4">
                        {posts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/community/${category}/${post.id}`}
                                className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-square bg-gray-100 flex items-center justify-center text-4xl">
                                    {post.image}
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">{post.title}</h3>
                                    <div className="font-bold text-gray-900 mb-1">{post.price}</div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{post.location}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    // 나머지는 리스트 뷰
                    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                        {posts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/community/${category}/${post.id}`}
                                className="block p-4 hover:bg-gray-50 transition-colors text-center"
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium text-gray-900 mb-1">
                                        {post.title}
                                    </span>
                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <span>{post.author}</span>
                                        <span>·</span>
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>조회 {post.views}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center text-gray-500 text-sm">
                    게시글이 더 이상 없습니다.
                </div>
            </div>
        </div>
    );
}
