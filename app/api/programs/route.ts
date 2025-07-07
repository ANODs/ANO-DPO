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
    title: "Промышленная робототехника (ДПО)",
    description: "Подготовка специалистов в области проектирования, программирования и обслуживания промышленных роботов.",
    duration: "72 ч.",
    format: "Очно/Дистанционно",
    image: "/programms/robototech.png",
    category: "additional"
  },
  {
    id: 2,
    title: "Архитектор будущего: Нейросетевое искусство (ДПО)",
    description: "Подготовка креативных профессионалов для создания художественных проектов с использованием нейросетей.",
    duration: "48 ч.",
    format: "Очно/Дистанционно",
    image: "/programms/neural.jpg",
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