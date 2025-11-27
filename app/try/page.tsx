"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import LivenessTest from "@/components/demo/liveness-test"

export default function TryPage() {
  return (
    <div className="min-h-screen bg-blue-50 text-foreground dark:bg-gray-950">
      <Navbar />
      <LivenessTest />
      <Footer />
    </div>
  )
}

