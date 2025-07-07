"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const fullText = [
  "Мы формируем новое поколение педагогов-наставников, обладающих глубокими знаниями и практическими умениями в области подготовки профессионалов высочайшего уровня.",
  "Наша деятельность направлена на подготовку экспертов и наставников, обеспечивающих развитие конкурентоспособных кадров во всех сферах экономики, науки и культуры. Мы активно участвуем в подготовке талантливых молодых специалистов, готовых представлять страну на международных конкурсах профессионального мастерства, включая компетенции военно-учётных специальностей.",
  "Мы гордимся тем, что наши выпускники становятся ведущими педагогами, экспертами и наставниками, способствующими росту качества отечественного образования и укреплению национальной безопасности. Благодаря нашим программам молодые специалисты получают возможность проявить себя в профессиональном мастерстве и стать примером успешного развития для будущих поколений.",
  "Приглашаем вас присоединиться к нашей команде и внести свой вклад в формирование будущего образования.",
]

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)



  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:pt-0 lg:pb-24 bg-white"
      id="about"
    >
      <div className="container mx-auto px-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12"
        >
          О нас
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4 lg:space-y-6 text-gray-700 leading-relaxed"
          >
            {/* Mobile: Show truncated text initially */}
            <div className="lg:hidden">
              <div className={`space-y-4 text-sm leading-relaxed ${!isExpanded ? "line-clamp-4" : ""}`}>
                {isExpanded ? fullText.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>{fullText[0]}</p>}
              </div>

              <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 text-black underline text-sm mt-2"
              >
                {isExpanded ? "Свернуть" : "Раскрыть"}
              </Button>

              {isExpanded && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <Card className="bg-purple-50 border-0">
                    <CardContent className="p-4">
                      <blockquote className="text-sm font-medium text-purple-900 italic leading-relaxed">
                      Наша миссия заключается в развитии человеческого капитала страны путем внедрения передовых образовательных технологий 
                      и стандартов.
                      </blockquote>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Desktop: Show full text */}
            <div className="hidden lg:block space-y-6">
              {fullText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 hidden lg:block relative w-full"
          >
            <Card className="bg-[#D4D2F9] border-0 absolute z-10 mx-5 mt-10">
              <CardContent className="p-6">
                <blockquote className="text-lg font-medium text-blue-900 italic leading-relaxed pr-40">
                Наша миссия заключается в развитии человеческого капитала страны путем внедрения передовых образовательных технологий 
                и стандартов.
                </blockquote>
              </CardContent>
            </Card>

            <div className="absolute w-full !h-[400px] rounded-lg overflow-hidden ">
                <Image
                  src="/aboutbg.png"
                  alt="задний план"
                  fill
                  className="object-cover"
                />
                <Image
                  src="/aboutman.png"
                  alt="Портрет эксперта"
                  fill
                  className="object-cover z-10"
                />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
