"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Book, Calendar, CreditCard, LogOut, Menu, Package, Settings } from "lucide-react"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 dir="rtl" className="text-3xl font-bold text-gray-700 mb-6">
          مرحبا بك يا محمد
        </h1>

        {/* Content would go here */}
      </div>

      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden absolute top-4 left-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-blue-600 text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 left-0 md:w-72 transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="h-full bg-blue-800 text-white flex flex-col">
          {/* User Profile */}
          <div className="p-4 flex items-center justify-end border-b border-blue-700">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-semibold text-right">محمد محمد</h2>
                <p className="text-xs text-blue-200 text-right">متدرب</p>
              </div>
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul dir="rtl" className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span>لوحة التحكم</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Book className="h-5 w-5" />
                  <span>دروسي</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span>الإشعارات</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>التقويم</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Package className="h-5 w-5" />
                  <span>طلباتــي</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <CreditCard className="h-5 w-5" />
                  <span>طرق الدفع</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>الإعدادات</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>تسجيل الخروج</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
