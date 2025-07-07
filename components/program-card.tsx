"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProgramCardProps {
  id: number
  title: string
  description: string
  duration: string
  format: string
  price?: string
  image: string
  index?: number
}

export default function ProgramCard({
  id,
  title,
  description,
  duration,
  format,
  price,
  image,
  index = 0
}: ProgramCardProps) {
  return (
    <motion.div
      className="w-[313px] h-[444px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative grid grid-rows-[172px_auto_auto_auto_1fr] gap-3 p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {/* 1. Изображение */}
      <div className="relative rounded-md overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* 2. Заголовок */}
      <Link href={`/programs/${id}`} className="no-underline">
        <h3 className="text-xl font-bold text-gray-900 leading-tight m-0 hover:text-gray-700 transition-colors cursor-pointer">
          {title}
        </h3>
      </Link>

      {/* 3. Описание с line-clamp */}
      <p className="text-gray-600 text-base leading-[1.4] line-clamp-2 overflow-hidden break-words m-0">
        {description}
      </p>

      {/* 4. Мета-данные: время + формат */}
      <div className="flex flex-col text-gray-500 text-sm gap-y-1">
        {/* первая строка: иконка + время */}
        <div className="flex items-center gap-x-2">
          <Clock size={16} className="text-gray-400" />
          <span className="font-medium text-gray-700">
            {duration}
          </span>
        </div>
        {/* вторая строка: формат */}
        <div>
          <span>
            {format}
          </span>
        </div>
      </div>

      {/* 5. Ссылка «Подробнее» */}
      <Link
        href={`/programs/${id}`}
        className="absolute bottom-4 left-4 right-4 no-underline"
      >
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">
            Подробнее
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <ChevronRight size={16} className="text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
