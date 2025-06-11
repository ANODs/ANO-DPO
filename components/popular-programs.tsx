"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Monitor, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useWindowSize } from "@/hooks/use-window-size"
import Link from "next/link"

export default function PopularPrograms() {
  const programs = [
    {
      id: 1,
      title: "Робототехника и автоматизация",
      description: "Краткое описание. Краткое описание.",
      duration: "16 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 2,
      title: "Цифровые технологии",
      description: "Краткое описание. Краткое описание.",
      duration: "24 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 3,
      title: "Проектное управление",
      description: "Краткое описание. Краткое описание.",
      duration: "32 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 4,
      title: "Искусственный интеллект",
      description: "Краткое описание. Краткое описание.",
      duration: "40 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 5,
      title: "Веб-разработка",
      description: "Краткое описание. Краткое описание.",
      duration: "48 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 6,
      title: "UX/UI Дизайн",
      description: "Краткое описание. Краткое описание.",
      duration: "36 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 7,
      title: "Анализ данных",
      description: "Краткое описание. Краткое описание.",
      duration: "30 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 8,
      title: "Кибербезопасность",
      description: "Краткое описание. Краткое описание.",
      duration: "50 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 9,
      title: "Интернет-маркетинг",
      description: "Краткое описание. Краткое описание.",
      duration: "20 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
    {
      id: 10,
      title: "Финансовая грамотность",
      description: "Краткое описание. Краткое описание.",
      duration: "18 ч.",
      format: "Дистанционно",
      image: "/placeholder.svg?height=180&width=280",
    },
  ]

  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const slidesToShow = width < 768 ? 1 : width < 1024 ? 2 : 3
  const totalPages = Math.ceil(programs.length / slidesToShow)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setPage((prevPage) => (prevPage + newDirection + totalPages) % totalPages)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const startIndex = page * slidesToShow
  const endIndex = startIndex + slidesToShow
  const currentPrograms = programs.slice(startIndex, endIndex)

  const dragThreshold = 50 // Minimum distance for a swipe

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Title and Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-4"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-text-dark">Топ 10 популярных программ</h2>
            <Link href="/программы" className="text-sm text-brand-text-light hover:text-blue-600 transition-colors">
              Посмотреть еще
            </Link>
            <div className="flex items-center space-x-3 text-sm text-brand-text-light">
              <button
                onClick={() => paginate(-1)}
                className="p-1 hover:text-brand-text-dark transition-colors"
                aria-label="Previous program"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span>
                {page + 1}/{totalPages}
              </span>
              <button
                onClick={() => paginate(1)}
                className="p-1 hover:text-brand-text-dark transition-colors"
                aria-label="Next program"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative overflow-hidden h-[440px] md:h-[420px]" // Adjusted height
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Keep content from being dragged out of page container
            onDragEnd={(event, info) => {
              if (info.offset.x > dragThreshold) {
                paginate(-1) // Swiped right
              } else if (info.offset.x < -dragThreshold) {
                paginate(1) // Swiped left
              }
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
                className="absolute w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6"
                style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
              >
                {currentPrograms.map((program) => (
                  <Card
                    key={program.id}
                    className="h-full flex flex-col border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-40 rounded-t-lg overflow-hidden">
                        <Image
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          fill
                          className="object-cover"
                          style={{ pointerEvents: "none" }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <CardTitle className="text-md font-semibold text-brand-text-dark mb-1 line-clamp-2">
                        {program.title}
                      </CardTitle>
                      <p className="text-xs text-brand-text-light mb-3 line-clamp-2 flex-grow">{program.description}</p>
                      <div className="flex items-center space-x-3 text-xs text-brand-text-light mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Monitor className="h-3 w-3" />
                          <span>{program.format}</span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 text-sm text-blue-600 self-start flex items-center group mt-auto"
                      >
                        Подробнее
                        <span className="ml-1.5 bg-brand-dark-button text-white rounded-full p-0.5 group-hover:bg-blue-700 transition-colors">
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
