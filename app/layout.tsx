import type { Metadata } from 'next'
import {Inter} from "next/font/google"
import './globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: 'АНО ДПО',
  description: 'Обучающие программы, повышение квалификации',
}

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  )
}
