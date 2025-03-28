import Image from "next/image"
import Link from "next/link"

export default function SignupPage() {
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

        <form className="space-y-6" dir="rtl">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-right text-gray-700">
              الاسم رباعي<span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="أدخل اسمك الكامل"
              className="w-full rounded-md border border-gray-300 p-3 text-right"
              required
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
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#0066a1] py-3 text-white transition-colors hover:bg-[#00558a]"
          >
            انضم الآن
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
            <Link href="/login" className="text-[#0066a1] hover:underline">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

