import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Title</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              defaultValue="DiplomApp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Maintenance Mode</label>
            <input 
              type="checkbox" 
              className="h-4 w-4"
            />
            <span className="ml-2 text-sm">Enable maintenance mode</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
