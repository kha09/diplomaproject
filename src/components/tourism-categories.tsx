import Image from "next/image"

export default function TourismCategories() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">فعاليات</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3" dir="rtl">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative rounded-lg shadow-md overflow-hidden aspect-square">
              {/* Image covering the entire card */}
              <div className="absolute inset-0">
                <Image src="/placeholder.svg?height=400&width=400" alt="Event" fill className="object-cover" />
              </div>

              {/* Content with flex layout */}
              <div className="relative h-full flex flex-row-reverse">
                {/* Empty div for the right half (image is already the background) */}
                <div className="w-1/2 h-full"></div>

                {/* Text container with semi-transparent background */}
                <div className="p-4 text-white w-1/2 flex flex-col justify-center bg-teal-500/80 backdrop-blur-sm">
                  <h3 className="font-bold mb-2">اسم الفعالية</h3>
                  <p className="text-xs mb-2">
                    هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في
                    نفس المساحة.
                  </p>
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

