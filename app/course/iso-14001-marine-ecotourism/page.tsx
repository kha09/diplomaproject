import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'السياحة البيئية البحرية وفق ISO 14001',
};

const CourseDetailPage = () => {
  const course = {
    title: 'السياحة البيئية البحرية وفق ISO 14001',
    description: 'تعريف السياحية البيئية البحرية واستدامتها واهميتها للحفاظ على البيئة البحرية والقوانين المحلية وإجراءات السلامة في ممارسة السياحة البيئية البحرية',
    duration: 'يومان بعدد 10 ساعات',
    importance: 'معرفة أنشطة السياحة البيئية البحرية والقوانين المحلية المنظمة لها وإجراءات السلامة الواجب اتباعها لممارسي الإنشطة البحرية والتحديات البيئية والاقتصادية المتحكمة بالسياحة البيئية البحرية والتغلب عليها لإستدامة صناعة السياحة البيئية البحرية',
    objectives: [
      'معرفة أهمية السياحة البيئية البحرية اقتصاديا وتوفير فرص العمل ومفهوم الاستدامة في السياحة البحرية بالحفاظ على البيئة البحرية',
      'أنواع الممارسات والرياضات والأنشطة السياحية البحرية',
      'القوانين والإجراءات المحلية للرحلات والرياضات البحرية',
      'إجراءات السلامة في ممارسة الرياضات والرحلات والأنشطة البحرية',
      'استخدام الذكاء الصناعي في صناعة السياحة البيئية البحرية',
      'الأنشطة السياحية المستدامة والمشاريع السياحية الناجحة والمشاريع المستقبلية في البحر الأحمر والخليج العربي والبحر الأبيض المتوسط.',
    ],
    mainTopics: [
      'مقدمة في السياحة البيئية البحرية',
      'التحديات البيئية والاقتصادية للسياحة البيئية البحرية',
      'السياحة البيئية البحرية في البحر الأحمر والخليج العربي والبحر الأبيض المتوسط',
      'أثر السياحة البيئية البحرية على المجتمعات المحلية',
      'التوجهات المستقبلية للسياحة البيئية البحرية',
    ],
    outcomes: [
      'معرفة ماهي السياحة البيئية البحرية واهميتها واستدامتها بالحفاظ على البيئة البحرية والتحديات التي تواجه هذه السياحة',
      'معرفت التحديات البيئية والإقتصادية التي تواجه السياحة البيئية البحرية مثل الثلوت البيئي وغلاء الأسعار والمنافسة الخارجية',
      'السياحة البيئية البحرية في المنطقة العربية ممثلة بالبحر الأحمر والخليج العربي والبحر الأبيض المتوسط والمشاريع الناجحة والمشاريع الناشئة المستقبلية في المنطقة العربية وأنواع الأنشطة السياحية البحرية التي يمكن ممارستها والقوانين المحلية وإجراءات السلامة',
      'معرفة أثر السياحة البيئية البحرية على المجتمعات العربية والتغيرات الثقافية والإجتماعية والإقتصادية منها',
      'التوجهات المستقبلية للسياحة البيئية البحرية والسياسات الداعمة لها واستخدام الذكاء الصناعي لدعمها',
    ],
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto px-4 py-8 pt-24" dir="rtl"> {/* Added pt-24 for spacing below header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">{course.title}</h1>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">اﻟﺘﻌﺮﻳﻒ</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">اﻷﻫﻤﻴﺔ</h2>
          <p className="text-gray-700 leading-relaxed">{course.importance}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">اﻷﻫﺪاف</h2>
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

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">ﻣﺨﺮﺟﺎت اﻟﺪورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.outcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </section>

        <section className="p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">ﻣﺪة اﻟﺪورة</h2>
          <p className="text-gray-700 font-medium">{course.duration}</p>
        </section>

      </div>
    </>
  );
};

export default CourseDetailPage;
