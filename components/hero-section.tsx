"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 lg:space-y-6 order-1"
          >
            {/*<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>*/}
            {/*  <Badge variant="secondary" className="mb-4 text-xs lg:text-sm">*/}
            {/*    Более 15 направлений обучения*/}
            {/*  </Badge>*/}
            {/*</motion.div>*/}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[28px] sm:text-3xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Академия
              <br />
              профессиональных наставников
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm lg:text-xl uppercase"
            >
              Автономная некоммерческая организация дополнительного профессионального образования
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:text-lg"
            >
              Ведущая образовательная платформа, готовящая высококвалифицированных специалистов для различных сфер деятельности.
            </motion.p>


          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 justify-self-center"
          >
              <Image
                src="/mobile-hero.png"
                alt="Выпускники в мантиях"
                width={280}
                height={365}
                className="object-cover xl:w-[520px] xl:h-[560px]"
              />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative order-3">
            <Link href='https://lms.anoacademy.ru'
              target="_blank"
              size="lg"
              className="text-white px-4 xy-2 w-full lg:w-auto bg-[#1A1A1A] hover:bg-[#1A1A1b]text-white h-12 lg:h-[51px] rounded-lg "
            >
              Перейти в личный кабинет
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
