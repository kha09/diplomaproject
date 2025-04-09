import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const events = await prisma.event.findMany()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, imagePath, place, startDate, finishDate, link } = await request.json()
    const event = await prisma.event.create({
      data: {
        name,
        description,
        imagePath,
        place,
        startDate: new Date(startDate),
        finishDate: new Date(finishDate),
        link
      }
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
