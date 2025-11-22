-- 배너 메시지 테이블 읽기 권한 재설정
-- 로그인하지 않은 사용자(익명)도 배너 메시지를 볼 수 있도록 권한 확대

-- 기존 정책 삭제 (충돌 방지)
DROP POLICY IF EXISTS "Anyone can view banner messages" ON banner_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON banner_messages;
DROP POLICY IF EXISTS "Public read access" ON banner_messages;

-- 모든 사용자(익명 포함)에게 SELECT 권한 허용
CREATE POLICY "Public read access" ON banner_messages 
  FOR SELECT 
  USING (true);

-- 확인용 쿼리 (선택사항)
-- SELECT * FROM banner_messages ORDER BY created_at DESC LIMIT 10;

