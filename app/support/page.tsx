"use client";

import { useState } from "react";
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "회원가입은 어떻게 하나요?",
    answer: "상단의 로그인 버튼을 클릭하시면 SNS 간편 로그인(카카오, 네이버, 구글)을 통해 회원가입이 가능합니다.",
  },
  {
    question: "회원 등급은 어떻게 올리나요?",
    answer: "게시글 작성, 댓글 작성, 모임 참여 등 활동을 하면 활동 포인트가 적립되어 자동으로 등급이 올라갑니다. [파주새댁] → [이장] → [동장] → [시장] → [명예시민] 순서로 승급됩니다.",
  },
  {
    question: "모임은 어떻게 만들 수 있나요?",
    answer: "'함께해요 (모임)' 메뉴에서 '모임 만들기' 버튼을 클릭하시면 카테고리를 선택하거나 직접 입력하여 새 모임을 만들 수 있습니다.",
  },
  {
    question: "아이러브스쿨 인증은 어떻게 하나요?",
    answer: "'아이러브스쿨' 메뉴에서 출신 학교를 선택하고, 입학년도/졸업년도 및 졸업증명서 등을 제출하시면 관리자 승인 후 동문 게시판에 접근할 수 있습니다.",
  },
  {
    question: "이벤트 신청 후 취소가 가능한가요?",
    answer: "이벤트 3일 전까지 취소가 가능하며, 마이페이지에서 신청 내역을 확인하고 취소할 수 있습니다.",
  },
  {
    question: "우리동네 핫플 후기는 누구나 작성할 수 있나요?",
    answer: "네, 회원이라면 누구나 파주의 맛집, 카페, 명소에 대한 후기를 작성할 수 있습니다. 여러 장의 사진과 함께 상세한 후기를 남겨주시면 다른 시민들에게 도움이 됩니다.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">고객센터</h1>
          <p className="text-lg text-gray-600">
            궁금한 점이 있으시면 언제든지 문의해주세요
          </p>
        </div>

        {/* 빠른 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <QuestionMarkCircleIcon className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">자주 묻는 질문</h3>
            <p className="text-sm text-gray-600">FAQ에서 빠른 답변을 찾아보세요</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <EnvelopeIcon className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">1:1 문의</h3>
            <p className="text-sm text-gray-600">직접 문의사항을 남겨주세요</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
            <DocumentTextIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">이용약관</h3>
            <p className="text-sm text-gray-600">서비스 이용 약관을 확인하세요</p>
          </div>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <QuestionMarkCircleIcon className="w-6 h-6 text-green-500 mr-2" />
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-500">
                    {openFaq === index ? "▲" : "▼"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 1:1 문의 */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <EnvelopeIcon className="w-6 h-6 text-orange-500 mr-2" />
            1:1 문의하기
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 제목 *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: 모임 개설 관련 문의"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용 *
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="문의하실 내용을 자세히 적어주세요"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              문의하기
            </button>
          </form>
        </div>

        {/* 연락처 정보 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">운영 시간</h3>
          <p className="text-gray-600 mb-4">평일 09:00 - 18:00</p>
          <p className="text-sm text-gray-500">
            이메일: support@pajuon.kr | 전화: 031-940-0000
          </p>
        </div>
      </div>
    </div>
  );
}
