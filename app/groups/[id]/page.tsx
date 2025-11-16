import { ChatBubbleLeftRightIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  // 실제로는 params.id로 API 호출하여 데이터를 가져와야 함
  const group = {
    id: params.id,
    name: "파주 산악회",
    category: "등산",
    members: 24,
    posts: 156,
    description: "주말 등산을 즐기는 모임입니다. 매주 토요일 아침 파주 인근의 산으로 등산을 떠납니다. 초보자도 환영하며, 함께 즐거운 시간을 보냅시다!",
    created: "2024년 11월",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 모임 헤더 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {group.category}
                </span>
                <span className="text-sm text-gray-500">개설일: {group.created}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{group.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{group.description}</p>
            </div>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              가입하기
            </button>
          </div>

          <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
            <div className="flex items-center text-gray-600">
              <UserGroupIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">{group.members}명 참여</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">{group.posts}개 글</span>
            </div>
            <Link
              href={`/groups/${group.id}/chat`}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">채팅방 가기</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 게시판 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">게시판</h2>
              <Link
                href={`/groups/${group.id}/write`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                글쓰기
              </Link>
            </div>
            {/* 게시글 목록 */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((post) => (
                <Link
                  key={post}
                  href={`/groups/${group.id}/posts/${post}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    이번 주 토요일 등산 일정 공지
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    이번 주 토요일 아침 7시 출발합니다. 모이는 장소는 파주역 앞입니다...
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>작성자: 산악인</span>
                    <span className="mx-2">•</span>
                    <span>2024-12-10</span>
                    <span className="mx-2">•</span>
                    <span>댓글 5개</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 모임 정보 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">모임 정보</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">카테고리:</span>
                  <span className="ml-2 font-medium">{group.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">멤버 수:</span>
                  <span className="ml-2 font-medium">{group.members}명</span>
                </div>
                <div>
                  <span className="text-gray-600">게시글 수:</span>
                  <span className="ml-2 font-medium">{group.posts}개</span>
                </div>
              </div>
            </div>

            {/* 최근 멤버 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 가입 멤버</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((member) => (
                  <div key={member} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-orange-400 rounded-full flex items-center justify-center text-white font-medium">
                      {member}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">멤버 {member}</div>
                      <div className="text-xs text-gray-500">파주새댁</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
