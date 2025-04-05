import { Card } from "@/components/ui/card"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Events Management</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Event
          </button>
        </div>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Events calendar will appear here</p>
        </div>
      </Card>
    </div>
  )
}
