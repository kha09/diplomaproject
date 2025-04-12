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
    // Simplified redirect callback - rely more on defaults and middleware
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
       console.log("--- Redirect Callback ---");
       console.log("Received URL:", url);
       console.log("Base URL:", baseUrl);
       console.log("Token Role:", token?.role);

       // If the user is logging in (token just became available)
       // and the requested URL is the login page itself,
       // determine the role-based redirect.
       // Check if the relative path is /login
       const relativeUrl = url.startsWith(baseUrl) ? url.substring(baseUrl.length) : url;
       const isLoggingInOnLoginPage = token && relativeUrl.startsWith('/login');

       if (isLoggingInOnLoginPage) {
           const destination = token.role === 'ADMIN' ? `${baseUrl}/admin` : `${baseUrl}/profile`;
           console.log("Detected login on login page, redirecting to:", destination);
           return destination;
       }

       // If the user is already logged in and trying to access a specific page (e.g., from a bookmark or callbackUrl)
       // Let the middleware handle protection/redirection based on the requested 'url'.
       // If the user is not logged in, also return the original 'url'.
       console.log("Not a direct login redirect case, returning original/requested URL for middleware:", url);
       return url; // Return the original URL requested or the baseUrl if login failed
    }
  },
}

export const auth = () => getServerSession(authOptions)
