-- 관리자 권한 정책 (Admin Policies)
-- Supabase 대시보드 SQL Editor에서 이 스크립트를 실행하세요

-- 1. 관리자(admin)는 모든 프로필을 볼 수 있음 (이미 public read가 있지만 명시적으로 추가)
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- 2. 관리자는 모든 게시글(posts)을 수정/삭제할 수 있음
CREATE POLICY "Admins can update any post"
  ON public.posts
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete any post"
  ON public.posts
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- 3. 관리자는 모든 댓글(comments)을 수정/삭제할 수 있음
CREATE POLICY "Admins can update any comment"
  ON public.comments
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete any comment"
  ON public.comments
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- 4. 관리자 확인 함수 (클라이언트에서 사용하기 위함)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
