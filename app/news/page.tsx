"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Новости</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from(Array(20).keys()).map((key) => (
              <Card key={key} className="max-w-[374px] mx-auto border-0 shadow-none">
                <CardHeader>
                  <Image className="rounded-[10px] w-[374px] h-[166px]" src="/placeholder.svg" alt="new name" width={374} height={166} />
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <h3 className="font-semibold">Наименование статьи</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <span>23 мая 2025</span>
                  <Link href="#" className="block border-b-[1px] border-black">
                    Перейти
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
