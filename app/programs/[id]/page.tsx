"use client"

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Star, Clock } from 'lucide-react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProgramPage() {
  const [reviewsCurrentIndex, setReviewsCurrentIndex] = useState(0)
  const [programsCurrentIndex, setProgramsCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Mock data for the program
  const program = {
    id: 1,
    title: "Сварочные технологии",
    category: "Дополнительное профессиональное образование",
    description: "Образовательная программа по специальности «Сварочные технологии» ориентирована на подготовку специалистов в области современных сварочных технологий. Программа включает изучение различных методов сварки, контроля качества сварных соединений и современного сварочного оборудования.",
    duration: "144 ч / 18 дн",
    format: "Очно",
    level: "Профессиональная переподготовка",
    price: "25 000 ₽",
    image: "/placeholder.jpg",
    goals: [
      "Освоение современных сварочных технологий и методов контроля качества сварных соединений с учетом требований промышленной безопасности, экологии, экономики.",
      "Изучение принципов работы современного сварочного оборудования, технологии сварки различных материалов.",
      "Приобретение навыков по планированию сварочных работ и обеспечению качества сварных соединений."
    ],
    disciplines: [
      "Основы сварочного производства",
      "Материаловедение и технология конструкционных материалов",
      "Оборудование для сварки",
      "Технология сварочных работ",
      "Контроль качества сварных соединений",
      "Охрана труда при сварочных работах",
      "Экономика сварочного производства"
    ]
  }

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

  // Mock other programs data
  const otherPrograms = [
    {
      id: 2,
      title: "Робототехника и автоматизация",
      description: "Изучение современных робототехнических систем и методов автоматизации производства",
      duration: "72 ч",
      format: "Очно",
      price: "15 000 ₽",
      image: "/placeholder.jpg",
      badge: "Популярное"
    },
    {
      id: 3,
      title: "Цифровые технологии в производстве",
      description: "Освоение цифровых инструментов для оптимизации производственных процессов",
      duration: "108 ч",
      format: "Дистанционно",
      price: "20 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      title: "Контроль качества продукции",
      description: "Методы и средства контроля качества в современном производстве",
      duration: "144 ч",
      format: "Очно",
      price: "25 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      title: "Промышленная безопасность",
      description: "Обеспечение безопасности на промышленных предприятиях",
      duration: "72 ч",
      format: "Очно",
      price: "18 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      title: "Энергоэффективность",
      description: "Методы повышения энергоэффективности промышленных процессов",
      duration: "96 ч",
      format: "Смешанный",
      price: "22 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 7,
      title: "Экологический менеджмент",
      description: "Управление экологическими аспектами производственной деятельности",
      duration: "120 ч",
      format: "Дистанционно",
      price: "19 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 8,
      title: "Инновационные материалы",
      description: "Изучение свойств и применения современных конструкционных материалов",
      duration: "84 ч",
      format: "Очно",
      price: "16 000 ₽",
      image: "/placeholder.jpg"
    },
    {
      id: 9,
      title: "Метрология и стандартизация",
      description: "Основы метрологии, стандартизации и сертификации в промышленности",
      duration: "108 ч",
      format: "Смешанный",
      price: "21 000 ₽",
      image: "/placeholder.jpg"
    }
  ]

  // Slider settings
  const reviewsPerPage = 3
  const programsPerPage = 3
  const dragThreshold = 50

  // Calculate total pages
  const totalReviewsPages = Math.ceil(reviews.length / reviewsPerPage)
  const totalProgramsPages = Math.ceil(otherPrograms.length / programsPerPage)

  // Navigation functions
  const nextReviews = () => {
    setReviewsCurrentIndex((prev) => (prev + 1) % totalReviewsPages)
  }

  const prevReviews = () => {
    setReviewsCurrentIndex((prev) => (prev - 1 + totalReviewsPages) % totalReviewsPages)
  }

  const nextPrograms = () => {
    setProgramsCurrentIndex((prev) => (prev + 1) % totalProgramsPages)
  }

  const prevPrograms = () => {
    setProgramsCurrentIndex((prev) => (prev - 1 + totalProgramsPages) % totalProgramsPages)
  }

  // Drag handlers
  const handleReviewsDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevReviews()
    } else if (info.offset.x < -100) {
      nextReviews()
    }
  }

  const handleProgramsDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevPrograms()
    } else if (info.offset.x < -100) {
      nextPrograms()
    }
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
              background: 'linear-gradient(135deg, #D4D2F9 0%, #D4D2F9 50%, #F4FCBC 50%, #F4FCBC 100%)'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* Надзаголовок */}
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Программа Дополнительного Профессионального Образования
              </div>
              
              {/* Главный заголовок */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Сварочные технологии
              </h1>
              
              {/* Описание */}
              <p className="text-lg text-gray-700 leading-relaxed">
                Образовательная программа по специальности «Сварочные технологии» ориентирована на подготовку квалифицированных специалистов, владеющих теоретическими основами и практическими навыками сварки методом трения с перемешиванием.
              </p>
              
              {/* Info badges */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white border border-black rounded-lg px-4 py-3">
                  <div className="text-sm font-medium text-gray-700">Формат</div>
                  <div className="text-base font-semibold text-black">Дистанционно</div>
                </div>
                <div className="bg-white border border-black rounded-lg px-4 py-3">
                  <div className="text-sm font-medium text-gray-700">Продолжительность</div>
                  <div className="text-base font-semibold text-black">18 ч. / 36 ч.</div>
                </div>
                <div className="bg-white border border-black rounded-lg px-4 py-3">
                  <div className="text-sm font-medium text-gray-700">Компетенция</div>
                  <div className="text-base font-semibold text-black">Дизайн</div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Записаться на курс
                </button>
                <button className="bg-white text-black border border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Остались вопросы
                </button>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{
                borderRadius: '20px',
                transform: 'rotate(-2deg)'
              }}>
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Дети с робот-машинкой"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <li><strong>Формирование глубоких профессиональных компетенций</strong> в сфере ручной дуговой, полуавтоматической и автоматической сварки, пайки и наплавки материалов.</li>
                    <li><strong>Развитие умения выбирать</strong> оптимальные методы и оборудование для решения конкретных производственных задач.</li>
                    <li><strong>Подготовка специалистов,</strong> способных проводить диагностику дефектов, контроль качества сварочных соединений и обеспечивать безопасность производственного процесса.</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Ключевые дисциплины программы:</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1.5">●</span>
                      <span><strong>Физика и химия сварки:</strong> изучение свойств материалов, металлургии сварочного шва, особенностей протекания физико-химических процессов при сварке.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1.5">●</span>
                      <span><strong>Оборудование и технология сварки:</strong> освоение устройства и принципа работы различного сварочного оборудования, выбор режимов сварки, подготовка и выполнение сварочных операций.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1.5">●</span>
                      <span><strong>Контроль качества сварных швов:</strong> проведение неразрушающего контроля, дефектации сварочных соединений, использование приборов ультразвуковой и рентгеновской диагностики.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1.5">●</span>
                      <span><strong>Организация производства и управление качеством:</strong> основы организации сварочного производства, стандартизация, сертификация продукции, экологические требования и техника безопасности.</span>
                    </li>
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
                  <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы выпускников</h2>
          
          {/* Cards Container - 50% width centered */}
          <div className="w-1/2 mx-auto mb-8">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviewsCurrentIndex}
                  className="grid grid-cols-3 gap-6 cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleReviewsDrag}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="aspect-square bg-white rounded-lg relative p-6 shadow-md pointer-events-none flex flex-col justify-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
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
                      <p className="text-gray-600 mb-4 text-sm line-clamp-4">{review.text}</p>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.position}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevReviews}
              className="p-1 hover:text-gray-600 transition-colors"
              disabled={totalReviewsPages <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-medium">
              {reviewsCurrentIndex + 1}/{totalReviewsPages}
            </span>
            <button
              onClick={nextReviews}
              className="p-1 hover:text-gray-600 transition-colors"
              disabled={totalReviewsPages <= 1}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Other Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-12">Другие программы</h2>
          
          {/* Cards Grid */}
          <div className="relative overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={programsCurrentIndex}
                className="grid grid-cols-4 gap-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleProgramsDrag}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
              >
                {currentPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    className="border border-black rounded-lg overflow-hidden pointer-events-none"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Image */}
                    <div className="h-48 relative">
                      <Image
                        src={program.image || "/placeholder.jpg"}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-bold text-lg mb-2">{program.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">
                        {program.description}
                      </p>
                      
                      {/* Info labels */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>📍</span>
                          <span>{program.format}</span>
                        </div>
                      </div>
                      
                      {/* Button */}
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{program.price}</span>
                        <button className="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-colors pointer-events-auto">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center">
            <button className="font-bold text-lg hover:text-gray-600 transition-colors">
              Посмотреть ещё
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={prevPrograms}
                className="p-1 hover:text-gray-600 transition-colors"
                disabled={totalProgramsPages <= 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-lg font-medium">
                {programsCurrentIndex + 1}/{totalProgramsPages}
              </span>
              <button
                onClick={nextPrograms}
                className="p-1 hover:text-gray-600 transition-colors"
                disabled={totalProgramsPages <= 1}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}