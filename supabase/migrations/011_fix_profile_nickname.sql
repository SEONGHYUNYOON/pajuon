-- 기존 트리거 및 함수 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 새로운 함수 정의 (메타데이터 닉네임 우선 사용)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_nickname TEXT;
BEGIN
  -- 메타데이터에서 닉네임 추출, 없으면 이메일 앞부분 사용
  v_nickname := new.raw_user_meta_data->>'nickname';
  
  IF v_nickname IS NULL OR v_nickname = '' THEN
    v_nickname := split_part(new.email, '@', 1);
  END IF;

  INSERT INTO public.profiles (id, email, nickname)
  VALUES (
    new.id, 
    new.email, 
    v_nickname
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 재생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
