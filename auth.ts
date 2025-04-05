import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma/client"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorization attempt with credentials:', credentials?.email)
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password')
          throw new Error("Email and password are required")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        console.log('Found user:', user)

        if (!user) {
          console.log('User not found')
          throw new Error("User not found")
        }

        // In a real app, you should use proper password hashing like bcrypt
        // This is simplified for demonstration
        if (user.password !== credentials.password) {
          console.log('Password mismatch')
          throw new Error("Invalid password")
        }

        console.log('Authorization successful, returning user:', {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role
        })
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      console.log('Creating session with token:', token)
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        console.log('Session created:', session)
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    }
  }
}

export const auth = () => getServerSession(authOptions)
