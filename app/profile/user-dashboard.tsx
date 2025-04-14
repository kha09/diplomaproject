"use client"

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Bell, Book, Calendar, CreditCard, LogOut, Menu, Package, Settings, User, Mail, Save, XCircle, Edit, HelpCircle } from "lucide-react"; // Added HelpCircle
import { signOut, useSession, SessionContextValue } from "next-auth/react"; // Import SessionContextValue for typing
import { Session } from "next-auth"; // Import Session type
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Interface matching Prisma schema + imagePath for form data
interface UserFormData {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  degree?: string | null;
  country?: string | null;
  city?: string | null;
  dateOfBirth?: string | null; // Store as string for input type="date"
  imagePath?: string | null;
}

// Type for the data returned by the profile update API (based on Prisma select)
interface UpdatedUserData {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    degree: string | null;
    country: string | null;
    city: string | null;
    dateOfBirth: Date | null; // Prisma returns Date object
    imagePath: string | null;
    role: string;
}


export default function Dashboard() {
  const { data: session, status, update }: SessionContextValue = useSession(); // Explicitly type useSession hook
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<string>('dashboard'); // 'dashboard', 'courses', 'orders'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    phoneNumber: null,
    degree: null,
    country: null,
    city: null,
    dateOfBirth: null,
    imagePath: null,
  });
  // Keep image state even if upload is disabled for now
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDateForInput = (date: Date | string | null | undefined): string => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "";
    }
  };

  useEffect(() => {
    let initialImagePath = "/static/images/default-avatar.png";
    if (session?.user) {
      const user = session.user as any;
      const dob = user.dateOfBirth ? formatDateForInput(user.dateOfBirth) : null;
      initialImagePath = user.imagePath || initialImagePath;

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
    setImagePreview(initialImagePath);
  }, [session]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   // Keep image change handler even if UI is commented out
   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
          setError("حجم الصورة يجب أن يكون أقل من 2 ميجابايت.");
          return;
      }
      setSelectedImageFile(file);
      setError(null);
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
    setSelectedImageFile(null);
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
    // Fix: Ensure uploadedImagePath is initialized correctly from formData
    let uploadedImagePath: string | null = formData.imagePath ?? null;

    try {
      // --- Temporarily Disable Image Upload Logic ---
      /*
      // 1. Upload image
      if (selectedImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedImageFile);
        const uploadResponse = await fetch("/api/upload", { method: "POST", body: imageFormData });
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Failed to upload image.");
        }
        const uploadResult = await uploadResponse.json();
        uploadedImagePath = uploadResult.filePath;
      }
      */
      // --- End Temporarily Disable ---

      // 2. Update profile data (imagePath will remain unchanged or null)
      const profileDataToSave = {
        ...formData,
        // Keep existing imagePath since upload is disabled
        imagePath: formData.imagePath ?? null, // Use existing path from form data
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

      const updatedUserData: UpdatedUserData = await profileResponse.json();

      // 3. Update the session client-side with ALL relevant fields from the API response
      // We need to cast to 'any' or extend the Session['user'] type if necessary
      // to include custom fields like role, phoneNumber, etc.
      const updatedSessionUser = {
          // Standard fields
          id: updatedUserData.id.toString(), // Ensure ID is string for session
          name: updatedUserData.fullName ?? null,
          email: updatedUserData.email ?? null,
          image: updatedUserData.imagePath ?? null, // Use imagePath from API response
          // Custom fields returned by API
          role: updatedUserData.role,
          phoneNumber: updatedUserData.phoneNumber,
          degree: updatedUserData.degree,
          country: updatedUserData.country,
          city: updatedUserData.city,
          dateOfBirth: updatedUserData.dateOfBirth, // Keep as Date object or ISO string as returned
          imagePath: updatedUserData.imagePath, // Explicitly include imagePath
      };

      await update({
         ...session,
         user: updatedSessionUser as any, // Use 'as any' for simplicity or update Session type
       });

      // Update local state based on the data RETURNED from the API
      setFormData({
          fullName: updatedUserData.fullName || "",
          email: updatedUserData.email || "",
          phoneNumber: updatedUserData.phoneNumber || null,
          degree: updatedUserData.degree || null,
          country: updatedUserData.country || null,
          city: updatedUserData.city || null,
          dateOfBirth: updatedUserData.dateOfBirth ? formatDateForInput(updatedUserData.dateOfBirth) : null,
          imagePath: updatedUserData.imagePath || null,
      });
      // Update preview to reflect saved state from API response
      setImagePreview(updatedUserData.imagePath || "/static/images/default-avatar.png");

      setSuccessMessage("تم تحديث الملف الشخصي بنجاح!");
      setIsEditing(false);
      setSelectedImageFile(null); // Clear selection even if upload was disabled
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>;
  }
  if (status === "unauthenticated") {
    return <div className="flex justify-center items-center min-h-screen">الرجاء تسجيل الدخول لعرض ملفك الشخصي.</div>;
  }

  const displayUserName = formData.fullName || session?.user?.name || "المستخدم";
  const userRole = (session?.user as any)?.role || "متدرب";
  const displayUserImage = imagePreview || "/static/images/default-avatar.png";

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 fixed md:relative inset-y-0 right-0 w-64 md:w-72 bg-blue-800 text-white transition-transform duration-300 ease-in-out z-30 flex flex-col`}
      >
        <div className="md:hidden p-4 text-left">
           <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-blue-700">
             <XCircle className="h-6 w-6" />
           </button>
        </div>
        <div className="p-4 flex items-center justify-end border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="font-semibold">{displayUserName}</h2>
              <p className="text-xs text-blue-200">{userRole}</p>
            </div>
            {/* Temporarily comment out sidebar profile image */}
            {/*
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-300">
              <Image
                key={displayUserImage}
                src={displayUserImage}
                alt="Profile"
                width={48}
                height={48}
                className="object-cover w-full h-full"
                unoptimized={displayUserImage.startsWith('data:image')}
                onError={(e) => { e.currentTarget.src = '/static/images/default-avatar.png'; }}
              />
            </div>
            */}
          </div>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
             <li>
               <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors text-right ${activeView === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                 <User className="h-5 w-5" /><span>لوحة التحكم</span>
               </button>
             </li>
             <li>
               <button onClick={() => setActiveView('courses')} className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors text-right ${activeView === 'courses' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                 <Book className="h-5 w-5" /><span>الدورات</span>
               </button>
             </li>
             {/* <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Bell className="h-5 w-5" /><span>الإشعارات</span></a></li> */}
             {/* <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Calendar className="h-5 w-5" /><span>التقويم</span></a></li> */}
             <li>
               <button onClick={() => setActiveView('orders')} className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors text-right ${activeView === 'orders' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                 <Package className="h-5 w-5" /><span>طلباتــي</span>
               </button>
             </li>
             {/* <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><CreditCard className="h-5 w-5" /><span>طرق الدفع</span></a></li> */}
             {/* <li><a href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-700 transition-colors"><Settings className="h-5 w-5" /><span>الإعدادات</span></a></li> */}
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-700 mt-auto">
           <button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full flex items-center justify-center gap-3 p-3 rounded-md bg-red-600 hover:bg-red-700 transition-colors text-white">
             <LogOut className="h-5 w-5" /><span>تسجيل الخروج</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="md:hidden mb-4 text-right">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-blue-600 text-white inline-flex items-center justify-center">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Conditional Rendering based on activeView */}
        {activeView === 'dashboard' && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">مرحبا بك يا {displayUserName}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">المعلومات الشخصية</h2>
                {!isEditing && (<Button variant="outline" size="sm" onClick={handleEdit}><Edit className="ml-2 h-4 w-4" /> تعديل</Button>)}
              </div>
              {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md">{error}</p>}
              {successMessage && <p className="text-green-600 text-sm mb-4 bg-green-100 p-3 rounded-md">{successMessage}</p>}

              {/* --- Temporarily Disable Image Upload UI --- */}
              {/* ... existing image upload UI ... */}
              {/* --- End Temporarily Disable --- */}

              <div className="space-y-4">
                {/* Fields: Full Name, Email, Phone, Degree, Country, City, DOB */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="fullName" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">الاسم الكامل:</label>
                  {isEditing ? (<Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="rtl"/>) : (<p className="text-gray-800 flex-1 py-2">{formData.fullName}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="email" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">البريد الإلكتروني:</label>
                  {isEditing ? (<Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="ltr"/>) : (<p className="text-gray-800 flex-1 py-2" dir="rtl">{formData.email}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="phoneNumber" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">رقم الجوال:</label>
                  {isEditing ? (<Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber || ''} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="ltr"/>) : (<p className="text-gray-800 flex-1 py-2" dir="rtl">{formData.phoneNumber || 'غير متوفر'}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="degree" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">المؤهل العلمي:</label>
                  {isEditing ? (<Input id="degree" name="degree" type="text" value={formData.degree || ''} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="rtl"/>) : (<p className="text-gray-800 flex-1 py-2">{formData.degree || 'غير متوفر'}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="country" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">الدولة:</label>
                  {isEditing ? (<Input id="country" name="country" type="text" value={formData.country || ''} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="rtl"/>) : (<p className="text-gray-800 flex-1 py-2">{formData.country || 'غير متوفر'}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="city" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">المدينة:</label>
                  {isEditing ? (<Input id="city" name="city" type="text" value={formData.city || ''} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="rtl"/>) : (<p className="text-gray-800 flex-1 py-2">{formData.city || 'غير متوفر'}</p>)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="dateOfBirth" className="w-full sm:w-32 font-medium text-gray-600 mb-1 sm:mb-0 shrink-0">تاريخ الميلاد:</label>
                  {isEditing ? (<Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth || ''} onChange={handleInputChange} className="flex-1" disabled={isLoading} dir="rtl" max={new Date().toISOString().split("T")[0]}/>) : (<p className="text-gray-800 flex-1 py-2" dir="rtl">{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) : 'غير متوفر'}</p>)}
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={handleCancel} disabled={isLoading}><XCircle className="ml-2 h-4 w-4" /> إلغاء</Button>
                  <Button onClick={handleSave} disabled={isLoading}>{isLoading ? "جاري الحفظ..." : <> <Save className="ml-2 h-4 w-4" /> حفظ التغييرات </>}</Button>
                </div>
              )}
            </div>
          </>
        )}

        {activeView === 'courses' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">دوراتي</h2>
            {/* Placeholder for courses content */}
            <p className="text-gray-600">سيتم عرض الدورات بعد إدخال كود تفعيل الدورة في قسم طلباتي.</p>
          </div>
        )}

        {activeView === 'orders' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">طلباتي - تفعيل المنتج</h2>
            <div className="space-y-4">
               <div>
                 <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">
                   أدخل كود المنتج
                 </label>
                 <div className="flex items-center gap-2">
                   <Input
                     id="productCode"
                      name="productCode"
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      className="flex-1 max-w-xs" // Added max-w-xs
                      dir="ltr" // Assuming code is LTR
                    />
                    <div className="relative group">
                     <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
                     <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-max max-w-xs p-2 text-xs text-white bg-gray-700 rounded-md shadow-lg z-10">
                       يمكنك العثور على كود المنتج في رسالة التأكيد التي تم إرسالها إلى بريدك الإلكتروني بعد الشراء.
                     </span>
                   </div>
                 </div>
               </div>
               <Button>تفعيل</Button> {/* Add functionality later */}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
