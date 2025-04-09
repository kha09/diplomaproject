import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
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
        imagePath: true
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { 
      fullName, 
      email, 
      password, 
      role,
      phoneNumber,
      degree,
      country,
      city,
      dateOfBirth,
      imagePath
    } = await request.json()
    
    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password, // Note: Should be hashed in production
        role: role || "USER",
        phoneNumber,
        degree,
        country,
        city,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null, // Convert string to Date object or null
        imagePath
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error); // Log the specific error
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create user", details: errorMessage },
      { status: 500 }
    )
  }
}
