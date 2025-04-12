"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, Book, Calendar, CreditCard, LogOut, Menu, Package, Settings, User, Mail, Save, XCircle, Edit } from "lucide-react" // Ensure all icons are imported
import { signOut, useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserData {
  name: string
  email: string
  // Add other potential fields if needed from your User model
  // phone?: string;
}

export default function Dashboard() {
  const { data: session, status, update } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true) // Keep sidebar state if needed for responsiveness
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData>({ name: "", email: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Initialize form data when session loads or changes
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        // Initialize other fields here if they exist in session.user
        // phone: session.user.phone || "",
      })
    }
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
    setSuccessMessage(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    // Reset form data to original session data
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        // Reset other fields here
        // phone: session.user.phone || "",
      })
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Make sure the API route exists and handles PUT requests
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile.")
      }

      // Update the session client-side for immediate feedback
      // Note: This updates the client session, but doesn't persist unless `update` triggers a server refetch
      await update({ ...session, user: { ...session?.user, ...formData } });


      setSuccessMessage("تم تحديث الملف الشخصي بنجاح!") // Success message in Arabic
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع.") // Error message in Arabic
    } finally {
      setIsLoading(false)
    }
  }

  // Handle loading state
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    // Optionally redirect using useRouter or just show a message
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // useEffect(() => { router.push('/login'); }, [router]);
    return <div className="flex justify-center items-center min-h-screen">الرجاء تسجيل الدخول لعرض ملفك الشخصي.</div>
  }

  // Get user details safely after checks
  const userName = session?.user?.name || "المستخدم"
  const userRole = (session?.user as any)?.role || "متدرب" // Cast to any if role is not in default type
  const userImage = session?.user?.image || "/static/images/default-avatar.png" // Default avatar path

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl"> {/* Set base direction */}
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 right-0 w-64 md:w-72 bg-blue-800 text-white transition-transform duration-300 ease-in-out z-30 flex flex-col`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden p-4 text-left"> {/* Adjusted alignment */}
           <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-blue-700">
             <XCircle className="h-6 w-6" />
           </button>
        </div>

        {/* User Profile in Sidebar */}
        <div className="p-4 flex items-center justify-end border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="font-semibold">{userName}</h2>
              <p className="text-xs text-blue-200">{userRole}</p>
            </div>
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-300">
              <Image
                src={userImage}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
                onError={(e) => { e.currentTarget.src = '/static/images/default-avatar.png'; }} // Fallback
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 p-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors">
                <User className="h-5 w-5" />
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
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700 mt-auto">
           <button
             onClick={() => signOut({ callbackUrl: '/login' })}
             className="w-full flex items-center justify-center gap-3 p-3 rounded-md bg-red-600 hover:bg-red-700 transition-colors text-white"
           >
             <LogOut className="h-5 w-5" />
             <span>تسجيل الخروج</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden mb-4 text-right">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-blue-600 text-white inline-flex items-center justify-center">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          مرحبا بك يا {userName}
        </h1>

        {/* Profile Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">المعلومات الشخصية</h2>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="ml-2 h-4 w-4" /> تعديل
              </Button>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm mb-4 bg-green-100 p-3 rounded-md">{successMessage}</p>}

          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="name" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">الاسم:</label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="rtl" // Ensure input direction is correct
                />
              ) : (
                <p className="text-gray-800 flex-1">{formData.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="email" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">البريد الإلكتروني:</label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="ltr" // Email is usually LTR
                />
              ) : (
                <p className="text-gray-800 flex-1" dir="ltr">{formData.email}</p> // Display LTR
              )}
            </div>

            {/* Add more fields here following the pattern */}
            {/* Example: Phone Number
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="phone" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">رقم الجوال:</label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="ltr" // Phone numbers are usually LTR
                />
              ) : (
                <p className="text-gray-800 flex-1" dir="ltr">{formData.phone || 'غير متوفر'}</p>
              )}
            </div>
            */}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                <XCircle className="ml-2 h-4 w-4" /> إلغاء
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "جاري الحفظ..." : <> <Save className="ml-2 h-4 w-4" /> حفظ التغييرات </>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
