"use client"

import { DataTable } from './data-table'
import { getColumns } from './columns'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { AddUser } from './add-user'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      })
      setUsers(users.filter(u => u.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users Management</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users List</h2>
        <AddUser onSuccess={fetchUsers} />
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading users...</p>
        </div>
      ) : (
        <DataTable 
          columns={getColumns(handleDelete)} 
          data={users} 
        />
      )}
    </div>
  )
}
