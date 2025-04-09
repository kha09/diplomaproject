"use client"

import { DataTable } from "@/components/ui/data-table"
import { Diploma } from "@prisma/client"
import { useEffect, useState } from "react"
import { AddDiploma } from "./add-diploma"

export default function DiplomasPage() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDiplomas = async () => {
    try {
      const response = await fetch('/api/diplomas')
      const data = await response.json()
      setDiplomas(data)
    } catch (error) {
      console.error('Error fetching diplomas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiplomas()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/diplomas/${id}`, {
        method: 'DELETE'
      })
      setDiplomas(diplomas.filter(d => d.id !== id))
    } catch (error) {
      console.error('Error deleting diploma:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Diplomas Management</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Diploma Programs</h2>
        <AddDiploma onSuccess={fetchDiplomas} />
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading diplomas...</p>
        </div>
      ) : (
        <DataTable
          // Define columns according to TanStack Table v8+ ColumnDef
          columns={[
            {
              header: "Name",
              accessorKey: "name", // Matches the key in your Diploma data object
            },
            {
              header: "Description",
              accessorKey: "description",
              cell: ({ row }) => row.original.description || 'N/A',
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
              cell: ({ row }) => row.original.price.toLocaleString('en-US', { style: 'currency', currency: 'SAR' }), // Format as currency (e.g., SAR)
            },
            {
              header: "Room",
              accessorKey: "room",
              cell: ({ row }) => row.original.room || 'N/A',
            },
            // Add Actions column if needed, similar to other tables
            // {
            //   id: "actions",
            //   header: "Actions",
            //   cell: ({ row }) => (
            //     <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
            //       Delete
            //     </Button>
            //   ),
            // },
          ]}
          data={diplomas}
        />
      )}
    </div>
  )
}
