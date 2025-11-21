# 라우트 연결 확인 문서

## 페이지 라우트

### 인증
- ✅ `/auth/login` - 로그인 페이지
- ✅ `/auth/signup` - 회원가입 페이지

### 메인
- ✅ `/` - 메인 랜딩 페이지 (히어로 섹션, 대시보드, 최근 활동)

### 커뮤니티
- ✅ `/community/hiking` - 등산 모임
- ✅ `/community/riding` - 라이딩 모임
- ✅ `/community/goji-soccer` - 고지 축구
- ✅ `/community/general` - 자유게시판
- ✅ `/community/local` - 동네별 소모임
- ✅ `/community/local/[id]` - 동네별 소모임 상세
- ✅ `/community/pet` - 반려동물 커뮤니티
- ✅ `/community/school-alumni/[id]` - 동창 게시판 상세

### 모임
- ✅ `/groups` - 모임 목록
- ✅ `/groups/[id]` - 모임 상세 (공지사항, 갤러리, 멤버 리스트)

### 아이러브스쿨
- ✅ `/school` - 학교 등록 및 동창 게시판

### 이벤트
- ✅ `/events` - 이벤트 목록 (캘린더 포함)
- ✅ `/events/[id]` - 이벤트 상세 (미팅 신청 폼 포함)
- ✅ `/events/camping` - 캠핑 멤버 모집 게시판

### 파주 소식 & 핫플
- ✅ `/news` - 파주 뉴스
- ✅ `/life/hot-place` - 맛집/카페 추천 (헤이리, 출판단지)
- ✅ `/life/market` - 파주장터
- ✅ `/life/market/[id]` - 장터 상세
- ✅ `/life/market/write` - 장터 글쓰기
- ✅ `/life/jobs` - 파주 일자리
- ✅ `/life/education` - 육아/교육
- ✅ `/life/coupon` - 쿠폰&제휴

### 관광 & 정보
- ✅ `/tourism` - 관광 정보
- ✅ `/tourism/dmz` - DMZ 땅굴 관광 가이드

### 기타
- ✅ `/my-page` - 마이페이지
- ✅ `/my-page/activity` - 내 활동
- ✅ `/my-page/settings` - 설정
- ✅ `/map` - 파주 지도
- ✅ `/now/issue` - 오늘의 파주
- ✅ `/now/report` - 파주 신고센터
- ✅ `/play/tv` - 파주ON TV
- ✅ `/play/album` - 추억앨범
- ✅ `/play/challenge` - 이달의 챌린지
- ✅ `/support` - 고객센터

## API 라우트

### 인증
- ✅ `GET/POST /api/auth/[...nextauth]` - NextAuth 핸들러
- ✅ `POST /api/auth/signup` - 회원가입
- ✅ `GET /api/auth/check-nickname` - 닉네임 중복 확인

### 사용자
- ✅ `GET /api/user/dashboard` - 대시보드 정보
- ✅ `GET /api/user/schools` - 등록된 학교 목록

### 홈
- ✅ `GET /api/home/recent-activity` - 최근 활동 (뉴스, 등산, 동창회)

### 모임
- ✅ `GET /api/groups` - 모임 목록
- ✅ `POST /api/groups` - 모임 생성
- ✅ `GET /api/groups/[id]` - 모임 상세
- ✅ `POST /api/groups/[id]/join` - 모임 가입
- ✅ `DELETE /api/groups/[id]/join` - 모임 탈퇴

### 학교
- ✅ `POST /api/school/register` - 학교 등록
- ✅ `GET /api/school/list` - 학교 목록
- ✅ `GET /api/school/alumni` - 동문 목록
- ✅ `GET /api/school/posts` - 동창 게시판

### 이벤트
- ✅ `POST /api/events/matchmaking/apply` - 미팅 신청

### 기타
- ✅ `GET /api/life/market` - 장터 목록
- ✅ `POST /api/upload` - 이미지 업로드

## 라우트 연결 상태

모든 주요 라우트가 정상적으로 연결되어 있습니다.

