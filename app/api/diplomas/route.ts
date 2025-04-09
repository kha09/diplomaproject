import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const diplomas = await prisma.diploma.findMany()
    return NextResponse.json(diplomas)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch diplomas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, startDate, finishDate, price, room } = body

    // --- Validation ---
    if (!name || !startDate || !finishDate || price === undefined || price === null) {
      return NextResponse.json(
        { error: 'Name, Start Date, Finish Date, and Price are required fields.' },
        { status: 400 }
      )
    }

    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice)) {
      return NextResponse.json(
        { error: 'Price must be a valid number.' },
        { status: 400 }
      )
    }

    let startDateTime, finishDateTime;
    try {
      startDateTime = new Date(startDate);
      finishDateTime = new Date(finishDate);
      // Basic check if dates are valid
      if (isNaN(startDateTime.getTime()) || isNaN(finishDateTime.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (dateError) {
       return NextResponse.json(
        { error: 'Invalid date format for Start Date or Finish Date.' },
        { status: 400 }
      )
    }
    // --- End Validation ---


    const diploma = await prisma.diploma.create({
      data: {
        name,
        description: description || null, // Handle optional field
        startDate: startDateTime,
        finishDate: finishDateTime,
        price: parsedPrice,
        room: room || null // Handle optional field
      }
    })
    return NextResponse.json(diploma, { status: 201 })
  } catch (error) {
    console.error("Error creating diploma:", error); // Log the specific error
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    // Check for specific Prisma errors if needed, e.g., unique constraint violation
    return NextResponse.json(
      { error: 'Failed to create diploma', details: errorMessage },
      { status: 500 }
    )
  }
}
