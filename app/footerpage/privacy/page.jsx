import React from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function PrivacyPolicyPage() {
    
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
          سياسة الخصوصية والاستخدام
        </h1>

        <p className="mb-6 text-lg leading-relaxed">
          في <b className="text-secondary">جائزة الجودة والتميز السياحي</b>، نلتزم
          بحماية خصوصية زوار الموقع والمستخدمين والمتعاونين معنا. تمثل هذه الصفحة
          توضيحًا للبيانات التي نقوم بجمعها، وكيفية استخدامها، وما هي الحقوق
          والواجبات المرتبطة باستخدام هذا الموقع والخدمات المرتبطة به.
        </p>

        <section className="mb-8">
          <h6 className="text-2xl font-bold mb-4">أولًا: سياسة الخصوصية</h6>

          <h3 className="text-1xl font-semibold mb-3">1. البيانات التي نقوم بجمعها</h3>
          <p className="mb-4 text-lg leading-relaxed">
            عند استخدامك لموقعنا أو التسجيل للحصول على الخدمات أو التفاعل معنا،
            قد نقوم بجمع بعض المعلومات، منها:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-1 text-lg">
            <li>الاسم الكامل</li>
            <li>البريد الإلكتروني</li>
            <li>رقم الجوال</li>
            <li>اسم الجهة أو المنشأة</li>
            <li>نوع الخدمة المطلوبة</li>
            <li>أي بيانات أخرى يتم إدخالها طوعيًا في النماذج الموجودة بالموقع</li>
          </ul>

          <h3 className="text-1xl font-semibold mb-3">2. كيف نستخدم هذه البيانات؟</h3>
          <p className="mb-4 text-lg leading-relaxed">يتم استخدام بياناتك الشخصية فقط من أجل:</p>
          <ul className="list-disc list-inside mb-6 space-y-1 text-lg">
            <li>التواصل معك وتقديم المعلومات والخدمات المطلوبة</li>
            <li>إدارة الطلبات والملفات المرتبطة بالجائزة أو التدريب أو الاستشارات</li>
            <li>إرسال تحديثات أو إشعارات تتعلق بأنشطتنا، في حال موافقتك المسبقة</li>
            <li>تحسين جودة الخدمات والمحتوى بناءً على التفاعل والاستخدام</li>
          </ul>

          <h3 className="text-1xl font-semibold mb-3">3. حماية البيانات</h3>
          <p className="mb-6 text-lg leading-relaxed">
            نحرص على استخدام إجراءات أمنية مناسبة لحماية بياناتك من الوصول غير
            المصرح به أو التعديل أو الكشف أو الإتلاف. كما لا يتم مشاركة بياناتك مع
            أي جهة خارجية، إلا في حال وجود ضرورة تشغيلية مرتبطة بتقديم الخدمة،
            وبعد الحصول على موافقتك الصريحة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">ثانيًا: سياسة الاستخدام</h2>

          <h3 className="text-1xl font-semibold mb-3">1. حقوق الملكية الفكرية</h3>
          <p className="mb-6 text-lg leading-relaxed">
            جميع المحتويات المنشورة في الموقع، بما في ذلك النصوص، التصاميم،
            الشعارات، الصور، وأدلة المعايير، مملوكة لجائزة الجودة والتميز السياحي
            أو مرخّصة لها. لا يجوز إعادة استخدامها أو نسخها أو توزيعها دون إذن خطي
            مسبق.
          </p>

          <h3 className="text-1xl font-semibold mb-3">2. شروط استخدام الموقع</h3>
          <ul className="list-disc list-inside mb-6 space-y-1 text-lg">
            <li>يجب استخدام الموقع لأغراض مشروعة ومهنية فقط.</li>
            <li>يُمنع استخدام الموقع لنشر أو توزيع أي محتوى ضار أو مخالف للأنظمة.</li>
            <li>
              يحق لإدارة الجائزة إيقاف أي حساب أو إلغاء أي طلب في حال تم اكتشاف
              إساءة استخدام أو تقديم معلومات مضللة.
            </li>
          </ul>

          <h3 className="text-1xl font-semibold mb-3">3. التعديلات على السياسة</h3>
          <p className="mb-6 text-lg leading-relaxed">
            يحق لنا تعديل أو تحديث هذه السياسة في أي وقت دون إشعار مسبق. وسيتم نشر
            التحديثات في هذه الصفحة مع تاريخ آخر تعديل. استمرارك في استخدام الموقع
            بعد نشر التغييرات يُعد موافقة ضمنية على تلك التعديلات.
          </p>
        </section>
      </main>
            <Footer />

    </>
  );
}
