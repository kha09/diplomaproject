import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'إدارة المخاطر الصحية في القطاع السياحي وفق ISO 31000',
};

const CourseDetailPage = () => {
  const course = {
    title: 'إدارة المخاطر الصحية في القطاع السياحي وفق ISO 31000',
    description: 'تهدف هذه الدورة التدريبية إلى تزويد المشاركين بالمعرفة والمهارات اللازمة لتطبيق مبادئ ومعايير إدارة المخاطر الصحية  في القطاع السياحي، وذلك وفقًا للمعيار الدولي 31000ISO  ستركز الدورة على كيفية تحديد وتقييم وإدارة المخاطر المرتبطة بالصحة والسلامة  في المنشآت السياحية بما في ذلك الأوبئة والأمراض المعدية، لضمان سلامة الزوار والعاملين وتحقيق استدامة العمليات السياحية.',
    objectives: [
      'فهم مبادئ إدارة المخاطر وفق 31000ISO : تزويد المشاركين بالمعرفة الأساسية حول معايير ومبادئ إدارة المخاطر كما هو محدد في 31000ISO .',
      'تحديد وتقييم المخاطر الصحية: تعليم المشاركين كيفية التعرف على المخاطر الصحية المحتملة في البيئة السياحية وتقييم تأثيرها واحتمالية حدوثها.',
      'تطوير استراتيجيات إدارة المخاطر: تمكين المشاركين من تصميم وتنفيذ استراتيجيات فعّالة للحد من المخاطر الصحية والتعامل مع الأوبئة والعدوى.',
      'تعزيز الاستجابة للأزمات الصحية: تدريب المشاركين على كيفية الاستجابة السريعة والفعّالة للأزمات الصحية والطوارئ في القطاع السياحي.',
      'ضمان استمرارية الأعمال: تعليم المشاركين كيفية الحفاظ على استمرارية العمليات السياحية في ظل التحديات الصحية وضمان سلامة الزوار والعاملين.',
    ],
    mainTopics: [
      'مقدمة في إدارة المخاطر الصحية في السياحة: أهمية إدارة المخاطر في القطاع السياحي. نظرة عامة على المعيار الدولي 31000ISO .',
      'تحديد المخاطر الصحية في المنشآت السياحية: أنواع المخاطر الصحية المحتملة. منهجيات التعرف على المخاطر وتوثيقها.',
      'تقييم وتحليل المخاطر: أدوات وأساليب تقييم المخاطر. تحديد أولويات المخاطر بناءً على التأثير والاحتمالية.',
      'تطوير استراتيجيات وإجراءات التحكم: تصميم خطط للحد من المخاطر الصحية. تنفيذ بروتوكولات الصحة والسلامة.',
      'التواصل والتوعية بالمخاطر: أهمية التواصل الفعّال مع الزوار والعاملين. تصميم حملات توعية وتدريب.',
      'الاستجابة للطوارئ والأزمات الصحية: إعداد خطط للطوارئ الصحية. تنفيذ تدريبات محاكاة للأزمات.',
      'مراقبة ومراجعة فعالية إدارة المخاطر: تقييم الأداء وتحسين العمليات. التكيف مع التغيرات والتحديات الجديدة.',
    ],
    duration: 'يومان بعدد 10 ساعات',
    // Importance and Outcomes were not explicitly provided in separate sections
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto px-4 py-8 pt-24" dir="rtl"> {/* Added pt-24 for spacing below header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">{course.title}</h1>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">التعريف بالدورة</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">أهداف الدورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.objectives.map((objective, index) => (
              <li key={index}>{objective.replace('', '')}</li> // Remove potential invisible characters
            ))}
          </ul>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">محاور الدورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.mainTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </section>

        <section className="p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">مدة الدورة</h2>
          <p className="text-gray-700 font-medium">{course.duration}</p>
        </section>

      </div>
    </>
  );
};

export default CourseDetailPage;
