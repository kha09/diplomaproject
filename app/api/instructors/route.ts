import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const instructors = await prisma.instructor.findMany()
    return NextResponse.json(instructors)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch instructors' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, specialty, imagePath } = await request.json()
    const instructor = await prisma.instructor.create({
      data: { name, specialty, imagePath }
    })
    return NextResponse.json(instructor, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create instructor' },
      { status: 500 }
    )
  }
}
