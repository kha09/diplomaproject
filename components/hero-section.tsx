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
    titleAr: "جائزة الجودة والتميز السياحي",
    titleEn: "Tourism Quality and Excellence Award",
  },
  {
    id: 3,
    image: "/static/images/03.jpg",
    titleAr: "جائزة الجودة والتميز السياحي",
    titleEn: "Tourism Quality and Excellence Award",
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
            {/* Subtle dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      ))}

      {/* Static Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-end justify-center px-12 text-right text-white z-10 pointer-events-none">
        <div className="mb-8 max-w-2xl">
          <h1 className="mb-4 text-5xl font-bold leading-tight text-white" dir="rtl">
            جائزة الجودة والتميز السياحي {/* Static H1 */}
          </h1>
          <p className="text-3xl font-semibold text-white">Tourism Quality and Excellence Award</p> {/* Changed from H2 */}
        </div>
      </div>

      {/* Wave shape curve at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          className="h-auto w-full"
          preserveAspectRatio="none"
          style={{ display: 'block', marginBottom: '-1px' }}
        >
          <path
            fill="#ffffff"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
            style={{ stroke: 'none' }}
          ></path>
        </svg>
      </div>
    </section>
  )
}
