-- 실시간 신고 배너 시스템 테이블 생성
CREATE TABLE IF NOT EXISTS banner_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 내용 길이 제한 (20자)
  CONSTRAINT content_length_check CHECK (char_length(content) <= 20)
);

-- 인덱스 생성 (최신 메시지 조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_banner_messages_created_at ON banner_messages(created_at DESC);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE banner_messages ENABLE ROW LEVEL SECURITY;

-- 정책 1: 누구나 읽기 가능 (SELECT)
CREATE POLICY "Anyone can view banner messages"
  ON banner_messages
  FOR SELECT
  USING (true);

-- 정책 2: 로그인한 유저만 쓰기 가능 (INSERT)
CREATE POLICY "Authenticated users can create banner messages"
  ON banner_messages
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 정책 3: 본인이 작성한 메시지만 수정/삭제 가능 (UPDATE/DELETE)
CREATE POLICY "Users can update their own banner messages"
  ON banner_messages
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own banner messages"
  ON banner_messages
  FOR DELETE
  USING (auth.uid() = user_id);

-- 실시간 구독을 위한 Realtime 활성화 (선택사항)
-- ALTER PUBLICATION supabase_realtime ADD TABLE banner_messages;

-- 주의사항:
-- 1. 최신 10~20개만 보여주기 위해 클라이언트에서 LIMIT을 사용하거나
-- 2. 스케줄러로 오래된 메시지는 자동 삭제하는 로직을 추가할 수 있습니다.
-- 3. 승인 로직은 추후 admin 권한을 추가하여 구현 가능합니다.

