"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const menuItems = ["Программы обучения", "О нас", "Новости/Блог", "Документы"]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-8 lg:py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Logo and Menu */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6"
          >
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-6 lg:h-8 w-6 lg:w-8 text-blue-400" />
              <span className="font-bold text-base lg:text-lg">АПН</span>
            </div>
            <nav>
              <ul className="space-y-1 lg:space-y-2">
                {menuItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-").replace("/", "-")}`}
                      className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block py-1"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-2 lg:space-y-4"
          >
            <div>
              <p className="text-base lg:text-lg font-semibold">+7 (999) 999 99-99</p>
              <p className="text-sm lg:text-base text-gray-300">ano_dpo_apn@bk.ru</p>
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-start lg:justify-end"
          >
            <Button className="w-full lg:w-auto h-11 lg:h-auto bg-blue-600 hover:bg-blue-700 text-white">
              Перейти в личный кабинет
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6 lg:pt-8 text-center text-xs lg:text-sm text-gray-400"
        >
          <div className="flex flex-col space-y-2 lg:flex-row lg:justify-center lg:items-center lg:space-y-0 lg:space-x-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Политика обработки персональных данных
            </Link>
            <Link href="/consent" className="hover:text-white transition-colors">
              Согласие на обработку персональных данных
            </Link>
          </div>
          <p className="mt-3 lg:mt-4">© 2025 АНО ДПО</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
