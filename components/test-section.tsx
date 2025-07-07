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
      className="mx-0 lg:mx-4"
    >
      <div className="container mx-auto px-0 bg-[#F2FCBF] py-8 lg:py-16 rounded-none lg:rounded-[26px]">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-6 lg:space-y-0 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-3 lg:space-y-4"
          >
            <h2 className="text-[22px] sm:text-xl lg:text-4xl font-bold leading-tight">
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
            className="flex-shrink-0"
          >
            <Link href="/test" className="inline-block px-8 lg:px-16 py-4 bg-[#1a1a1a] hover:bg-[#1a1a1b] text-white rounded-[10px] transition-colors">
              Пройти тест
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
