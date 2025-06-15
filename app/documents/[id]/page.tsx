"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/footer";
import { useRouter, useParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function DocumentViewer() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setZoom(0.5);
    }
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const changePage = (offset: number) =>
    setPageNumber((prev) => Math.min(Math.max(prev + offset, 1), numPages));

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = `/documents/document-${id}.pdf`;
    link.download = `document-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            {/* Back + Title */}
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="sm"
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-medium text-gray-800 line-clamp-1">
                Документ #{id}
              </span>
            </div>
            {/* Controls (always one row) */}
            <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
              {/* Page Nav */}
              <div className="flex items-center bg-white border border-gray-200 rounded p-1">
                <Button
                  onClick={() => changePage(-1)}
                  variant="ghost"
                  size="sm"
                  disabled={pageNumber <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-2 text-sm">
                  {pageNumber}/{numPages || "-"}
                </span>
                <Button
                  onClick={() => changePage(1)}
                  variant="ghost"
                  size="sm"
                  disabled={pageNumber >= numPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              {/* Zoom */}
              <div className="flex items-center bg-white border border-gray-200 rounded p-1">
                <Button
                  onClick={zoomOut}
                  variant="ghost"
                  size="sm"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="px-2 text-sm">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  onClick={zoomIn}
                  variant="ghost"
                  size="sm"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
              {/* Download */}
              <Button
                onClick={downloadPDF}
                className="bg-blue-600 text-white hover:bg-blue-700 p-2"
                size="sm"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Document Viewer */}
          <div
            ref={containerRef}
            className="flex-1 bg-white border border-gray-200 rounded shadow overflow-hidden"
          >
            <div
              className="overflow-auto"
              style={{ height: "calc(100vh - 180px)" }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
                </div>
              ) : (
                <div className="flex justify-center py-4">
                  <Document
                    file={`/documents/document-${id}.pdf`}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} scale={zoom} />
                  </Document>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}