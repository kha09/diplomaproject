import prisma from '@/prisma/client'; // Use alias path
import * as bcrypt from 'bcryptjs'; // Use * as import syntax

// --- Define the new admin credentials ---
const ADMIN_EMAIL = 'superadmin@example.com';
const ADMIN_PASSWORD = '123456'; 
const ADMIN_FULL_NAME = 'Super Admin'; // Optional: Add a full name
// ---

async function createAdmin() {
  console.log(`Attempting to create admin user: ${ADMIN_EMAIL}`);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (existingUser) {
      console.warn(`Admin user with email ${ADMIN_EMAIL} already exists.`);
      // Optionally, you could update the existing one here if needed, 
      // but for now, we'll just report it exists.
      // Example update (uncomment if needed):
      /*
      console.log('Updating existing admin user...');
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const updatedUser = await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { 
            password: hashedPassword,
            role: 'ADMIN', // Ensure role is ADMIN
            fullName: ADMIN_FULL_NAME 
        },
      });
      console.log(`Successfully updated existing admin user: ${updatedUser.email}`);
      */
      return; 
    }

    // Hash the password
    console.log(`Hashing password: "${ADMIN_PASSWORD}"`);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    console.log(`Generated hash: ${hashedPassword.substring(0, 15)}...`);

    // Create the new admin user
    const newUser = await prisma.user.create({
      data: {
        fullName: ADMIN_FULL_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'ADMIN', // Explicitly set role to ADMIN
      },
    });

    console.log(`Successfully created new admin user: ${newUser.email}`);

  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
