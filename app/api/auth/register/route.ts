import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json(); // Use fullName to match component state

    // Validate input
    if (!fullName || !email || !password) { // Check fullName
      return NextResponse.json(
        { error: "Full name, email and password are required" }, // Update error message
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" }, // More specific error
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds 10

    // Create new user with hashed password
    const user = await prisma.user.create({
      data: {
        fullName: fullName, // Use fullName from request body
        email,
        password: hashedPassword, // Store the hashed password
        role: "USER" // Default role
      }
    });

    // Don't return the password in the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 }); // Return user data without password

  } catch (error) {
    console.error('Registration error:', error);
    // Provide a more generic error message for security
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
