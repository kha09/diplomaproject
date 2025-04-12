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
    // Reverted: Always redirect logged-in users based on role from callback
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
       console.log("--- Redirect Callback ---");
       console.log("Received URL:", url);
       console.log("Base URL:", baseUrl);
       console.log("Token Role:", token?.role);

      // If the user is logged in (token exists), determine redirect target
      if (token) {
        let targetPath = '/profile'; // Default target for logged-in USER
        if (token.role === 'ADMIN') {
          targetPath = '/admin'; // Target for ADMIN
        }
        const roleBasedUrl = `${baseUrl}${targetPath}`;
        console.log("Token exists. Determined Role-based Target:", roleBasedUrl);

        // If the original URL was the login page, redirect to the role-based URL.
        // Otherwise (e.g., accessing a protected page directly), let middleware handle it later?
        // Let's try always returning the role-based URL if the token exists.
        // This should handle the immediate post-login redirect.
        console.log("Returning role-based URL:", roleBasedUrl);
        return roleBasedUrl;
      }

      // If not logged in (no token), allow the original URL
      // (middleware should handle redirecting to login if needed for protected routes)
      console.log("No token, allowing original URL:", url);
      return url;
    }
  },
}

export const auth = () => getServerSession(authOptions)
