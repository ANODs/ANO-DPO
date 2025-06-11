import type { Metadata } from 'next'
import {Inter} from "next/font/google"
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
