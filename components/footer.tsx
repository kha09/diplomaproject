import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-16 mx-auto relative">
        <div className="absolute left-4 top-16">
          <Image 
            src="/static/images/logo02.png" 
            alt="Logo" 
            width={120} 
            height={60}
            className="h-15 w-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
          {/* Company Info */}
          <div className="space-y-4">
            <Image 
              src="/static/images/logoprize.png" 
              alt="Secondary Logo" 
              width={200} 
            height={100}
            className="h-15 w-auto"
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:text-gray-200">الرئيسية</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-200">الجوائز</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-200">التدريب</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-200">الاستشارات</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">موارد</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:text-gray-200">الأسئلة الشائعة</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-200">اتصل بنا</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-200">الفعاليات</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white hover:text-gray-200 text-sm">الشروط والأحكام</Link>
            <Link href="#" className="text-white hover:text-gray-200 text-sm">سياسة الخصوصية</Link>
          </div>
          <p className="text-white text-sm">
            © {new Date().getFullYear()} جائزة الجودة والتميز السياحي. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}
