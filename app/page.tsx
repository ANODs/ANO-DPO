"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import TestSection from "@/components/test-section"
import PopularPrograms from "@/components/popular-programs"
import ProgramCategories from "@/components/program-categories"
import AboutSection from "@/components/about-section"
import ExpertsSection from "@/components/experts-section"
import TestimonialsSection from "@/components/testimonials-section"
import PartnersSection from "@/components/partners-section"
import ContactSection from "@/components/contact-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <main>
        <HeroSection />
        <TestSection />
        <PopularPrograms />
        <ProgramCategories />
        <AboutSection />
        <ExpertsSection />
        <TestimonialsSection />
        <PartnersSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </motion.div>
  )
}
