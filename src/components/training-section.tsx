import Image from "next/image"
import Link from "next/link"

export default function TrainingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex justify-end mb-8">
          <h2 className="text-2xl font-bold text-teal-500">الدورات التدريبية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
          {/* Right column - Training courses */}
          <div className="space-y-8">
            {/* Course 1 */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Desert with camels"
                  width={200}
                  height={150}
                  className="rounded-md object-cover w-full h-auto"
                />
              </div>
              <div className="w-full md:w-2/3 order-1 md:order-2 text-right">
                <h3 className="text-xl font-bold text-teal-700 mb-2">رخصة مقيم داخلي</h3>
                <p className="text-sm text-gray-600 mb-2">
                  هذه الدورة مثالية للراغبين في تعزيز مهاراتهم وتقديم خدمات سياحية استثنائية تلبي توقعات الزوار وتفوقها
                </p>
                <Link href="#" className="text-teal-500 hover:text-teal-700 text-sm font-medium">
                  عرض المزيد
                </Link>
              </div>
            </div>

            {/* Course 2 */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Rock formation"
                  width={200}
                  height={150}
                  className="rounded-md object-cover w-full h-auto"
                />
              </div>
              <div className="w-full md:w-2/3 order-1 md:order-2 text-right">
                <h3 className="text-xl font-bold text-teal-700 mb-2">رخصة مقيم خارجي</h3>
                <p className="text-sm text-gray-600 mb-2">
                  يقدم الدبلوم نظرة شاملة على معايير تحسين تجربة الزوار وتطوير الخدمات، مثالية للراغبين في التميز في
                  قطاع السياحة وتقديم خدمات استثنائية
                </p>
                <Link href="#" className="text-teal-500 hover:text-teal-700 text-sm font-medium">
                  عرض المزيد
                </Link>
              </div>
            </div>

            {/* Course 3 */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <div className="bg-teal-400 rounded-md h-full w-full min-h-[150px]"></div>
              </div>
              <div className="w-full md:w-2/3 order-1 md:order-2 text-right">
                <h3 className="text-xl font-bold text-teal-700 mb-2">اسم الدورة التدريبية</h3>
                <p className="text-sm text-gray-600 mb-2">
                  انضم للدبلوم مكون من مجموعة مقررات دراسية في الجودة والتميز تركز على تطبيق المعايير والإرشادات
                  القياسية ودمجها في خدمات ومنتجات المجال السياحي
                </p>
                <Link href="#" className="text-teal-500 hover:text-teal-700 text-sm font-medium">
                  عرض المزيد
                </Link>
              </div>
            </div>

            {/* Diploma */}
            <div className="text-right">
              <h3 className="text-xl font-bold text-teal-700 mb-2">دبلوم أخصائي جودة وتميز سياحي</h3>
              <p className="text-sm text-gray-600 mb-2">
                يتكون الدبلوم من مجموعة دورات متخصصة في الجودة والتميز تركز على تطبيق المعايير والإرشادات القياسية
                ودمجها في خدمات ومنتجات المجال السياحي
              </p>
              <Link href="#" className="text-teal-500 hover:text-teal-700 text-sm font-medium">
                عرض المزيد
              </Link>
            </div>
          </div>

          {/* Left column - Large image */}
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="World landmarks in hands"
              width={600}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-12 gap-4">
          <Link
            href="#"
            className="px-6 py-2 border border-teal-500 text-teal-500 rounded-full hover:bg-teal-50 transition-colors"
          >
            تواصل معنا
          </Link>
          <Link href="#" className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
            جميع الدورات
          </Link>
        </div>
      </div>
    </section>
  )
}

