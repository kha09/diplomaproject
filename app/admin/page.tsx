import Link from 'next/link'

export default function AdminDashboard() {
  const sections = [
    { name: 'Users', href: '/admin/users' },
    { name: 'Instructors', href: '/admin/instructors' },
    { name: 'Diplomas', href: '/admin/diplomas' },
    { name: 'Courses', href: '/admin/courses' },
    { name: 'Events', href: '/admin/events' },
    { name: 'Contact Messages', href: '/admin/contact' }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">{section.name}</h3>
            <p className="text-gray-500 mt-2">Manage {section.name.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
