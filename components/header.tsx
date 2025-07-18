"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X, Plus, Minus, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProgramsExpanded, setIsProgramsExpanded] = useState(false)

  const menuItems = [
    { name: "Программы", href: "/programs" },
    { name: "Новости", href: "/news" },
    { name: "О нас", href: "/about" },
    { name: "Партнёры", href: "/partners" },
    { name: "Документы", href: "/documents" },
    { name: "Контакты", href: "#footer" }
  ]

  const programSubItems = [
    { name: "Дополнительное образование", href: "/programs?category=additional" },
    { name: "Повышение квалификации", href: "/programs?category=professional" },
    { name: "Мастер-классы", href: "/programs?category=master-classes" },
    { name: "Экскурсии", href: "/programs?category=excursions" }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      setIsProgramsExpanded(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-sm border-b sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-0 py-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
             <Link href="/">
              <Image src="/logo.png" width={200} height={65} alt="logo" />
             </Link>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="flex items-center">
              <ul className="flex items-center gap-8">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="min-w-[50px]"
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-800 transition-all duration-300 font-medium py-2 px-1 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <Link href='https://lms.anoacademy.ru' target="_blank" className="bg-black rounded-xl text-white hover:bg-gray-800 px-5 py-4 text-[16px]">Перейти в личный кабинет</Link>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Mobile Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <Link href="/">
                <Image src="/logo.png" width={102} height={33} alt="logo" />
              </Link>
            </motion.div>

            {/* Hamburger Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 lg:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Action Buttons */}
              <div className="px-4 mb-4 space-y-3">
                <Link href='https://lms.anoacademy.ru' target="_blank" className="block text-center text-[16px] px-5 py-4 w-full h-12 bg-black text-white hover:bg-gray-800 rounded-lg">
                  Перейти в личный кабинет
                </Link>
              </div>

              {/* Menu Items */}
              <nav className="flex-1">
                <ul className="space-y-0">
                  {menuItems.map((item, index) => (
                    <li key={item.name}>
                      {item.name === "Программы" ? (
                        <div>
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsProgramsExpanded(!isProgramsExpanded)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left border-b border-gray-200 hover:bg-white transition-colors"
                          >
                            <span
                              className={`font-medium ${isProgramsExpanded ? "text-purple-600 underline" : "text-gray-900"}`}
                            >
                              {item.name}
                            </span>
                            {isProgramsExpanded ? (
                              <Minus className="h-6 w-6 text-gray-500" />
                            ) : (
                              <Plus className="h-6 w-6 text-gray-500" />
                            )}
                          </motion.button>

                          <AnimatePresence>
                            {isProgramsExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white mx-4 rounded-md overflow-hidden"
                              >
                                <div className="py-2">
                                  {programSubItems.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
                                      onClick={toggleMenu}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href === "#footer" ? "/#footer" : item.href}
                          className="block px-4 py-3 text-gray-900 font-medium border-b border-gray-200 hover:bg-white transition-colors"
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Contact Info */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <Send className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">ano_dpo_apn@bk.ru</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
