import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Adjust the path if your auth options are elsewhere
import prisma from '@/prisma/client'; // Adjust the path to your Prisma client instance

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  // 1. Check if user is authenticated
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Destructure all fields from the body based on UserData interface and Prisma schema
    const {
      fullName,
      email,
      phoneNumber,
      degree,
      country,
      city,
      dateOfBirth, // This will be an ISO string or null from the frontend
      imagePath,   // This will be the new or existing image path
    } = body;

    // 2. Validate incoming data (add more specific validation as needed)
    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
      return NextResponse.json({ message: 'Full name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
    }
    // Optional: Add validation for phone number format, country/city existence, etc.
    if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
        return NextResponse.json({ message: 'Invalid date of birth format.' }, { status: 400 });
    }


    // Convert session user ID string to integer for Prisma
    const userIdInt = parseInt(session.user.id, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
    }

    // 3. Update user data in the database
    const updatedUser = await prisma.user.update({
      where: { id: userIdInt },
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        // Use nullish coalescing to handle potentially undefined optional fields
        phoneNumber: phoneNumber ?? null,
        degree: degree ?? null,
        country: country ?? null,
        city: city ?? null,
        // Convert valid ISO string dateOfBirth back to Date object for Prisma, or null
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        imagePath: imagePath ?? null, // Save the image path
      },
      // Select all fields needed for the session update and potential display
      select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          degree: true,
          country: true,
          city: true,
          dateOfBirth: true,
          imagePath: true,
          role: true,
      }
    });

    // 4. Return success response with the updated user data (password already excluded by select)
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('Error updating user profile:', error);
    // Handle potential Prisma errors (e.g., unique constraint violation if email is already taken)
    if (error instanceof Error && (error as any).code === 'P2002' && (error as any).meta?.target?.includes('email')) {
        return NextResponse.json({ message: 'Email address is already in use.' }, { status: 409 }); // Conflict
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
