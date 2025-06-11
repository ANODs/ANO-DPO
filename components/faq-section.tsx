"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "Какие документы необходимы для поступления на программы?",
      answer:
        "Для поступления необходимы: копия паспорта, копия диплома о высшем или среднем профессиональном образовании, заявление на обучение.",
    },
    {
      question: "Сколько длится обучение по программам повышения квалификации?",
      answer:
        "Продолжительность программ варьируется от 16 до 144 часов в зависимости от выбранного направления и глубины изучения материала.",
    },
    {
      question: "Выдается ли документ об образовании после завершения курса?",
      answer:
        "Да, по окончании обучения выдается удостоверение о повышении квалификации установленного образца или сертификат о прохождении программы.",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 bg-white"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-12 lg:text-center"
        >
          Часто задаваемые вопросы
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-2 lg:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 lg:px-6">
                <AccordionTrigger className="text-left font-semibold text-sm lg:text-base py-3 lg:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-sm lg:text-base pb-3 lg:pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  )
}
