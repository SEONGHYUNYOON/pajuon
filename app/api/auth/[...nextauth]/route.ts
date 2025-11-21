import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";
import { grantPoints, PointAction } from "@/lib/pointManager";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const supabase = await createClient();
        const { data: user, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password || "");

        if (!isPasswordValid) {
          return null;
        }

        // 일일 로그인 포인트 지급 확인
        const now = new Date();
        const lastLogin = user.last_login_at ? new Date(user.last_login_at) : null;
        
        if (!lastLogin || (now.getTime() - lastLogin.getTime()) >= 24 * 60 * 60 * 1000) {
          await grantPoints(user.id, PointAction.DAILY_LOGIN);
          await supabase
            .from("profiles")
            .update({ last_login_at: now.toISOString() })
            .eq("id", user.id);
        }

        return {
          id: user.id,
          email: user.email,
          name: user.nickname,
          image: user.profile_image,
        };
      },
    }),
    // 카카오, 네이버, 구글 OAuth는 실제 키를 설정한 후 추가
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export const GET = handlers.GET;
export const POST = handlers.POST;