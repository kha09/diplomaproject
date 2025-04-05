import { DataTable } from './data-table'
import { columns } from './columns'
import prisma from '@/prisma/client'
import Link from 'next/link'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      diploma: true,
      courses: true
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link 
          href="/admin/users/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add User
        </Link>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
