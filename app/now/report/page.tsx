"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  PlusIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { id: "road", name: "도로 파손" },
  { id: "light", name: "가로등 고장" },
  { id: "waste", name: "쓰레기 문제" },
  { id: "noise", name: "소음" },
  { id: "other", name: "기타" },
];

const reports = [
  {
    id: 1,
    title: "운정동 보도블록 파손 신고",
    category: "도로 파손",
    location: "운정동",
    date: "2시간 전",
    status: "처리중",
    images: 2,
  },
  {
    id: 2,
    title: "가로등 불빛이 나오지 않습니다",
    category: "가로등 고장",
    location: "교하동",
    date: "1일 전",
    status: "처리중",
    images: 1,
  },
  {
    id: 3,
    title: "마을 공원 쓰레기 무단투기",
    category: "쓰레기 문제",
    location: "금촌동",
    date: "2일 전",
    status: "처리완료",
    images: 3,
  },
];

export default function ReportPage() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    location: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...images, ...files];
      setImages(newImages);
      
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("신고가 접수되었습니다. 빠른 시일 내에 처리하겠습니다.");
    setShowForm(false);
    setFormData({ category: "", title: "", location: "", description: "" });
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <ExclamationTriangleIcon className="w-10 h-10 text-orange-500" />
                <h1 className="text-4xl font-bold text-gray-900 text-center">파주 신고센터</h1>
              </div>
              <p className="text-lg text-gray-600 text-center">
                도로 파손, 가로등 고장 등 불편 사항을 신고해주세요
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              신고하기
            </button>
          </div>
        </div>

        {/* 신고 폼 */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">신고하기</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  신고 유형 *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">선택해주세요</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                  placeholder="예: 운정동 보도블록 파손 신고"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* 위치 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  위치 (동/읍/면) *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="예: 운정동"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {/* 지도 위치 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  정확한 위치 (지도에서 선택) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    정확한 위치를 지도에서 선택해주세요
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => {
                      // 실제로는 지도 API 연동
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
                  사진 (필수) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required={imagePreviews.length === 0}
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
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="신고 내용을 자세히 적어주세요..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* 제출 버튼 */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  신고 접수하기
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 신고 목록 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">신고 목록</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/now/report/${report.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        {report.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === "처리완료"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {report.location}
                      </div>
                      <span>{report.date}</span>
                      <span>📸 {report.images}장</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
