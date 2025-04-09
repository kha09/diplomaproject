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

interface AddUserProps {
  onSuccess: () => void
}

export function AddUser({ onSuccess }: AddUserProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [degree, setDegree] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [imagePath, setImagePath] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          role,
          phoneNumber,
          degree,
          country,
          city,
          dateOfBirth,
          imagePath
        }),
      })
      if (response.ok) {
        setOpen(false)
        onSuccess()
        setName("")
        setEmail("")
        setPassword("")
        setRole("USER")
        setPhoneNumber("")
        setDegree("")
        setCountry("")
        setCity("")
        setDateOfBirth("")
        setImagePath("")
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="add-user-description">
        <DialogHeader>
          <p id="add-user-description" className="sr-only">Form to add a new user</p>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Password</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Role</p>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="USER"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Phone Number</p>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+966XXXXXXXX"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Degree</p>
            <Input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Bachelor's, Master's, etc."
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Country</p>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">City</p>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Date of Birth</p>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Image Path</p>
            <Input
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              placeholder="/path/to/image.jpg"
            />
          </div>
          <Button type="submit">Save User</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
