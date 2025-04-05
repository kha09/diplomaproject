import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-gray-500">Manage system users</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-gray-500">System configuration</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-gray-500">View usage statistics</p>
        </Card>
      </div>
    </div>
  )
}
