"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ResultsPanelProps {
  title: string
  status: "success" | "warning" | "loading"
  metrics: { label: string; value: string | number }[]
}

export default function ResultsPanel({ title, status, metrics }: ResultsPanelProps) {
  const StatusIcon = status === "success" ? CheckCircle : status === "warning" ? AlertCircle : null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect p-8 rounded-2xl flex-1"
    >
      <div className="flex items-center gap-3 mb-6">
        {StatusIcon && <StatusIcon size={24} className={status === "success" ? "text-green-500" : "text-yellow-500"} />}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="bg-surface rounded-lg p-4"
          >
            <p className="text-xs text-muted mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-accent">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        <button className="btn-primary flex-1">Download Report</button>
        <button className="btn-secondary flex-1">Try Another</button>
      </div>
    </motion.div>
  )
}
