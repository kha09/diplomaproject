'use client'

import Image from "next/image"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import EyeOffIcon
import { signIn, useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Import useEffect

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session status

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true); // Show loading while redirecting
      const targetUrl = session?.user?.role === 'ADMIN' ? '/admin' : '/profile';
      console.log("Already authenticated, redirecting to:", targetUrl);
      router.push(targetUrl);
    }
  }, [status, session, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading true on submit

    try {
      // Explicitly prevent default redirect, handle it manually
      const result = await signIn("credentials", {
        redirect: false, // Explicitly set to false
        email,
        password,
      });

      console.log("SignIn Result:", result);

      if (result?.error) {
        console.error("SignIn Error:", result.error);
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password."
            : "Login failed. Please try again."
        );
        setLoading(false); // Stop loading on error
      } else if (result?.ok) {
        // Success! Manually redirect based on role from the session
        // The session should update automatically after successful signIn
        // We can use a brief delay or rely on the useEffect above
        console.log("SignIn successful, attempting redirect...");
        // Re-fetch session might be needed in some edge cases, but useSession usually updates
        // const updatedSession = await getSession(); // Optional: force refetch
        // const role = updatedSession?.user?.role;
        // const targetUrl = role === 'ADMIN' ? '/admin' : '/profile';
        // router.push(targetUrl);
        // Let the useEffect handle the redirect based on status change
      } else {
         // Handle unexpected cases where there's no error but not ok either
         setError("Login failed. Please try again.");
         setLoading(false);
      }
    } catch (err) {
      console.error("Login Catch Error:", err);
      setError("An unexpected error occurred during login.");
      setLoading(false); // Stop loading on catch error
    }
    // setLoading(false); // Moved loading false inside conditions
  };

  // Prevent rendering the form if already authenticated and redirecting
  if (status === 'authenticated' || loading) {
     return (
        <div className="flex min-h-screen items-center justify-center bg-[#003553]">
           <p className="text-white">Loading...</p> {/* Or a spinner */}
        </div>
     );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#003553] p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">مرحبا بك</h1>
          <p className="text-gray-600" dir="rtl">
            ادخل المعلومات المطلوبة
            <br />
            للمتابعة في التصفح
          </p>
        </div>

        <form className="space-y-6" dir="rtl" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-right text-gray-700">
              كلمة المرور<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="أدخل كلمة المرور"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)} // Toggle state on click
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />} {/* Toggle icon */}
              </button>
            </div>
            <div className="text-left">
              <Link href="/forgot-password" className="text-sm text-[#0066a1] hover:underline">
                هل نسيت كلمة المرور؟
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-[#0066a1] py-3 text-white transition-colors hover:bg-[#00558a] disabled:opacity-50"
            disabled={!email || !password || loading} // Disable button while loading
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'} {/* Show loading text */}
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-600">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Temporarily comment out Google Sign-in button */}
          {/*
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
            <span>تسجيل دخول مباشر</span>
          </button>
          */}

          <p className="text-center text-sm text-gray-600" dir="rtl">
            <Link href="/signup" className="text-[#0066a1] hover:underline">
              جديد معنا؟ سجل الآن
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
