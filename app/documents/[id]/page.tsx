"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Download,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

// pdf.js воркер
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

interface DocumentItem {
  id: number
  title: string
  type: "normative" | "methodical"
  fileSize: string
  fileUrl: string
  downloadUrl: string
}

// Ваш массив документов
const documents: DocumentItem[] = [
    { id: 1,  title: "Договор на оказание платных услуг",                  type: "normative", fileSize: "PDF 1.2 МБ", fileUrl: "/documents/02 на оказание платных услуг.pdf",                     downloadUrl: "/documents/02 на оказание платных услуг.pdf" },
    { id: 2,  title: "План развития",                                type: "normative", fileSize: "PDF 0.8 МБ", fileUrl: "/documents/03 План развития.pdf",                                 downloadUrl: "/documents/03 План развития.pdf" },
    { id: 3,  title: "Договор о выдаче документов",                            type: "normative", fileSize: "PDF 1.0 МБ", fileUrl: "/documents/04 выдаче документов.pdf",                           downloadUrl: "/documents/04 выдаче документов.pdf" },
    { id: 4,  title: "Положения по урегулированию споров",                        type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/05 урегулированию споров.pdf",                       downloadUrl: "/documents/05 урегулированию споров.pdf" },
    { id: 5,  title: "Индивидуальный учет результатов",                         type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/06 инд учет результатов.pdf",                        downloadUrl: "/documents/06 инд учет результатов.pdf" },
    { id: 6,  title: "Об образовательной деятельности по ДПО",                      type: "normative", fileSize: "PDF 0.9 МБ", fileUrl: "/documents/07 обр деятельности по ДПО.pdf",                  downloadUrl: "/documents/07 обр деятельности по ДПО.pdf" },
    { id: 7,  title: "Оформления документов об образовании",                type: "normative", fileSize: "PDF 1.1 МБ", fileUrl: "/documents/08 оформления док об образовании.pdf",            downloadUrl: "/documents/08 оформления док об образовании.pdf" },
    { id: 8,  title: "Контроля успеваемости",                       type: "normative", fileSize: "PDF 0.7 МБ", fileUrl: "/documents/10 контроля успеваемости.pdf",                      downloadUrl: "/documents/10 контроля успеваемости.pdf" },
    { id: 9,  title: "Режим занятий обучающихся",                    type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/11 режим занятий обучающихся.pdf",                 downloadUrl: "/documents/11 режим занятий обучающихся.pdf" },
    { id: 10, title: "О режиме отдыха педагогов работников",                type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/12 режиме отдыха пед работников.pdf",             downloadUrl: "/documents/12 режиме отдыха пед работников.pdf" },
    { id: 11, title: "О сайте организации",                          type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/13 о сайте организации.pdf",                       downloadUrl: "/documents/13 о сайте организации.pdf" },
    { id: 12, title: "Академия профессиональных",                    type: "normative", fileSize: "PDF 1.3 МБ", fileUrl: "/documents/14 Академия профессиональных.pdf",               downloadUrl: "/documents/14 Академия профессиональных.pdf" },
    { id: 13, title: "Положение о языке обучения",                  type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/15 Положение о языке обучения.pdf",             downloadUrl: "/documents/15 Положение о языке обучения.pdf" },
    { id: 14, title: "Положения об итоговой аттестации",                       type: "normative", fileSize: "PDF 0.9 МБ", fileUrl: "/documents/16 об итоговой аттестации.pdf",                  downloadUrl: "/documents/16 об итоговой аттестации.pdf" },
    { id: 15, title: "Договор на оказание платных образовательных услуг",                           type: "normative", fileSize: "PDF 0.8 МБ", fileUrl: "/documents/17 платных обр услуг.pdf",                      downloadUrl: "/documents/17 платных обр услуг.pdf" },
    { id: 16, title: "Положения по дистанционному обучению",                      type: "normative", fileSize: "PDF 1.2 МБ", fileUrl: "/documents/18 дистанционного обучения.pdf",             downloadUrl: "/documents/18 дистанционного обучения.pdf" },
    { id: 17, title: "Положения по снижению стоимости платных образовательных услуг",                  type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/19 снижения стоимости платных.pdf",           downloadUrl: "/documents/19 снижения стоимости платных.pdf" },
    { id: 18, title: "Положения по защите персональных данных",                  type: "normative", fileSize: "PDF 1.0 МБ", fileUrl: "/documents/20 защиты персональных данных.pdf",           downloadUrl: "/documents/20 защиты персональных данных.pdf" },
    { id: 19, title: "Положения по прекращениям отношений",                       type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/21 прекращения отношений.pdf",              downloadUrl: "/documents/21 прекращения отношений.pdf" },
    { id: 20, title: "Положения по пользованию электронной библиотекой",                     type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/22 электронной библиотекой.pdf",            downloadUrl: "/documents/22 электронной библиотекой.pdf" },
    { id: 21, title: "Положения по пользованию бесплатными библиотеками",                        type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/23 бесплат библиотеками.pdf",               downloadUrl: "/documents/23 бесплат библиотеками.pdf" },
    { id: 22, title: "Индивидуальный план",                         type: "normative", fileSize: "PDF 0.3 МБ", fileUrl: "/documents/24 индивидуальный план.pdf",                downloadUrl: "/documents/24 индивидуальный план.pdf" },
    { id: 23, title: "План внутреннего распределения обучающихся",                type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/25 внутреннего расп обучающихся.pdf",    downloadUrl: "/documents/25 внутреннего расп обучающихся.pdf" },
    { id: 24, title: "План трудового распорядка организации",                 type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/26 труд распорядка организации.pdf",      downloadUrl: "/documents/26 труд распорядка организации.pdf" },
    { id: 25, title: "Положения по приему доп профильных обучающихся",                          type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/27 прием доп проф обр.pdf",               downloadUrl: "/documents/27 прием доп проф обр.pdf" },
    { id: 26, title: "Положение о порядке перевода, отчисления и восстановлении обучающихся", type: "normative", fileSize: "PDF 1.4 МБ", fileUrl: "/documents/Положение_о_порядке_перевода,_отчисления_и_восстановлении_обучающихся.pdf", downloadUrl: "/documents/Положение_о_порядке_перевода,_отчисления_и_восстановлении_обучающихся.pdf" },
    { id: 27, title: "Проект Положения о РЦОЭ_24.02.25",                type: "normative", fileSize: "PDF 0.7 МБ", fileUrl: "/documents/Проект Положения о РЦОЭ_24.02.25.pdf",  downloadUrl: "/documents/Проект Положения о РЦОЭ_24.02.25.pdf" },
    { id: 28, title: "Согласие на обработку персональных данных АНО",   type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/Согласие_на_обработку_персональных_данных_АНО.pdf", downloadUrl: "/documents/Согласие_на_обработку_персональных_данных_АНО.pdf" },
]

interface DocumentViewerProps {
  params: { id: string }
}

export default function DocumentViewer({ params }: DocumentViewerProps) {
  const router = useRouter()
  const id = Number(params.id)
  const doc = documents.find((d) => d.id === id)

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Документ не найден</p>
      </div>
    )
  }

  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(true)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = doc.downloadUrl
    link.download = `${doc.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoomIn = () => setZoom((z) => Math.min(z + 25, 200))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 25, 50))
  const changePage = (delta: number) =>
    setPageNumber((p) => Math.min(Math.max(p + delta, 1), numPages))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Хедер: заголовок + контроли */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            {/* Левая часть: кнопка «назад» + заголовок */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </Button>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-semibold text-brand-text-dark line-clamp-1">
                  {doc.title}
                </h1>
                <p className="text-sm text-brand-text-light">{doc.fileSize}</p>
              </div>
            </div>

            {/* Правая часть: зум + скачивание */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              {/* Зум */}
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-1 w-full sm:w-auto">
                <Button
                  onClick={handleZoomOut}
                  variant="ghost"
                  size="sm"
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-brand-text-light px-2 min-w-[50px] text-center">
                  {zoom}%
                </span>
                <Button
                  onClick={handleZoomIn}
                  variant="ghost"
                  size="sm"
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Скачивание */}
              <Button
                onClick={handleDownload}
                className="bg-brand-dark-button text-white hover:bg-gray-800 flex items-center justify-center space-x-2 rounded-lg px-4 py-2 w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Скачать</span>
              </Button>
            </div>
          </div>

          {/* Просмотр PDF */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <div className="p-4 lg:p-8 overflow-auto">
                {/* Центрируем и масштабируем */}
                <div className="flex justify-center">
                  <div
                    className="transition-transform duration-200"
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "top center",
                    }}
                  >
                    <Document
                      file={doc.fileUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>

                    {/* Навигация по страницам */}
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <Button
                        onClick={() => changePage(-1)}
                        variant="outline"
                        size="sm"
                        disabled={pageNumber <= 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">
                        {pageNumber}/{numPages || "-"}
                      </span>
                      <Button
                        onClick={() => changePage(1)}
                        variant="outline"
                        size="sm"
                        disabled={pageNumber >= numPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
