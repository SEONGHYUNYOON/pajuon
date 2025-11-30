-- 알림 테이블 생성
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'like', 'comment', 'notice' 등
  content TEXT NOT NULL,
  link TEXT, -- 클릭 시 이동할 경로
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- RLS 설정
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 내 알림만 조회 가능
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- 내 알림만 읽음 처리 가능 (UPDATE)
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- 알림 생성은 누구나 가능 (예: 댓글 작성자가 글 작성자에게 알림 보냄)
CREATE POLICY "Users can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
