"use client"

import { DataTable } from "@/components/ui/data-table"
import { Course } from "@prisma/client"
import { useEffect, useState } from "react"
import { AddCourse } from "./add-course"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
      })
      setCourses(courses.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Courses Management</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available Courses</h2>
        <AddCourse onSuccess={fetchCourses} />
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading courses...</p>
        </div>
      ) : (
        <DataTable 
          columns={[
            { header: "Name", accessorKey: "name" },
            { header: "Duration", accessorKey: "duration" },
            { header: "Description", accessorKey: "description" }
          ]} 
          data={courses} 
        />
      )}
    </div>
  )
}
