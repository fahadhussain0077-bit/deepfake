"use client"

import { motion } from "framer-motion"
import type React from "react"

interface FloatingElementProps {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export default function FloatingElement({ children, duration = 6, delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
