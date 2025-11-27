"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Eye } from "lucide-react"

const solutions = [
  {
    icon: Zap,
    title: "Audio Detection",
    description:
      "Lightning Fast Response (<1 Second) with Active & Passive Liveness detection. iBeta Level 2 Compliant.",
    features: ["<1 Second Response", "Active & Passive", "iBeta Level 2", "56+ Spoofing Attack Protection"],
    image: "/imgdetection.png",
  },
  {
    icon: Shield,
    title: "Video Detection",
    description:
      "AI-Generated Image Identification and Cross-platform Deepfake Video Detection with industry-leading accuracy.",
    features: ["AI Image Detection", "Video Detection", "Real-time Analysis", "Cross-Platform"],
  },
  {
    icon: Eye,
    title: "DeepFake Detectionl Recognition",
    description: "1:1 Face Matching, 1:N Face Searching, and Image-to-Video face matching with NIST compliance.",
    features: ["1:1 Face Matching", "1:N Searching", "Age Estimation", "NIST Compliant"],
  },
]

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}

export default function SolutionsSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="section-padding section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            DeepFake Detection <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted max-w-2xl mx-auto text-black dark:text-white hover:text-blue-500/80 transition">
            Comprehensive DeepFake Detectionl biometrics and deepfake detection solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group glass-effect p-6 md:p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <Icon className="text-accent" size={24} />
                </div>
                {solution.image && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
                    <img src={solution.image} alt={solution.title} className="w-full h-40 object-cover transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-bold mb-2">{solution.title}</h3>
                <p className="text-sm md:text-base text-muted mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="text-xs md:text-sm text-muted flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ gap: "0.75rem" }}
                  className="mt-6 text-accent font-semibold text-sm hover:gap-2 flex items-center gap-1 transition group-hover:gap-2"
                >
                  Learn More <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
