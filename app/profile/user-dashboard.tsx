"use client"

import { useState, useEffect, useRef, ChangeEvent } from "react"; // Added useRef, ChangeEvent
import Image from "next/image";
import { Bell, Book, Calendar, CreditCard, LogOut, Menu, Package, Settings, User, Mail, Save, XCircle, Edit } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Interface matching Prisma schema + imagePath
interface UserData {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  degree?: string | null;
  country?: string | null;
  city?: string | null;
  dateOfBirth?: string | null; // Store as string for input type="date"
  imagePath?: string | null;
}

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  // Initialize with all fields from UserData
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    email: "",
    phoneNumber: null,
    degree: null,
    country: null,
    city: null,
    dateOfBirth: null,
    imagePath: null,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  // Format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (date: Date | string | null | undefined): string => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return ""; // Check if date is valid
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  // Initialize form data when session loads or changes
  useEffect(() => {
    let initialImagePath = "/static/images/default-avatar.png"; // Default path
    if (session?.user) {
      const user = session.user as any; // Cast to access potentially custom fields
      const dob = user.dateOfBirth ? formatDateForInput(user.dateOfBirth) : null;
      initialImagePath = user.imagePath || initialImagePath; // Use user's path if available

      setFormData({
        fullName: user.name || "", // Session uses 'name', map to 'fullName'
        email: user.email || "",
        phoneNumber: user.phoneNumber || null,
        degree: user.degree || null,
        country: user.country || null,
        city: user.city || null,
        dateOfBirth: dob,
        imagePath: user.imagePath || null,
      });
    }
    // Set image preview based on initialImagePath
    setImagePreview(initialImagePath);

  }, [session]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation (optional: add size/type checks)
      if (file.size > 2 * 1024 * 1024) { // Example: 2MB limit
          setError("حجم الصورة يجب أن يكون أقل من 2 ميجابايت.");
          return;
      }
      setSelectedImageFile(file);
      setError(null); // Clear previous errors
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccessMessage(null);
    setSelectedImageFile(null); // Clear selected file
    // Reset form data and image preview to original session data
    let originalImagePath = "/static/images/default-avatar.png";
    if (session?.user) {
      const user = session.user as any;
      const dob = user.dateOfBirth ? formatDateForInput(user.dateOfBirth) : null;
      originalImagePath = user.imagePath || originalImagePath;
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || null,
        degree: user.degree || null,
        country: user.country || null,
        city: user.city || null,
        dateOfBirth: dob,
        imagePath: user.imagePath || null,
      });
    }
    setImagePreview(originalImagePath);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    let uploadedImagePath: string | null = formData.imagePath; // Keep existing path by default

    try {
      // 1. Upload image if a new one is selected
      if (selectedImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedImageFile);

        const uploadResponse = await fetch("/api/upload", { // Use the new upload route
          method: "POST",
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Failed to upload image.");
        }

        const uploadResult = await uploadResponse.json();
        uploadedImagePath = uploadResult.filePath; // Get the path from the upload API response
      }

      // 2. Update profile data (including the potentially new image path)
      const profileDataToSave = {
        ...formData,
        imagePath: uploadedImagePath, // Use the new or existing image path
        // Ensure dateOfBirth is null if empty string, or a valid Date object for the API
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
      };


      const profileResponse = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileDataToSave),
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      const updatedUserData = await profileResponse.json();

      // 3. Update the session client-side for immediate feedback
      // Construct the user object strictly according to the Session['user'] type
      const updatedSessionUser: {
          id: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
          role: string;
      } = {
          // Keep existing fields that are not updated or returned by the API
          ...(session?.user ?? {}), // Spread existing user data safely
          id: updatedUserData.id.toString(), // Ensure ID is string
          name: updatedUserData.fullName ?? null, // Map fullName to name, default to null
          email: updatedUserData.email ?? null, // Default to null
          image: updatedUserData.imagePath ?? null, // Map imagePath to image, default to null
          // Ensure role is a string, fallback to existing session role or a default
          role: updatedUserData.role ?? session?.user?.role ?? 'USER',
      };

      await update({
         ...session,
         user: updatedSessionUser,
       });

      // Update local state as well after successful save and session update
      setFormData(prev => ({
          ...prev,
          ...profileDataToSave, // Update with saved data
          dateOfBirth: profileDataToSave.dateOfBirth ? formatDateForInput(profileDataToSave.dateOfBirth) : null, // Reformat date for input
          imagePath: uploadedImagePath // Ensure local imagePath is updated
      }));
      setImagePreview(uploadedImagePath || "/static/images/default-avatar.png"); // Update preview

      setSuccessMessage("تم تحديث الملف الشخصي بنجاح!");
      setIsEditing(false);
      setSelectedImageFile(null); // Clear selected file after successful save
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading state
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>;
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return <div className="flex justify-center items-center min-h-screen">الرجاء تسجيل الدخول لعرض ملفك الشخصي.</div>;
  }

  // Use formData for display consistency, fallback to session if needed initially
  const displayUserName = formData.fullName || session?.user?.name || "المستخدم";
  const userRole = (session?.user as any)?.role || "متدرب";
  // Use imagePreview state for the sidebar image
  const displayUserImage = imagePreview || "/static/images/default-avatar.png";

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 right-0 w-64 md:w-72 bg-blue-800 text-white transition-transform duration-300 ease-in-out z-30 flex flex-col`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden p-4 text-left">
           <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-blue-700">
             <XCircle className="h-6 w-6" />
           </button>
        </div>

        {/* User Profile in Sidebar */}
        <div className="p-4 flex items-center justify-end border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="font-semibold">{displayUserName}</h2>
              <p className="text-xs text-blue-200">{userRole}</p>
            </div>
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-300">
              {/* Display image preview */}
              <Image
                key={displayUserImage} // Force re-render when imagePreview changes
                src={displayUserImage}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover w-full h-full" // Ensure image covers the area
                unoptimized={displayUserImage.startsWith('data:image')} // Avoid optimization for data URLs
                onError={(e) => {
                  console.error("Sidebar Image failed to load:", displayUserImage);
                  e.currentTarget.src = '/static/images/default-avatar.png'; // Fallback
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
             {/* Navigation Links */}
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"><User className="h-5 w-5" /><span>لوحة التحكم</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Book className="h-5 w-5" /><span>دروسي</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Bell className="h-5 w-5" /><span>الإشعارات</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Calendar className="h-5 w-5" /><span>التقويم</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Package className="h-5 w-5" /><span>طلباتــي</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><CreditCard className="h-5 w-5" /><span>طرق الدفع</span></a></li>
             <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Settings className="h-5 w-5" /><span>الإعدادات</span></a></li>
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
          مرحبا بك يا {displayUserName}
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

          {/* Image Upload Section */}
           {isEditing && (
            <div className="flex flex-col items-center sm:flex-row sm:items-start mb-6">
              <label className="w-full sm:w-32 font-medium text-gray-600 mb-2 sm:mb-0 shrink-0 pt-2">الصورة الشخصية:</label>
              <div className="flex flex-col items-center gap-4">
                 <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
                   <Image
                     key={imagePreview} // Force re-render on change
                     src={imagePreview || "/static/images/default-avatar.png"}
                     alt="Profile Preview"
                     width={96}
                     height={96}
                     className="object-cover w-full h-full" // Ensure image covers the area
                     unoptimized={imagePreview?.startsWith('data:image')} // Avoid optimization for data URLs
                     onError={(e) => {
                         console.error("Main Image failed to load:", imagePreview);
                         e.currentTarget.src = '/static/images/default-avatar.png';
                     }}
                   />
                 </div>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => fileInputRef.current?.click()} // Trigger hidden file input
                   disabled={isLoading}
                 >
                   تغيير الصورة
                 </Button>
                 <input
                   type="file"
                   ref={fileInputRef}
                   onChange={handleImageChange}
                   accept="image/png, image/jpeg, image/jpg" // Specify acceptable image types
                   className="hidden" // Hide the default file input
                 />
              </div>
            </div>
           )}


          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="fullName" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">الاسم الكامل:</label>
              {isEditing ? (
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="rtl"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2">{formData.fullName}</p> // Added padding for alignment
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
                  dir="ltr"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2" dir="ltr">{formData.email}</p>
              )}
            </div>

             {/* Phone Number */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="phoneNumber" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">رقم الجوال:</label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="ltr"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2" dir="ltr">{formData.phoneNumber || 'غير متوفر'}</p>
              )}
            </div>

            {/* Degree */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="degree" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">المؤهل العلمي:</label>
              {isEditing ? (
                <Input
                  id="degree"
                  name="degree"
                  type="text"
                  value={formData.degree || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="rtl"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2">{formData.degree || 'غير متوفر'}</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="country" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">الدولة:</label>
              {isEditing ? (
                <Input // Consider using a Select dropdown here
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="rtl"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2">{formData.country || 'غير متوفر'}</p>
              )}
            </div>

             {/* City */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="city" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">المدينة:</label>
              {isEditing ? (
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="rtl"
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2">{formData.city || 'غير متوفر'}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="dateOfBirth" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">تاريخ الميلاد:</label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={handleInputChange}
                  className="flex-1"
                  disabled={isLoading}
                  dir="ltr"
                  max={new Date().toISOString().split("T")[0]} // Prevent future dates
                />
              ) : (
                <p className="text-gray-800 flex-1 py-2" dir="ltr">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) : 'غير متوفر'}</p>
              )}
            </div>

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
  );
}
