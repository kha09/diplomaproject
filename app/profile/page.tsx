import UserDashboard from './user-dashboard'; // Import the component

// Optionally add authentication checks here if needed
// import { auth } from '@/auth'; // Example using NextAuth.js
// import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  // Example authentication check:
  // const session = await auth();
  // if (!session?.user) {
  //   redirect('/login'); // Redirect to login if not authenticated
  // }

  // Render the dashboard component
  return <UserDashboard />;
}
