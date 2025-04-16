import React from 'react';

const VisionMissionSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Vision Column (Now on the right side in RTL) */}
          <div 
            className="p-12 md:p-16 flex flex-col justify-center items-center text-center text-white bg-cover bg-center min-h-80" // Increased padding, added min-height
            style={{ backgroundImage: "url('/static/images/vision.jpg')" }}
          >
            <h2 className="text-3xl font-bold mb-4">
              الرؤية
            </h2>
            {/* Ensure text is readable over the background */}
            <p className="text-lg text-white drop-shadow-md"> 
              أن تكون الجائزة داعما ومطورا رئيسا للسياحة العربية والعالمية
            </p>
          </div>

          {/* Mission Column (Now on the left side in RTL) */}
          <div className="bg-gray-100 dark:bg-gray-800 p-12 md:p-16 flex flex-col justify-center items-center text-center min-h-80"> {/* Increased padding, added min-height */}
            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">
              الرسالة
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              وضع وتنفيذ معايير جودة وتميز قادرة على تحسين وتطوير القطاع السياحي وتنميته
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
