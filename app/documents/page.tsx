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
  type: "normative" | "methodical" | "web"
  fileSize: string
  fileUrl: string
  downloadUrl: string
}

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState<"normative" | "methodical" | "web">("normative")
  const router = useRouter()

  const documents: Document[] = [
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
      <main className="container mx-auto px-0 py-8 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-2xl lg:text-4xl font-bold text-brand-text-dark mb-8 lg:mb-12 text-center">
            Документы
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-12 justify-start container px-0mx-auto">
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
            <Button
              onClick={() => setActiveFilter("web")}
              className={`
                w-full sm:w-auto
                px-6 py-3
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  activeFilter === "web"
                    ? "bg-brand-dark-button text-white hover:bg-gray-800"
                    : "bg-white text-brand-text-dark border border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              Веб документы
            </Button>
          </div>

          <div className="container px-0mx-auto space-y-4">
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
