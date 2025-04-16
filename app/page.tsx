import Header from "../components/header"
import HeroSection from "../components/hero-section"
import ContactForm from "../components/contact-form"
import AboutUsSection from "../components/about-us-section" // Added import
import ServicesSection from "../components/services-section"
import AwardsSection from "../components/awards-section"
import TourismCategories from "../components/tourism-categories"
import ExcellenceAwards from "../components/excellence-awards"
import EventsSection from "../components/events-section"
import TrainingSection from "../components/training-section"
import PartnersSection from "../components/partners-section"
import Footer from "../components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ContactForm />
      <AboutUsSection /> {/* Added component */}
      <ServicesSection />
      <AwardsSection />
      
     
      <ExcellenceAwards />
      <TrainingSection />
      <PartnersSection />
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QEA Tourism",
            "url": "https://www.qeatourism.com/", // Replace with your actual domain
            "logo": "https://www.qeatourism.com/static/images/logoprizenew.png", // Absolute URL needed
            "description": "دبلوم أخصائي الجودة والتميز السياحي والمزيد",
            // Add "sameAs": ["URL1", "URL2"] if you have social media profile URLs
          }),
        }}
      />
    </main>
  )
}
