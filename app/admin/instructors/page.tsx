"use client" // Add this directive

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/app/admin/users/data-table"
import { columns } from "@/app/admin/instructors/columns"
import { AddInstructor } from "./add-instructor"
import { Instructor } from "@prisma/client"
import { useEffect, useState } from "react"

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInstructors = async () => {
    try {
      const response = await fetch('/api/instructors')
      const data = await response.json()
      setInstructors(data)
    } catch (error) {
      console.error('Error fetching instructors:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/instructors/${id}`, {
        method: 'DELETE'
      })
      setInstructors(instructors.filter(i => i.id !== id))
    } catch (error) {
      console.error('Error deleting instructor:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Instructors Management</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Instructors List</h2>
          <AddInstructor onSuccess={fetchInstructors} />
        </div>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <p>Loading instructors...</p>
          </div>
        ) : (
          <DataTable 
            columns={columns(handleDelete)} 
            data={instructors} 
          />
        )}
      </Card>
    </div>
  )
}
