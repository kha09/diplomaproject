"use client"

import { DataTable } from "@/components/ui/data-table"
import { Event } from "@prisma/client"
import { Button } from "@/components/ui/button"; // Moved import here
import { useEffect, useState } from "react"
import { AddEvent } from "./add-event"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })
      setEvents(events.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Events Management</h1>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <AddEvent onSuccess={fetchEvents} />
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <p>Loading events...</p>
        </div>
      ) : (
        <DataTable
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
              header: "Image",
              accessorKey: "imagePath",
              cell: ({ row }) => {
                 const path = row.original.imagePath;
                 return path ? <img src={path} alt={row.original.name} className="h-10 w-10 object-cover rounded" /> : 'N/A';
              },
            },
            {
              header: "Place",
              accessorKey: "place",
              cell: ({ row }) => row.original.place || 'N/A',
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
              header: "Link",
              accessorKey: "link",
              cell: ({ row }) => {
                const link = row.original.link;
                return link ? <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Link</a> : 'N/A';
              },
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
          data={events}
        />
      )}
      {/* Removed extra closing brace here */}
    </div>
  )
}
