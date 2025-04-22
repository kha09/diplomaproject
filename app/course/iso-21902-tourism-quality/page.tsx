import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'الجودة السياحية في إدارة المنشآت والوجهات وفق السياحة الميسرة ISO 21902',
};

const CourseDetailPage = () => {
  const course = {
    title: 'الجودة السياحية في إدارة المنشآت والوجهات وفق السياحة الميسرة ISO 21902',
    description: 'معــــرفة وتطــبيق متطلــبات المواصـفــة ISO 21902 و ISO 9001 كمعيارين لأنظمة إدارة الجودة والجودة السياحية الميسرة للجميع وخاصة ذوي الاحتياجات الخاصة وكبار السن ،ويتضمن مسار الدورة الدمج بين متطلبات جميع مكونات الجودة السياحية لتأهيل وإعداد كفاءات قادرة على تطبقيها في المنشآت والوجهات لتلبية احتياجات السائحين وتحقيق رضاهم من خلال تحسين العمليات والخدمات والمنتجات السياحية بما يعزز الثقة المؤسسية ويثري تجربة السائحين ويسهم في التنمية المستدامة للمنشآت والوجهات السياحية.',
    importance: 'معرفة وتطبيق معايير الجودة في أنحاء المجال السياحي بجميع مكوناته للارتقاء بمستوى جودة خدماته ومنتجاته، برفع كفاءة العاملين فيه وزيادة فاعلية إدارة منشآته ووجهاته ونهج عملياته ووسائله لتحسينها المستمر .',
    objectives: [
      'تأهيل وإعداد الكفاءات القادرة على تطبيق معايير الجودة في جميع مكونات تنمية المجال السياحي.',
      'الارتقاء بمستوى جودة الخدمات والمنتجات المقدمة  في المنشآت والوجهات السياحية .',
      'حماية حقوق السائح وأمنه وسلامته وإثراء تجربته وتمكين الفئات الأكثر حاجة من سياحة ميسرة .',
      'تطبيق متطلبات معايير الجودة للإسهام في تنمية المنشآت والوجهات السياحية وتذليل معوقاتها .',
      'توظيف أدوات الجودة في حل المشكلات السياحية والاستفادة القصوى من الفرص .',
    ],
    mainTopics: [
      'مفهوم الجودة السياحية ومصطلحاتها ومراجعها المعيارية .',
      'ربط مكونات محاور التنمية السياحية بدوائر الجودة  .',
      'تطبيق المعيار الدولي لإدارة الجودة (iso 9001)في المنشآت والوجهات السياحية .',
      'معرفة متطلبات السياحة الميسرة للجميع وفئات كبار السن وذوي الاحتياجات ( iso 21902)',
      'تصميم مصفوفة جودة إدارة  الطوارئ المؤسسية  والمخاطر في أنحاء المجال السياحي .',
    ],
    outcomes: [
      'اكنساب المعارف بمتطلبات معايير الجودة في أنحاء المجال السياحي وأصحاب المصلحة.',
      'المهارة العملية لتطبيق ومواءمة مواصفات الجودة على الخدمات والمنتجات السياحية .',
      'القدرة على تطبيق أدوات الجودة في حل المشكلات المستجدة واستشراف الفرص المتاحة .',
      'وضع نظام إدارة الجودة  وسياستها ونهج عملياتها في المنشآت والوجهات السياحية .',
      'قياس أثر الخدمات والمنتجات السياحية مؤسسيا ومجتمعيا وإجراء التحسين المستمر عليها .',
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
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">المحاور الرئيسة</h2>
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
