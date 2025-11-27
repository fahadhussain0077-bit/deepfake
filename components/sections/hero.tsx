"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04020f] via-[#060a18] to-[#020409] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-72 h-72 bg-blue-600/30 blur-[150px]" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-500/30 blur-[160px]" />
      </div>

      <div className="section-container relative z-10 flex flex-col gap-12 py-24 lg:grid lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-left"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase text-blue-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            Deepfake Detection & Recognition
          </motion.p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl text-white">
            As deepfake threats advance your biometric security must advance accordingly
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-lg">
            Leading-edge deepfake fraud prevention, detection, and liveness verification solutions trusted by enterprises and government agencies worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/demo-page" className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto text-base">
                Request A Demo
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px]">
              <Image
                src="/12.jpg"
                alt="AI powered biometric detection visualization"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
