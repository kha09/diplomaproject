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
    description: "معايير تميز الجهة في تقديم خدمات غير تقليدية أو متوقعة من خلال أفكار إبداعية قادرة على تصميم بيئات ومنتجات وعمارة مبتكرة تحقق قيمة مضافة للسائحين."
  },
  {
    id: 2,
    title: "الأصالة والانغماس الثقافي:",
    image: "/static/images/Group 90.png?height=200&width=300",
    description: "معايير تميز الجهة في تقديم تجارب تعكس الواقع الحقيقي للوجهة والتفاعل مع الثقافة المحلية الحية وتتيح للسائح الانغماس في حياه المجتمع المحلي وليس مجرد المراقبة."
  },
  {
    id: 3,
    title: "إثراء التجربة",
    image: "/static/images/Mask Group 19.png?height=200&width=300",
    description: "معايير تميز الجهة في خلق تجربة سياحية ذات معنى عميق يلامس إدراك السائح روحياً وجسدياً وعاطفياً ويترك انطباعاً وذكرى سعيدة كالسياحة التعليمية والريفية والفخامة الهادئة."
  },
  {
    id: 4,
    title: "الخدمات الحصرية وشخصنة المنتج",
    image: "/static/images/Mask Group 20.png?height=200&width=300",
    description: "معايير تميز الجهة في تصميم خدمات ومنتجات سياحية تلبي الرغبات الفردية لكل سائح على حده من خلال فهم اهتماماته لتقديم عروض وخدمات متفردة وخاصة بمن يطلبها."
  },
  {
    id: 5,
    title: "الخصوصية",
    image: "/static/images/Mask Group 17.png?height=200&width=300",
    description: "معايير تميز الجهة في تأمين الخصوصية للباحثين عن الهدوء والاسترخاء والابتعاد عن الانظار وحماية البيانات وتوفير مساحات مادية وبيئات تضمن العزلة والسكينة والاسترخاء."
  },
  {
    id: 6,
    title: "الاستدامة والسياحة المسؤولة",
    image: "/static/images/Mask Group 17.png?height=200&width=300",
    description: "معايير تميز الجهة في تبني مبادئ الاستدامة في السياحة البيئية ومنع التلوث وتنمية اقتصاديات المجتمعات المحلية ورفاهيتها وعدم الإخلال بالنسيج الاجتماعي أو استغلال التراث."
  }
]

export default function ExcellenceAwards() {
  // State to track the current index of the carousel
  const [currentPage, setCurrentPage] = useState(0)
  // State to track which award is being hovered
  const [hoveredAward, setHoveredAward] = useState<number | null>(null)
  // State to track if the section is visible
  const [isVisible, setIsVisible] = useState(false)
  // State to track if auto-rotation is paused
  const [isPaused, setIsPaused] = useState(false)
  // Ref for the section element
  const sectionRef = useRef<HTMLElement>(null)

  const totalItems = excellenceItems.length;

  // Function to go to the next item
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalItems);
  }

  // Function to go to the previous item
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalItems) % totalItems);
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
  }, [isPaused, totalItems]) // Depend on totalItems

  // Get the 4 items to display for the current page (sliding window)
  const getCurrentItems = () => {
    const itemsToShow = [];
    for (let i = 0; i < 4; i++) {
      const itemIndex = (currentPage + i) % totalItems;
      itemsToShow.push(excellenceItems[itemIndex]);
    }
    // Ensure unique keys if items wrap around and might repeat in edge cases (though unlikely with unique IDs)
    // Add a temporary unique key based on position if needed, but item.id should suffice
    return itemsToShow;
  };

  const currentItems = getCurrentItems();

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
          {/* Container for the grid of 4 items */}
          <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 transition-all duration-500 ${ // Back to grid
              isPaused ? "scale-[0.98]" : "scale-100"
            }`}
            dir="rtl"
          >
            {/* Render the 4 current items */}
            {currentItems.map((item, index) => ( // Use index for potential transition delay
              <div
                key={`${item.id}-${currentPage}-${index}`} // More robust key for sliding window
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform 
                  ${ isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20" } 
                  ${ hoveredAward === item.id ? "shadow-xl scale-[1.03] bg-white" : "" }
                `}
                 style={{ transitionDelay: `${index * 100}ms` }} // Re-add transition delay based on grid position
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
