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
    const { name, description, startDate, finishDate, price, room, instructorId, diplomaId } = await request.json()
    const course = await prisma.course.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        finishDate: new Date(finishDate),
        price,
        room,
        instructorId: parseInt(instructorId),
        diplomaId: diplomaId ? parseInt(diplomaId) : null
      }
    })
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
