# 리팩토링 가이드

## 재사용 가능한 UI 컴포넌트

프로젝트에서 중복 코드를 제거하기 위해 재사용 가능한 UI 컴포넌트를 생성했습니다.

### 1. Button 컴포넌트 (`components/ui/Button.tsx`)

**사용 예시:**
```tsx
import Button from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

// 기본 사용
<Button>클릭하세요</Button>

// 다양한 variant
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// 크기 조절
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 아이콘과 함께
<Button icon={<PlusIcon className="w-5 h-5" />}>글쓰기</Button>

// Link로 사용
<Button href="/groups">모임 보기</Button>

// 전체 너비
<Button fullWidth>전체 너비 버튼</Button>
```

**기존 코드:**
```tsx
<Link
  href="/groups"
  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
>
  모임 만들기
</Link>
```

**리팩토링 후:**
```tsx
<Button href="/groups" icon={<PlusIcon className="w-5 h-5" />}>
  모임 만들기
</Button>
```

### 2. Card 컴포넌트 (`components/ui/Card.tsx`)

**사용 예시:**
```tsx
import Card from "@/components/ui/Card";

// 기본 카드
<Card>
  <h3>제목</h3>
  <p>내용</p>
</Card>

// Link로 사용
<Card href="/groups/1">
  <h3>모임 이름</h3>
</Card>

// 패딩 조절
<Card padding="none">내용</Card>
<Card padding="sm">내용</Card>
<Card padding="md">내용</Card>
<Card padding="lg">내용</Card>

// 호버 효과 제거
<Card hover={false}>내용</Card>
```

**기존 코드:**
```tsx
<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
  <h3>제목</h3>
</div>
```

**리팩토링 후:**
```tsx
<Card>
  <h3>제목</h3>
</Card>
```

### 3. Input 컴포넌트 (`components/ui/Input.tsx`)

**사용 예시:**
```tsx
import { Input, Textarea } from "@/components/ui/Input";

// 기본 입력
<Input label="이메일" type="email" required />

// 에러 상태
<Input label="이메일" error="올바른 이메일을 입력하세요" />

// 도움말
<Input label="닉네임" helperText="2-20자 사이로 입력하세요" />

// Textarea
<Textarea label="내용" rows={5} required />
```

**기존 코드:**
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    제목 *
  </label>
  <input
    type="text"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
    required
  />
</div>
```

**리팩토링 후:**
```tsx
<Input label="제목" type="text" required />
```

### 4. Badge 컴포넌트 (`components/ui/Badge.tsx`)

**사용 예시:**
```tsx
import Badge from "@/components/ui/Badge";

<Badge>기본</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="danger">위험</Badge>
<Badge variant="info">정보</Badge>
```

### 5. PostCard 컴포넌트 (`components/ui/PostCard.tsx`)

**사용 예시:**
```tsx
import PostCard from "@/components/ui/PostCard";

<PostCard
  id="1"
  title="게시글 제목"
  content="게시글 내용"
  author={{ nickname: "작성자" }}
  commentCount={5}
  viewCount={100}
  createdAt="2024-12-15T10:00:00Z"
  category="등산"
  location="파주시"
  href="/posts/1"
  imageUrl="/images/post.jpg"
/>
```

## 리팩토링 우선순위

### 높은 우선순위 (즉시 적용 권장)
1. `app/groups/page.tsx` - Button, Card 사용
2. `app/events/camping/page.tsx` - Button, Card 사용
3. `app/life/hot-place/page.tsx` - Card 사용
4. `app/life/market/write/page.tsx` - Input, Button 사용

### 중간 우선순위
5. `app/community/pet/page.tsx` - Button, Card 사용
6. `app/events/[id]/page.tsx` - Input, Button 사용
7. `app/auth/signup/page.tsx` - Input, Button 사용

### 낮은 우선순위
8. 기타 페이지들 - 필요시 점진적으로 적용

## 공통 상수 사용

`constants/ui.ts`에 정의된 상수를 사용하여 일관성 유지:

```tsx
import { COMMON_STYLES } from "@/constants/ui";

<div className={COMMON_STYLES.container}>
  <h2 className={COMMON_STYLES.sectionTitle}>제목</h2>
</div>
```

## 리팩토링 체크리스트

- [ ] Button 컴포넌트로 중복 버튼 스타일 교체
- [ ] Card 컴포넌트로 중복 카드 스타일 교체
- [ ] Input 컴포넌트로 중복 입력 필드 교체
- [ ] Badge 컴포넌트로 중복 배지 스타일 교체
- [ ] PostCard 컴포넌트로 게시글 카드 교체
- [ ] 공통 상수 사용으로 하드코딩 제거

