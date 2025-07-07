"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import ProgramCard from "@/components/program-card"
import ProgramCardSkeleton from "@/components/program-card-skeleton"

interface Program {
  id: number
  title: string
  description: string
  duration: string
  format: string
  price?: string
  image: string
  category: string
}

const mockPrograms: Program[] = [
  {
    id: 1,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "additional"
  },
  {
    id: 2,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 ч.",
    format: "Дистанционно",
    price: "150 000 руб.",
    image: "/programms/robototech.png",
    category: "additional"
  },
  {
    id: 3,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 часов",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "qualification"
  },
  {
    id: 4,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "masterclass"
  },
  {
    id: 5,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 ч.",
    format: "Дистанционно",
    price: "150 000 руб.",
    image: "/programms/robototech.png",
    category: "excursion"
  },
  {
    id: 6,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "36 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "additional"
  }
]

const categories = [
  { id: "additional", label: "Дополнительное образование" },
  { id: "qualification", label: "Повышение квалификации" },
  { id: "masterclass", label: "Мастер классы" },
  { id: "excursion", label: "Экскурсии" }
]

const filterOptions = [
  { id: "16h", label: "36 часов" },
  { id: "36h", label: "36 часов" }
]

export default function ProgramsList() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category') || 'additional'
  
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка программ с API
  const fetchPrograms = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        category: activeCategory,
        ...(selectedFilters.length > 0 && { duration: selectedFilters.join(',') })
      })
      
      const response = await fetch(`/api/programs?${params}`)
      const data = await response.json()
      
      if (data.programs && data.programs.length > 0) {
        setPrograms(data.programs)
      } else {
        // Если программы не найдены и нет активных фильтров, используем мок данные
        if (selectedFilters.length === 0) {
          setPrograms(mockPrograms.filter(program => program.category === activeCategory))
        } else {
          // Если есть активные фильтры и ничего не найдено, показываем пустой список
          setPrograms([])
        }
      }
    } catch (err) {
      setError('Ошибка загрузки программ')
      // В случае ошибки используем мок данные только если нет активных фильтров
      if (selectedFilters.length === 0) {
        setPrograms(mockPrograms.filter(program => program.category === activeCategory))
      } else {
        setPrograms([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [activeCategory, selectedFilters])

  // Обновляем активную категорию при изменении URL параметров
  useEffect(() => {
    // Всегда устанавливаем категорию "Дополнительное образование"
    const fixedCategory = 'additional'
    if (fixedCategory !== activeCategory) {
      setActiveCategory(fixedCategory)
      setSelectedFilters([]) // Сбрасываем фильтры при смене категории через URL
    }
  }, [searchParams])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setSelectedFilters([]) // Сбрасываем фильтры при смене категории
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="pt-8 bg-white">
        <div className="container mx-auto px-0 sm:px-6 lg:px-0">
          <motion.h1 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Программы обучения
          </motion.h1>
          
          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => category.id === 'additional' ? handleCategoryChange(category.id) : null}
                disabled={category.id !== 'additional'}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-black text-white"
                    : category.id === 'additional'
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="">
        <div className="container mx-auto px-0 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-6">Поиск по программам</h3>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Выбраны программы</h4>
                  
                  {filterOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option.id)}
                        onChange={() => toggleFilter(option.id)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="hidden">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium"
              >
                Поиск по программам
              </button>
              
              {isMobileFilterOpen && (
                <motion.div 
                  className="mt-4 bg-gray-50 rounded-lg p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="font-medium text-gray-900 mb-4">Выбраны программы</h4>
                  
                  {filterOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer mb-3">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option.id)}
                        onChange={() => toggleFilter(option.id)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Programs Grid */}
            <div className="lg:col-span-3">
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {isLoading ? (
                  // Показываем скелетоны во время загрузки
                  Array.from({ length: 6 }).map((_, index) => (
                    <ProgramCardSkeleton key={index} index={index} />
                  ))
                ) : (
                  // Показываем программы
                  programs.map((program, index) => (
                    <ProgramCard
                      key={program.id}
                      id={program.id}
                      title={program.title}
                      description={program.description}
                      duration={program.duration}
                      format={program.format}
                      price={program.price}
                      image={program.image}
                      index={index}
                    />
                  ))
                )}
              </motion.div>
              
              {!isLoading && programs.length === 0 && (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {selectedFilters.length > 0 ? 'Курсы не найдены' : 'Программы не найдены'}
                    </h3>
                    <p className="text-gray-500">
                      {selectedFilters.length > 0 
                        ? 'Попробуйте изменить параметры поиска или сбросить фильтры'
                        : 'В данной категории пока нет доступных программ'
                      }
                    </p>
                    {selectedFilters.length > 0 && (
                      <button
                        onClick={() => setSelectedFilters([])}
                        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Сбросить фильтры
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-500 text-lg">{error}</p>
                  <button 
                    onClick={fetchPrograms}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Попробовать снова
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}