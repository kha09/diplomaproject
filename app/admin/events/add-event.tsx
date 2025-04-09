"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface AddEventProps {
  onSuccess: () => void
}

export function AddEvent({ onSuccess }: AddEventProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          date,
          location
        }),
      })
      if (response.ok) {
        setOpen(false)
        onSuccess()
        setName("")
        setDescription("")
        setDate("")
        setLocation("")
      }
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Event Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event name"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Description</p>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Date</p>
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Location</p>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
          </div>
          <Button type="submit">Save Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
