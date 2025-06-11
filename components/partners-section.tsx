"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useWindowSize } from "@/hooks/use-window-size"

export default function PartnersSection() {
  const partners = [
    { id: 1, name: "КХК", logo: "/placeholder.svg?height=60&width=100" },
    { id: 2, name: "ФАС России", logo: "/placeholder.svg?height=60&width=100" },
    { id: 3, name: "Аванти", logo: "/placeholder.svg?height=60&width=100" },
    { id: 4, name: "Абилимпикс", logo: "/placeholder.svg?height=60&width=100" },
    { id: 5, name: "Центр Технического Творчества", logo: "/placeholder.svg?height=60&width=100" },
    { id: 6, name: "Партнер 6", logo: "/placeholder.svg?height=60&width=100" },
    { id: 7, name: "Партнер 7", logo: "/placeholder.svg?height=60&width=100" },
    { id: 8, name: "Партнер 8", logo: "/placeholder.svg?height=60&width=100" },
  ]

  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const slidesToShow = width < 640 ? 2 : width < 768 ? 3 : width < 1024 ? 4 : 5
  const totalPages = Math.ceil(partners.length / slidesToShow)

  const paginate = (newDirection: number) => {
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
  const currentPartners = partners.slice(startIndex, endIndex)
  const dragThreshold = 50

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-center text-brand-text-dark mb-8 lg:mb-10"
        >
          Нам доверяют
        </motion.h2>

        <motion.div
          className="relative overflow-hidden h-[100px] md:h-[120px]" // Adjusted height for logos
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
              className="absolute w-full h-full grid gap-x-4 md:gap-x-6 items-center"
              style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
            >
              {currentPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="relative h-16 md:h-20 w-full bg-white p-2 rounded-md border border-gray-200 shadow-sm flex items-center justify-center"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
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
          className="flex justify-center items-center space-x-3 mt-8"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(-1)}
            className="rounded-full w-8 h-8"
            aria-label="Previous partner"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {/* <span className="text-sm text-gray-600">{page + 1} / {totalPages}</span> */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            className="rounded-full w-8 h-8"
            aria-label="Next partner"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
