"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

interface Document {
  id: number
  title: string
  type: "normative" | "methodical"
  fileSize: string
  fileUrl: string
  downloadUrl: string
}

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState<"normative" | "methodical">("normative")
  const router = useRouter()

  const documents: Document[] = [
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

  const filteredDocuments = documents.filter((doc) => doc.type === activeFilter)

  const handleDownload = (e: React.MouseEvent, downloadUrl: string, title: string) => {
    e.stopPropagation()
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-2xl lg:text-4xl font-bold text-brand-text-dark mb-8 lg:mb-12 text-center">
            Документы
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-12 justify-start max-w-4xl mx-auto">
            <Button
              onClick={() => setActiveFilter("normative")}
              className={`
                w-full sm:w-auto
                px-6 py-3
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  activeFilter === "normative"
                    ? "bg-brand-dark-button text-white hover:bg-gray-800"
                    : "bg-white text-brand-text-dark border border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              Нормативные
            </Button>
            <Button
              onClick={() => setActiveFilter("methodical")}
              className={`
                w-full sm:w-auto
                px-6 py-3
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  activeFilter === "methodical"
                    ? "bg-brand-dark-button text-white hover:bg-gray-800"
                    : "bg-white text-brand-text-dark border border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              Методические рекомендации и общая документация
            </Button>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/documents/${doc.id}`)}
                className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-12 lg:w-12 lg:h-14 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
                        <FileText className="w-5 h-6 lg:w-6 lg:h-7 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm lg:text-base font-medium text-blue-600 group-hover:text-blue-700 transition-colors mb-1 line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-brand-text-light">{doc.fileSize}</p>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => handleDownload(e, doc.downloadUrl, doc.title)}
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={`Скачать ${doc.title}`}
                  >
                    <Download className="w-4 h-4 lg:w-5 lg:h-5 text-brand-text-light hover:text-brand-text-dark" />
                  </Button>
                </div>
              </motion.div>
            ))}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-brand-text-light">Документы не найдены</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
