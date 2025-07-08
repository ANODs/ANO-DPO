"use client"

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, ArrowLeft, Play, Users, Calendar, MapPin, Award, Target, BookOpen, Lightbulb, TrendingUp, CheckCircle, Star, Quote, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useWindowSize } from '@/hooks/use-window-size'
import { useCallbackForm } from '@/contexts/callback-form-context'
import ProgramCard from '@/components/program-card'

export default function ProgramPage() {
  const params = useParams()
  const programId = params.id as string
  const [reviewsCurrentIndex, setReviewsCurrentIndex] = useState(0)
  const [programsCurrentIndex, setProgramsCurrentIndex] = useState(0)
  const [reviewsDirection, setReviewsDirection] = useState(1)
  const [programsDirection, setProgramsDirection] = useState(1)
  const [isClient, setIsClient] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { width } = useWindowSize()
  const { openForm } = useCallbackForm()

  // Programs data
  const programs = {
    "1": {
      id: 1,
      title: "Промышленная робототехника (ДПО)",
      category: "Дополнительное профессиональное образование",
      description: "Образовательная программа по промышленной робототехнике направлена на подготовку специалистов, обладающих глубокими знаниями и практическими навыками в области проектирования, программирования, эксплуатации и обслуживания промышленных роботов и автоматизированных производственных линий.",
      duration: "36 ч",
      format: "Дистанционно",
      level: "Дополнительно профессиональное образование",
      price: "По запросу",
      image: "/programms/robototech.png",
      goals: [
        "Освоение принципов функционирования различных типов промышленных роботов, датчиков и исполнительных механизмов.",
        "Изучение методов автоматизации технологических процессов, включая разработку алгоритмов управления оборудованием.",
        "Овладение языками программирования и специализированными средами разработки для управления промышленными роботами.",
        "Получение навыков диагностики неисправностей, ремонта и технического обслуживания роботизированных комплексов."
      ],
      disciplines: [
        "Основы робототехники",
        "Автоматизация производства",
        "Программирование роботов",
        "Диагностика и техническое обслуживание",
        "Безопасность труда при работе с промышленными роботами",
        "Системы автоматизации",
        "Проектирование роботизированных комплексов"
      ]
    },
    "2": {
      id: 2,
      title: "Архитектор будущего: Нейросетевое искусство (ДПО)",
      category: "Дополнительное профессиональное образование",
      description: "Инновационная образовательная программа, объединяющая искусство и технологии искусственного интеллекта. Участники изучают создание цифрового искусства с помощью нейронных сетей, генеративных алгоритмов и современных AI-инструментов, развивая навыки в области компьютерной графики, дизайна и программирования.",
      duration: "36 ч",
      format: "Дистанционно",
      level: "Дополнительно профессиональное образование",
      price: "По запросу",
      image: "/programms/neural.jpg",
      goals: [
        "Освоение принципов работы генеративных нейронных сетей и их применения в создании визуального искусства.",
        "Изучение современных AI-инструментов для создания изображений, анимации и интерактивных инсталляций.",
        "Развитие навыков программирования на Python для работы с библиотеками машинного обучения в области компьютерного зрения.",
        "Формирование понимания этических аспектов использования ИИ в творческой деятельности и авторских правах."
      ],
      disciplines: [
        "Основы машинного обучения и нейронных сетей",
        "Генеративные модели (GAN, VAE, Diffusion)",
        "Программирование на Python для AI-арта",
        "Работа с AI-инструментами (Midjourney, DALL-E, Stable Diffusion)",
        "Компьютерная графика и цифровое искусство",
        "Этика ИИ в творчестве",
        "Создание интерактивных инсталляций"
      ]
    }
  }

  const program = programs[programId as keyof typeof programs] || programs["1"]

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Александр Петров",
      position: "Сварщик 6 разряда",
      text: "Отличная программа! Получил актуальные знания по современным технологиям сварки. Преподаватели - настоящие профессионалы своего дела.",
      rating: 5
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      position: "Мастер участка",
      text: "Программа помогла систематизировать знания и изучить новые методы контроля качества. Рекомендую всем специалистам в области сварки.",
      rating: 5
    },
    {
      id: 3,
      name: "Дмитрий Козлов",
      position: "Инженер-технолог",
      text: "Качественное обучение с практической направленностью. Полученные знания сразу применил в работе.",
      rating: 4
    },
    {
      id: 4,
      name: "Елена Васильева",
      position: "Контролер ОТК",
      text: "Программа дала глубокие знания в области контроля качества сварных соединений. Особенно понравились практические занятия.",
      rating: 5
    },
    {
      id: 5,
      name: "Игорь Смирнов",
      position: "Начальник цеха",
      text: "Отличная подготовка специалистов. После обучения наши сотрудники значительно повысили качество работы.",
      rating: 5
    },
    {
      id: 6,
      name: "Андрей Николаев",
      position: "Сварщик-аргонщик",
      text: "Современные методы обучения, актуальная программа. Рекомендую всем, кто хочет развиваться в профессии.",
      rating: 4
    },
    {
      id: 7,
      name: "Сергей Морозов",
      position: "Технолог",
      text: "Программа охватывает все аспекты сварочного производства. Получил ценные знания для работы.",
      rating: 5
    },
    {
      id: 8,
      name: "Владимир Кузнецов",
      position: "Мастер производственного обучения",
      text: "Качественная программа с хорошей практической базой. Студенты получают реальные навыки.",
      rating: 4
    }
  ]

  // State for other programs
  const [otherPrograms, setOtherPrograms] = useState<any[]>([])
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true)

  // Load other programs from API
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchOtherPrograms = async () => {
      setIsLoadingPrograms(true)
      try {
        const response = await fetch('/api/programs?category=additional')
        const data = await response.json()
        
        if (data.programs && data.programs.length > 0) {
          // Filter out current program
          const filteredPrograms = data.programs.filter((p: any) => p.id.toString() !== programId)
          setOtherPrograms(filteredPrograms)
        } else {
          // Fallback to mock data if no programs from API
          const mockPrograms = Object.values(programs).filter((p: any) => p.id.toString() !== programId)
          setOtherPrograms(mockPrograms)
        }
      } catch (error) {
        console.error('Error loading programs:', error)
        // Fallback to mock data on error
        const mockPrograms = Object.values(programs).filter((p: any) => p.id.toString() !== programId)
        setOtherPrograms(mockPrograms)
      } finally {
        setIsLoadingPrograms(false)
      }
    }

    fetchOtherPrograms()
  }, [programId])

  // Slider settings with responsive design
  const reviewsPerPage = isClient ? (width < 640 ? 1 : width < 768 ? 2 : 3) : 3
  const programsPerPage = isClient ? (width < 640 ? 1 : width < 768 ? 2 : width < 1024 ? 2 : width < 1280 ? 3 : 4) : 4
  const dragThreshold = 50
  const scrollThrottle = 300

  // Calculate total pages
  const totalReviewsPages = Math.ceil(reviews.length / reviewsPerPage)
  const totalProgramsPages = Math.ceil(otherPrograms.length / programsPerPage)

  // Navigation functions with animation control
  const paginateReviews = (newDirection: number) => {
    setReviewsDirection(newDirection)
    setReviewsCurrentIndex((prevPage) => (prevPage + newDirection + totalReviewsPages) % totalReviewsPages)
  }

  const paginatePrograms = (newDirection: number) => {
    setProgramsDirection(newDirection)
    setProgramsCurrentIndex((prevPage) => (prevPage + newDirection + totalProgramsPages) % totalProgramsPages)
  }

  const nextReviews = () => {
    if (isAnimating) return
    setIsAnimating(true)
    paginateReviews(1)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const prevReviews = () => {
    if (isAnimating) return
    setIsAnimating(true)
    paginateReviews(-1)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const nextPrograms = () => {
    if (isAnimating) return
    setIsAnimating(true)
    paginatePrograms(1)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const prevPrograms = () => {
    if (isAnimating) return
    setIsAnimating(true)
    paginatePrograms(-1)
    setTimeout(() => setIsAnimating(false), 400)
  }

  // Drag handlers with animation control
  const handleReviewsDrag = (event: any, info: PanInfo) => {
    if (isAnimating) return
    setIsAnimating(true)
    if (info.offset.x > dragThreshold) {
      paginateReviews(-1) // Swiped right
    } else if (info.offset.x < -dragThreshold) {
      paginateReviews(1) // Swiped left
    }
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleProgramsDrag = (event: any, info: PanInfo) => {
    if (isAnimating) return
    setIsAnimating(true)
    if (info.offset.x > dragThreshold) {
      paginatePrograms(-1) // Swiped right
    } else if (info.offset.x < -dragThreshold) {
      paginatePrograms(1) // Swiped left
    }
    setTimeout(() => setIsAnimating(false), 400)
  }

  // Handle wheel scroll for sliders with throttle and horizontal detection
  const handleReviewsWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    
    if (isAnimating) {
      return
    }
    
    if (now - lastScrollTime < scrollThrottle) {
      return
    }
    
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
      paginateReviews(1)
    } else {
      paginateReviews(-1)
    }
    
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleProgramsWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    
    if (isAnimating) {
      return
    }
    
    if (now - lastScrollTime < scrollThrottle) {
      return
    }
    
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
      paginatePrograms(1)
    } else {
      paginatePrograms(-1)
    }
    
    setTimeout(() => setIsAnimating(false), 400)
  }

  // Get current items
  const currentReviews = reviews.slice(
    reviewsCurrentIndex * reviewsPerPage,
    (reviewsCurrentIndex + 1) * reviewsPerPage
  )

  const currentPrograms = otherPrograms.slice(
    programsCurrentIndex * programsPerPage,
    (programsCurrentIndex + 1) * programsPerPage
  )



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hard gradient background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(153deg, #D4D2F9 0%, #D4D2F9 50%, #F4FCBC 50%, #F4FCBC 100%)'
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-0 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* Надзаголовок */}
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {program.category}
              </div>
              
              {/* Главный заголовок */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight" style={{fontSize: '50px'}}>
                {program.title}
              </h1>
              
              {/* Описание */}
              <p className="text-lg text-gray-700 leading-relaxed">
                {program.description}
              </p>
              
              {/* Info badges */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white border border-black rounded-lg px-4 py-3">
                  <div className="text-sm font-medium text-gray-700">Формат</div>
                  <div className="text-base font-semibold text-black">{program.format}</div>
                </div>
                <div className="bg-white border border-black rounded-lg px-4 py-3">
                  <div className="text-sm font-medium text-gray-700">Продолжительность</div>
                  <div className="text-base font-semibold text-black">{program.duration}</div>
                </div>
              
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={openForm}
                  className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Записаться на курс
                </button>
                <button 
                  onClick={openForm}
                  className="bg-white text-black border border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Остались вопросы
                </button>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border-[1px] max-w-[400px] max-h-[400px] w-[400px] h-[400px]">
                <Image 
                  src={program.image} 
                  alt={program.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - 3/4 width */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
                <div className="h-px bg-gray-300 mb-8"></div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Основные цели программы:</h3>
                  <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                    {program.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Ключевые дисциплины программы:</h3>
                  <ul className="space-y-4 text-gray-700">
                    {program.disciplines.map((discipline, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 mt-1.5">●</span>
                        <span>{discipline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Bottom CTA Row */}
              <div className="pt-8">
                <button className="group w-full flex items-center justify-between cursor-pointer hover:text-gray-700 transition-colors">
                  <span className="text-lg font-bold text-black">Изучить программу</span>
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                </button>
                <div className="h-px bg-gray-300 w-full mt-2"></div>
              </div>
            </div>
            
            {/* Sidebar - 1/4 width */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <button 
                    onClick={openForm}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Записаться на курс
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-0">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы выпускников</h2>
          
          {/* Cards Container - responsive width with fixed height */}
          <div className="w-full sm:w-3/4 mx-auto mb-8">
            <div className="relative h-[400px] overflow-x-clip"
                 onWheel={handleReviewsWheel}
            >
              <AnimatePresence initial={false} custom={reviewsDirection}>
                <motion.div
                  key={reviewsCurrentIndex}
                  custom={reviewsDirection}
                  className="absolute w-full h-full grid gap-x-4 sm:gap-x-6 cursor-grab active:cursor-grabbing"
                  style={{ gridTemplateColumns: `repeat(${reviewsPerPage}, minmax(0, 1fr))` }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleReviewsDrag}
                  initial={{
                    x: reviewsDirection > 0 ? "100%" : "-100%",
                    opacity: 0,
                  }}
                  animate={{
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    zIndex: 0,
                    x: reviewsDirection < 0 ? "100%" : "-100%",
                    opacity: 0,
                  }}
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                >
                  {currentReviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="aspect-square bg-white rounded-lg relative p-6 shadow-md pointer-events-none flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-6">{review.text}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.position}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                prevReviews()
                setTimeout(() => setIsAnimating(false), 400)
              }}
              className="p-1 hover:text-gray-600 transition-colors"
              disabled={totalReviewsPages <= 1 || isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-medium">
              {reviewsCurrentIndex + 1}/{totalReviewsPages}
            </span>
            <button
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                nextReviews()
                setTimeout(() => setIsAnimating(false), 400)
              }}
              className="p-1 hover:text-gray-600 transition-colors"
              disabled={totalReviewsPages <= 1 || isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Other Programs Section */}
      <section className="py-16 pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-0">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-12">Другие программы</h2>
          
          {/* Loading State */}
          {isLoadingPrograms ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : otherPrograms.length > 0 ? (
            <>
              {/* Cards Grid */}
              <div className="relative overflow-hidden mb-8">
                <AnimatePresence initial={false} custom={programsDirection}>
                  <motion.div
                    key={programsCurrentIndex}
                    custom={programsDirection}
                    className="cursor-grab active:cursor-grabbing overflow-x-clip"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleProgramsDrag}
                    onWheel={handleProgramsWheel}
                    initial={{
                      x: programsDirection > 0 ? "100%" : "-100%",
                      opacity: 0,
                    }}
                    animate={{
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      zIndex: 0,
                      x: programsDirection < 0 ? "100%" : "-100%",
                      opacity: 0,
                    }}
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  >
                    <div className="flex gap-8 justify-start">
                    {currentPrograms.map((program, index) => (
                      <ProgramCard
                        key={program.id}
                        id={program.id}
                        title={program.title}
                        description={program.description}
                        duration={program.duration}
                        format={program.format}
                        price={program.price || "По запросу"}
                        image={program.image || "/placeholder.jpg"}
                        index={index}
                      />
                    ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Bottom navigation */}
              <div className="flex justify-between items-center">
                <Link href="/programs" className="font-bold text-lg hover:text-gray-600 transition-colors">
                  Посмотреть ещё
                </Link>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevPrograms}
                    className="p-1 hover:text-gray-600 transition-colors"
                    disabled={totalProgramsPages <= 1 || isAnimating}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-lg font-medium">
                    {programsCurrentIndex + 1}/{totalProgramsPages}
                  </span>
                  <button
                    onClick={nextPrograms}
                    className="p-1 hover:text-gray-600 transition-colors"
                    disabled={totalProgramsPages <= 1 || isAnimating}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Другие программы не найдены</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}