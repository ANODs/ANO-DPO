"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useWindowSize } from "@/hooks/use-window-size"
import Link from "next/link"
import ProgramCard from "@/components/program-card"

export default function PopularPrograms() {
  // Mock data fallback - только 2 карточки
  const mockPrograms = [
    {
      id: 1,
      title: "Промышленная робототехника (ДПО)",
      description: "Подготовка специалистов в области проектирования, программирования и обслуживания промышленных роботов",
      duration: "72 ч.",
      format: "Очно/Дистанционно",
      image: "/programms/robototech.png",
      price: "По запросу"
    },
    {
      id: 2,
      title: "Архитектор будущего: Нейросетевое искусство (ДПО)",
      description: "Подготовка креативных профессионалов для создания уникального контента с помощью нейросетей",
      duration: "48 ч.",
      format: "Очно/Дистанционно",
      image: "/programms/neural.jpg",
      price: "По запросу"
    }
  ]

  const [programs, setPrograms] = useState(mockPrograms)
  const [isLoading, setIsLoading] = useState(true)

  const { width } = useWindowSize()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchPopularPrograms = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/popular-programs')
        const data = await response.json()
        
        if (data.programs && data.programs.length > 0) {
          setPrograms(data.programs)
        } else {
          // Fallback to mock data if no programs from API
          setPrograms(mockPrograms)
        }
      } catch (error) {
        console.error('Error loading popular programs:', error)
        // Fallback to mock data on error
        setPrograms(mockPrograms)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPopularPrograms()
  }, [])

  // Prevent hydration mismatch: use default values for SSR
  const slidesToShow = isClient ? (width < 640 ? 1 : width < 768 ? 2 : width < 1024 ? 2 : 3) : 3
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
  const scrollThrottle = 300 // milliseconds - увеличена задержка

  // Handle wheel scroll for slider with throttle and horizontal detection
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    
    // Не обрабатывать события во время анимации
    if (isAnimating) {
      return
    }
    
    // Throttle scroll events
    if (now - lastScrollTime < scrollThrottle) {
      return
    }
    
    // Only respond to horizontal scroll or when horizontal component is stronger
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    const isShiftScroll = e.shiftKey && Math.abs(e.deltaY) > 0
    
    if (!isHorizontalScroll && !isShiftScroll) {
      return
    }
    
    e.preventDefault()
    setLastScrollTime(now)
    setIsAnimating(true)
    
    const scrollDirection = isShiftScroll ? e.deltaY : e.deltaX
    
    if (scrollDirection > 0) {
      // Scroll right/down - next slide
      paginate(1)
    } else {
      // Scroll left/up - previous slide
      paginate(-1)
    }
    
    // Сбросить флаг анимации через время анимации
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-white"
      id="programs"
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
            <Link href="/programs" className="block lg:hidden text-sm text-brand-text-light hover:text-blue-600 transition-colors">
              Посмотреть еще
            </Link>

          </motion.div>

          {/* Right Column: Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:row-span-2 relative h-[440px] sm:h-[420px] md:h-[400px] overflow-x-clip" // Clip horizontal overflow
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Keep content from being dragged out of page container
            onDragEnd={(event, info) => {
              if (isAnimating) return
              setIsAnimating(true)
              if (info.offset.x > dragThreshold) {
                paginate(-1) // Swiped right
              } else if (info.offset.x < -dragThreshold) {
                paginate(1) // Swiped left
              }
              setTimeout(() => setIsAnimating(false), 400)
            }}
            onWheel={handleWheel}
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
                className="absolute w-full h-full flex gap-4 sm:gap-6"
              >
                {currentPrograms.map((program, index) => (
                  <div key={program.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <ProgramCard
                      id={program.id}
                      title={program.title}
                      description={program.description}
                      duration={program.duration}
                      format={program.format}
                      price={program.price || "По запросу"}
                      image={program.image || "/placeholder.jpg"}
                      index={index}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="flex justify-between items-center self-end  text-sm">
            <Link  href="/programs" className="hidden lg:block text-sm text-brand-text-light hover:text-blue-600 transition-colors">
              Посмотреть еще
            </Link>
            <button
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                paginate(-1)
                setTimeout(() => setIsAnimating(false), 400)
              }}
              className="p-1 hover:text-brand-text-dark transition-colors"
              disabled={isAnimating}
              aria-label="Previous program"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span>
                {page + 1}/{totalPages}
              </span>
            <button
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                paginate(1)
                setTimeout(() => setIsAnimating(false), 400)
              }}
              className="p-1 hover:text-brand-text-dark transition-colors"
              disabled={isAnimating}
              aria-label="Next program"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
