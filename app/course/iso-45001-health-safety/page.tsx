import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'الصحة والسلامة في المجال السياحي وفق 45001 ISO',
};

const CourseDetailPage = () => {
  const course = {
    title: 'الصحة والسلامة في المجال السياحي وفق 45001 ISO.',
    description: 'يُمثل غياب بيئة آمنة وصحية للموظفين والعاملين في المؤسسات السياحية واحدة من أهم مشاكل الموارد البشرية التي تواجهها هذه المؤسسات. لذلك، فإن وجود نظام لإدارة الصحة والسلامة المهنية في المؤسسات السياحية سيساعد على حماية الموظفين والسياح، وبالتالي سيقود العمل  نحو النجاح والازدهار. \nتُعتبر هذه الدورة بالغة الأهمية حيث تتناول طرق وأساليب حماية الأرواح وتوفير بيئة آمنة  والعاملين في المجال السياحي، وتحديد الإجراءات الوقائية لمنع الحوادث بأنواعها وطرق التحكم في المخاطر والسيطرة عليها وتخفيف آثارها وتبعياتها لو حصل حادث واستمرارية الاعمال والحفاظ على جودة القطاع السياحي. كما ستمكن الدورة المتدربين من اكتساب الخبرة اللازمة لأداء تدقيق متطلبات الايزو 45001 في المجال السياحي وأنشطة هذا المجال الاستراتيجي.',
    importance: 'تكمن أهمية هذه الدورة (الايزو 45001) في نجاح الفعاليات السياحية ونقاط الجذب السياحي وغيرها من الخدمات السياحية  حيث يتم تحديد نجاحها أو فشلها بسبب نجاح خطط السلامة والصحة المهنية من عدمها. وقد يكون الرحلة السياحية ناجحة جدا لو لم يحصل أي حادث قد يعوق نجاح الرحلة. \nيُساعد (الايزو 45001) على تخفيف حدة المخاطر وتحسين أداء الأعمال من خلال بيئة عمل أكثر أمانا وقوى عاملة أكثر صحة. كما يُساهم في زيادة المرونة التنظيمية من خلال الوقاية الاستباقية من المخاطر والتحسين المستمر لأداء الصحة والسلامة المهنية.\nكما يتضمن تطبيق (الايزو 45001) الحصول على دراسة أعمق وأدق لمفهوم الأزمات والتعريف بخصائصها ومراحل تطويرها وتصنيفاتها وكيفية التعامل معها للحفاظ على جودة القطاع السياحي.',
    objectives: [
      'فهم النقاط الأساسية للسلامة والصحة المهنية في المجال السياحي وتحديد مكامن المخاطر.',
      'اتقان أنواع المخاطر المحتملة مع تحليلها وتقييم المخاطر وتديد درجات خطورتها.',
      'استيعاب متطلبات إدارة الصحة والسلامة المهنية في المجال السياحي.',
      'اكتساب الخبرة اللازمة لأداء تدقيق نظام إدارة الصحة والسلامة المهنية (OH&S MS) وفقًا لمتطلبات معيار (الايزو 45001) .',
      'الالمام بأدوات استراتيجية خطط الطوارئ، وأساسيات الجودة والاتقان.',
      'استخدام أدوات الجودة والتحليل الإحصائي لتحسين الصحة والسلامة المهنية في المجال السياحي.',
      'تطبيق (الايزو 45001) في مختلف المؤسسات السياحية مع تنوع أنشطتها لضمان الحفاظ على الأرواح وتوفير بيئة آمنة  والعاملين في المجال السياحي',
    ],
    mainTopics: [
      'التعريف بالمبادئ والمفاهيم الأساسية لنظام إدارة الصحة والسلامة المهنية.',
      'التعريف بالوقاية من المخاطر وتحليلها.',
      'التعريف بنظام إدارة الصحة والسلامة المهنية',
      'التعريف بمفاهيم ومبادئ التدقيق الأساسية التحضير لتدقيق (الايزو 45001) .',
      'التعريف بالبنود الاساسية والبنود الفرعية للمواصفة (الايزو 45001) وكيفية تطبيقها في المجال السياحي.',
      'استخدام أدوات الجودة والتحليل الإحصائي لتحسين الصحة والسلامة المهنية.',
      'تطوير خطط الطوارئ وكيفية التعامل مع الحوادث والأزمات في المجال السياحي.',
      'تقييم الأداء والتحسين المستمر للصحة والسلامة المهنية في المجال السياحي.',
    ],
    // Duration was not provided for this course
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto px-4 py-8 pt-24" dir="rtl"> {/* Added pt-24 for spacing below header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">{course.title}</h1>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">تعريف الدورة</h2>
          {/* Using whitespace-pre-line to preserve line breaks */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">الأهمية</h2>
           {/* Using whitespace-pre-line to preserve line breaks */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.importance}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">الأهداف</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">المحاور الرئيسية</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.mainTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </section>

        {/* Duration section omitted as it wasn't provided */}

      </div>
    </>
  );
};

export default CourseDetailPage;
