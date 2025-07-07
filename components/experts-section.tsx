"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useWindowSize } from "@/hooks/use-window-size"

export default function ExpertsSection() {
  const experts = [
    {
      id: 1,
      name: "Кириллов Дмитрий Сергеевич",
      specialization: "Эксперт в области нейросетевого искусства",
      image: "/kirillov.png",
    },
    {
      id: 2,
      name: "Тамбовцев Денис Игоревич",
      specialization: "Эксперт в области разработки виртуальной и дополненной реальности",
      image: "/tambovcev.png",
    },
    {
      id: 3,
      name: "Валиуллин Азат Миннуллович",
      specialization: "Эксперт в области беспилотных летательных аппаратов",
      image: "/valliulin.png",
    },
    {
      id: 4,
      name: "Зиннатуллин Айзат Имбелович",
      specialization: "Эксперт в области промышленной робототехники",
      image: "/zinnatullin.png",
    },
    {
      id: 5,
      name: "Ларин Александр Викторович",
      specialization: "Эксперт по сварочным технологиям",
      image: "/larin.png",
    },
    {
      id: 6,
      name: "Добротворская Алла Сергеевна",
      specialization: "Эксперт в области жестового искусства",
      image: "/dorbrova.png",
    },
    {
      id: 7,
      name: "Михайлов Алексей Николаевич",
      specialization: "Эксперт в области беспилотного пилотирования",
      image: "/mihailov.png",
    },
    {
      id: 8,
      name: "Хайруллин Рудольф Рафисович",
      specialization: "Эксперт в области электроники",
      image: "/hiroller.png",
    },
    {
      id: 9,
      name: "Чернышов Александр Иванович",
      specialization: "Эксперт в области Наземных роботизированных комплексов",
      image: "/chernishov.png",
    },
    {
      id: 10,
      name: "Москвин Олег Александрович",
      specialization: "Эксперт по компетенции Администрирование баз данных",
      image: "/moskvin.png",
    },



  ]

  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const slidesToShow = isClient ? (width < 480 ? 2 : width < 640 ? 3 : width < 768 ? 3 : width < 1024 ? 4 : 5) : 3 // Default to 3 for SSR
  const totalPages = Math.ceil(experts.length / slidesToShow)

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
  const currentExperts = experts.slice(startIndex, endIndex)
  const dragThreshold = 50

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:pt-0 lg:pb-24 bg-white"
    >
      <div className="container mx-auto px-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-brand-text-dark mb-8 lg:mb-10"
        >
          Наши эксперты
        </motion.h2>

        <motion.div
          className="relative overflow-hidden h-[200px] sm:h-[220px] md:h-[240px]" // Adjusted height
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
              className="absolute w-full h-full grid gap-x-2 sm:gap-x-4 md:gap-x-6 items-start"
              style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
            >
              {currentExperts.map((expert) => (
                <div key={expert.id} className="text-center flex flex-col items-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-2 sm:mb-3">
                    <Image
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      fill
                      className="object-cover rounded-full"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base text-brand-text-dark mb-0.5 leading-tight line-clamp-2">
                    {expert.name}
                  </h3>
                  <p className="text-xs sm:text-xs text-brand-text-light leading-snug line-clamp-3">{expert.specialization}</p>
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
            aria-label="Previous expert"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {/* Optional: Page indicator if desired, though not prominent in screenshot for this section */}
          {/* <span className="text-sm text-gray-600">{page + 1} / {totalPages}</span> */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            className="rounded-full w-8 h-8"
            aria-label="Next expert"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
