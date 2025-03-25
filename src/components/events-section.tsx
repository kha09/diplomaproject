import Image from "next/image"

export default function EventsSection() {
  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">الدورات التدريبية</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2" dir="rtl">
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4">
            <div className="w-full md:w-1/3">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Training course"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-lg mb-2">وجهة مميزة داخل وطني</h3>
              <p className="text-xs text-gray-600 mb-4">
                هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                المساحة.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span>أيام الدورة: 3 أيام</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4">
            <div className="w-full md:w-1/3">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Training course"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-lg mb-2">وجهة مميزة خارج وطني</h3>
              <p className="text-xs text-gray-600 mb-4">
                هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                المساحة.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span>أيام الدورة: 5 أيام</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2" dir="rtl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4 text-teal-600">اسم الدورة التدريبية</h3>
            <p className="text-xs text-gray-600 mb-4">
              هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس
              المساحة.
            </p>
            <div className="flex justify-end">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm">تسجيل للدورة</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4 text-teal-600">دبلوم اخصائي جودة وتميز سياحي</h3>
            <p className="text-xs text-gray-600 mb-4">
              هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس
              المساحة.
            </p>
            <div className="flex justify-end">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm">حجز الدورات</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

