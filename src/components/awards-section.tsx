"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define the award items - 8 boxes as requested
const awardItems = [
  {
    id: 1,
    title: "إدارة المؤسسة",
    image: "/static/images/Mask Group 5.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 2,
    title: "مقاصد ووجهات سياحية",
    image: "/static/images/Mask Group 6.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 3,
    title: "النقل وسهولة الوصول",
    image: "/static/images/Mask Group 7.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 4,
    title: "السكن والمرافق",
    image: "/static/images/Group 8.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 5,
    title: "الخدمات السياحية",
    image: "/static/images/Mask Group 5.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 6,
    title: "الاستدامة البيئية",
    image: "/static/images/Mask Group 5.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 7,
    title: "التسويق والترويج",
    image: "/static/images/Mask Group 5.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 8,
    title: "تجربة الزائر",
    image: "/static/images/Mask Group 5.png",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  }
]

export default function AwardsSection() {
  // State to track the current page of the carousel
  const [currentPage, setCurrentPage] = useState(0)
  // Number of items to show per page
  const itemsPerPage = 4
  // Calculate total number of pages
  const totalPages = Math.ceil(awardItems.length / itemsPerPage)

  // Function to go to the next page
  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Function to go to the previous page
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextPage()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Get current items to display
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage
    return awardItems.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">محاور جائزة الجودة السياحية</h2>
        </div>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" dir="rtl">
            {getCurrentItems().map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <Link href="#" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                      {item.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-white shadow-md p-2 text-teal-600 transition-all hover:bg-gray-100"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white shadow-md p-2 text-teal-600 transition-all hover:bg-gray-100"
            aria-label="Next page"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-8 h-2 rounded-full transition-all ${
                index === currentPage ? "bg-teal-600" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
