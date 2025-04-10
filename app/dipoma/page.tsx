import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import the CSS file
import './diploma.css'; 

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Wave */}
      <div className="relative">
        {/* Background Image instead of yellow area */}
        <div className="relative h-[350px] w-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=350&width=1200"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <p className="text-sm md:text-base opacity-75 mb-2">دبلــــــــــــــوم</p>
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 rtl">اخصائي جودة وتميز سياحي</h1>
            <Button className="bg-[#1a5a7a] hover:bg-[#134a68] text-white rounded-md px-6 py-2">
              دبلوم مهني تنفيذي Online
            </Button>
          </div>

          {/* Wave Shape */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a5a7a] text-right mb-6">نبذة عن الدبلومة</h2>

        <p className="text-gray-700 text-right leading-relaxed mb-8">
          يتكون الدبلوم من مجموعة مقررات دراسية في الجودة والتميز تركز على تطبيق المعايير والإرشادات القياسية ودمجها في
          خدمات ومنتجات المجال السياحي، لترتقي بمستوى جودة مكوناته وفق أفضل الممارسات العالمية من خلال تأهيل أخصائي جودة
          وتميز سياحي قادر على تطبيق المواصفات القياسية في جميع مجالات السياحة
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" className="border-[#1a5a7a] text-[#1a5a7a] hover:bg-[#f0f7fa] rounded-md px-6 py-2">
            تواصل معنا
          </Button>
          <Button className="bg-[#1a5a7a] hover:bg-[#134a68] text-white rounded-md px-6 py-2">سجل الآن</Button>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a5a7a] text-right mb-8">معلومات اضافية</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">شهادة معتمدة</h3>
            </div>
            <div className="p-6 text-right flex-grow">
              <p className="text-gray-700">هذا النص يتم استبداله بنص آخر لوصف الشهادات المعتمدة</p>
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">مدة الدبلوم</h3>
            </div>
            <div className="p-6 text-right flex-grow">
              <p className="text-gray-700">هذا النص يتم استبداله بنص آخر لوصف مدة وعدد ساعات الدبلوم المقدمة تفصيليا</p>
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">دورات الدبلوم</h3>
            </div>
            <div className="p-6 text-right flex-grow">
              <ul className="text-gray-700 list-disc list-inside text-right space-y-2">
                <li>الجودة السياحية في إدارة المنشآت والوجهات وفق السياحة الميسرة 21902</li>
                <li>نموذج التميز السياحي</li>
                <li>التعريف بنظام إدارة الاستدامة ISO 21401 وفق</li>
                <li>الصحة والسلامة في المجال السياحي ISO 45001 وفق</li>
                <li>المعايير الدولية ISO و ISO 22483:2020 لجودة السكن الفندقي و المرافق وفق 18513:2021</li>
                <li>حوكمة المنشآت السياحية وحماية حقوق السائح</li>
                <li>إدارة المعارف السياحية ونقل الخبرات ISO</li>
              </ul>
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
