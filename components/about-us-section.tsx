import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-blue-600 dark:text-gray-100 mb-6">
            من نحن
          </h2>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            جائزة الجودة والتميز السياحي
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            هي شهادة اعتماد ودرع صادر عن المنظمة العربية للسياحة التابعة لجامعة الدول العربية لتقدير الجهات الحاصلة عليها وتعزيز الثقة في أداء المنظمات والمنشآت والوجهات السياحية وتصنيفها عربيا كجهات تطبق معايير الجودة وإجراءات الصحة والسلامة المهنية والبيئية والغذائية وإدارة المخاطر لتحقيق رضا السائحين وإبهارهم. وتُمنح هذه الجائزة للجهات التي تلتزم بتطبيق معايير الجودة أو التميز في تقديم الخدمات والمنتجات السياحية، وفقًا للمتطلبات والمعايير التي حددتها لجنة الجائزة بالمنظمة لكل منهما بالتعاون مع المعنيين، وفق أفضل الممارسات السياحية والمعايير الدولية المعتمدة.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
