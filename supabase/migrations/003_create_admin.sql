-- 관리자 계정 생성 스크립트
-- 이미 가입된 유저의 role을 'admin'으로 변경하는 쿼리
-- 더 안전한 방법: auth.users 테이블에 직접 삽입하지 않고 기존 유저를 업데이트

-- profiles 테이블에 role 컬럼이 없다면 먼저 추가
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- 특정 닉네임의 유저를 관리자로 지정
-- 예시: 닉네임이 '파주대장'인 유저를 관리자로 설정
UPDATE profiles 
SET role = 'admin' 
WHERE nickname = '파주대장';

-- 또는 특정 이메일의 유저를 관리자로 지정 (더 정확함)
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE email = 'united@pajuon.com';

-- 확인 쿼리: 관리자 목록 확인
-- SELECT id, nickname, email, role FROM profiles WHERE role = 'admin';

-- 주의사항:
-- 1. 이 스크립트는 이미 가입된 유저가 있어야 작동합니다.
-- 2. 실제 운영 환경에서는 더 안전한 방법으로 관리자 계정을 생성해야 합니다.
-- 3. Supabase Dashboard에서 직접 SQL을 실행하거나, 마이그레이션으로 적용할 수 있습니다.

