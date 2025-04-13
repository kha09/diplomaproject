"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

// Define the feature items - using the same data for now, adjust as needed
const featureItems = [
  {
    id: 1,
    title: "الجودة السياحية في إدارة المنشآت والوجهات وفق السياحة الميسرة ISO 21902",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 2,
    title: "التعريف بنظام إدارة الاستدامة للمنشآت الفندقية وفق 21401 ISO.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 3,
    title: "نموذج التميز السياحي.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 4,
    title: "الصحة والسلامة في المجال السياحي وفق 45001 ISO.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 5,
    title: "المعايير الدولية لجودة السكن الفندقي والمرافق وفق 22483:2020 ISO",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 6,
    title: "حوكمة المنشآت السياحية وحماية حقوق السائح.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 7,
    title: "إدارة المعارف السياحية ونقل الخبرات وفق 30401 ISO",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 8,
    title: "استمرارية الأعمال السياحية وفق 22301 ISO",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 9,
    title: "السياحة البيئية البحرية وفق 14001 ISO",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 10,
    title: "إدارة المخاطر الصحية في القطاع السياحي وفق 31000 ISO.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 11,
    title: "جودة وسلامة الغذاء وملائمة السائحين وفق 22000 ISO ومواصفة حلال.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  },
  {
    id: 12,
    title: "إثراء تجربة السائح وقياس الرضا.",
    image: "/static/images/Mask Group 5.png",
    description: ""
  }
]

export default function DiplomaFeaturesSection() {
  // State to track which item is being hovered
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  // State to track if the section is visible
  const [isVisible, setIsVisible] = useState(false)
  // Ref for the section element
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section 
      ref={sectionRef}
      className="py-8 bg-white" // Adjusted padding and background
    >
      <div className="container px-4 md:px-6">
        <div 
          className={`text-center mb-6 transition-all duration-700 transform ${ // Adjusted margin
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} 
          dir="rtl"
        >
          {/* You might want to change this title */}
          <h2 className="text-lg font-semibold text-teal-600">المقررات الدراسية</h2> 
        </div>

        <div className="relative">
          {/* Display all items in a grid, adjust columns for responsiveness, and stretch items */}
          <div 
            className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 items-stretch" // Added items-stretch
            dir="rtl"
          >
            {featureItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-gray-50 rounded-md shadow-sm overflow-hidden transition-all duration-300 transform w-72 mx-auto flex flex-col ${ // Replaced max-w-xs with w-72, kept flex flex-col
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-15" // Adjusted translate
                } ${
                  hoveredItem === item.id 
                    ? "shadow-lg scale-[1.02] bg-white" // Adjusted scale and hover shadow
                    : ""
                }`}
                style={{ transitionDelay: `${index * 80}ms` }} // Adjusted delay
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Smaller image height */}
                <div className="relative h-32 overflow-hidden"> 
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-500 ${ // Adjusted duration
                      hoveredItem === item.id ? "scale-105" : "scale-100" // Adjusted scale
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${ // Adjusted gradient
                    hoveredItem === item.id ? "opacity-60" : "opacity-0" // Adjusted opacity
                  }`}></div>
                </div>
                {/* Add flex-grow to the content area to push button down */}
                <div className="p-3 flex flex-col flex-grow"> {/* Added flex flex-col flex-grow */}
                  <h3 className={`text-sm font-semibold text-center mb-1 transition-colors duration-300 ${ // Added title, adjusted size/margin
                    hoveredItem === item.id ? "text-[#005A98]" : "text-gray-800"
                  }`}>
                    {item.title}
                  </h3>
                  {/* Removed min-h-[value] from description paragraph */}
                  <p className={`text-xs text-gray-600 text-center transition-colors duration-300 mb-3 ${ // Removed min-h-[70px]
                    hoveredItem === item.id ? "text-gray-700" : ""
                  }`}>
                    {item.description}
                  </p>
                  {/* Button container - re-added mt-auto */}
                  <div className="mt-auto pt-1"> {/* Re-added mt-auto and pt-2 */}
                    <Link 
                      href="#" // Update this link destination if needed
                      className={`block w-full text-center px-2 py-1 rounded-md text-base font-semibold transition-all duration-300 ${ // Kept py-3, text-base, added font-semibold
                        hoveredItem === item.id 
                          ? "bg-[#00C1BF] text-white" 
                          : "bg-[#005A98] text-white"
                      }`}
                    >
                      معرفة المزيد
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Removed carousel navigation */}
      </div>
    </section>
  )
}
