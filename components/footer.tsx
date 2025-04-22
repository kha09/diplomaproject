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
             {/* <Link href="#" className="mb-2 text-sm">
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
              </Link> */}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">وسائل التواصل</h3>
             {/* <Link href="#" className="mb-2 text-sm">
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
              </Link> */}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">تواصل معنا</h3>
             {/* <Link href="#" className="mb-2 text-sm">
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
              </Link> */}
            </div>

            {/* Column 4 */}
            <div className="flex flex-col text-right">
              <h3 className="font-bold mb-4 text-lg">الأسئلة الشائعة</h3>
             {/* <Link href="#" className="mb-2 text-sm">
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
              </Link> */}
            </div>
          </div>

          {/* Right Logo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <div className="mb-4">
              <Image src="/static/images/logoprizenew.png" alt="Logo" width={220} height={220} className="mb-4" />
            </div>
            <div className="flex gap-4 mt-auto">
              <Link href="https://www.linkedin.com/company/%D8%AC%D8%A7%D8%A6%D8%B2%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%B8%D9%85%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%AC%D9%88%D8%AF%D8%A9-%D9%88%D8%A7%D9%84%D8%AA%D9%85%D9%8A%D8%B2-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A/posts/?feedView=all" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/qetourism" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/qeat.ourism/" target="_blank" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61572204562727" target="_blank" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://wa.me/966552957095"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp">
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
