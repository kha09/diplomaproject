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
    const { name, description, startDate, finishDate, price, room } = await request.json()
    const diploma = await prisma.diploma.create({
      data: { 
        name,
        description,
        startDate: new Date(startDate),
        finishDate: new Date(finishDate),
        price,
        room
      }
    })
    return NextResponse.json(diploma, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create diploma' },
      { status: 500 }
    )
  }
}
