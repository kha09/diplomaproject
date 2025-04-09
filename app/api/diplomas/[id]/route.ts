import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const diploma = await prisma.diploma.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!diploma) {
      return NextResponse.json(
        { error: 'Diploma not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(diploma)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch diploma' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, startDate, finishDate, price, room } = await request.json()
    const updatedDiploma = await prisma.diploma.update({
      where: { id: parseInt(params.id) },
      data: { 
        name,
        description,
        startDate: new Date(startDate),
        finishDate: new Date(finishDate),
        price,
        room
      }
    })
    return NextResponse.json(updatedDiploma)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update diploma' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.diploma.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Diploma deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete diploma' },
      { status: 500 }
    )
  }
}
