"use client"

import { motion } from "framer-motion"

const features = [
  {
    icon: "🎯",
    title: "Built for Accuracy",
    description: "Industry-leading accuracy rates with continuous improvement",
  },
  {
    icon: "⚡",
    title: "Optimized for Speed",
    description: "Lightning-fast processing in under 1 second",
  },
  {
    icon: "🌍",
    title: "Real-World Tested",
    description: "Tested extensively in real-world conditions",
  },
  {
    icon: "📊",
    title: "Lowest Drop-off",
    description: "Best user experience with minimal friction",
  },
  {
    icon: "🔧",
    title: "Easy Integration",
    description: "Seamless integration with detailed documentation",
  },
  {
    icon: "🛡️",
    title: "Privacy First",
    description: "GDPR compliant with on-premise solutions",
  },
]

export default function FeaturesSection() {
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
            What Sets DeepFake Detection <span className="gradient-text">Apart</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-xl hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
