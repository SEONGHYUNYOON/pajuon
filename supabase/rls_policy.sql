-- Supabase RLS Policy: profiles 테이블 SELECT 권한 설정
-- 이 SQL을 Supabase SQL Editor에서 실행하세요.

-- 1. 기존 정책 확인 (선택사항)
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- 2. 기존 정책 삭제 (필요시)
-- DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;

-- 3. profiles 테이블에 SELECT 정책 추가 (누구나 조회 가능)
CREATE POLICY IF NOT EXISTS "Public profiles are viewable by everyone." 
ON public.profiles 
FOR SELECT 
USING (true);

-- 4. 정책 활성화 확인
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

