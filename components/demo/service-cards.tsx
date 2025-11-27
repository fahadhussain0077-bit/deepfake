"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  image: string
  color: string
}

const services = [
  {
    title: "Audio Detection",
    description: "Verify real, live users in real-time",
    icon: "👤",
    image: "/liveness-detection-biometric-scan.jpg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Video Detection",
    description: "Compare faces with precision",
    icon: "👥",
    image: "/face-recognition-matching-id-verification.jpg",
    color: "from-cyan-500 to-green-500",
  },
  {
    title: "Age Estimation",
    description: "Accurate age verification",
    icon: "📊",
    image: "/age-estimation-face-analysis.jpg",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Deepfake Detection",
    description: "Detect AI-generated content",
    icon: "🤖",
    image: "/deepfake-detection-ai-fraud.jpg",
    color: "from-orange-500 to-red-500",
  },
]

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative h-full"
        >
          <div className="relative h-full bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-accent/50 cursor-pointer">
            {/* Background image with gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Content */}
            <div className="relative p-8 h-full flex flex-col justify-between z-10 min-h-[280px]">
              <div className="space-y-4">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface border border-border group-hover:border-accent/50 transition-colors duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-accent font-semibold text-sm mt-6 pt-6 border-t border-border group-hover:border-accent/30 transition-colors duration-300">
                <span>Try Now</span>
                <ArrowUpRight 
                  size={18} 
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                />
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
