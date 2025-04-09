import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: true,
        diploma: true
      }
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, startDate, finishDate, price, room, instructorId, diplomaId } = body

    // --- Validation ---
    if (!name || !startDate || !finishDate || price === undefined || price === null || instructorId === undefined || instructorId === null) {
      return NextResponse.json(
        { error: 'Name, Start Date, Finish Date, Price, and Instructor ID are required fields.' },
        { status: 400 }
      )
    }

    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: 'Price must be a valid number.' }, { status: 400 })
    }

    const parsedInstructorId = parseInt(instructorId, 10)
    if (isNaN(parsedInstructorId)) {
      return NextResponse.json({ error: 'Instructor ID must be a valid integer.' }, { status: 400 })
    }

    const parsedDiplomaId = diplomaId !== null && diplomaId !== undefined && diplomaId !== '' ? parseInt(diplomaId, 10) : null
    if (diplomaId !== null && diplomaId !== undefined && diplomaId !== '' && (parsedDiplomaId === null || isNaN(parsedDiplomaId))) {
       return NextResponse.json({ error: 'Diploma ID must be a valid integer if provided.' }, { status: 400 })
    }


    let startDateTime, finishDateTime;
    try {
      startDateTime = new Date(startDate);
      finishDateTime = new Date(finishDate);
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

    // Optional: Check if instructorId and diplomaId exist in the database
    // const instructorExists = await prisma.instructor.findUnique({ where: { id: parsedInstructorId } });
    // if (!instructorExists) {
    //   return NextResponse.json({ error: 'Instructor not found.' }, { status: 404 });
    // }
    // if (parsedDiplomaId !== null) {
    //   const diplomaExists = await prisma.diploma.findUnique({ where: { id: parsedDiplomaId } });
    //   if (!diplomaExists) {
    //     return NextResponse.json({ error: 'Diploma not found.' }, { status: 404 });
    //   }
    // }


    const course = await prisma.course.create({
      data: {
        name,
        description: description || null,
        startDate: startDateTime,
        finishDate: finishDateTime,
        price: parsedPrice,
        room: room || null,
        instructorId: parsedInstructorId,
        diplomaId: parsedDiplomaId // Use the parsed value (int or null)
      }
    })
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
     console.error("Error creating course:", error); // Log the specific error
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     // Add more specific Prisma error checks if needed
     return NextResponse.json(
       { error: 'Failed to create course', details: errorMessage },
       { status: 500 }
     )
  }
}
