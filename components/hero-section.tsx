"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 lg:py-24">
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <Image
          src="/heroLeft.png"
          alt=""
          width={1120}
          height={200}
          className="absolute top-[90px] left-0 max-w-[1120px] max-h-[300px] object-cover"
        />
        <Image
          src="/heroRight.png"
          alt=""
          width={410}
          height={150}
          className="absolute top-0 right-0 w-[410px] h-[150px] object-cover"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-0 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 lg:space-y-6 order-1 lg:order-1 flex flex-col"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge variant="secondary" className="mb-4 text-xs lg:text-sm">
                Более 15 направлений обучения
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Академия
              <br />
              профессиональных наставников
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm lg:text-xl uppercase"
            >
              Автономная некоммерческая организация дополнительного профессионального образования
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm lg:text-lg mb-6"
            >
              Ведущая образовательная платформа, готовящая высококвалифицированных специалистов для различных сфер деятельности.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }} 
              className="mt-auto w-full lg:w-auto hidden lg:flex justify-center lg:justify-start"
            >
              <Link 
                href='https://lms.anoacademy.ru'
                target="_blank"
                className="text-white px-5 py-4 text-[16px] w-[280px] sm:w-[280px] xl:w-[520px] lg:w-auto bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 h-12 lg:h-[51px] rounded-lg transition-colors text-center"
              >
                Перейти в личный кабинет
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 lg:order-2 flex flex-col items-center lg:justify-self-center"
          >
              <Image
                src="/mobile-hero.png"
                alt="Выпускники в мантиях"
                width={280}
                height={300}
                className="object-cover w-[280px] h-[300px] sm:w-[280px] sm:h-[365px] xl:w-[520px] xl:h-[560px]"
              />
              
              {/* Mobile Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }} 
                className="mt-6 lg:hidden w-full sm:max-w-[280px] flex justify-center"
              >
                <Link 
                  href='https://lms.anoacademy.ru'
                  target="_blank"
                  className="text-white px-5 py-4 text-[16px] w-[280px] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 h-12 rounded-lg transition-colors text-center"
                >
                  Перейти в личный кабинет
                </Link>
              </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
