"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

// Define the feature items - using the same data for now, adjust as needed
const featureItems = [
  {
    id: 1,
    title: "الإدارة المؤسسية",
    image: "/static/images/Mask Group 5.png",
    description: "متطلبات ضمان جودة الإدارة السياحية للمنظمات بمراعاة إدارة المخاطر ومنع الخسائر و الأوبئة لتحقيق تنمية سياحية مستدامة للمتعاملين."
  },
  {
    id: 2,
    title: "الوجهات السياحية",
    image: "/static/images/Mask Group 6.png",
    description: "متطلبات ضمان جودة تجهيز وإدارة الوجهات و المقاصد السياحية و آلية تنظيم الحشود و سهولة الوصول اليها بمراعاة تنميتها المستدامة بيئياً واجتماعياً واقتصادياً."
  },
  {
    id: 3,
    title: "النقل وسهولة الوصول",
    image: "/static/images/Mask Group 7.png",
    description: "متطلبات ضمان جودة وسائل النقل بأنواعها وإجراءات تجهيزها وسلامتها بمراعاة سهولة الوصول لذوي الاحتياجات الخاصة وكبار السن والحوامل ومحطات الإركاب والنزول وطريق المشاة."
  },
  {
    id: 4,
    title: "السكن والمطاعم و المرافق",
    image: "/static/images/Group 8.png",
    description: "متطلبات ضمان جودة السكن السياحي الفندقي وغير الفندقي وإجراءات وسلامة وصحة المطاعم والمرافق السياحية، بمطابقة مواصفات جودتها والكمية والنوعية."
  },
  {
    id: 5,
    title: "الخدمات و المنتجات السياحية",
    image: "/static/images/Mask Group 3.png",
    description: "متطلبات ضمان جودة الخدمات الواجب توافرها في المنشآت والوجهات والشركات السياحية التي تقدمها لتلبية احتياجات السائحين ورضاهم."
  },
  {
    id: 6,
    title: "الحوكمة وأنظمة حقوق السائح",
    image: "/static/images/Mask Group 4.png",
    description: "متطلبات ضمان جودة إدارة حوكمة المنشآت والوجهات و الشركات السياحية وحمايتها لحقوق السائحين وضمان أمنهم وصحتهم وسلامتهم ورضاهم."
  },
  {
    id: 7,
    title: "الرحلات والتسويق السياحي",
    image: "/static/images/Mask Group 9.png",
    description: "متطلبات ضمان جودة تنظيم الرحلات السياحية البرية والبحرية والجوية لشركات السياحة، والإرشاد السياحي على مستوى الأفراد، وتطبيق مواصفة جودة الإعلام في الترويج السياحي."
  },
  {
    id: 8,
    title: "إدارة المعارف والمهارات السياحية",
    image: "/static/images/Mask Group 10.png",
    description: "متطلبات ضمان الجودة إدارة المعارف والمهارات السياحية ونقلها وتحويلها لمنتجات وخدمات تطويريه لرفع كفاءة الافراد وتنمية الشركات والمنشآت السياحية."
  },
  {
    id: 4,
    title: "السكن والمطاعم و المرافق",
    image: "/static/images/Group 8.png",
    description: "متطلبات ضمان جودة السكن السياحي الفندقي وغير الفندقي وإجراءات وسلامة وصحة المطاعم والمرافق السياحية، بمطابقة مواصفات جودتها والكمية والنوعية."
  },
  {
    id: 5,
    title: "الخدمات و المنتجات السياحية",
    image: "/static/images/Mask Group 3.png",
    description: "متطلبات ضمان جودة الخدمات الواجب توافرها في المنشآت والوجهات والشركات السياحية التي تقدمها لتلبية احتياجات السائحين ورضاهم."
  },
  {
    id: 6,
    title: "الحوكمة وأنظمة حقوق السائح",
    image: "/static/images/Mask Group 4.png",
    description: "متطلبات ضمان جودة إدارة حوكمة المنشآت والوجهات و الشركات السياحية وحمايتها لحقوق السائحين وضمان أمنهم وصحتهم وسلامتهم ورضاهم."
  },
  {
    id: 7,
    title: "الرحلات والتسويق السياحي",
    image: "/static/images/Mask Group 9.png",
    description: "متطلبات ضمان جودة تنظيم الرحلات السياحية البرية والبحرية والجوية لشركات السياحة، والإرشاد السياحي على مستوى الأفراد، وتطبيق مواصفة جودة الإعلام في الترويج السياحي."
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
                className={`bg-gray-50 rounded-md shadow-sm overflow-hidden transition-all duration-300 transform max-w-xs mx-auto flex flex-col ${ // Re-added flex flex-col
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
                  <div className="mt-auto pt-2"> {/* Re-added mt-auto and pt-2 */}
                    <Link 
                      href="#" // Update this link destination if needed
                      className={`block w-full text-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${ // Added block, w-full, text-center
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
