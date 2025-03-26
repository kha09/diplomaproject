import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side (in RTL this appears on right) */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 border border-teal-600 px-3 py-1 rounded-md">
            <span className="text-sm font-medium text-teal-600">تسجيل الدخول</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/static/images/logo02.png?height=40&width=40" alt="Logo" width={40} height={40} className="h-10 w-10" />
          </Link>
        </div>

        {/* Center navigation */}
        <nav className="flex items-center justify-center gap-6 mx-auto" dir="rtl">
          <Link href="/" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الرئيسية
          </Link>
          <Link href="#awards" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الجوائز
          </Link>
          <Link href="#training" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            التدريب
          </Link>
          <Link href="#consulting" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الاستشارات
          </Link>
          <Link href="#events" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            الفعاليات
          </Link>
          <Link href="#contact" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700">
            اتصل بنا
          </Link>
        </nav>

        {/* Right side logo (in RTL this appears on left) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/images/logo01.png?height=40&width=120"
              alt="Tourism Quality and Excellence Award"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
