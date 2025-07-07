import type { Metadata } from 'next'
import {Inter} from "next/font/google"
import './globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CallbackFormProvider } from '@/contexts/callback-form-context'
import { CallbackForm } from '@/components/callback-form'
import { Toaster } from 'sonner'

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
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <CallbackFormProvider>
          <Header />
          {children}
          <Footer />
          <CallbackForm />
          <Toaster position="top-center" />
        </CallbackFormProvider>
      </body>
    </html>
  )
}
