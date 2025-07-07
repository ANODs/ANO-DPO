"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useWindowSize } from "@/hooks/use-window-size"

const partners = [
  { id: 1, name: "КХК", logo: "/knn.png" },
  { id: 2, name: "ФАС России", logo: "/fas.png" },
  { id: 3, name: "Аванти", logo: "/avanti.png" },
  { id: 4, name: "Абилимпикс", logo: "/abilimp.png" },
  { id: 5, name: "Центр Технического Творчества", logo: "/technoart.png" },
  { id: 6, name: "Avanti group", logo: "/AvantiGroup.png" },
  { id: 7, name: "ВОИР", logo: "/VOIR.png" },
  { id: 8, name: "АНО Мир", logo: "/anoMir.png" },
  { id: 9, name: "Абрис група", logo: "/abris.png" },
  { id: 10, name: "Центр Инноваций", logo: "/ino.png" },
  { id: 11, name: "Modum lab", logo: "/modum lab.png" },
  { id: 12, name: "Новые технологии", logo: "/newTech.png" },
  { id: 13, name: "Runa", logo: "/runa.png" },
  { id: 14, name: "kedr", logo: "/kedr.png" },
  { id: 15, name: "Vector groun", logo: "/vectorGroup.png" },
]

export default function PartnersSection() {
  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Use default value during SSR to prevent hydration mismatch
  const slidesToShow = isMounted ? (width < 640 ? 2 : width < 768 ? 3 : width < 1024 ? 4 : 5) : 5
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
      className="py-8 lg:py-16 bg-white"
      id="partners"
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
          className="relative h-[100px] md:h-[140px]" // Adjusted height for logos
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
                  className="relative h-[104px] md:h-[140px] w-full bg-white p-2 rounded-md border border-gray-200 shadow-sm flex items-center justify-center"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain "
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
            aria-label="Next partner"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
