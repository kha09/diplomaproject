"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "",
    title: "Tourism Quality and Excellence Award",
    titleAr: "جائزة الجودة والتميز السياحي",
    description: "Recognizing outstanding achievements in the tourism industry",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Elevating Tourism Standards",
    titleAr: "رفع معايير السياحة",
    description: "Promoting excellence and innovation in tourism services",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Celebrating Cultural Heritage",
    titleAr: "الاحتفال بالتراث الثقافي",
    description: "Preserving and showcasing our rich cultural heritage",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden sm:h-[600px] md:h-[700px]">
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
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 to-teal-600/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h2 className="mb-2 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">{slide.title}</h2>
              <h3 className="mb-6 text-2xl font-bold md:text-4xl lg:text-5xl" dir="rtl">
                {slide.titleAr}
              </h3>
              <p className="mb-8 max-w-2xl text-lg md:text-xl">{slide.description}</p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button className="bg-white text-teal-900 hover:bg-gray-100">Learn More</Button>
                <Button className="border border-white bg-transparent hover:bg-white/20">Apply Now</Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-8 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

