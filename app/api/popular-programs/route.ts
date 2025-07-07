import { NextRequest, NextResponse } from 'next/server'

interface Program {
  id: number
  title: string
  description: string
  duration: string
  format: string
  price?: string
  image: string
  category: string
  isPopular?: boolean
}

// Мок данные для популярных программ
const mockPopularPrograms: Program[] = [
  {
    id: 1,
    title: "Промышленная робототехника (ДПО)",
    description: "Подготовка специалистов в области проектирования, программирования и обслуживания промышленных роботов.",
    duration: "72 ч.",
    format: "Очно/Дистанционно",
    image: "/programms/robototech.png",
    category: "additional",
    isPopular: true
  },
  {
    id: 2,
    title: "Архитектор будущего: Нейросетевое искусство (ДПО)",
    description: "Подготовка креативных профессионалов для создания художественных проектов с использованием нейросетей.",
    duration: "48 ч.",
    format: "Очно/Дистанционно",
    image: "/programms/neural.jpg",
    category: "additional",
    isPopular: true
  },
  {
    id: 3,
    title: "Цифровые технологии в образовании",
    description: "Современные подходы к использованию цифровых инструментов в образовательном процессе.",
    duration: "36 ч.",
    format: "Дистанционно",
    image: "/placeholder.jpg",
    category: "professional",
    isPopular: true
  },
  {
    id: 4,
    title: "Управление проектами в IT",
    description: "Методы и инструменты эффективного управления IT-проектами.",
    duration: "64 ч.",
    format: "Очно/Дистанционно",
    image: "/placeholder.jpg",
    category: "professional",
    isPopular: true
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '2') // Изменено с 10 на 2
  const simulate_empty = searchParams.get('simulate_empty') === 'true'
  
  // Симуляция задержки API
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Симуляция пустого ответа для тестирования
  if (simulate_empty) {
    return NextResponse.json({ programs: [], total: 0 })
  }
  
  // Возвращаем популярные программы с учетом лимита (по умолчанию 2)
  const limitedPrograms = mockPopularPrograms.slice(0, limit)
  
  return NextResponse.json({
    programs: limitedPrograms,
    total: limitedPrograms.length
  })
}

export async function POST(request: NextRequest) {
  // Здесь можно добавить логику для создания новой популярной программы
  return NextResponse.json({ message: 'Method not implemented' }, { status: 501 })
}