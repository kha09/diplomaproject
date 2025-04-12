"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define the excellence award items - 8 boxes as requested
const excellenceItems = [
  {
    id: 1,
    title: "الإبداع والابتكار",
    image: "/static/images/Mask Group 18.png?height=200&width=300",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 2,
    title: "الأصــالة",
    image: "/static/images/Group 90.png?height=200&width=300",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 3,
    title: "إثراء تجربة السائحين",
    image: "/static/images/Mask Group 19.png?height=200&width=300",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 4,
    title: "التنظيم الإداري",
    image: "/static/images/Mask Group 20.png?height=200&width=300",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },
  {
    id: 5,
    title: "الفخامة الهادئة والتقليدية",
    image: "/static/images/Mask Group 17.png?height=200&width=300",
    description: "هذا النص يمثل نصاً بديلاً لنص سيتم استبداله فيما بعد بنص آخر. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."
  },

]

export default function ExcellenceAwards() {
  // State to track the current page of the carousel
  const [currentPage, setCurrentPage] = useState(0)
  // Number of items to show per page
  const itemsPerPage = 4
  // Calculate total number of pages
  const totalPages = Math.ceil(excellenceItems.length / itemsPerPage)
  // State to track which award is being hovered
  const [hoveredAward, setHoveredAward] = useState<number | null>(null)
  // State to track if the section is visible
  const [isVisible, setIsVisible] = useState(false)
  // State to track if auto-rotation is paused
  const [isPaused, setIsPaused] = useState(false)
  // Ref for the section element
  const sectionRef = useRef<HTMLElement>(null)

  // Function to go to the next page
  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Function to go to the previous page
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Check if section is visible on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextPage()
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused, totalPages])

  // Get current items to display
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage
    return excellenceItems.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-10 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container px-4 md:px-6">
        <div 
          className={`text-center mb-8 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} 
          dir="rtl"
        >
          <h2 className="text-xl font-semibold text-teal-600">محاور جائزة التميز السياحي</h2>
        </div>

        <div className="relative">
          <div 
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 transition-all duration-500 ${
              isPaused ? "scale-[0.98]" : "scale-100"
            }`} 
            dir="rtl"
          >
            {getCurrentItems().map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                } ${
                  hoveredAward === item.id 
                    ? "shadow-xl scale-[1.03] bg-white" 
                    : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredAward(item.id)}
                onMouseLeave={() => setHoveredAward(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredAward === item.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                    hoveredAward === item.id ? "opacity-70" : "opacity-0"
                  }`}></div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <Link 
                      href="#" 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        hoveredAward === item.id 
                          ? "bg-[#00C1BF] text-white" 
                          : "bg-[#005A98] text-white"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons - Removed from here */}
        </div>

        {/* Simplified arrow-only navigation */}
        <div className="mt-6 flex justify-center items-center gap-4">
        <button
            onClick={nextPage}
            className="rounded-full p-2 border border-teal-600/20 text-teal-600 transition-all hover:bg-teal-600/10 hover:text-teal-700 hover:border-teal-600/30"
            aria-label="Next page"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={prevPage}
            className="rounded-full p-2 border border-teal-600/20 text-teal-600 transition-all hover:bg-teal-600/10 hover:text-teal-700 hover:border-teal-600/30"
            aria-label="Previous page"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
        </div>
      </div>
    </section>
  )
}
