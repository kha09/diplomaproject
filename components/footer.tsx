"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, PhoneIcon as WhatsApp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#005A98] text-white py-8 px-4 md:px-8 lg:px-12 rtl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Logo and Copyright */}
          <div className="md:col-span-3 flex flex-col items-center text-center">
            
            <div className="text-sm">
              <p>© 2025 جائزة المنظمة العربية</p>
              <p>للسياحة في الجودة والتميز</p>
              <p>السياحي</p>
            </div>
            <div className="mt-4">
              <Image src="/static/images/aljawdah.png" alt="Logo" width={120} height={60} className="mb-4" />
            </div>
            <div className="mt-2 text-sm">
              <p>إدارة وتشغيل شركة تطبيقات</p>
              <p>الجودة الإدارية</p>
            </div>
          </div>

          {/* 6 Columns of Links */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
            {/* Column 1 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">الخدمــــات</h3>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">وسائل التواصل</h3>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">تواصل معنا</h3>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">الأسئلة الشائعة</h3>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
              <Link href="#" className="mb-2 text-sm">
                روابط فرعية
              </Link>
            </div>
          </div>

          {/* Right Logo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <div className="mb-4">
              <Image src="/static/images/logoprizenew.png" alt="Logo" width={220} height={220} className="mb-4" />
            </div>
            <div className="flex gap-4 mt-auto">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="WhatsApp">
                <WhatsApp className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Added Image */}
        <div className="mt-8 flex justify-center">
          <Image src="/static/images/iYbNT_lg.png" alt="Additional Footer Image" width={150} height={75} />
        </div>
      </div>
    </footer>
  )
}
