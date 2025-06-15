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
    {
      id: 1,
      title: "Очень личное название документа 1",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-1.pdf",
      downloadUrl: "/documents/document-1.pdf",
    },
    {
      id: 2,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-2.pdf",
      downloadUrl: "/documents/document-2.pdf",
    },
    {
      id: 3,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-3.pdf",
      downloadUrl: "/documents/document-3.pdf",
    },
    {
      id: 4,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-4.pdf",
      downloadUrl: "/documents/document-4.pdf",
    },
    {
      id: 5,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-5.pdf",
      downloadUrl: "/documents/document-5.pdf",
    },
    {
      id: 6,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-6.pdf",
      downloadUrl: "/documents/document-6.pdf",
    },
    {
      id: 7,
      title: "Очень личное название документа",
      type: "normative",
      fileSize: "PDF 7.5 МБ",
      fileUrl: "/documents/document-7.pdf",
      downloadUrl: "/documents/document-7.pdf",
    },
    {
      id: 8,
      title: "Методические рекомендации по образовательной программе",
      type: "methodical",
      fileSize: "PDF 12.3 МБ",
      fileUrl: "/documents/methodical-1.pdf",
      downloadUrl: "/documents/methodical-1.pdf",
    },
    {
      id: 9,
      title: "Общая документация по программам обучения",
      type: "methodical",
      fileSize: "PDF 8.7 МБ",
      fileUrl: "/documents/methodical-2.pdf",
      downloadUrl: "/documents/methodical-2.pdf",
    },
    {
      id: 10,
      title: "Рекомендации для преподавателей",
      type: "methodical",
      fileSize: "PDF 5.2 МБ",
      fileUrl: "/documents/methodical-3.pdf",
      downloadUrl: "/documents/methodical-3.pdf",
    },
  ]

  const filteredDocuments = documents.filter((doc) => doc.type === activeFilter)

  const handleDocumentClick = (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  const handleDownload = (e: React.MouseEvent, downloadUrl: string, title: string) => {
    e.stopPropagation()
    // Create a temporary link element to trigger download
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
          {/* Page Title */}
          <h1 className="text-2xl lg:text-4xl font-bold text-brand-text-dark mb-8 lg:mb-12 text-center">Документы</h1>

          {/* Filter Buttons */}

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

          {/* Documents List */}
          <div className="max-w-4xl mx-auto space-y-4">

            {filteredDocuments.map((document, index) => (
              <motion.div key={document.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => router.push(`/documents/${document.id}`)} className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Document Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-12 lg:w-12 lg:h-14 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
                        <FileText className="w-5 h-6 lg:w-6 lg:h-7 text-blue-600" />
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm lg:text-base font-medium text-blue-600 group-hover:text-blue-700 transition-colors mb-1 line-clamp-2">
                        {document.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-brand-text-light">{document.fileSize}</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    onClick={(e) => handleDownload(e, document.downloadUrl, document.title)}
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={`Скачать ${document.title}`}
                  >
                    <Download className="w-4 h-4 lg:w-5 lg:h-5 text-brand-text-light hover:text-brand-text-dark" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-brand-text-light">Документы не найдены</p>
            </div>
          )}

        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
