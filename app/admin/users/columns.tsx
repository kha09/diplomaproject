'use client'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const getColumns = (handleDelete: (id: number) => void): ColumnDef<User>[] => [
  {
    accessorKey: 'fullName',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => row.original.phoneNumber || 'N/A', // Display N/A if null
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
     cell: ({ row }) => row.original.degree || 'N/A',
  },
  {
    accessorKey: 'country',
    header: 'Country',
     cell: ({ row }) => row.original.country || 'N/A',
  },
  {
    accessorKey: 'city',
    header: 'City',
     cell: ({ row }) => row.original.city || 'N/A',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const date = row.original.dateOfBirth;
      return date ? new Date(date).toLocaleDateString() : 'N/A'; // Format date or show N/A
    },
  },
  // Optional: Display imagePath or render an image if needed
  // {
  //   accessorKey: 'imagePath',
  //   header: 'Image',
  //   cell: ({ row }) => row.original.imagePath ? <img src={row.original.imagePath} alt="User" width="40" /> : 'N/A',
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            {/* Add Edit functionality later if needed */}
            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => handleDelete(user.id)} // Call handleDelete passed as prop
              className="text-red-600"
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
