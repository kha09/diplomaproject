"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define the event items
const eventItems = [
  {
    id: 1,
    title: "وجهة مميزة داخل وطني",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 3 أيام"
  },
  {
    id: 2,
    title: "وجهة مميزة خارج وطني",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 5 أيام"
  },
  {
    id: 3,
    title: "اسم الدورة التدريبية",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 2 أيام"
  },
  {
    id: 4,
    title: "دبلوم اخصائي جودة وتميز سياحي",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 10 أيام"
  },
  {
    id: 5,
    title: "ورشة عمل التسويق السياحي",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 1 يوم"
  },
  {
    id: 6,
    title: "مؤتمر السياحة المستدامة",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 2 أيام"
  },
  {
    id: 7,
    title: "ندوة تطوير المواقع السياحية",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 1 يوم"
  },
  {
    id: 8,
    title: "دورة إدارة الفعاليات السياحية",
    image: "/placeholder.svg?height=150&width=150",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    duration: "أيام الدورة: 4 أيام"
  }
]

export default function EventsSection() {
  // State to track the current page of the carousel
  const [currentPage, setCurrentPage] = useState(0)
  // Number of items to show per page
  const itemsPerPage = 2
  // Calculate total number of pages
  const totalPages = Math.ceil(eventItems.length / itemsPerPage)

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
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  // Get current items to display
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage
    return eventItems.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section className="py-10" id="events">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">الدورات التدريبية</h2>
        </div>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-2" dir="rtl">
            {getCurrentItems().map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
                <div className="w-full md:w-1/3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.duration}</span>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-600 transition-colors">
                      تسجيل للدورة
                    </button>
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
