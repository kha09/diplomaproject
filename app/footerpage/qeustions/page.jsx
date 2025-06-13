import React from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function FAQPage() {

  return (
    <>
    <Header />
      <main
        className="p-8 max-w-2xl mx-auto"
        dir="rtl"
        style={{ textAlign: "right", paddingBottom: "5rem" }}
      >
        <h1
          className="text-2xl font-extrabold mb-6"
          style={{ color: "hsl(var(--primary))" }}
        >
          الأسئلة الشائعة
        </h1>

        <section className="mb-8 text-lg leading-relaxed">
          <h3 className="text-2xl font-bold mb-4">ما هي أهداف الجائزة؟</h3>
          <p className="mb-6">
            تهدف الجائزة إلى تحسين معايير الجودة في القطاع السياحي العربي، وتشجيع الابتكار والتميز، وتعزيز التنافسية بين الجهات العاملة في هذا المجال.
          </p>

          <h3 className="text-2xl font-bold mb-4">ما هي الفئات المستهدفة للجائزة؟</h3>
          <p className="mb-6">
            تستهدف الجائزة الجهات الحكومية، والمنشآت السياحية، ومقدمي الخدمات، والأفراد العاملين في القطاع السياحي الذين يسهمون في رفع جودة الخدمات والمنتجات السياحية.
          </p>

          <h3 className="text-2xl font-bold mb-4">ما هي معايير التقييم للجائزة؟</h3>
          <p className="mb-6">
            يتم التقييم بناءً على المحاور الثمانية للجائزة، والتي تشمل جودة الأنظمة والقوانين، وحقوق السائح، وجودة الخدمات والمنتجات، وغيرها من الجوانب المتعلقة بالتنمية السياحية.
          </p>

          <h3 className="text-2xl font-bold mb-4">كيف يمكن التقديم للجائزة؟</h3>
          <p className="mb-6">
            يمكن للمهتمين التقديم من خلال الموقع الرسمي للجائزة عبر الرابط التالي: qetourism.com
          </p>

          <h3 className="text-2xl font-bold mb-4">كيف يمكن الحصول على مزيد من المعلومات أو المساعدة؟</h3>
          <p className="mb-6">
            يمكن التواصل مع فريق دعم الجائزة عبر معلومات الاتصال المتوفرة على الموقع الرسمي.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
