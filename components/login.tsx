'use client'

import Image from "next/image"
import Link from "next/link"
import { EyeIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password
        })

        if (result?.error) {
          setError(result.error)
        } else if (result?.ok) {
          // Force a hard refresh to ensure session is loaded
          window.location.href = "/"
        }
      } catch (err) {
        setError("An error occurred during login")
      }
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
                type="password"
                placeholder="أدخل كلمة المرور"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label="Show password"
              >
                <EyeIcon className="h-5 w-5" />
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
            className="w-full rounded-md bg-[#0066a1] py-3 text-white transition-colors hover:bg-[#00558a]"
            disabled={!email || !password}
          >
            تسجيل الدخول
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-600">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
            <span>تسجيل دخول مباشر</span>
          </button>

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
