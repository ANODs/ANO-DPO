"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useWindowSize } from "@/hooks/use-window-size"

export default function TestimonialsSection() {
  const testimonials = [
    { id: 1, image: "/award-1.png", alt: "Благодарность 1" },
    { id: 2, image: "/award-2.png", alt: "Благодарность 2" },
    { id: 3, image: "/award-3.png", alt: "Благодарность 3" },
  ]

  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const slidesToShow = width < 640 ? 1 : width < 768 ? 2 : 3 // Adjusted for typical testimonial display
  const totalPages = Math.ceil(testimonials.length / slidesToShow)

  const paginate = (newDirection: number) => {
    console.log(page)
    setDirection(newDirection)
    setPage((prevPage) => (prevPage + newDirection + totalPages) % totalPages)
  }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  }

  const startIndex = page * slidesToShow
  const endIndex = startIndex + slidesToShow
  const currentTestimonials = testimonials.slice(startIndex, endIndex)
  const dragThreshold = 50

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-center text-brand-text-dark mb-8 lg:mb-10"
        >
          Что о нас говорят
        </motion.h2>

        <motion.div
          className="relative overflow-hidden h-[320px] md:h-[300px]" // Adjusted height for typical certificate aspect ratio
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.x > dragThreshold) paginate(-1)
            else if (info.offset.x < -dragThreshold) paginate(1)
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full h-full grid gap-x-6 items-center"
              style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
            >
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative h-full w-full max-w-[220px] mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200"
                >
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.alt}
                    fill
                    className="object-contain" // Use contain if aspect ratio varies, or cover if consistent
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center space-x-3 mt-8"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            className="rounded-full w-8 h-8"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex justify-center gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-full ${
                  page === index ? "bg-[#666]" : "bg-[#d9d9d9]"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            className="rounded-full w-8 h-8"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
