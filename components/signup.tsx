"use client"; // Add use client directive

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Import useState
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Use the existing register route or create one
      const response = await fetch('/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Signup successful, redirect to login or profile page
        console.log("Signup successful!");
        router.push('/login'); // Redirect to login page after successful signup
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed. Please try again.");
        console.error("Signup failed:", errorData);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#003553] p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">التسجيل</h1>
          <p className="text-gray-600" dir="rtl">
            احصل على شهادات معتمدة وموثوقة
            <br />
            عالميا بأحدث طرق التدريب
          </p>
        </div>

        {/* Add onSubmit handler */}
        <form className="space-y-6" dir="rtl" onSubmit={handleSubmit}> 
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-right text-gray-700">
              الاسم الكامل<span className="text-red-500">*</span> {/* Changed label slightly */}
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="أدخل اسمك الكامل"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
              value={fullName} // Bind value to state
              onChange={(e) => setFullName(e.target.value)} // Add onChange handler
              disabled={isLoading} // Disable during loading
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-right text-gray-700">
              البريد الالكتروني<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} // Add onChange handler
              disabled={isLoading} // Disable during loading
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-right text-gray-700">
              كلمة المرور<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="إنشاء كلمة مرور"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Add onChange handler
              disabled={isLoading} // Disable during loading
            />
          </div>

          {/* Display error message if any */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full rounded-md bg-[#0066a1] py-3 text-white transition-colors hover:bg-[#00558a] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'جاري الإنضمام...' : 'انضم الآن'} {/* Show loading text */}
          </button>

          {/* Optional: Disable social login during form submission */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-600">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className={`flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading} // Optionally disable social login too
          >
            <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
            <span>تسجيل دخول مباشر</span>
          </button>

          <p className="text-center text-sm text-gray-600" dir="rtl">
            <Link href="/login" className="text-[#0066a1] hover:underline">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
