import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'التعريف بنظام إدارة الاستدامة للمنشآت الفندقية وفق ISO 21401',
};

const CourseDetailPage = () => {
  const course = {
    title: 'التعريف بنظام إدارة الاستدامة للمنشآت الفندقية وفق ISO 21401',
    description: 'يوفر هذا البرنامج التعريف بالمتطلبات وتوفر المبادئ التوجيهية لـ "السياحة المستدامة “ومدى امكانية ان تلعب السياحة المستدامة دورًا رائدًا. حيث انها يوضح هذا البرنامج كيفية تأثر السياحة بتغير المناخ وكيف يمكن الحد من الانبعاثات من هذا القطاع، إلى جانب إيجاد طرق لتمكين الصناعة من التكيف بشكل أفضل مع التأثيرات الحتمية لارتفاع متوسط درجات الحرارة العالمية.',
    importance: `يقدم هذا البرنامج معلومات حول الجوانب الرئيسية لصنع السياسات والاستراتيجية والبنية الأساسية والمنتجات والخدمات الخاصة بالسياحة المستدامة، وهي موجهة إلى جميع أصحاب المصلحة والمستفيدين المشاركين سواء من القطاع العام أو الخاص.\n\nتحدد هذه المواصفة المتطلبات البيئية والاجتماعية والاقتصادية اللازمة لتطبيق نظام إدارة الاستدامة في مؤسسات الإقامة في قطاع السياحة.\n\nتطبق هذه المواصفة على أي مؤسسة إقامة، بغض النظر عن نوعها أو حجمها أو موقعها، والتي ترغب في:\n- تنفيذ ممارسات الاستدامة والحفاظ عليها وتحسينها في عملياتها\n- ضمان التوافق مع سياسة الاستدامة المحددة لديها.`,
    mainTopics: [
      'تعريف السياحة كأحد القطاعات الاقتصادية الرئيسية في العالم وهي هدف لاهتمام متزايد بسبب إمكاناتها للمساهمة في التنمية المستدامة والتأثيرات التي قد تحدثها في المجالات البيئية والاجتماعية والاقتصادية.',
      'إظهار دور المنظمات من جميع الأنواع في قطاع السياحة بشكل متزايد الحاجة إلى معالجة قضايا الاستدامة في ممارساتها. توفر هذه الوثيقة متطلبات نظام إدارة الاستدامة لمؤسسات الإقامة التي ترغب في تطوير وتنفيذ سياسات وأهداف مستدامة في إدارة أنشطتها ومنتجاتها وخدماتها.',
      'أهمية هذه المواصفة لمساعدة مؤسسات الإقامة من جميع الأحجام، من خلفيات جغرافية وثقافية واجتماعية مختلفة، على تحسين الاستدامة في أنشطتها ذات الصلة.',
      'شرح محتويات المواصفة التي تشتمل على أربعة ملاحق. الملاحق أ، ب، ج هي ملاحق معيارية وتشير إلى كل من الأبعاد الثلاثة للاستدامة (البيئية والاجتماعية والاقتصادية). الملحق د إعلامي ويقدم أمثلة لممارسات الاستدامة.',
      'استخدام هذه الواصفة كمرجع لمؤسسات الإقامة، من أجل تنفيذ وصيانة الممارسات التي تساهم في تحقيق هدف رئيسي في السياحة المستدامة.',
    ],
    duration: 'يومان بعدد 10 ساعات',
    // Objectives and Outcomes were not provided for this course
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto px-4 py-8 pt-24" dir="rtl"> {/* Added pt-24 for spacing below header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">{course.title}</h1>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">التعريف</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">الأهمية</h2>
          {/* Using whitespace-pre-line to preserve line breaks from the template literal */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.importance}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">المحاور الرئيسة</h2>
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
