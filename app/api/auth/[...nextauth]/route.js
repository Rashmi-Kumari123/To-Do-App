import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "jwt", // No database needed - sessions stored in JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token when user signs in
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      // Add token info to session object
      if (session.user) {
        session.user.id = token.id
        session.user.image = token.image
      }
      return session
    }
  },
  pages: {
    signIn: '/', // Custom sign-in page (optional)
  }
})

export { handler as GET, handler as POST }

