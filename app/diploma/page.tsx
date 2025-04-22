"use client"; // Make this a client component

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header" // Import Header
import Footer from "@/components/footer" // Import Footer
import DiplomaFeaturesSection from "@/components/diploma-features-section"; // Import the new section
import { useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation"; // Import useRouter

// Import the CSS file
import './diploma.css';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRegisterClick = () => {
    if (status === "authenticated") {
      // Redirect to external store page for logged-in users
      window.location.href = "https://store.qeatourism.com/%D8%AF%D8%A8%D9%84%D9%88%D9%85-%D8%A7%D8%AE%D8%B5%D8%A7%D8%A6%D9%8A-%D8%AC%D9%88%D8%AF%D8%A9-%D9%88%D8%AA%D9%85%D9%8A%D8%B2-%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A-%D8%AF%D9%81%D8%B9%D8%A9-%D8%A3%D9%88%D9%84%D9%89/p1160252794";
    } else if (status === "unauthenticated") {
      // Redirect to login page for logged-out users
      router.push('/login');
    }
    // If status is "loading", the button will be disabled or do nothing until status resolves
  };

  return (
    <main className="min-h-screen">
      <Header /> {/* Add Header component */}
      {/* Hero Section with Wave */}
      <div className="relative">
        {/* Background Image instead of yellow area */}
        <div className="relative h-[450px] w-full overflow-hidden"> {/* Removed border again */}
          <Image
            src="/static/images/Mask Group 30.png?height=350&width=1200"
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
          <div className="absolute bottom-[-1px] left-0 right-0"> {/* Move container down 1px */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full block"> {/* Add block to SVG */}
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
          <Button
            className="bg-[#1a5a7a] hover:bg-[#134a68] text-white rounded-md px-6 py-2"
            onClick={handleRegisterClick}
            disabled={status === 'loading'} // Disable button while loading session status
          >
            {status === 'loading' ? 'جار التحميل...' : 'سجل الآن'}
          </Button>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a5a7a] text-right mb-8">معلومات اضافية</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">مدة وشهادة الدبلوم</h3> {/* Updated title */}
            </div>
            <div className="p-6 text-right flex-grow" dir="rtl"> {/* Added dir="rtl" */}
              <ul className="text-gray-700 list-disc list-inside text-right space-y-2"> {/* Added ul */}
                <li>الدبلوم بعدد (160) ساعة</li>
                <li>منها(40) ساعة تطبيق عملي مشروع تخرج</li>
                <li>يبدأ الدبلوم في 9 ذو القعدة 1446هـ الموافق 07 مايو 2025م</li>
                <li>وينتهي في 22 ذو الحجة 1446 هـ الموافق 18 يونيو 2025م.</li>
                <br/> {/* Add a line break for separation */}
                <li className="font-semibold">شهادة معتمدة</li> {/* Make subheading bold */}
                <li>شهادة دبلوم أخصائي جودة وتميز سياحي</li>
                <li>معتمدة من المنظمة العربية للسياحة</li>
              </ul> {/* Closed ul */}
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" /> {/* Kept the chevron */}
            </div>
          </div>

          {/* Card 2 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">أهداف الدبلوم</h3> {/* Keep title as "أهداف الدبلوم" */}
            </div>
            <div className="p-6 text-right flex-grow" dir="rtl"> {/* Add dir="rtl" */}
              <ul className="text-gray-700 list-disc list-inside text-right space-y-2"> {/* Add ul */}
                 <li>إعداد وتأهيل الكفاءات العربية القادرة على تطبيق معايير الجودة والتميز في المجال السياحي والابتكار لتنميته المستدامة</li>
                 <li>القدرة على عمل مؤشرات الآداء وقياسها في استراتيجية المنشآت والوجهات السياحية وتحسين عملياتها</li>
                 <li>تمكين المشاركين من تحليل المخاطر وآلية وضع الخطط وتنفيذها لاستمرارية الأعمال وإدارة الأزمات السياحية</li>
                 <li>تطبيق استراتيجيات الحوكمة في المنشات السياحية وحماية حقوق السائح وإثراء تجربته</li>
                 <li>توظيف أدوات الجودة للارتقاء بالخدمات والمنتجات السياحية وقياس أثرها والاستثمار الأمثل في اقتصادياتها</li>
              </ul> {/* Closed ul */}
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" /> {/* Keep the chevron */}
            </div>
          </div>

          {/* Card 3 */}
          <div className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="bg-[#003049] text-white p-4 text-center">
              <h3 className="text-xl font-bold">دورات الدبلوم</h3>
            </div>
            <div className="p-6 text-right flex-grow" dir="rtl">
              <ul className="text-gray-700 list-disc list-inside text-right space-y-2">
                <li>الجودة السياحية في إدارة المنشآت والوجهات وفق السياحة الميسرة ISO 21902.</li>
                <li>نموذج التميز السياحي.</li>
                <li>التعريف بنظام إدارة الاستدامة للمنشآت الفندقية وفق ISO 21401.</li>
                <li>الصحة والسلامة في المجال السياحي وفق ISO 45001.</li>
                <li>المعايير الدولية لجودة السكن الفندقي و المرافق وفق ISO 18513:2021 و ISO 22483:2020</li>
                <li>حوكمة المنشآت السياحية وحماية حقوق السائح.</li>
                <li>إدارة المعارف السياحية ونقل الخبرات وفق ISO 30401.</li>
                <li>استمرارية الأعمال السياحية وفق ISO 22301.</li>
                <li>السياحة البيئية البحرية وفق ISO 14001.</li>
                <li>إدارة المخاطر الصحية في القطاع السياحي وفق ISO 31000.</li>
                <li>جودة وسلامة الغذاء وملائمة السائحين وفق ISO 22000 ومواصفة حلال.</li>
              </ul>
            </div>
            <div className="flex justify-center p-4 mt-auto border-t">
              <ChevronDown className="text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <DiplomaFeaturesSection /> {/* Add the new features section */}
      <Footer /> {/* Add Footer component */}
    </main>
  )
}
