import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      hasActivatedCode?: boolean // Add hasActivatedCode to Session User
      // Add other custom fields from your DB if needed
      phoneNumber?: string | null;
      degree?: string | null;
      country?: string | null;
      city?: string | null;
      dateOfBirth?: Date | null;
      imagePath?: string | null;
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
    hasActivatedCode?: boolean // Add hasActivatedCode to User
    // Add other custom fields from your DB if needed
    phoneNumber?: string | null;
    degree?: string | null;
    country?: string | null;
    city?: string | null;
    dateOfBirth?: Date | null;
    imagePath?: string | null;
  }

  interface JWT {
    id: string
    role: string
    hasActivatedCode?: boolean // Add hasActivatedCode to JWT
    // Add other custom fields from your DB if needed
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    phoneNumber?: string | null;
    degree?: string | null;
    country?: string | null;
    city?: string | null;
    dateOfBirth?: Date | null;
    imagePath?: string | null;
  }
}
