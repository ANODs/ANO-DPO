"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";


const partners = [
  { id: 1, name: "КХК", logo: "/knn.png" },
  { id: 2, name: "ФАС России", logo: "/fas.png" },
  { id: 3, name: "Аванти", logo: "/avanti.png" },
  { id: 4, name: "Абилимпикс", logo: "/abilimp.png" },
  { id: 5, name: "Центр Технического Творчества", logo: "/technoart.png" },
  { id: 6, name: "Avanti group", logo: "/AvantiGroup.png" },
  { id: 7, name: "ВОИР", logo: "/VOIR.png" },
  { id: 8, name: "АНО Мир", logo: "/anoMir.png" },
  { id: 9, name: "Абрис група", logo: "/abris.png" },
  { id: 10, name: "Центр Инноваций", logo: "/ino.png" },
  { id: 11, name: "Modum lab", logo: "/modum lab.png" },
  { id: 12, name: "Новые технологии", logo: "/newTech.png" },
  { id: 13, name: "Runa", logo: "/runa.png" },
  { id: 14, name: "kedr", logo: "/kedr.png" },
  { id: 15, name: "Vector group", logo: "/vectorGroup.png" },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center ">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Партнёры</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <Card key={partner.id} className="max-w-2xl mx-auto">
              <CardContent className="p-6 gap-2 flex flex-wrap md:flex-nowrap items-center justify-center">
                <Image src={partner.logo} alt={partner.name} width={230} height={150} />
                <div className="flex flex-col text-left space-y-2">
                  <h2 className="font-semibold text-[24px]">{partner.name}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, sed!</p>
                  <Link href="#" target="_blank" className="border-b-[1px] border-black justify-self-end">Перейти</Link>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
