import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs"; // Import bcrypt

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

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(
          credentials.password, 
          user.password
        );

        if (!isPasswordValid) {
          console.log('Password mismatch');
          throw new Error("Invalid password");
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
    async session({ session, token }: { session: any, token?: any }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
      // Redirect admins to admin page after login
      if (url === baseUrl && token?.role === 'ADMIN') {
        return `${baseUrl}/admin`
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
}

export const auth = () => getServerSession(authOptions)
