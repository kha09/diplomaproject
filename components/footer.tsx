import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" dir="rtl">
          <div>
            <h3 className="font-bold mb-4">الخدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">الشروط والأحكام</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">سياسة الخصوصية</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  رابط سريع
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t border-teal-800 flex flex-col md:flex-row justify-between items-center"
          dir="rtl"
        >
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2023 جائزة المملكة العربية السعودية للجودة والتميز السياحي</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-white hover:text-teal-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-white hover:text-teal-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-white hover:text-teal-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-white hover:text-teal-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

