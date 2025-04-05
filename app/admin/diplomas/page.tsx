import { Card } from "@/components/ui/card"

export default function DiplomasPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Diplomas Management</h1>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Diploma Programs</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Diploma
          </button>
        </div>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Diplomas list will appear here</p>
        </div>
      </Card>
    </div>
  )
}
