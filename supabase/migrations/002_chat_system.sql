-- 1:1 채팅 메시지 테이블 생성
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT sender_receiver_different CHECK (sender_id != receiver_id)
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_unread ON messages(receiver_id, is_read) WHERE is_read = FALSE;

-- RLS (Row Level Security) 정책 설정
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 자신이 보낸 메시지 또는 받은 메시지만 조회 가능
CREATE POLICY "Users can view their own messages"
  ON messages
  FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 자신이 보낸 메시지만 수정 가능 (읽음 처리 등)
CREATE POLICY "Users can update their own sent messages"
  ON messages
  FOR UPDATE
  USING (auth.uid() = sender_id);

-- 받은 메시지의 읽음 상태만 업데이트 가능
CREATE POLICY "Users can mark received messages as read"
  ON messages
  FOR UPDATE
  USING (auth.uid() = receiver_id);

-- 자신이 메시지를 보낼 수 있음
CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- 실시간 구독을 위한 Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

