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

interface AddDiplomaProps {
  onSuccess: () => void
}

export function AddDiploma({ onSuccess }: AddDiplomaProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/diplomas', {
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
      console.error('Error adding diploma:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Diploma</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Diploma</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Diploma name"
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
              placeholder="Duration (e.g. 6 months)"
              required
            />
          </div>
          <Button type="submit">Save Diploma</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
