import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Assuming your Prisma client instance is exported from here

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string' || code.trim() === '') {
      return NextResponse.json({ message: 'الرجاء إدخال كود المنتج.' }, { status: 400 });
    }

    // Find the code in the database
    const diplomaCode = await prisma.diplomaCode.findUnique({
      where: { code: code.trim() },
    });

    // Check if code exists and is available
    if (!diplomaCode || !diplomaCode.available) {
      return NextResponse.json({ message: 'الكود غير صالح' }, { status: 400 });
    }

    // If code is valid and available, update it to unavailable
    await prisma.diplomaCode.update({
      where: { id: diplomaCode.id },
      data: { available: false },
    });

    // Return success message
    return NextResponse.json({ message: 'تم الاضافة بنجاح' }, { status: 200 });

  } catch (error) {
    console.error('Error activating diploma code:', error);
    // Generic error for unexpected issues
    return NextResponse.json({ message: 'حدث خطأ أثناء تفعيل الكود.' }, { status: 500 });
  }
}
