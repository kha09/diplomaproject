import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TourismExcellenceAward() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Hero section with curved bottom */}
      <div 
        className="relative pb-32 bg-cover bg-center" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 206, 204, 0.7), rgba(0, 206, 204, 0.2)), url('/static/images/NoPath.png')" 
        }}
      >
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-white text-8xl font-bold rtl mt-16">جائزة التميز السياحي</h1>
          <p className="text-white text-xl mt-4 rtl">معايير الممكنات تتكون من 600 نقطة</p>
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
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-center">
              <h2 className="text-4xl font-bold text-center text-white mb-12 rtl bg-[#005A98] py-4 px-8 rounded-lg inline-block">معايير جائزة التميز السياحي</h2>
            </div>
            
            {/* Grid of award criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rtl">
              {/* Criterion 1 */}
              

              {/* Criterion 2 */}
              

              {/* Criterion 3 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4  rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/الخدمات الحصرية وشخصنه المنتج.png" alt="الخدمات الحصرية وشخصنة المنتج" width={48} height={48} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">الخدمات الحصرية وشخصنة المنتج</h3>
              </div>

              {/* Criterion 4 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4    rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/الأصالة والانغماس الثقافي.png" alt="الأصالة والانغماس الثقافي" width={48} height={48} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">الأصالة والانغماس الثقافي</h3>
              </div>

              {/* Criterion 5 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4    rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/الخصوصية.png" alt="الخصوصية" width={44} height={44} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">الخصوصية</h3>
              </div>

              {/* Criterion 6 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4    rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/الابداع والابتكار.png" alt="الإبداع والابتكار" width={48} height={48} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">الإبداع والابتكار</h3>
              </div>

              {/* Criterion 7 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4    rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/إثراء التجربة.png" alt="إثراء التجربة" width={48} height={48} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">إثراء التجربة</h3>
              </div>

              {/* Criterion 8 */}
              <div className="text-center bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 mx-auto mb-4    rounded-lg flex items-center justify-center shadow-md">
                  <Image src="/static/images/الاستدامة والسياحة المسؤولة.png" alt="الاستدامة والسياحة المسؤولة" width={48} height={48} />
                </div>
                <h3 className="text-xl font-semibold text-blue-900">الاستدامة والسياحة المسؤولة</h3>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-6 mt-12">
              <Link href="/signup">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                  سجل الآن
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-[#00CECC] rounded-3xl p-8 max-w-5xl mx-auto my-12">
            <div className="text-center rtl text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">لا يفوتــك جديــد</h2>
              <p>اترك بريدك الإلكتروني ليصلك كل جديد لنا أول بأول</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <Input type="email" placeholder="اترك بريدك الإلكتروني" className="bg-white rtl text-right" />
              <Button className="bg-blue-600 hover:bg-blue-700 rtl">إرسال</Button>
            </div>
            <div className="flex justify-center mt-4 rtl">
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
