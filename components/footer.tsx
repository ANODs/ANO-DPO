"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#1A1A1A] text-white py-8 lg:py-12"
      id="footer"
    >
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Logo and Menu */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Image src="./logo.png" width={200} height={65} alt="logo"  />
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6"
          >
          <nav>
            <ul className="space-y-1 lg:space-y-2">
              <li>
                <Link
                  href="/programs"
                  className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block py-1"
                >
                  Программы обучения
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block py-1"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block py-1"
                >
                  Новости/Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors block py-1"
                >
                  Документы
                </Link>
              </li>
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
            <Link href='https://lms.anoacademy.ru' target="_blank" className="text-[16px] w-full px-5 py-4 lg:w-auto h-11 lg:h-[51px] bg-white hover:bg-gray-100 text-black rounded-xl flex justify-center items-center">
              Перейти в личный кабинет
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="pt-6 lg:pt-8 text-center text-xs lg:text-sm text-gray-400"
        >
          <div className="border-b border-[#FFFFFF80] pb-5 flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
            <Link href="/documents/29" target="_blank" className="hover:text-white transition-colors">
              Политика обработки персональных данных
            </Link>
            <Link href="/documents/30" target="_blank" className="hover:text-white transition-colors">
              Согласие на обработку персональных данных
            </Link>
            <Link href="/documents/28" target="_blank" className="hover:text-white transition-colors">
              Политика Cookies
            </Link>
            <Link href="/documents/31" target="_blank" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
          <p className="mt-3 lg:mt-4 text-left">© 2025 АНО ДПО</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
