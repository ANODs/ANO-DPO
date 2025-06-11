"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 lg:py-16 mx-4 lg:mx-0 rounded-lg lg:rounded-none bg-[#D4D2F9]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative h-32 w-32 lg:h-48 lg:w-48">
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Шапочка и свиток"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 lg:space-y-6  order-1 lg:order-2"
          >
            <h2 className="text-lg sm:text-xl lg:text-4xl font-bold">Остались вопросы?</h2>
            <p className="text-sm lg:text-lg  leading-relaxed">
              Мы будем рады ответить Вам на все интересующие вопросы и проконсультировать по нашим программам.
            </p>
            <Button className="w-full lg:w-auto h-11 lg:h-auto bg-[#1a1a1a] text-white hover:bg-gray-100">
              Оставить заявку
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
