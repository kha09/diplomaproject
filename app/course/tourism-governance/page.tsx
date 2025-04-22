import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'حوكمة المنشآت السياحية وحماية حقوق السائح',
};

const CourseDetailPage = () => {
  const course = {
    title: 'حوكمة المنشآت السياحية وحماية حقوق السائح',
    description: 'دورة هي برنامج تدريبي متكامل يهدف إلى تمكين العاملين في القطاع السياحي وأصحاب المنشآت السياحية من فهم وتطبيق مبادئ الحوكمة الرشيدة لضمان الشفافية، العدالة، والمساءلة في إدارة العمليات السياحية. كما تهدف الدورة إلى توعية المشاركين بحقوق السائح وتعزيز مهاراتهم في تطوير سياسات وإجراءات تضمن حماية تلك الحقوق، مع التركيز على تحسين تجربة الزائر وزيادة تنافسية المنشآت السياحية.',
    importance: 'تمكّن المنشآت السياحية من تطوير عملياتها بما يتماشى مع أفضل الممارسات العالمية في الحوكمة وحماية حقوق السائح. هذا لا يعزز فقط من جودة الخدمات المقدمة، بل يساهم أيضًا في نمو القطاع السياحي بشكل مستدام وزيادة رضا السياح.',
    objectives: [
      'فهم مفهوم الحوكمة وأهميتها في إدارة المنشآت السياحية.',
      'تعزيز الكفاءة الإدارية والتنظيمية للمنشآت السياحية.',
      'تعزيز الشفافية والمساءلة في العمليات الإدارية والخدمية.',
      'تمكين المشاركين من تصميم سياسات وإجراءات تلبي توقعات السياح.',
      'تطبيق مبادئ الحوكمة لضمان استدامة العمليات وتحقيق الثقة بين السياح والمنشآت.',
      'التعرف على حقوق السائح وأهمية حمايتها لتحسين سمعة الوجهة السياحية.',
      'توفير أدوات عملية لحماية حقوق السائح وتحسين جودة الخدمات المقدمة',
    ],
    mainTopics: [
      'الحوكمة التعريف، المفهوم، الأهداف والأركان',
      'أدوات وتقنيات قياس الحوكمة الفعّالة',
      'الحوكمة في قطاع السياحة',
      'دور الحوكمة في تعزيز التنافسية السياحية',
      'الحوكمة كمحفز للاستدامة السياحية',
      'الممارسات السليمة في إطار الحوكمة السياحية وتأثير الأطراف المعنية على تنمية القطاع',
      'الإطار القانوني والتنظيمي للحوكمة في قطاع السياحة',
      'جائزة منظمة السياحة العالمية في السياسة العامة والحوكمة',
      'محاور المدونة الدولية لحماية السياح',
    ],
    outcomes: [
      'فهم معمق لمبادئ الحوكمة في القطاع السياحي.',
      'القدرة على تصميم سياسات لحماية حقوق السائحين.',
      'تحسين مستوى الشفافية والمساءلة في المنشآت السياحية.',
      'بناء علاقات قوية ومستدامة مع العملاء والمستثمرين من خلال الالتزام بالحوكمة.',
      'تعزيز مهارات التعامل مع الشكاوى وبناء الثقة مع العملاء',
      'زيادة القدرة التنافسية للمنشآت السياحية محليًا ودوليًا.',
    ],
    duration: 'يومان بعدد 10 ساعات',
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

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">مخرجات الدورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.outcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
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
