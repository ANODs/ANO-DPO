"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConsentPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Согласие на обработку персональных данных</h1>
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
