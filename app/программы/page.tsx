"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Программы</h1>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Страница в разработке</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Содержимое этой страницы пока недоступно. Мы работаем над её наполнением.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
