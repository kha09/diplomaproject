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

interface AddCourseProps {
  onSuccess: () => void
}

export function AddCourse({ onSuccess }: AddCourseProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          duration
        }),
      })
      if (response.ok) {
        setOpen(false)
        onSuccess()
        setName("")
        setDescription("")
        setDuration("")
      }
    } catch (error) {
      console.error('Error adding course:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Course name"
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
            <p className="text-sm font-medium">Duration</p>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (e.g. 6 weeks)"
              required
            />
          </div>
          <Button type="submit">Save Course</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
