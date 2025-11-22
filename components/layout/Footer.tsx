import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4" style={{ marginLeft: '1rem' }}>
              <div className="relative inline-flex items-center justify-center">
                {/* 외부 글로우 효과 */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#0D4FFF] via-[#3B82F6] to-[#60A5FA] rounded-full blur-md opacity-50"></span>
                
                {/* On 배지 - 전원 버튼이 O를 대체 (사이즈 키움) */}
                <span className="relative inline-flex items-center gap-0 bg-gradient-to-br from-[#0D4FFF] via-[#2563EB] to-[#1E40AF] text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg leading-none">
                  {/* 전원 버튼 아이콘 */}
                  <span className="relative inline-flex items-center justify-center leading-none" style={{ width: '1em', height: '1em', marginRight: '-0.15em', verticalAlign: 'baseline' }}>
                    <svg 
                      className="w-full h-full text-white" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ display: 'inline-block', verticalAlign: 'baseline' }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="8" className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                      <path 
                        d="M12 8 L12 4" 
                        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                      />
                    </svg>
                  </span>
                  
                  {/* n 텍스트 */}
                  <span className="relative z-10 font-bold leading-none">n</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">PAJU ON</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed" style={{ marginLeft: '1rem' }}>
              경기도 파주시 시민을 위한 참여형 커뮤니티 플랫폼
              <br />
              <span className="text-orange-300 font-medium">파주가 켜진다, 파주의 모든 것이 있다</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors transform hover:scale-110 duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors transform hover:scale-110 duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 메뉴 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">주요 메뉴</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/community/hiking" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/school" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  아이러브스쿨
                </Link>
              </li>
              <li>
                <Link href="/events/camping" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  만남과 이벤트
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  파주 소식 & 핫플
                </Link>
              </li>
              <li>
                <Link href="/tourism/dmz" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                  관광 & 정보
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">고객센터</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/support/terms" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/support/privacy" className="hover:text-orange-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-orange-400 font-semibold">PAJU ON (파주온)</span>. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">모든 기능은 무료로 제공됩니다. 파주 시민 여러분의 참여를 기다립니다!</p>
        </div>
      </div>
    </footer>
  );
}
