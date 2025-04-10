import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs"; // Import bcrypt

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Explicitly define the sign-in page
  pages: {
    signIn: '/login', 
    // signOut: '/auth/signout', // Optional: Define other pages if needed
    // error: '/auth/error', // Optional: Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Optional: (e.g. for email verification)
    // newUser: '/auth/new-user' // Optional: New users will be directed here on first sign in (leave the property out to disable)
  },
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
      return token;
    },
    // Simplified redirect callback
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
       console.log("--- Redirect Callback ---");
       console.log("Received URL:", url);
       console.log("Base URL:", baseUrl);
       console.log("Token Role:", token?.role);

      // If signing in or callback url is the base path
      if (token) {
        // Determine target based on role
        let targetPath = '/'; // Default to homepage
        if (token.role === 'ADMIN') {
          targetPath = '/admin';
        } else if (token.role === 'USER') {
          targetPath = '/profile';
        }
        
        // If the original URL was the base URL or the login page, redirect to the role-based target
        if (url === baseUrl || url.startsWith(`${baseUrl}/login`)) {
           const finalUrl = `${baseUrl}${targetPath}`;
           console.log("Redirecting logged-in user to role-based target:", finalUrl);
           return finalUrl;
        }
        
        // If the original URL was something else (e.g., protected page), allow it
        console.log("Allowing redirect to original URL:", url);
        return url; 
      }
      
      // If not logged in, handle normally (usually redirect to login or allow public pages)
      console.log("No token, returning original/base URL:", url.startsWith(baseUrl) ? url : baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
}

export const auth = () => getServerSession(authOptions)
