import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header'; // Import the Header component

export const metadata: Metadata = {
  title: 'جودة وسلامة الغذاء وملاءمة السائحين وفق ISO22000 ومواصفة (حلال)',
};

const CourseDetailPage = () => {
  const course = {
    title: 'جودة وسلامة الغذاء وملاءمة السائحين وفق ISO22000 ومواصفة (حلال)',
    description: 'يعد برنامج جودة وسلامة الغذاء وملاءمة السائحين وفق ISO22000 و مواصفة حلال  محورا أساسيًا للخدمات والمنتجات السياحية والمعرفة بالقوانين والتشريعات المحلية والعالمية المنظمة لها واجبة الامتثال والعمل بها وتطبيقها وفق أفضل الممارسات ومن هنا كان مسار التدريب عليها مطلبا ضروريا لا بد منه للارتقاء بمستوى إنتاج وتقديم الغذاء السياحي في جودة وسلامة الغذاء ورفع نسبة الوعي للمراقبين والمصنعين والمستهلكين من خلال تحديد كيفية بناء نظام داخلي للاستدامة والتميز في مأمونية وجودة الأغذية',
    importance: 'تعزيز المفاهيم الأساسية والقوانين لمنظومة جودة وسلامة الغذاء من خلال رفع الوعي ومستوى الثقافة بمسؤوليات ومهام ومتطلبات أركان هذه المنظومة و التي تقع على عاتق كلا من  الحكومات والجهات الرقابية - المصنعين ومقدمين خدمات الأغذية وبالتأكيد السائحين والمستهلكين المحليين لاستدامة صناعة سياحة غذائية ءامنة',
    objectives: [
      'التعريف بمراحل تطور إدارة الجودة وبرامجها في مختلف المنشآت السياحية الغذائية',
      'التعريف بالمفاهيم الأساسية والمتطلبات والبرامج المتنوعة ومدي الاحتياج لها في مختلف الأنشطة السياحية الغذائية',
      'التعريف بمتطلبات الجهات المعنية بمراقبة الأنشطة الغذائية السياحية',
      'التعريف بمتطلبات أصحاب العمل للراغبين في العمل في مجال جودة وسلامة الغذاء في المنشآت الغذائية السياحية',
      'التعريف بكيفية تطبيق الجودة والوصول للاستدامة والتميز في جودة وسلامة ومأمونية الغذاء في المنشآت الغذائية السياحية',
    ],
    duration: 'يومان 10 ساعات بمعدل 5 ساعات يوميا',
    mainTopics: [
      'مقدمة عن مراحل تطور إدارة وبرامج الجودة في المنشآت الغذائية',
      'مقدمة عن سلامة الغذاء وأهم الملوثات وطرق السيطرة عليها',
      'التعريف ببرامج المتطلبات الرئيسية PRP',
      'التعريف بنظام تحليل المخاطر وتحديد نقاط التحكم الحرجة HACCP',
      'المفاهيم الرئيسية للتفتيش والتوعية بمتطلبات تأهيل المفتشين على المنشآت الغذائية',
      'مقدمة عن التدقيق والتوعية بمتطلبات تأهيل المدققين على المنشآت الغذائية',
      'مقدمة عن مواصفة نظام إدارة سلامة الغذاء ISO22000 والتوعية بمتطلباته',
      'التعريف بالاشتراطات العامة للأغذية الحلال وفق مواصفة GSO 2055-1',
      'التدريب والمناهج التعليمية ما بين الشهادات الدولية والمحلية ومتطلبات سوق العمل',
      'مكان خريجي العلوم والتخصصات الغذائية من وظائف جودة وسلامة الغذاء',
      'صاحب العمل التجاري في قطاع الأغذية ما بين معايير الجودة وسلامة الغذاء ومخالفات الجهات الرقابية',
      'التعريف بمفهوم الاعاشة ومعايير وجدارات مشرف الجودة وسلامة الأغذية وفق متطلبات سوق العمل',
    ],
    outcomes: 'نجاح واستدامة جودة الخدمات المقدمة من خلال خطط جودة وسلامة الأغذية والتي لها دور كبير في نجاح الرحلات والتجارب السياحية المختلفة والتخفيف من حدة المخاطر وتحسين أداء المهام من خلال بيئة عمل آمنة نتيجة الإلمام بالبرامج الوقائية التي تزيد من التعمق في التعامل مع الازمات وزيادة فرص التحسين والوصول لجودة التميز السياحي في قطاع الأغذية',
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto px-4 py-8 pt-24" dir="rtl"> {/* Added pt-24 for spacing below header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">{course.title}</h1>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">التعريف بالبرنامج:</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">أهمية البرنامج:</h2>
          <p className="text-gray-700 leading-relaxed">{course.importance}</p>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">أهداف البرنامج:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {course.objectives.map((objective, index) => (
              // Remove bullet points like '•⁠  ⁠' or '•⁠⁠'
              <li key={index}>{objective.replace(/^[•⁠\s]+/, '')}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">المحاور الرئيسية:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
             {course.mainTopics.map((topic, index) => (
              // Remove bullet points like '⁠'
              <li key={index}>{topic.replace(/^[⁠\s]+/, '')}</li>
            ))}
          </ul>
        </section>

         <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">مخرجات البرنامج:</h2>
          <p className="text-gray-700 leading-relaxed">{course.outcomes}</p>
        </section>

        <section className="p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">مدة البرنامج :</h2>
          <p className="text-gray-700 font-medium">{course.duration}</p>
        </section>

      </div>
    </>
  );
};

export default CourseDetailPage;
