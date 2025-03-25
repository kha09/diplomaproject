"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/static/images/02.jpg",
    titleAr: "جائزة الجودة والتميز السياحي",
    titleEn: "Tourism Quality and Excellence Award",
  },
  {
    id: 2,
    image: "/static/images/01.jpg",
    titleAr: "تعزيز الخدمات السياحية",
    titleEn: "Enhancing Tourism Services",
  },
  {
    id: 3,
    image: "/static/images/03.jpg",
    titleAr: "تطوير المواقع السياحية",
    titleEn: "Developing Tourism Destinations",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[650px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.titleEn}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/40 to-teal-600/70" />

            <div className="absolute inset-0 flex flex-col items-end justify-center px-12 text-right text-white">
              <div className="mb-8 max-w-2xl">
                <h1 className="mb-4 text-5xl font-bold leading-tight text-white" dir="rtl">
                  {slide.titleAr}
                </h1>
                <h2 className="text-3xl font-semibold text-white">{slide.titleEn}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Wave shape at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
