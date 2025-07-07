import { Suspense } from "react"
import ProgramsList from "@/components/programs-list"
import ContactSection from "@/components/contact-section"
import ProgramCardSkeleton from "@/components/program-card-skeleton"

function ProgramsListFallback() {
  return (
    <div className="">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8">
          <div className="text-4xl font-bold text-center mb-12">Программы обучения</div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-gray-100 animate-pulse w-48 h-12"></div>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <div className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProgramCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ProgramsPage() {
  return (
    <div className="pb-16">
      <Suspense fallback={<ProgramsListFallback />}>
        <ProgramsList />
      </Suspense>
      <ContactSection />
    </div>
  )
}
