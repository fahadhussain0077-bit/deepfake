"use client"

import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle } from "lucide-react"

export default function ComplianceSection() {
  const certifications = [
    { icon: Shield, label: "iBeta Level 2", description: "Liveness certification" },
    { icon: Lock, label: "GDPR Compliant", description: "Privacy protected" },
    { icon: CheckCircle, label: "NIST Standards", description: "Face matching certified" },
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-padding section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Trusted & Certified</span> for Compliance
          </h2>
          <p className="text-xl text-muted">Industry-leading standards and certifications</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl text-center hover:border-accent/50 transition-all"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">{cert.label}</h3>
                <p className="text-muted">{cert.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
