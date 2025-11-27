"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const tabs = [
  {
    id: "liveness",
    label: "Liveness Detection",
    description: "Verify genuine, live presence",
  },
  {
    id: "facematch",
    label: "Face Match",
    description: "1:1 DeepFake Detectionl comparison",
  },
  {
    id: "age",
    label: "Age Estimation",
    description: "Verify age from biometrics",
  },
  {
    id: "deepfake",
    label: "Deepfake Detection",
    description: "Identify synthetic content",
  },
]

export default function WorkflowTabs() {
  const [activeTab, setActiveTab] = useState("liveness")

  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2 whitespace-nowrap rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/20 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10">
              <p className="text-sm font-semibold">{tab.label}</p>
              <p className="text-xs text-muted">{tab.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
