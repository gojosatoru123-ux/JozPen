import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./database/drizzle"
import { eq, exists } from "drizzle-orm"
import { usersTable } from "@/database/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub({
    clientId:process.env.AUTH_GITHUB_ID,
    clientSecret:process.env.AUTH_GITHUB_SECRET,
  }),Google({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  })],
  callbacks: {
    async signIn({ user }) {
      const existing = await db.select().from(usersTable).where(eq(usersTable.email, user.email))
      if (existing.length > 0) {
        return true;
      }
      const name = user.name;
      const email = user.email;
      const profileUrl = user.image;

      await db.insert(usersTable).values({
        name,
        email,
        profileUrl,
        isAuthorized: false,
      })
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const existing = await db.select().from(usersTable).where(eq(usersTable.email, profile.email))
        if (existing.length > 0) {
          token.id = existing[0].id, token.isAuthorized = existing[0].isAuthorized
        }
      }
      return token
    },
    async session({ session,token }) {
      Object.assign(session, { id: token.id , isAuthorized: token.isAuthorized});
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/';
    },
  }
})