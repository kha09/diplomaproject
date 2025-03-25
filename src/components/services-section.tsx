"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "جائزة الجودة السياحية",
      icon: "/static/images/qualityy.png?height=60&width=60",
      href: "#quality",
    },
    {
      id: 2,
      title: "جائزة التميز السياحي",
      icon: "/static/images/idealistic.png?height=60&width=60",
      href: "#excellence",
    },
    {
      id: 3,
      title: "التدريب والتأهيل",
      icon: "/static/images/presentation.png?height=60&width=60",
      href: "#training",
    },
    {
      id: 4,
      title: "الاستشارات والتطوير",
      icon: "/static/images/discussion.png?height=160&width=160",
      href: "#consulting",
    },
  ]

  // State to track which service is being hovered
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  
  // State to track if the section is visible
  const [isVisible, setIsVisible] = useState(false)
  
  // State to track which services have been animated in
  const [animatedServices, setAnimatedServices] = useState<number[]>([])

  // Effect to trigger the entrance animation when the component mounts
  useEffect(() => {
    setIsVisible(true)
    
    // Animate services one by one with a delay
    const animationTimers = services.map((service, index) => {
      return setTimeout(() => {
        setAnimatedServices(prev => [...prev, service.id])
      }, 200 * (index + 1))
    })
    
    return () => {
      // Clean up timers
      animationTimers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  // Function to handle hover state
  const handleMouseEnter = (id: number) => {
    setHoveredService(id)
  }

  const handleMouseLeave = () => {
    setHoveredService(null)
  }

  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div 
          className={`text-center mb-8 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-xl font-semibold text-teal-600">خدماتنا</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4" dir="rtl">
          {services.map((service) => (
            <Link 
              key={service.id} 
              href={service.href} 
              className={`flex flex-col items-center text-center transition-all duration-300 ${
                animatedServices.includes(service.id) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              } ${
                hoveredService === service.id 
                  ? "bg-white shadow-lg rounded-lg p-4" 
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mb-4">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt={service.title}
                  width={60}
                  height={60}
                  className="h-16 w-16 text-teal-600"
                />
              </div>
              <h3 
                className={`text-sm font-medium transition-colors duration-300 ${
                  hoveredService === service.id ? "text-teal-600" : "text-gray-800"
                }`}
              >
                {service.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
