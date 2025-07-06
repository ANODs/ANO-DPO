"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, MapPin, ChevronRight } from "lucide-react"
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
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {/* Image */}
      <div className="h-48 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{format}</span>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="flex items-center justify-between">
          {price ? (
            <span className="font-bold text-lg">{price}</span>
          ) : (
            <div></div>
          )}
          
          <Link href={`/programs/${id}`}>
            <button className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
              <span className="font-medium">Подробнее</span>
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}