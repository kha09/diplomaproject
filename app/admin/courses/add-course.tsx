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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" // Assuming you have a Select component
import { Instructor, Diploma } from "@prisma/client" // Import related types
import { useState, useEffect } from "react"

interface AddCourseProps {
  onSuccess: () => void
}

export function AddCourse({ onSuccess }: AddCourseProps) {
  const [open, setOpen] = useState(false)
  // Form fields
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [price, setPrice] = useState("")
  const [room, setRoom] = useState("")
  const [instructorId, setInstructorId] = useState<string>("") // Store as string from Select
  const [diplomaId, setDiplomaId] = useState<string>("") // Store as string from Select, allow empty

  // Data for selects
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [diplomas, setDiplomas] = useState<Diploma[]>([])

  // Loading and error states
  const [loadingRelated, setLoadingRelated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch instructors and diplomas when dialog opens
  useEffect(() => {
    if (open) {
      const fetchRelatedData = async () => {
        setLoadingRelated(true)
        setError(null)
        try {
          const [instructorsRes, diplomasRes] = await Promise.all([
            fetch('/api/instructors'),
            fetch('/api/diplomas')
          ])
          if (!instructorsRes.ok || !diplomasRes.ok) {
            throw new Error('Failed to fetch instructors or diplomas')
          }
          const instructorsData = await instructorsRes.json()
          const diplomasData = await diplomasRes.json()
          setInstructors(instructorsData)
          setDiplomas(diplomasData)
        } catch (err) {
          console.error("Error fetching related data:", err)
          setError("Could not load instructors/diplomas. Please try again.")
        } finally {
          setLoadingRelated(false)
        }
      }
      fetchRelatedData()
    }
  }, [open]) // Re-fetch when dialog opens

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // --- Validation ---
    if (!name || !startDate || !finishDate || !price || !instructorId) {
      setError("Name, Start Date, Finish Date, Price, and Instructor are required.")
      return
    }
    const priceValue = parseFloat(price)
    const instructorIdValue = parseInt(instructorId, 10)
    // Use "none" as placeholder value, convert back to null for API
    const diplomaIdValue = diplomaId && diplomaId !== "none" ? parseInt(diplomaId, 10) : null 

    if (isNaN(priceValue)) {
      setError("Price must be a valid number.")
      return
    }
    if (isNaN(instructorIdValue)) {
        setError("Invalid Instructor selected.")
        return
    }
     if (diplomaId && isNaN(diplomaIdValue as number)) {
        setError("Invalid Diploma selected.")
        return
    }
    // --- End Validation ---

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || null,
          startDate: new Date(startDate),
          finishDate: new Date(finishDate),
          price: priceValue,
          room: room || null,
          instructorId: instructorIdValue,
          diplomaId: diplomaIdValue, // Send parsed int or null
        }),
      })

      if (response.ok) {
        setOpen(false)
        onSuccess()
        // Reset form
        setName("")
        setDescription("")
        setStartDate("")
        setFinishDate("")
        setPrice("")
        setRoom("")
        setInstructorId("")
        setDiplomaId("")
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to add course.")
        console.error('Error adding course:', errorData)
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError("An unexpected error occurred.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="add-course-description">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
           <DialogDescription id="add-course-description">
            Fill in the details for the new course. Select an instructor and optionally link it to a diploma.
          </DialogDescription>
        </DialogHeader>
        {loadingRelated ? (
            <p>Loading instructors and diplomas...</p>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name *</p>
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
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., 500.00"
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
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <p className="text-sm font-medium">Instructor *</p>
                 <Select value={instructorId} onValueChange={setInstructorId} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Instructor" />
                    </SelectTrigger>
                    <SelectContent>
                        {instructors.map((instructor) => (
                        <SelectItem key={instructor.id} value={String(instructor.id)}>
                            {instructor.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <p className="text-sm font-medium">Diploma (Optional)</p>
                 <Select value={diplomaId} onValueChange={setDiplomaId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Diploma (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                         {/* Use "none" as the value for the placeholder/clear option */}
                         <SelectItem value="none">None</SelectItem> 
                        {diplomas.map((diploma) => (
                        <SelectItem key={diploma.id} value={String(diploma.id)}>
                            {diploma.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
           </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit">Save Course</Button>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
