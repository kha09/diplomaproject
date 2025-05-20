import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AwardsSite() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Hero section with curved bottom */}
      <div className="relative bg-gradient-to-r from-teal-400 to-teal-500 pb-32">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-white text-5xl font-bold rtl">الجوائز</h1>
        </div>
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Award cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tourism Excellence Award */}
            <Card className="overflow-hidden border-0 shadow-md rounded-3xl">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <div className="bg-gray-200 w-full h-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-300 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center rtl">
                  <h2 className="text-xl font-bold mb-2">جائــزة التميــز السياحــي</h2>
                  <p className="text-gray-600 mb-4">نقاط6000للمكافآت تتكون من</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      معرفة المزيد
                    </Button>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700">سجل الآن</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tourism Quality Award */}
            <Card className="overflow-hidden border-0 shadow-md rounded-3xl">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <div className="bg-gray-200 w-full h-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-300 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center rtl">
                  <h2 className="text-xl font-bold mb-2">جائــزة الجــودة السياحيــة</h2>
                  <p className="text-gray-600 mb-4">في الخدمات السياحية والترويج السياحي</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      معرفة المزيد
                    </Button>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700">سجل الآن</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center my-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-xl py-6 px-8 rounded-full rtl">
              احصل على جائزة مميزة الآن
            </Button>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-3xl p-8 max-w-5xl mx-auto my-12">
            <div className="text-center rtl text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">لا يفوتــك جديــد</h2>
              <p>اترك بريدك الإلكتروني ليصلك كل جديد لنا أول بأول</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <Input type="email" placeholder="اترك بريدك الإلكتروني" className="bg-white rtl text-right" />
              <Button className="bg-blue-600 hover:bg-blue-700 rtl">إرسال</Button>
            </div>
            <div className="flex justify-end mt-4 rtl">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="h-4 w-4" />
                <label htmlFor="terms" className="text-white text-sm">
                  موافق على شروط الخدمة
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
