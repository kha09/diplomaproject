import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/logout-button'; // Import the button

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            {/* Add the logout button */}
            <LogoutButton /> 
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
