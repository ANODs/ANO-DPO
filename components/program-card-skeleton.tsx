"use client"

import { motion } from "framer-motion"

interface ProgramCardSkeletonProps {
  index?: number
}

export default function ProgramCardSkeleton({ index = 0 }: ProgramCardSkeletonProps) {
  return (
    <motion.div
      className="w-[313px] h-[444px] bg-white rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '172px auto auto auto auto',
        rowGap: '12px',
        padding: '16px'
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {/* Строка 1: Изображение Skeleton */}
      <div 
        className="bg-gray-200 animate-pulse" 
        style={{ 
          borderTopLeftRadius: '16px', 
          borderTopRightRadius: '16px',
          height: '172px'
        }}
      ></div>
      
      {/* Строка 2: Заголовок Skeleton */}
      <div 
        className="bg-gray-200 rounded animate-pulse"
        style={{ height: '24px' }}
      ></div>
      
      {/* Строка 3: Описание Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
      
      {/* Строка 4: Мета-данные Skeleton */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '20px auto',
          gridTemplateRows: 'auto auto',
          columnGap: '8px',
          rowGap: '4px',
          alignItems: 'center'
        }}
      >
        {/* Иконка часов */}
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        {/* Время */}
        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
        {/* Пустая ячейка */}
        <div></div>
        {/* Формат */}
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Строка 5: Действие Skeleton */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div 
          className="bg-gray-200 animate-pulse"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%'
          }}
        ></div>
      </div>
    </motion.div>
  )
}