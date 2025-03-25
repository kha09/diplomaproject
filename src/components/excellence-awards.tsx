import Image from "next/image"
import Link from "next/link"

export default function ExcellenceAwards() {
  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">محاور جائزة التميز السياحي</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" dir="rtl">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Excellence category"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-2">
                  هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس
                  المساحة.
                </p>
                <div className="flex justify-center mt-4">
                  <Link href="#" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    {item === 1 && "الإبداع والابتكار"}
                    {item === 2 && "الأصــالة"}
                    {item === 3 && "إدارة تجربة السائحين"}
                    {item === 4 && "التنظيم الإداري"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mx-1">
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mx-1">
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

