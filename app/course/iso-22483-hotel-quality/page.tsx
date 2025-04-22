import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'المعايير الدولية لجودة السكن الفندقي والمرافق وفق 22483:2020 ISO',
};

const CourseDetailPage = () => {
  const course = {
    title: 'المعايير الدولية لجودة السكن الفندقي والمرافق وفق 22483:2020 ISO',
    description: 'تستهدف هذه الدورة التدريبية تعريف مديري الفنادق بمعيار ISO 22483:2020 الدولي، والخاص بتحديد متطلبات جودة الخدمات الفندقية. توفر الدورة إطارا عمليا يساعد المديرين على تطبيق المعايير الدولية في إدارة العمليات، وضمان جودة الخدمة، والسلامة، ورضا النزلاء بشكل فعال ومتوافق مع أحدث اتجاهات الضيافة العالمية.',
    importance: 'رفع جودة الخدمات وضمان رضا النزلاء.\n تعزيز سمعة الفندق وتنافسيته في السوق.\n توفير إطار موحد لعمليات التشغيل وتحسين الكفاءة.\n ضمان الالتزام بالمعايير الدولية والمحلية المتعلقة بالجودة والسلامة.\n تطوير مهارات الموظفين عبر برامج تدريب فعالة.',
    duration: 'يومان بعدد 8 ساعات',
    mainTopics: [
      'متطلبات العاملين: التوظيف، الهيكل التنظيمي، برامج التدريب والتطوير.',
      'متطلبات الخدمة: خدمات الاستقبال، الحجوزات، الغرف، الأطعمة والمشروبات.',
      'متطلبات السلامة والأمن: إجراءات إدارة المخاطر والطوارئ، السلامة الغذائية، الأمن الداخلي.',
      'متطلبات الصيانة والنظافة: برامج الصيانة الوقائية، جداول ومعايير النظافة.',
      'رضا النزلاء والتغذية الراجعة: آليات قياس الرضا، معالجة الشكاوى، التحسين المستمر.',
    ],
    objectives: [
      'فهم متطلبات ISO 22483 وتطبيقها عمليا في الفندق.',
      'القدرة على تطوير وتنفيذ برامج تدريب وفقا لمعايير الجودة.',
      'تعزيز سلامة وأمن الفندق من خلال الالتزام بالمعايير الدولية.',
      'رفع كفاءة عمليات الصيانة والنظافة وتحسين بيئة الفندق.',
      'استخدام التغذية الراجعة من النزلاء لتحقيق رضا أعلى وتحسين الخدمات باستمرار.',
    ],
    // Outcomes were not provided for this course
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
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">أهمية الدورة</h2>
           {/* Using whitespace-pre-line to preserve line breaks */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.importance}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">أهداف الدورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
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
