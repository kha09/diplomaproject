import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Corrected path to root auth.ts

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'غير مصرح به' }, { status: 401 });
  }
  // Ensure user ID is a number for Prisma
  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
      return NextResponse.json({ message: 'معرف المستخدم غير صالح' }, { status: 400 });
  }


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

    // Use a transaction to ensure both updates succeed or fail together
    await prisma.$transaction(async (tx) => {
      // 1. Mark the code as unavailable
      await tx.diplomaCode.update({
        where: { id: diplomaCode.id },
        data: { available: false },
      });

      // 2. Mark the user as having activated a code
      await tx.user.update({
        where: { id: userId },
        data: { hasActivatedCode: true },
      });
    });

    // Return success message
    return NextResponse.json({ message: 'تم الاضافة بنجاح' }, { status: 200 });

  } catch (error) {
    console.error('Error activating diploma code:', error);
    // Generic error for unexpected issues
    return NextResponse.json({ message: 'حدث خطأ أثناء تفعيل الكود.' }, { status: 500 });
  }
}
