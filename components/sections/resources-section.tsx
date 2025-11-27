"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ResourceCard {
  title: string
  description: string
  icon: string
  color: string
}

export default function ResourcesSection() {
  const resources: ResourceCard[] = [
    {
      title: "Whitepapers",
      description: "Market Leading Accuracy in DeepFake Detection's New Deepfake Detection Algorithm",
      icon: "📄",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Blogs",
      description: "How DeepFake Detection Detects Fake Videos in Seconds & Prevents Deepfake Fraud",
      icon: "📝",
      color: "from-cyan-500 to-green-500",
    },
    {
      title: "Case Studies",
      description: "How a Bank Reinvented Digital Trust with DeepFake Detection's Liveness",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
    },
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
            Useful <span className="gradient-text">Resources</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass-effect p-8 rounded-2xl hover:border-accent/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-primary/20"
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
              <p className="text-sm text-muted mb-4">{resource.description}</p>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                Read more <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="text-accent font-semibold hover:text-white transition flex items-center gap-2 mx-auto">
            Explore More <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
