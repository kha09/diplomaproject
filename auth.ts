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
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes in seconds
  },
  // Explicitly configure cookies for production/Vercel
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith("https://") && !process.env.NEXTAUTH_URL?.startsWith("http://localhost"),
  cookies: {
    sessionToken: {
      name: process.env.NEXTAUTH_URL?.startsWith("https://") && !process.env.NEXTAUTH_URL?.startsWith("http://localhost")
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.startsWith("https://") && !process.env.NEXTAUTH_URL?.startsWith("http://localhost"),
        // Consider adding domain if needed, but often not required on Vercel
        // domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : undefined, 
      },
    },
    // Configure other cookies (callback, csrf) similarly if needed
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: any, user?: any, trigger?: "signIn" | "signUp" | "update", session?: any }) {
      console.log("JWT callback START:", { token, user, trigger, session });
      // 1. Initial sign in: Add basic info from authorize() result
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // We might not have all fields here yet, depending on authorize() return
      }

      // 2. Update trigger: If session was updated (e.g., profile save), refresh token data
      if (trigger === "update" && session?.user) {
        console.log("JWT Callback: Update trigger detected, refreshing token data from session:", session.user);
        // Overwrite token fields with the updated session data
        token.id = session.user.id;
        token.name = session.user.name; // fullName is usually mapped to name
        token.email = session.user.email;
        token.picture = session.user.image; // imagePath is usually mapped to picture/image
        token.role = session.user.role;
        token.phoneNumber = session.user.phoneNumber;
        token.degree = session.user.degree;
        token.country = session.user.country;
        token.city = session.user.city;
        token.dateOfBirth = session.user.dateOfBirth;
        token.imagePath = session.user.imagePath;
        token.hasActivatedCode = session.user.hasActivatedCode; // Add hasActivatedCode on update
        return token; // Return updated token immediately
      }

      // 3. On subsequent JWT reads (or initial if needed): Fetch full user data
      // Ensure we have an ID to fetch the user
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: parseInt(token.id as string, 10) },
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
              phoneNumber: true,
              degree: true,
              country: true,
              city: true,
              dateOfBirth: true,
              imagePath: true,
              hasActivatedCode: true, // Select hasActivatedCode
            }
          });

          if (dbUser) {
            // Update token with fresh data from DB
            token.id = dbUser.id.toString(); // Keep ID as string in token
            token.name = dbUser.fullName;
            token.email = dbUser.email;
            token.role = dbUser.role;
            token.phoneNumber = dbUser.phoneNumber;
            token.degree = dbUser.degree;
            token.country = dbUser.country;
            token.city = dbUser.city;
            token.dateOfBirth = dbUser.dateOfBirth; // Keep as Date object or null
             token.imagePath = dbUser.imagePath;
             token.picture = dbUser.imagePath; // Map imagePath to standard 'picture' claim
             token.hasActivatedCode = dbUser.hasActivatedCode; // Add hasActivatedCode from DB
           } else {
              console.error("JWT Callback: User not found in DB for token ID:", token.id);
             // Potentially invalidate token or handle error
             return null; // Returning null might sign the user out
          }
        } catch (error) {
          console.error("JWT Callback: Error fetching user from DB:", error);
          // Keep existing token data but log error
        }
      }

      console.log("JWT callback END:", token);
      return token;
    },
    async session({ session, token }: { session: any, token?: any }) {
      console.log("SESSION callback START:", { session, token });
      // Copy all enriched data from the token to the session.user object
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture; // Use 'picture' which we mapped from imagePath
        session.user.role = token.role;
        session.user.phoneNumber = token.phoneNumber;
        session.user.degree = token.degree;
        session.user.country = token.country;
        session.user.city = token.city;
         session.user.dateOfBirth = token.dateOfBirth;
         session.user.imagePath = token.imagePath; // Also keep original imagePath if needed
         session.user.hasActivatedCode = token.hasActivatedCode; // Add hasActivatedCode to session
       }
      console.log("SESSION callback END:", session);
      return session;
    },
    // Redirect callback remains the same
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
       console.log("--- Redirect Callback ---");
       console.log("Received URL:", url);
       console.log("Base URL:", baseUrl);
       console.log("Token Role:", token?.role);

      // Local development routing fix
      const isLocal = baseUrl.startsWith('http://localhost') || process.env.NODE_ENV === 'development';
      if (isLocal) {
        if (token) {
          if (token.role === 'ADMIN') {
            const adminUrl = `${baseUrl}/admin`;
            console.log("Local dev: ADMIN detected, redirecting to:", adminUrl);
            return adminUrl;
          }
          const profileUrl = `${baseUrl}/profile`;
          console.log("Local dev: Non-admin, redirecting to:", profileUrl);
          return profileUrl;
        }
        console.log("Local dev: No token, allowing original URL:", url);
        return url;
      }

      // Production logic (unchanged)
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
