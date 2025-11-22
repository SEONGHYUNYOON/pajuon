"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PhotoIcon, XMarkIcon, MapPinIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { autoClassify, getCategoryConfidence } from "@/lib/marketClassifier";

export default function MarketWritePage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setStatus(currentSession ? "authenticated" : "unauthenticated");
    } catch (error) {
      setStatus("unauthenticated");
    }
  };
  const [formData, setFormData] = useState({
    type: "팝니다",
    category: "전체", // 카테고리 추가
    title: "",
    price: "",
    description: "",
    location: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // 자동 분류 결과
  const [autoDetectedCategory, setAutoDetectedCategory] = useState<string | null>(null);
  const [autoDetectedType, setAutoDetectedType] = useState<string | null>(null);
  const [showAutoDetected, setShowAutoDetected] = useState(false);

  // 로그인 확인
  if (status === "loading") {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">로딩 중...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login?callbackUrl=/life/market/write");
    return null;
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);

    // 이미지 업로드
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      setImageUrls([...imageUrls, ...urls]);
    } catch (error) {
      console.error("Image upload error:", error);
      setError("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/life/market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title,
          price: formData.type !== "나눔합니다" ? parseInt(formData.price) || 0 : 0,
          description: formData.description,
          location: formData.location || null,
          images: imageUrls.length > 0 ? imageUrls : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "물품 등록 중 오류가 발생했습니다.");
        setIsSubmitting(false);
        return;
      }

      // 성공 시 목록 페이지로 이동
      router.push("/life/market");
    } catch (error) {
      console.error("Submit error:", error);
      setError("물품 등록 중 오류가 발생했습니다.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">파주장터 글쓰기</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* 거래 유형 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                거래 유형 *
              </label>
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {["팝니다", "삽니다", "나눔합니다"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      formData.type === type
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 아이폰 14 프로 팝니다"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData({ ...formData, title: newTitle });
                  
                  // 자동 분류 수행
                  if (newTitle.trim().length > 0) {
                    const { category, type } = autoClassify(newTitle);
                    setAutoDetectedCategory(category);
                    setAutoDetectedType(type);
                    setShowAutoDetected(true);
                  } else {
                    setShowAutoDetected(false);
                  }
                }}
              />
              
              {/* 자동 분류 결과 표시 */}
              {showAutoDetected && formData.title.trim().length > 0 && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <LightBulbIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">AI 자동 추천</span>
                  </div>
                  
                  <div className="space-y-2 flex flex-col items-center">
                    {autoDetectedCategory && autoDetectedCategory !== "전체" && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs text-blue-700">카테고리:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: autoDetectedCategory });
                            setShowAutoDetected(false);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                        >
                          {autoDetectedCategory} 적용
                        </button>
                        <span className="text-xs text-blue-600">
                          (신뢰도: {getCategoryConfidence(formData.title, autoDetectedCategory)}%)
                        </span>
                      </div>
                    )}
                    
                    {autoDetectedType && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs text-blue-700">거래 유형:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, type: autoDetectedType });
                            setShowAutoDetected(false);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
                        >
                          {autoDetectedType} 적용
                        </button>
                      </div>
                    )}
                    
                    {!autoDetectedCategory && !autoDetectedType && (
                      <span className="text-xs text-blue-600 text-center">추천할 항목을 찾지 못했습니다.</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 카테고리 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                카테고리 *
                {autoDetectedCategory && autoDetectedCategory !== "전체" && formData.category !== autoDetectedCategory && (
                  <span className="ml-2 text-xs text-blue-600">
                    (AI 추천: {autoDetectedCategory})
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 justify-items-center">
                {["전체", "전자제품", "가구", "자동차", "부동산", "기타"].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFormData({ ...formData, category })}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      formData.category === category
                        ? "bg-green-600 text-white"
                        : autoDetectedCategory === category
                        ? "bg-blue-100 text-blue-700 border-2 border-blue-400"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 가격 */}
            {formData.type !== "나눔합니다" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  가격 *
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="원"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            )}

            {/* 지역 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지역 (동/읍/면) *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 운정동, 교하동"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            {/* 거래 희망 장소 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                거래 희망 장소 (지도에서 선택)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  거래를 희망하는 장소를 지도에서 선택해주세요
                </p>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => {
                    // 실제로는 지도 API (네이버/카카오) 연동
                    alert("지도 API 연동 필요");
                  }}
                >
                  지도에서 위치 선택
                </button>
              </div>
            </div>

            {/* 사진 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사진 (여러 장 업로드 가능)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <PhotoIcon className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-gray-600 mb-2">클릭하여 사진을 선택하세요</span>
                  <span className="text-sm text-gray-500">여러 장 선택 가능</span>
                </label>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 상세 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상세 설명 *
              </label>
              <textarea
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="물품의 상태, 거래 조건 등을 자세히 적어주세요..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* 제출 버튼 */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/life/market")}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
