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
}

// Мок данные для программ
const mockPrograms: Program[] = [
  {
    id: 1,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "16 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "additional"
  },
  {
    id: 2,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "16 ч.",
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
    duration: "16 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "masterclass"
  },
  {
    id: 5,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "16 ч.",
    format: "Дистанционно",
    price: "150 000 руб.",
    image: "/programms/robototech.png",
    category: "excursion"
  },
  {
    id: 6,
    title: "Название программы",
    description: "Краткое описание. Краткое описание. Краткое описание.",
    duration: "16 ч.",
    format: "Дистанционно",
    image: "/programms/robototech.png",
    category: "additional"
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const duration = searchParams.get('duration')
  const simulate_empty = searchParams.get('simulate_empty') === 'true'
  
  // Симуляция задержки API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Симуляция пустого ответа для тестирования
  if (simulate_empty) {
    return NextResponse.json({ programs: [], total: 0 })
  }
  
  let filteredPrograms = mockPrograms
  
  // Фильтрация по категории
  if (category && category !== 'all') {
    filteredPrograms = filteredPrograms.filter(program => program.category === category)
  }
  
  // Фильтрация по длительности
  if (duration) {
    filteredPrograms = filteredPrograms.filter(program => {
      if (duration === '16h') return program.duration.includes('16')
      if (duration === '36h') return program.duration.includes('36')
      return true
    })
  }
  
  return NextResponse.json({
    programs: filteredPrograms,
    total: filteredPrograms.length
  })
}

export async function POST(request: NextRequest) {
  // Здесь можно добавить логику для создания новой программы
  return NextResponse.json({ message: 'Method not implemented' }, { status: 501 })
}