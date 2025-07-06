"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function TestSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#F2FCBF] py-8 lg:py-16 mx-4 lg:mx-0 rounded-[26px] lg:rounded-none"
    >
      <div className="container mx-auto px-4">
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-10 lg:gap-8 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-3 lg:space-y-4"
          >
            <h2 className="text-[22px] sm:text-xl lg:text-4xl font-bold  leading-tight">
              Проверь себя и узнай уровень знаний
              <br />в интересующей программе
            </h2>
            <p className="lg:text-lg leading-relaxed">
              Ответь на 10 вопросов и получи результаты по своему уровню знаний.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Link href="/test" className="p-4 w-full h-11 lg:h-auto bg-[#1a1a1a] hover:bg-[#1a1a1b] text-white rounded-[10px]">
              Пройти тест
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
