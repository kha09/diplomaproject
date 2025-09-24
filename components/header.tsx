"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:text-teal-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Left side (in RTL this appears on right) */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login" className="flex items-center gap-2 border border-teal-600 px-3 py-1 rounded-md">
            <span className="text-sm font-medium text-teal-600">تسجيل الدخول</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/static/images/aljawda.png" alt="Logo" width={160} height={160} className="-12" />
          </Link>
        </div>

        {/* Center navigation - desktop */}
        <nav className="hidden md:flex items-center justify-center gap-6 mx-auto" dir="rtl">
          <Link href="/" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الرئيسية
          </Link>
          <Link href="/prize" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الجوائز
          </Link>
          <Link href="/course" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"> {/* Updated href */}
            التدريب
          </Link>
          <Link href="#consulting" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الاستشارات
          </Link>
          <Link href="#events" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الفعاليات
          </Link>
          <Link href="/blog" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            المقالات
          </Link>
          <Link href="#contact" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            اتصل بنا
          </Link>
        </nav>

        {/* Right side logo (in RTL this appears on left) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/images/QEATleft.png?height=60&width=120"
              alt="Tourism Quality and Excellence Award"
              width={200}
              height={100}
              className=""
            />
          </Link>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6" dir="rtl">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                الرئيسية
              </Link>
              <Link href="/prize" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                الجوائز
              </Link>
              <Link href="/course" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100"> {/* Updated href */}
                التدريب
              </Link>
              <Link href="#consulting" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                الاستشارات
              </Link>
              <Link href="#events" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                الفعاليات
              </Link>
              <Link href="/blog" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                المقالات
              </Link>
              <Link href="#contact" className="text-base font-medium text-teal-600 py-2 border-b border-gray-100">
                اتصل بنا
              </Link>
              <div className="pt-2">
                <Link href="/login" className="flex items-center justify-center gap-2 border border-teal-600 px-3 py-1 rounded-md w-full">
                  <span className="text-sm font-medium text-teal-600">تسجيل الدخول</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
