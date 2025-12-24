import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions = {
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
        });

        if (!user) throw new Error("User not found");
        if (!user.isVerified) throw new Error("Please verify your email first");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
