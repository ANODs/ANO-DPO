"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import ExpertsSection from "@/components/experts-section";
import TestimonialsSection from "@/components/testimonials-section";
import PartnersSection from "@/components/partners-section";

const fullText = [
  "Мы формируем новое поколение педагогов-наставников, обладающих глубокими знаниями и практическими умениями в области подготовки профессионалов высочайшего уровня.",
  "Наша деятельность направлена на подготовку экспертов и наставников, обеспечивающих развитие конкурентоспособных кадров во всех сферах экономики, науки и культуры. Мы активно участвуем в подготовке талантливых молодых специалистов, готовых представлять страну на международных конкурсах профессионального мастерства, включая компетенции военно-учётных специальностей.",
  "Мы гордимся тем, что наши выпускники становятся ведущими педагогами, экспертами и наставниками, способствующими росту качества отечественного образования и укреплению национальной безопасности. Благодаря нашим программам молодые специалисты получают возможность проявить себя в профессиональном мастерстве и стать примером успешного развития для будущих поколений.",
  "Приглашаем вас присоединиться к нашей команде и внести свой вклад в формирование будущего образования.",
]

const advantages = [
  "Более 15 программ обучения",
  "Подготовка к международным конкурсам профессионального мастерства",
  "Наличие 16+ государственных партнеров"
]

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-white ">
      <motion.div initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full flex flex-wrap md:flex-nowrap justify-center items-center md:bg-[#F5F5F5] py-[30px] md:py-[50px]  px-5 md:px-[308px]">
        <div className="flex flex-col w-[640px]">
          <h2 className="text-[28px] md:text-[50px] font-semibold leading-[100%] mb-3">Академия профессиональных наставников</h2>
          <p className="text-[12px] mb-6 md:mb-0 md:text-base uppercase">Автономная некоммерческая организация дополнительного профессионального образования</p></div>
          <Image className="mb-8 md:mb-0" src="/logolarge.png" width={650} height={262} alt="Logo" />
        <div className="px-4 mb-4">
          <Link href='https://lms.anoacademy.ru' target="_blank" className="text-[16px] text-nowrap md:hidden px-5 py-4 w-full h-12 bg-black text-white hover:bg-gray-800 rounded-lg">
            Перейти в личный кабинет
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="container mx-auto px-4 mt-[50px] md:mt-[100px]">
        <Card className="bg-[#D4D2F9] mb-[50px] md:mb-[100px]">
          <CardHeader>
            <CardTitle className="text-center">
              Наша миссия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="w-full md:max-w-[630px] m-auto text-center text-base md:text-[18px]">“Наша миссия заключается в <span className="font-bold">развитии человеческого капитала</span> страны <span className="font-bold">путем
              внедрения передовых образовательных технологий</span> и стандартов.”</p>
          </CardContent>
        </Card>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-8 lg:py-16 bg-white"
          id="about"
        >
          <div className="container mx-auto px-4">
            <div className="mb-[100px]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-4 lg:space-y-6 text-gray-700 leading-relaxed"
              >
                {/* Mobile: Show truncated text initially */}
                <div className="lg:hidden">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12"
                  >
                    О нас
                  </motion.h2>

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
                  <div>
                    <Image src="/caplarge.png" width={530} height={476} alt="student cap" />
                  </div>
                </div>

                {/* Desktop: Show full text */}
                <div className="hidden lg:flex items-center gap-[21px] ">
                  <div className="space-y-6">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12"
                    >
                      О нас
                    </motion.h2>
                  {fullText.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                    <div className="mt-4">
                      <Link href='https://lms.anoacademy.ru' target="_blank" className=" text-[16px] text-nowrap  px-5 py-4 w-full h-12 bg-black text-white hover:bg-gray-800 rounded-lg">
                        Присоединиться
                      </Link>
                    </div>
                  </div>
                  <Image src="/caplarge.png" width={530} height={476} alt="student cap" />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {advantages.map((paragraph, index) => (
                <Card key={index} className={`${index % 2 === 0 ? "bg-[#D4D2F9]" : "bg-[#F2FCBF]"} w-[420px] flex items-center justify-center`}>
                  <CardHeader className="">
                    <CardTitle className="text-center text-[18px]">{paragraph}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        <ExpertsSection />
        <TestimonialsSection />
        <PartnersSection />

      </motion.div>
    </div>
  )
}
