"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ModeToggle } from "@/components/layout/mode-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="text-2xl font-bold gradient-text">
            DeepFake Detection
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-black dark:text-white">
          {/* <Link href="/" className="text-sm text-black dark:text-white hover:text-blue-500/80 transition">
            Solutions
          </Link> */}
          {/* <Link href="/try" className="text-sm text-black dark:text-white hover:text-blue-500/80 transition">
            Try Liveness
          </Link> */}
          <ModeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/try" className="btn-primary text-sm inline-flex items-center justify-center">
              Request Demo
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-surface rounded-lg transition">
          <AnimatePresence>
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: 0 }} animate={{ rotate: 90 }} exit={{ rotate: 0 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-surface/50 backdrop-blur overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {/* <Link href="/" className="block text-sm text-muted hover:text-foreground">
                Solutions
              </Link> */}
              {/* <Link href="/try" className="block text-sm text-muted hover:text-foreground">
                Try Liveness
              </Link> */}
              <Link href="/demo-page" className="block text-sm text-muted hover:text-foreground">
                Demo
              </Link>
              <Link href="/" className="block text-sm text-muted hover:text-foreground">
                Resources
              </Link>
              <div className="flex items-center justify-between gap-4 pt-2">
                <ModeToggle />
                <Link href="/demo-page" className="btn-primary flex-1 text-sm text-center">Request Demo</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
