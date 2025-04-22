import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'استمرارية الأعمال السياحية وفق نظام ISO 22301',
};

const CourseDetailPage = () => {
  const course = {
    title: 'استمرارية الأعمال السياحية وفق نظام ISO 22301',
    description: 'هذه الدورة التدريبية تُعنى بمفاهيم ومتطلبات نظام إدارة استمرارية الأعمال (BCMS) وفقًا للمواصفة الدولية ISO 22301، مع التركيز على تطبيقها في القطاع السياحي. وتهدف إلى تقديم فهم شامل للمبادئ والممارسات اللازمة لضمان استمرارية الخدمات السياحية والقدرة على إدارة المخاطر والتعامل الفعال مع الأزمات والطوارئ لضمان عدم انقطاع الأنشطة الحيوية في المنشآت السياحية.',
    importance: 'يساهم في الحفاظ على سمعة المنشأة السياحية والحد من تأثير المخاطر والأزمات عليها وزيادة ثقة العملاء والأطراف المعنية، فيما يعزّز الالتزام بالمعايير الدولية وأفضل الممارسات فرص التعاون والشراكات العالمية. ويؤدي تعزيز القدرة التنافسية وتحقيق مرونة عالية في العمليات إلى جذب مزيد من الزوار والسائحين، إضافةً إلى تحسين الأداء من خلال إدارة المخاطر بشكل استباقي، مما يقلل الخسائر المحتملة ويضمن استدامة الأعمال السياحية. كما تظل مواكبة المتغيرات العالمية والتعامل مع التحديات الناشئة عن الكوارث الطبيعية والأوبئة والأزمات الاقتصادية والسياسية عاملًا حاسمًا في تحقيق النجاح والاستمرارية.',
    objectives: [
      'فهم ماهية نظام إدارة استمرارية الأعمال والمتطلبات الرئيسة لــ ISO 22301.',
      'تطبيق الآليات العملية في المجال السياحي',
      'تطوير خطط الاستجابة للطوارئ والأزمات',
      'تقدير المخاطر وتحليلها: وتحسين آليات التعامل معها.',
      'تعزيز الوعي ونشر ثقافة استمرارية الأعمال بين العاملين بالمنشأة.',
    ],
    mainTopics: [
      'مدخل عام لنظام إدارة استمرارية الأعمال الأيزو 22301',
      'تخطيط وإعداد نظام استمرارية الأعمال في القطاع السياحي',
      'بناء ثقافة الاستمرارية واختيار الفرق المعنية',
      'تطوير خطط الاستجابة للطوارئ والتعافي',
      'التدقيق الداخلي والمراجعة وفق ISO 22301',
      'النجاح والاستدامة في تطبيق نظام إدارة استمرارية الأعمال',
    ],
    outcomes: [
      'اكتساب معرفة شاملة بمبادئ ISO 22301:',
      'تطوير خطط استمرارية الأعمال في المنشآت السياحية',
      'مهارات تقييم وتحليل المخاطر',
      'تعزيز الوعي والثقافة المؤسسية',
      'أداء تدقيق داخلي فعال',
      'دعم القدرة التنافسية وبناء السمعة',
    ],
    duration: 'يومان بعدد 10 ساعات',
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
          <p className="text-gray-700 leading-relaxed">{course.importance}</p>
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
