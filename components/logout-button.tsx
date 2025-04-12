'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { LogOut } from 'lucide-react'; // Optional: Icon

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' }); // Redirect to login page after logout
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" /> {/* Optional Icon */}
      Logout
    </Button>
  );
}
