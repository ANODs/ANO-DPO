"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProgramCategories() {
  const categories = [
    {
      title: "Дополнительное образование",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
    },
    {
      title: "Повышение квалификации",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
    },
    {
      title: "Мастер классы",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-white",
      textColor: "text-gray-900",
    },
    {
      title: "Экскурсии",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12 lg:text-center"
        >
          Выберите программу по направлению
          <br className="hidden lg:block" />
          подготовки
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${category.bgColor} border-0 hover:shadow-lg transition-shadow duration-300`}>
                <CardHeader className="pb-3 lg:pb-6">
                  <CardTitle className={`text-lg lg:text-2xl ${category.textColor}`}>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <p className={`text-xs lg:text-sm leading-relaxed ${category.textColor.replace("900", "700")}`}>
                    {category.description}
                  </p>
                  <div className="space-y-2 lg:space-y-3">
                    <Badge variant="secondary" className="text-xs lg:text-sm">
                      {category.programCount}
                    </Badge>
                    <div>
                      <Button variant="outline" className="w-full h-11 lg:h-auto text-sm lg:text-base">
                        Посмотреть все программы
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
