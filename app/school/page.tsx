"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AcademicCapIcon, LockClosedIcon, UserGroupIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const schoolTypes = ["초등학교", "중학교", "고등학교"];

interface School {
  id: string;
  name: string;
  type: string;
}

interface UserSchool {
  schoolType: string;
  schoolName: string;
}

export default function SchoolPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [userSchools, setUserSchools] = useState<UserSchool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    if (session?.user) {
      loadUserSchools();
    }
  }, [session, status, router]);

  useEffect(() => {
    if (selectedType) {
      loadSchools(selectedType);
    }
  }, [selectedType]);

  const loadSchools = async (type: string) => {
    try {
      const response = await fetch(`/api/school/list?type=${type}`);
      const data = await response.json();
      if (data.schools) {
        setSchools(data.schools);
      }
    } catch (error) {
      console.error("Failed to load schools:", error);
    }
  };

  const loadUserSchools = async () => {
    try {
      const response = await fetch("/api/user/schools");
      const data = await response.json();
      if (data.schools && data.schools.length > 0) {
        // schoolOrigin 배열을 파싱하여 UserSchool 형태로 변환
        const parsedSchools: UserSchool[] = data.schools.map((school: string) => {
          const parts = school.split(" ");
          return {
            schoolType: parts[0],
            schoolName: parts.slice(1).join(" "),
          };
        });
        setUserSchools(parsedSchools);
      }
    } catch (error) {
      console.error("Failed to load user schools:", error);
    }
  };

  const handleSchoolRegister = async () => {
    if (!selectedSchool || !selectedType) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/school/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolType: selectedType,
          schoolName: selectedSchool.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("학교 등록이 완료되었습니다!");
        setSelectedType(null);
        setSelectedSchool(null);
        loadUserSchools();
      } else {
        alert(data.error || "학교 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("School registration error:", error);
      alert("학교 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {status !== "authenticated" || !session?.user ? (
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
                  onClick={() => {
                    setSelectedType(null);
                    setSchools([]);
                    setSearchQuery("");
                  }}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  ← 이전으로
                </button>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedType}를 선택해주세요
                </h3>
                
                {/* 검색 */}
                <div className="relative mb-4">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="학교명으로 검색..."
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((school) => (
                      <button
                        key={school.id}
                        onClick={() => setSelectedSchool(school)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left"
                      >
                        <div className="font-medium text-gray-900">{school.name}</div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      {searchQuery ? "검색 결과가 없습니다." : "학교 목록을 불러오는 중..."}
                    </div>
                  )}
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
                    {selectedSchool.name} 등록
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    출신 학교를 등록하면 동문 게시판에 접근할 수 있습니다.
                  </p>
                  <button
                    type="button"
                    onClick={handleSchoolRegister}
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "등록 중..." : "학교 등록하기"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SchoolAlumniBoard />
        )}
      </div>
    </div>
  );
}

// 동창 게시판 컴포넌트
function SchoolAlumniBoard() {
  const { data: session } = useSession();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [alumni, setAlumni] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user && selectedSchool) {
      loadAlumniPosts();
      loadAlumni();
    }
  }, [session, selectedSchool]);

  const loadAlumniPosts = async () => {
    if (!selectedSchool) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/school/posts?school=${encodeURIComponent(selectedSchool)}`);
      const data = await response.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAlumni = async () => {
    if (!selectedSchool) return;
    try {
      const response = await fetch(`/api/school/alumni?school=${encodeURIComponent(selectedSchool)}`);
      const data = await response.json();
      if (data.alumni) {
        setAlumni(data.alumni);
      }
    } catch (error) {
      console.error("Failed to load alumni:", error);
    }
  };

  const [userSchools, setUserSchools] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      loadUserSchools();
    }
  }, [session]);

  const loadUserSchools = async () => {
    try {
      const response = await fetch("/api/user/schools");
      const data = await response.json();
      if (data.schools) {
        setUserSchools(data.schools);
      }
    } catch (error) {
      console.error("Failed to load user schools:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 학교 선택 필터 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">동창 게시판</h2>
        <div className="flex flex-wrap gap-2">
          {userSchools.map((school) => (
            <button
              key={school}
              onClick={() => setSelectedSchool(school)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSchool === school
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {school} 출신 회원 보기
            </button>
          ))}
        </div>
      </div>

      {selectedSchool && (
        <>
          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <UserGroupIcon className="w-8 h-8 text-orange-500 mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{alumni.length}</div>
              <div className="text-sm text-gray-600">등록된 동문</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-3">📝</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{posts.length}</div>
              <div className="text-sm text-gray-600">게시글</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-3">💬</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">댓글</div>
            </div>
          </div>

          {/* 동문 게시판 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedSchool} 동문 게시판</h2>
              <Link
                href={`/community/school-alumni/write?school=${encodeURIComponent(selectedSchool)}`}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                글쓰기
              </Link>
            </div>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">로딩 중...</div>
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/community/school-alumni/${post.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{post.author.nickname}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>댓글 {post.comments?.length || 0}개</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                아직 게시글이 없습니다. 첫 번째 글을 작성해보세요!
              </div>
            )}
          </div>

          {/* 동문 목록 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">동문 목록</h2>
            {alumni.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {alumni.map((member) => (
                  <div key={member.id} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-green-400 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-medium text-lg">
                      {member.nickname?.charAt(0) || "U"}
                    </div>
                    <div className="font-medium text-gray-900">{member.nickname}</div>
                    <div className="text-xs text-gray-500">{member.rank}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">등록된 동문이 없습니다.</div>
            )}
          </div>
        </>
      )}

      {!selectedSchool && (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
          <p className="text-gray-500">위에서 학교를 선택하여 동문 게시판을 확인하세요.</p>
        </div>
      )}
    </div>
  );
}
