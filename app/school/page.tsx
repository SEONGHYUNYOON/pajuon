"use client";

import { useState } from "react";
import { AcademicCapIcon, LockClosedIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const schoolTypes = ["초등학교", "중학교", "고등학교"];
const schools = {
  초등학교: ["파주초등학교", "문산초등학교", "교하초등학교", "운정초등학교"],
  중학교: ["파주중학교", "문산중학교", "교하중학교", "운정중학교"],
  고등학교: ["파주고등학교", "문산고등학교", "교하고등학교", "운정고등학교"],
};

export default function SchoolPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    // 실제로는 인증 프로세스를 진행해야 함
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <AcademicCapIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">아이러브스쿨</h1>
          <p className="text-lg text-gray-600">
            파주 내 출신 학교를 인증하고 동문들과 만나보세요
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <LockClosedIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                학교 인증이 필요합니다
              </h2>
              <p className="text-gray-600">
                동문 전용 게시판에 접근하려면 출신 학교를 인증해주세요
              </p>
            </div>

            {/* 학교 선택 */}
            {!selectedType ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  학교 구분을 선택해주세요
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {schoolTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
                    >
                      <div className="text-3xl mb-2">🎓</div>
                      <div className="font-semibold text-gray-900">{type}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : !selectedSchool ? (
              <div>
                <button
                  onClick={() => setSelectedType(null)}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  ← 이전으로
                </button>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedType}를 선택해주세요
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schools[selectedType as keyof typeof schools]?.map((school) => (
                    <button
                      key={school}
                      onClick={() => handleSchoolSelect(school)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left"
                    >
                      <div className="font-medium text-gray-900">{school}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  ← 이전으로
                </button>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {selectedSchool} 인증
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    아래 정보를 입력하여 학교 인증을 완료해주세요.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        입학년도
                      </label>
                      <input
                        type="number"
                        placeholder="예: 2010"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        졸업년도
                      </label>
                      <input
                        type="number"
                        placeholder="예: 2016"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        인증 자료 (졸업증명서 등)
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAuthenticated(true)}
                      className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      인증 신청하기
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* 인증 완료 메시지 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedSchool} 동문 인증 완료
                  </h3>
                  <p className="text-sm text-gray-600">동문 전용 게시판에 접근할 수 있습니다</p>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <UserGroupIcon className="w-8 h-8 text-orange-500 mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
                <div className="text-sm text-gray-600">등록된 동문</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-3xl mb-3">📝</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">89</div>
                <div className="text-sm text-gray-600">게시글</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-3xl mb-3">💬</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">234</div>
                <div className="text-sm text-gray-600">댓글</div>
              </div>
            </div>

            {/* 동문 게시판 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">동문 게시판</h2>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                  글쓰기
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((post) => (
                  <div
                    key={post}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      동문 모임 일정 공지
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      이번 달 동문 모임이 12월 20일로 예정되어 있습니다...
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>작성자: 김파주</span>
                      <span className="mx-2">•</span>
                      <span>2024-12-10</span>
                      <span className="mx-2">•</span>
                      <span>댓글 12개</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 동문 목록 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">동문 목록</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((member) => (
                  <div key={member} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-green-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-medium text-lg">
                      {member}
                    </div>
                    <div className="font-medium text-gray-900">동문 {member}</div>
                    <div className="text-xs text-gray-500">파주새댁</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
