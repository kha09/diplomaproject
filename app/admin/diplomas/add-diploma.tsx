"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  const [startDate, setStartDate] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [price, setPrice] = useState("")
  const [room, setRoom] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    // Basic validation
    if (!name || !startDate || !finishDate || !price) {
      setError("Name, Start Date, Finish Date, and Price are required.")
      return
    }

    const priceValue = parseFloat(price)
    if (isNaN(priceValue)) {
      setError("Price must be a valid number.")
      return
    }

    try {
      const response = await fetch('/api/diplomas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || null, // Send null if empty
          startDate: new Date(startDate), // Convert to Date object
          finishDate: new Date(finishDate), // Convert to Date object
          price: priceValue,
          room: room || null, // Send null if empty
        }),
      })

      if (response.ok) {
        setOpen(false)
        onSuccess()
        // Reset form fields
        setName("")
        setDescription("")
        setStartDate("")
        setFinishDate("")
        setPrice("")
        setRoom("")
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to add diploma.")
        console.error('Error adding diploma:', errorData)
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError("An unexpected error occurred.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Diploma</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="add-diploma-description">
        <DialogHeader>
          <DialogTitle>Add New Diploma</DialogTitle>
          <DialogDescription id="add-diploma-description">
            Fill in the details for the new diploma.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name *</p>
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
              placeholder="Optional description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Start Date *</p>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Finish Date *</p>
              <Input
                type="date"
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Price *</p>
              <Input
                type="number"
                step="0.01" // Allows decimals
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 1500.00"
                required
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Room</p>
              <Input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Optional room number"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit">Save Diploma</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
