import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!instructor) {
      return NextResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(instructor)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch instructor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, specialty, imagePath } = await request.json()
    const updatedInstructor = await prisma.instructor.update({
      where: { id: parseInt(params.id) },
      data: { name, specialty, imagePath }
    })
    return NextResponse.json(updatedInstructor)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update instructor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.instructor.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Instructor deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete instructor' },
      { status: 500 }
    )
  }
}
