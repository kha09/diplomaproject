import { ColumnDef } from "@tanstack/react-table"
import { Instructor } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"

export const columns = (handleDelete: (id: number) => void): ColumnDef<Instructor>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "imagePath",
    header: "Image",
    cell: ({ row }) => {
      const path = row.original.imagePath;
      // Basic image rendering, assuming path is a valid URL or relative path
      return path ? <img src={path} alt={row.original.name} className="h-10 w-10 object-cover rounded" /> : 'N/A';
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const instructor = row.original

      return (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleDelete(instructor.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
