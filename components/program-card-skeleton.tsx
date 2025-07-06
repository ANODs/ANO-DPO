"use client"

import { motion } from "framer-motion"

interface ProgramCardSkeletonProps {
  index?: number
}

export default function ProgramCardSkeleton({ index = 0 }: ProgramCardSkeletonProps) {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* Info Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Bottom Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}