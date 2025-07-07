"use client"

import React, { useState, useEffect, use } from "react"
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
  id: number;
  title: string;
  type: "normative" | "methodical" | "web";
  fileSize: string;
  fileUrl: string;
  downloadUrl: string;
}

// Ваш массив документов
const documents: DocumentItem[] = [
    // Нормативные документы (regulatory)
    { id: 1,  title: "Договор на оказание платных услуг", type: "normative", fileSize: "PDF 1.2 МБ", fileUrl: "/documents/regulatory/02 Договор на оказание платных услуг.pdf", downloadUrl: "/documents/regulatory/02 Договор на оказание платных услуг.pdf" },
    { id: 2,  title: "План развития образовательной организации", type: "normative", fileSize: "PDF 0.8 МБ", fileUrl: "/documents/regulatory/03 План развития образовательной организации.pdf", downloadUrl: "/documents/regulatory/03 План развития образовательной организации.pdf" },
    { id: 3,  title: "Положение о выдаче документов подтверждающих обучение в организации осуществляющей образовательную деятельность", type: "normative", fileSize: "PDF 1.0 МБ", fileUrl: "/documents/regulatory/04 Положение о выдаче документов подтверждающих обучение в организации осуществляющей образовательную деятельность.pdf", downloadUrl: "/documents/regulatory/04 Положение о выдаче документов подтверждающих обучение в организации осуществляющей образовательную деятельность.pdf" },
    { id: 4,  title: "Положение о комиссии по урегулированию споров между участниками образовательных отношений", type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/regulatory/05 Положение о комиссии по урегулированию споров между участниками образовательных отношений.pdf", downloadUrl: "/documents/regulatory/05 Положение о комиссии по урегулированию споров между участниками образовательных отношений.pdf" },
    { id: 5,  title: "Положение о порядке индивидуального учета результатов освоения образовательных программ обучающимися", type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/regulatory/06 Положение о порядке индивидуального учета результатов освоения образовательных программ обучающимися.pdf", downloadUrl: "/documents/regulatory/06 Положение о порядке индивидуального учета результатов освоения образовательных программ обучающимися.pdf" },
    { id: 6,  title: "Положение о порядке организации образовательной деятельности по ДПО", type: "normative", fileSize: "PDF 0.9 МБ", fileUrl: "/documents/regulatory/07 Положение о порядке организации образовательной деятельности по ДПО.pdf", downloadUrl: "/documents/regulatory/07 Положение о порядке организации образовательной деятельности по ДПО.pdf" },
    { id: 7,  title: "Положение о порядке оформления, выдачи и хранения документов об образовании", type: "normative", fileSize: "PDF 1.1 МБ", fileUrl: "/documents/regulatory/08 Положение о порядке оформления, выдачи и хранения документов об образовании.pdf", downloadUrl: "/documents/regulatory/08 Положение о порядке оформления, выдачи и хранения документов об образовании.pdf" },
    { id: 8,  title: "Положение о порядке перевода, отчисления и восстановления обучающихся", type: "normative", fileSize: "PDF 1.4 МБ", fileUrl: "/documents/regulatory/09 Положение_о_порядке_перевода,_отчисления_и_восстановления_обучающихся.pdf", downloadUrl: "/documents/regulatory/09 Положение_о_порядке_перевода,_отчисления_и_восстановления_обучающихся.pdf" },
    { id: 9,  title: "Положение о проведении текущего контроля успеваемости и промежуточной аттестации", type: "normative", fileSize: "PDF 0.7 МБ", fileUrl: "/documents/regulatory/10 Положение о проведении текущего контроля успеваемости и промежуточной аттестации.pdf", downloadUrl: "/documents/regulatory/10 Положение о проведении текущего контроля успеваемости и промежуточной аттестации.pdf" },
    { id: 10, title: "Положение о режиме занятий обучающихся", type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/regulatory/11 Положение о режиме занятий обучающихся.pdf", downloadUrl: "/documents/regulatory/11 Положение о режиме занятий обучающихся.pdf" },
    { id: 11, title: "Положение о режиме рабочего времени и времени отдыха педагогических работников", type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/regulatory/12 Положение о режиме рабочего времени и времени отдыха педагогических работников.pdf", downloadUrl: "/documents/regulatory/12 Положение о режиме рабочего времени и времени отдыха педагогических работников.pdf" },
    { id: 12, title: "Положение о сайте организации", type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/regulatory/13 Положение о сайте организации.pdf", downloadUrl: "/documents/regulatory/13 Положение о сайте организации.pdf" },
    { id: 13, title: "Положение о создании обособленного специализированного образовательного подразделения", type: "normative", fileSize: "PDF 1.3 МБ", fileUrl: "/documents/regulatory/14 Положение о создании обособленного специализированного образовательного подразделения.pdf", downloadUrl: "/documents/regulatory/14 Положение о создании обособленного специализированного образовательного подразделения.pdf" },
    { id: 14, title: "Положение о языке обучения по реализуемым дополнительным профессиональным программам", type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/regulatory/15 Положение о языке обучения по реализуемым дополнительным профессиональным программам.pdf", downloadUrl: "/documents/regulatory/15 Положение о языке обучения по реализуемым дополнительным профессиональным программам.pdf" },
    { id: 15, title: "Положение об итоговой аттестации", type: "normative", fileSize: "PDF 0.9 МБ", fileUrl: "/documents/regulatory/16 Положение об итоговой аттестации.pdf", downloadUrl: "/documents/regulatory/16 Положение об итоговой аттестации.pdf" },
    { id: 16, title: "Положение об оказания платных образовательных услуг", type: "normative", fileSize: "PDF 0.8 МБ", fileUrl: "/documents/regulatory/17 Положение об аказания платных образовательных услуг.pdf", downloadUrl: "/documents/regulatory/17 Положение об аказания платных образовательных услуг.pdf" },
    { id: 17, title: "Положение об организации дистанционного обучения", type: "normative", fileSize: "PDF 1.2 МБ", fileUrl: "/documents/regulatory/18 Положение об организации дистанционного обучения.pdf", downloadUrl: "/documents/regulatory/18 Положение об организации дистанционного обучения.pdf" },
    { id: 18, title: "Положение об основаниях и порядке снижения стоимости платных образовательных услуг", type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/regulatory/19 Положение об основаниях и порядке снижения стоимости платных образовательных услуг.pdf", downloadUrl: "/documents/regulatory/19 Положение об основаниях и порядке снижения стоимости платных образовательных услуг.pdf" },
    { id: 19, title: "Положение порядке получения, учета, обработки, хранения и защиты персональных данных", type: "normative", fileSize: "PDF 1.0 МБ", fileUrl: "/documents/regulatory/20 Положение порядке получения, учета, обработки, хранения и защиты персональных данных.pdf", downloadUrl: "/documents/regulatory/20 Положение порядке получения, учета, обработки, хранения и защиты персональных данных.pdf" },
    { id: 20, title: "Порядок оформления возникновения, приостановления и прекращения отношений между ООО Академия Новых Технологий и обучающимся", type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/regulatory/21 Порядок оформления возникновения, приостановления и прекращения отношений между ООО Академия Новых Технологий и обучающимся.pdf", downloadUrl: "/documents/regulatory/21 Порядок оформления возникновения, приостановления и прекращения отношений между ООО Академия Новых Технологий и обучающимся.pdf" },
    { id: 21, title: "Порядок использования электронной библиотекой обучающимися", type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/regulatory/22 Порядок использования электроенной библиотекой обучающимися.pdf", downloadUrl: "/documents/regulatory/22 Порядок использования электроенной библиотекой обучающимися.pdf" },
    { id: 22, title: "Порядок регламентирующий бесплатное пользование педагогическими работниками образовательной организации библиотеками и информационными ресурсами", type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/regulatory/23 Порядок регламентирующий бесплатное пользование педагогическими работниками образовательной организации библиотеками и информационными ресурсами.pdf", downloadUrl: "/documents/regulatory/23 Порядок регламентирующий бесплатное пользование педагогическими работниками образовательной организации библиотеками и информационными ресурсами.pdf" },
    { id: 23, title: "Порядок, регламентирующий обучение обучающегося по индивидуальному учебному плану", type: "normative", fileSize: "PDF 0.3 МБ", fileUrl: "/documents/regulatory/24 Порядок, регламентирующий обучение обучающегося по индивидуальному учебному плану.pdf", downloadUrl: "/documents/regulatory/24 Порядок, регламентирующий обучение обучающегося по индивидуальному учебному плану.pdf" },
    { id: 24, title: "Правила внутреннего распорядка обучающихся", type: "normative", fileSize: "PDF 0.4 МБ", fileUrl: "/documents/regulatory/25 Правила внутренннего распорядка обучающихся.pdf", downloadUrl: "/documents/regulatory/25 Правила внутренннего распорядка обучающихся.pdf" },
    { id: 25, title: "Правила внутреннего трудового распорядка образовательной организации", type: "normative", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/regulatory/26 Правила внутреннего трудового распорядка образовательной организации.pdf", downloadUrl: "/documents/regulatory/26 Правила внутреннего трудового распорядка образовательной организации.pdf" },
    { id: 26, title: "Правила приема на обучение по программам дополнительного профессионального образования", type: "normative", fileSize: "PDF 0.5 МБ", fileUrl: "/documents/regulatory/27 Правила приема на обучение по программам дополнительного профессионального образования.pdf", downloadUrl: "/documents/regulatory/27 Правила приема на обучение по программам дополнительного профессионального образования.pdf" },
    
    // Методические документы (methodological)
    { id: 27, title: "Проект Положения о РЦОЭ_24.02.25", type: "methodical", fileSize: "PDF 0.7 МБ", fileUrl: "/documents/methodological/Проект Положения о РЦОЭ_24.02.25.pdf", downloadUrl: "/documents/methodological/Проект Положения о РЦОЭ_24.02.25.pdf" },
    
    // Веб документы (web)
    { id: 28, title: "Политика Cookies", type: "web", fileSize: "PDF 0.3 МБ", fileUrl: "/documents/web/Политика Cookies.pdf", downloadUrl: "/documents/web/Политика Cookies.pdf" },
    { id: 29, title: "Политика обработки персональных данных", type: "web", fileSize: "PDF 0.8 МБ", fileUrl: "/documents/web/Политика обработки персональных данных.pdf", downloadUrl: "/documents/web/Политика обработки персональных данных.pdf" },
    { id: 30, title: "Согласие на обработку персональных данных АНО", type: "web", fileSize: "PDF 0.6 МБ", fileUrl: "/documents/web/Согласие на обработку персональных данных АНО.pdf", downloadUrl: "/documents/web/Согласие на обработку персональных данных АНО.pdf" },
]

interface DocumentViewerProps {
  params: Promise<{ id: string }>
}

export default function DocumentViewer({ params }: DocumentViewerProps) {
  const router = useRouter()
  const { id: paramId } = use(params)
  const id = Number(paramId)
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
      <main className="flex-grow container mx-auto px-0 py-8">
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
