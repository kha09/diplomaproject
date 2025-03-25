import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/contact-form"
import ServicesSection from "@/components/services-section"
import AwardsSection from "@/components/awards-section"
import TourismCategories from "@/components/tourism-categories"
import ExcellenceAwards from "@/components/excellence-awards"
import EventsSection from "@/components/events-section"
import TrainingSection from "@/components/training-section"
import PartnersSection from "@/components/partners-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ContactForm />
      <ServicesSection />
      <AwardsSection />
      <TourismCategories />
      <ExcellenceAwards />
      <EventsSection />
      <TrainingSection />
      <PartnersSection />
      <Footer />
    </main>
  )
}

