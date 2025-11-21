import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { grantPoints, PointAction } from "@/lib/pointManager";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
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

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password || "");

        if (!isPasswordValid) {
          return null;
        }

        // 일일 로그인 포인트 지급 확인
        const now = new Date();
        const lastLogin = user.lastLoginAt;
        
        if (!lastLogin || (now.getTime() - lastLogin.getTime()) >= 24 * 60 * 60 * 1000) {
          await grantPoints(user.id, PointAction.DAILY_LOGIN);
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: now },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.nickname,
          image: user.profileImage,
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