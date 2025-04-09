import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        instructor: true,
        diploma: true
      }
    })
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, startDate, finishDate, price, room, instructorId, diplomaId } = await request.json()
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(params.id) },
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
    return NextResponse.json(updatedCourse)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Course deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
