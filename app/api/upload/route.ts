import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth'; // Adjust path if needed
import { stat } from 'fs/promises'; // Import stat for checking directory existence

// Helper function to ensure directory exists
async function ensureDirExists(dirPath: string) {
  try {
    await stat(dirPath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      try {
        await mkdir(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
      } catch (mkdirError) {
        console.error(`Error creating directory ${dirPath}:`, mkdirError);
        throw new Error(`Could not create upload directory.`); // Re-throw specific error
      }
    } else {
      // Re-throw other errors (e.g., permission issues)
      console.error(`Error checking directory ${dirPath}:`, error);
      throw error;
    }
  }
}


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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename (e.g., user-<userId>-<timestamp>.<ext>)
    const fileExtension = path.extname(file.name);
    const filename = `user-${session.user.id}-${Date.now()}${fileExtension}`;

    // Define the path relative to the project root
    const uploadDir = path.join(process.cwd(), 'public/uploads/avatars');
    const filePath = path.join(uploadDir, filename);
    const publicPath = `/uploads/avatars/${filename}`; // Path accessible via URL

    // Ensure the upload directory exists before writing
    await ensureDirExists(uploadDir);

    // Write the file
    await writeFile(filePath, buffer);
    console.log(`File uploaded to ${filePath}`);

    // Return the public path of the uploaded file
    return NextResponse.json({ success: true, filePath: publicPath }, { status: 201 });

  } catch (error) {
    console.error('Error uploading file:', error);
    // Provide a more generic error message to the client
    return NextResponse.json({ message: 'Error uploading file.' }, { status: 500 });
  }
}
