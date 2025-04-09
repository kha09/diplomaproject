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
import { useRouter } from "next/navigation"

interface AddInstructorProps {
  onSuccess: () => void
}

export function AddInstructor({ onSuccess }: AddInstructorProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [imagePath, setImagePath] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          specialty,
          imagePath
        }),
      })
      if (response.ok) {
        setOpen(false)
        onSuccess()
        setName("")
        setSpecialty("")
        setImagePath("")
      }
    } catch (error) {
      console.error('Error adding instructor:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Instructor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Instructor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Instructor name"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Specialty</p>
            <Input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Instructor specialty"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Image URL</p>
            <Input
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              placeholder="Optional image URL"
            />
          </div>
          <Button type="submit">Save Instructor</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
