import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Adjust path if needed

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Require authentication to upload
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    // --- File Validation ---
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        return NextResponse.json({ message: `File size exceeds ${maxSize / 1024 / 1024}MB limit.` }, { status: 400 });
    }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ message: 'Invalid file type. Only PNG, JPEG, JPG, WEBP allowed.' }, { status: 400 });
    }
    // --- End Validation ---

    // Create a unique filename for Vercel Blob
    const filename = `blog/${session.user.id}-${Date.now()}-${file.name}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    // Return the public URL of the uploaded file
    return NextResponse.json({ success: true, filePath: blob.url }, { status: 201 });

  } catch (error) {
    console.error('Error uploading file:', error);
    // Provide a more generic error message to the client
    return NextResponse.json({ message: 'Error uploading file.' }, { status: 500 });
  }
}
