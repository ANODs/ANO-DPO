"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ProgramCategories() {
  const categories = [
    {
      title: "Дополнительное образование",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-[#D4D2F9]",
    },
    {
      title: "Повышение квалификации",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      image: "./categories-visual-1.svg",
      bgColor: "bg-[#F5F5F5]",
    },
    {
      title: "Мастер классы",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      image: "./categories-visual-2.svg",
      programCount: "50+ программ",
      bgColor: "bg-[#F5F5F5]",

    },
    {
      title: "Экскурсии",
      description:
        "Система программ обучения, направленных на расширение, углубление и обновление профессиональных знаний, умений и навыков слушателей, независимо от их базового образования",
      programCount: "50+ программ",
      bgColor: "bg-[#F2FCBF]",

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
      <div className="container px-4">
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
              <Card className={`h-full ${category.bgColor} relative border-0 hover:shadow-lg transition-shadow duration-300`}>
                <CardHeader className="pb-3 lg:pb-6 relative z-10">
                  <CardTitle className={`text-lg lg:text-2xl `}>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className=" lg:space-y-6 relative z-10">
                  <p className={`text-xs lg:text-sm leading-relaxed mb-3`}>
                    {category.description}
                  </p>
                  <div className="">
                    <Badge className="bg-transparent text-black border-[1px] border-black rounded-[100px] lg:text-sm mb-6">
                      {category.programCount}
                    </Badge>
                    <div>
                      <Button variant="outline" className="w-full bg-[#1a1a1a] text-white h-11 lg:h-auto text-sm lg:text-base">
                        Посмотреть все программы
                      </Button>
                    </div>
                  </div>
                  {category.image && <Image className="!absolute -z-10" src={category.image} fill alt={'visual element'} />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
