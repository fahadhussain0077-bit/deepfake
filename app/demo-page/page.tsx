"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import DemoPageContent from "@/components/demo/demo-page-content"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-blue-50 text-foreground dark:bg-gray-950">
      <Navbar />
      <DemoPageContent />
      <Footer />
    </div>
  )
}

