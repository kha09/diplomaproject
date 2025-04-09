import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const messages = await prisma.contactUs.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// Add POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactUs.create({
      data: {
        name,
        email,
        phone,
        // 'date' defaults to now() in the schema
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: 'Failed to create contact message', details: errorMessage },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    // Note: DELETE usually takes ID from URL params, not body.
    // Consider changing this later if needed.
    const { id } = await request.json() 
    await prisma.contactUs.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ message: 'Message deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
