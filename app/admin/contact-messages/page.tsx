import { Card } from "@/components/ui/card"

export default function ContactMessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Messages</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Messages</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Filter
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Export
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Messages list will appear here</p>
        </div>
      </Card>
    </div>
  )
}
