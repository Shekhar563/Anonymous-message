import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const identifier = credentials?.identifier?.trim();
        const password = credentials?.password;

        if (!identifier || !password) return null;

        const user = await UserModel.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        }).lean();

        if (!user) throw new Error("User not found");
        if (!user.isVerified) throw new Error("Please verify your email first");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.username, // NextAuth expects "name"
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      // user only exists on first login
      if (user) {
        token.id = (user as any).id;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).username = token.username as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
