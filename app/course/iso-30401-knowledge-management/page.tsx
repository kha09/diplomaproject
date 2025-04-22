import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'إدارة المعارف السياحية ونقل الخبرات وفق ISO 30401',
};

const CourseDetailPage = () => {
  const course = {
    title: 'إدارة المعارف السياحية ونقل الخبرات وفق ISO 30401',
    description: 'تعد إدارة المعرفة عنصراً أساسياً لتعزيز أداء المنظمات السياحية وتحقيق أهدافها الاستراتيجية، خاصة في ظل التغيرات السريعة والمنافسة المتزايدة. تهدف دورة إدارة المعرفة السياحية إلى تقديم فهم شامل لمفاهيمها وأهميتها، مع التركيز على تصميم وتنفيذ نظم فعالة لإدارة المعرفة. تسهم هذه الدورة في تعزيز الفهم والتطبيق الفعّال لمبادئ إدارة المعرفة، مما يعزز من أداء المؤسسات السياحية ويحقق النجاح المستدام في هذا القطاع الحيوي.',
    importancePoints: [ // Using a different key for the numbered list
      'تعزيز الابتكار: إدارة المعرفة تجمع الأفكار والخبرات لتطوير خدمات مبتكرة تلبي احتياجات الزوار.',
      'تحسين القرارات: توفر معلومات دقيقة تدعم اتخاذ قرارات مستنيرة بناءً على البيانات.',
      'زيادة الكفاءة: تنظيم المعرفة يقلل الوقت اللازم للبحث ويحسن كفاءة العمليات.',
      'تعزيز التعاون: تشجع على بيئة عمل إيجابية تدعم التواصل وتبادل الخبرات.',
      'الميزة التنافسية: استخدام المعرفة بفعالية يتيح التكيف مع التغيرات وتحسين جودة الخدمات.',
      'تطوير الكفاءات: تعزز من مهارات الموظفين، مما يحسن الأداء ويرفع رضاهم الوظيفي.',
      'استدامة المعرفة: تحافظ على المعلومات الحيوية لضمان استمرارية وجودة الخدمات.',
    ],
    objectives: [
      'تعزيز المعرفة كأصل تنظيمي في السياق السياحي، وفق معايير ISO 30401.',
      'تطوير استراتيجيات إدارة المعرفة تتناسب مع احتياجات مؤسساتهم السياحية وتساهم في تحقيق الأهداف التنظيمية.',
      'تطبيق أدوات وتقنيات فعالة لجمع وتوثيق وتبادل المعرفة والخبرات السياحية.',
      'بناء ثقافة التعاون وتبادل المعرفة بين الفرق المختلفة، مما يعزز من الابتكار وتحسين الخدمات.',
      'تحسين مهارات اتخاذ القرار عند المشاركين بالمعرفة والمهارات اللازمة لتحليل البيانات والمعلومات السياحية.',
      'تطوير مهارات القيادة والإدارة لدى المشاركين، مما يمكنهم من قيادة جهود إدارة المعرفة في مؤسساتهم السياحية وتحفيز الفرق.',
      'تعزيز استدامة المعرفة عن طريق وضع استراتيجيات فعالة للحفاظ على المعرفة داخل المؤسسات.',
      'تحقيق الابتكار والتطور المستدام في تحسين تجربة الزوار وتعزيز التنافسية في السوق.',
    ],
    mainTopicsDescription: 'تتناول الدورة عدد من المحاور مثل فهم احتياجات وتوقعات الأطراف المعنية من المعرفة، تحديد نطاق  وتطوير و نقل المعرفة، وتعزيز ثقافة تنظيمية داعمة لتبادل المعرفة. تتضمن أيضا المحاور استراتيجيات جمع وتوثيق ومشاركة المعرفة، و عملية اتخاذ القرارات وكفاءة العمليات و تسليط الضوء على أهمية الابتكار والتعاون بين الفرق. كما سيتم تقديم تمارين عملية وورش عمل تفاعلية لتحقيق تطبيق فعّال للمفاهيم. تهدف الدورة إلى تعزيز الأداء المؤسسي والقدرة التنافسية، مما يجعلها تجربة تعليمية شاملة تحدث تغييراً إيجابياً ومستداماً.', // Using a description field for topics
    outcomes: [
      'فهم مفاهيم إدارة المعرفة: استيعاب المبادئ الأساسية وأهميتها لتحسين الأداء السياحي.',
      'تطوير استراتيجيات فعالة: اكتساب مهارات لوضع استراتيجيات تتناسب مع احتياجات السياحة.',
      'تطبيق الأدوات والتقنيات: استخدام أدوات لجمع وتوثيق وتبادل المعرفة لتحسين جودة الخدمات.',
      'تعزيز ثقافة التعاون: بناء بيئة تنظيمية تدعم الابتكار والشراكة بين الفرق.',
      'قياس فعالية النظم: تعلم تقييم نظم إدارة المعرفة وفق معايير ISO 30401 .',
      'تطوير القيادة: اكتساب مهارات قيادة جهود إدارة المعرفة وتحفيز الفرق.',
      'إدارة المعرفة كأصل: التعامل مع المعرفة كأصل تنظيمي يعزز التنافسية.',
      'تحسين الأداء: استخدام المعرفة لزيادة الكفاءة وتحقيق الأهداف السياحية.',
    ],
    // Duration was not provided
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
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            {course.importancePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">الأهداف</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            {course.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">المحاور الرئيسية</h2>
          <p className="text-gray-700 leading-relaxed">{course.mainTopicsDescription}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">مخرجات الدورة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.outcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </section>

        {/* Duration section omitted as it wasn't provided */}

      </div>
    </>
  );
};

export default CourseDetailPage;
