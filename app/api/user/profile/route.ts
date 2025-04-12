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
    // Correctly destructure fullName based on the schema
    const { fullName, email } = body; // Add other fields if needed (e.g., phone)

    // 2. Validate incoming data (basic validation) using fullName
    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
      return NextResponse.json({ message: 'Full name is required' }, { status: 400 }); // Use fullName in validation
    }
    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
    }
    // Add validation for other fields if necessary

    // Convert session user ID string to integer for Prisma
    const userIdInt = parseInt(session.user.id, 10);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
    }

    // 3. Update user data in the database
    const updatedUser = await prisma.user.update({
      where: { id: userIdInt }, // Use the integer ID
      data: {
        fullName: fullName.trim(), // Use fullName
        email: email.trim().toLowerCase(), // Store email consistently
        // Add other fields to update from your schema if needed:
        // phoneNumber: body.phoneNumber || null,
        // degree: body.degree || null,
        // country: body.country || null,
        // city: body.city || null,
        // dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null, // Ensure date is handled correctly
        // imagePath: body.imagePath || null,
      },
      // Optionally select only needed fields to return
      // select: { id: true, name: true, email: true, role: true }
    });

    // 4. Return success response
    // Avoid sending back sensitive data like password hashes
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });

  } catch (error) {
    console.error('Error updating user profile:', error);
    // Handle potential Prisma errors (e.g., unique constraint violation if email is already taken)
    if (error instanceof Error && (error as any).code === 'P2002' && (error as any).meta?.target?.includes('email')) {
        return NextResponse.json({ message: 'Email address is already in use.' }, { status: 409 }); // Conflict
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
