"use client"

import { DataTable } from "@/components/ui/data-table"
// Import related types and Button
import { Course, Instructor, Diploma } from "@prisma/client" 
import { Button } from "@/components/ui/button" 
import { useEffect, useState } from "react"
import { AddCourse } from "./add-course"

// Define a type that includes the relations we expect from the API
type CourseWithRelations = Course & {
  instructor?: Instructor | null; // Use the imported Instructor type
  diploma?: Diploma | null;    // Use the imported Diploma type
}

export default function CoursesPage() {
  // Use the extended type for state
  const [courses, setCourses] = useState<CourseWithRelations[]>([]) 
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
          // Define columns according to TanStack Table v8+ ColumnDef
          // Note: The API route /api/courses includes instructor and diploma data
          columns={[
            {
              header: "Name",
              accessorKey: "name",
            },
            {
              header: "Description",
              accessorKey: "description",
              cell: ({ row }) => row.original.description || 'N/A',
            },
            {
              header: "Instructor",
              accessorKey: "instructor.name", // Access nested data
              cell: ({ row }) => row.original.instructor?.name || 'N/A', // Add optional chaining
            },
             {
              header: "Diploma",
              accessorKey: "diploma.name", // Access nested data
              cell: ({ row }) => row.original.diploma?.name || 'N/A', // Add optional chaining
            },
            {
              header: "Start Date",
              accessorKey: "startDate",
              cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
            },
            {
              header: "Finish Date",
              accessorKey: "finishDate",
              cell: ({ row }) => new Date(row.original.finishDate).toLocaleDateString(),
            },
            {
              header: "Price",
              accessorKey: "price",
              cell: ({ row }) => row.original.price.toLocaleString('en-US', { style: 'currency', currency: 'SAR' }),
            },
            {
              header: "Room",
              accessorKey: "room",
              cell: ({ row }) => row.original.room || 'N/A',
            },
            {
              id: "actions",
              header: "Actions",
              cell: ({ row }) => (
                <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
                  Delete
                </Button>
              ),
            },
          ]}
          data={courses}
        />
      )}
    </div>
  )
}
