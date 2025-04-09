import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, imagePath, place, startDate, finishDate, link } = await request.json()
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(params.id) },
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
    return NextResponse.json(updatedEvent)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Event deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
