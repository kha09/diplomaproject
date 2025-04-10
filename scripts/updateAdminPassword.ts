import prisma from '@/prisma/client'; // Use alias path
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'admin@example.com';
// IMPORTANT: Use the actual password you want for the admin account
const NEW_PLAIN_PASSWORD = 'admin123'; 

async function updateAdminPassword() {
  console.log(`Attempting to update password for admin: ${ADMIN_EMAIL}`);

  try {
    const user = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (!user) {
      console.error(`Admin user with email ${ADMIN_EMAIL} not found.`);
      return;
    }

    // Check if the password already looks hashed (basic check)
    if (user.password.length > 30 && user.password.startsWith('$2')) {
         // Ask if user wants to re-hash with the NEW_PLAIN_PASSWORD anyway
         console.warn(`Password for ${ADMIN_EMAIL} appears to be already hashed.`);
         // For safety, let's re-hash the defined NEW_PLAIN_PASSWORD
         // If you are SURE the current hash is correct for a different password, 
         // you might skip this or handle it differently.
    }
    
    console.log(`Hashing new password: "${NEW_PLAIN_PASSWORD}"`);
    const hashedPassword = await bcrypt.hash(NEW_PLAIN_PASSWORD, 10);
    console.log(`Generated hash: ${hashedPassword.substring(0, 15)}...`); // Log partial hash for confirmation

    const updatedUser = await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { password: hashedPassword },
    });

    console.log(`Successfully updated password for admin user: ${updatedUser.email}`);

  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
