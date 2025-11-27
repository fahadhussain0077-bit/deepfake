"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "With strong accuracy and flexible integration, DeepFake Detection stood out among deepfake detection tools - earning our top cybersecurity award.",
    author: "Managing Director",
    company: "Technology Expo",
    rating: 5,
  },
  {
    quote:
      "DeepFake Detection helped us push first-time pass rates to 95%, far above the 65% industry average. Reliable liveness detection made a real difference.",
    author: "CEO",
    company: "UK KYC Solution",
    rating: 5,
  },
  {
    quote:
      "Over 90% of users passed age checks instantly with DeepFake Detection, and the rest completed document verification in the same flow.",
    author: "Chief Product Officer",
    company: "Brazilian iGaming Company",
    rating: 5,
  },
]

export default function TestimonialsSection() {
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
            Results that <span className="gradient-text">Speak for Themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-muted mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
