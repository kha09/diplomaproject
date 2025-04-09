"use client" // Mark as Client Component

import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table" // Assuming this is your generic table component
import { ContactUs } from "@prisma/client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button" // Import Button for delete action
import { ColumnDef } from "@tanstack/react-table" // Import ColumnDef type

export default function ContactMessagesPage() { // Function name doesn't affect the route
  const [messages, setMessages] = useState<ContactUs[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      // Ensure API route exists and is correct
      const response = await fetch('/api/contact-messages') 
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
      // Optionally show an error message to the user
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }
    try {
      // Ensure API route exists and is correct
      const response = await fetch(`/api/contact-messages`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }) 
      })
      if (!response.ok) {
         throw new Error('Failed to delete message')
      }
      // Refetch messages after delete
      fetchMessages() 
    } catch (error) {
      console.error('Error deleting message:', error)
      // Optionally show an error message
    }
  }

  // Define columns for the DataTable
  const columns: ColumnDef<ContactUs>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Date Received",
      accessorKey: "date",
      cell: ({ row }) => new Date(row.original.date).toLocaleString(), // Format date and time
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
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Messages</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Received Messages</h2>
          {/* Add Filter/Export later if needed */}
        </div>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <p>Loading messages...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={messages} />
        )}
      </Card>
    </div>
  )
}
