"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define the tourism category items
const tourismItems = [
  {
    id: 1,
    title: "اسم الفعالية 1",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  },
  {
    id: 2,
    title: "اسم الفعالية 2",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  },
  {
    id: 3,
    title: "اسم الفعالية 3",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  },
  {
    id: 4,
    title: "اسم الفعالية 4",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  },
  {
    id: 5,
    title: "اسم الفعالية 5",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  },
  {
    id: 6,
    title: "اسم الفعالية 6",
    image: "/static/images/Image 21.png?height=400&width=400",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد."
  }
]

export default function TourismCategories() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(tourismItems.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextPage()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage
    return tourismItems.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8" dir="rtl">
          <h2 className="text-xl font-semibold text-teal-600">فعاليات</h2>
        </div>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-3" dir="rtl">
            {getCurrentItems().map((item) => (
              <div key={item.id} className="relative rounded-lg shadow-md overflow-hidden aspect-square transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="relative h-full flex flex-row-reverse">
                  <div className="w-1/2 h-full"></div>
                  <div className="p-4 text-white w-1/2 flex flex-col justify-center bg-teal-500/80 backdrop-blur-sm">
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-xs mb-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
