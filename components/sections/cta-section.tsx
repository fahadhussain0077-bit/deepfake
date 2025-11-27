"use client"

import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-padding section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Highly <span className="gradient-text">Customizable Integration</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
            Deploy DeepFake Detection's solutions across multiple platforms with our robust SDKs and RESTful APIs. No specific
            hardware requirements needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-primary">Get Free Trial</button>
            <button className="btn-secondary">Read Developer Guide</button>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/50">
            {[
              {
                icon: "📱",
                title: "Compatible SDKs",
                description: "iOS & Android support",
              },
              {
                icon: "⚡",
                title: "Lightweight",
                description: "Only ~5MB in size",
              },
              {
                icon: "🌐",
                title: "Cross-Platform",
                description: "Works everywhere",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="font-semibold mb-1">{feature.title}</p>
                <p className="text-sm text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
