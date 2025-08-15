import HeroSection from "@/components/sections/hero-section"
import FeaturedCourses from "@/components/sections/featured-courses"
import StatsSection from "@/components/sections/stats-section"
import FeaturesDetailed from "@/components/sections/features-detailed"
import TestimonialsSection from "@/components/sections/testimonials-section"
import NewsletterSection from "@/components/sections/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedCourses />
      <FeaturesDetailed />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
