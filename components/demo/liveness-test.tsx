// "use client"

// import UploadPanel from "@/components/demo/upload-panel"
// import ResultsPanel from "@/components/demo/results-panel"
// import WorkflowTabs from "@/components/demo/workflow-tabs"
// import { motion } from "framer-motion"

// export default function LivenessTest() {
//   return (
//     <main className="min-h-screen pt-20 md:pt-24">
//       {/* Demo Interface */}
//       <section className="section-padding py-12 md:py-16 bg-surface/50">
//         <div className="section-container">
//           <div className="mb-8">
//             <motion.h2
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
//             >
//               Try <span className="gradient-text">Liveness Detection</span>
//             </motion.h2>
//             <p className="text-sm md:text-base text-muted">
//               Upload an image or video to test our liveness detection API
//             </p>
//           </div>

//           <WorkflowTabs />

//           {/* Upload and Results Layout - Responsive */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
//             <UploadPanel />

//             {/* Demo Results */}
//             <div className="lg:col-span-2">
//               <ResultsPanel
//                 title="Results"
//                 status="success"
//                 metrics={[
//                   { label: "Liveness Score", value: "98.5%" },
//                   { label: "Confidence", value: "99%" },
//                   { label: "Processing Time", value: "0.8s" },
//                   { label: "Status", value: "Live" },
//                 ]}
//               />
//             </div>
//           </div>

//           {/* Feature highlights - Responsive */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8"
//           >
//             {[
//               { label: "Active Liveness", value: "✓" },
//               { label: "Passive Detection", value: "✓" },
//               { label: "Real-time Analysis", value: "✓" },
//             ].map((feature, i) => (
//               <motion.div key={i} whileHover={{ y: -5 }} className="glass-effect p-3 md:p-4 rounded-lg text-center">
//                 <p className="text-xl md:text-2xl text-accent mb-1">{feature.value}</p>
//                 <p className="text-xs md:text-sm text-muted">{feature.label}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Zap, Eye, Upload, Video, Camera } from "lucide-react"

type TabType = "image" | "video" | "camera"

// Mock components for demonstration
const UploadPanel = ({ activeTab }: { activeTab: TabType }) => {
  const getContent = () => {
    switch (activeTab) {
      case "image":
        return {
          title: "Upload Image",
          icon: Upload,
          description: "Click to upload or drag and drop",
          fileTypes: "PNG, JPG (max. 10MB)"
        }
      case "video":
        return {
          title: "Upload Video",
          icon: Video,
          description: "Click to upload or drag and drop",
          fileTypes: "MP4, MOV (max. 50MB)"
        }
      case "camera":
        return {
          title: "Live Camera",
          icon: Camera,
          description: "Click to start camera",
          fileTypes: "Real-time detection"
        }
    }
  }

  const content = getContent()
  const Icon = content.icon

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-white mb-4">{content.title}</h3>
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-900/50">
        <div className="flex flex-col items-center">
          <Icon className="w-12 h-12 text-gray-500 mb-3" />
          <p className="text-sm font-medium text-gray-200 mb-1">{content.description}</p>
          <p className="text-xs text-gray-500">{content.fileTypes}</p>
        </div>
      </div>
      {activeTab === "camera" && (
        <div className="mt-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            Camera access will be requested when you click start
          </p>
        </div>
      )}
    </div>
  )
}

interface Metric {
  label: string
  value: string
}

interface ResultsPanelProps {
  title: string
  status: string
  metrics: Metric[]
}

const ResultsPanel = ({ title, status, metrics }: ResultsPanelProps) => (
  <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
        {status === "success" ? "✓ Live" : "Processing"}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric: Metric, idx: number) => (
        <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{metric.label}</p>
          <p className="text-2xl font-bold text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  </div>
)

const WorkflowTabs = ({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (tab: TabType) => void }) => {
  const tabs = [
    { id: "image" as TabType, label: "Image Upload" },
    { id: "video" as TabType, label: "Video Upload" },
    { id: "camera" as TabType, label: "Live Camera" },
  ]

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-2 mb-8 inline-flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default function LivenessTest() {
  const [activeTab, setActiveTab] = useState<TabType>("image")

  const features = [
    { 
      icon: Shield, 
      label: "Active Liveness", 
      description: "Challenge-response verification"
    },
    { 
      icon: Eye, 
      label: "Passive Detection", 
      description: "No user interaction required"
    },
    { 
      icon: Zap, 
      label: "Real-time Analysis", 
      description: "Results in under 1 second"
    },
  ]

  const getResultsMetrics = () => {
    switch (activeTab) {
      case "image":
        return [
          { label: "Liveness Score", value: "98.5%" },
          { label: "Confidence", value: "99%" },
          { label: "Processing Time", value: "0.8s" },
          { label: "Status", value: "Live" },
        ]
      case "video":
        return [
          { label: "Liveness Score", value: "97.2%" },
          { label: "Confidence", value: "98%" },
          { label: "Processing Time", value: "2.3s" },
          { label: "Status", value: "Live" },
        ]
      case "camera":
        return [
          { label: "Liveness Score", value: "99.1%" },
          { label: "Confidence", value: "99%" },
          { label: "Frame Rate", value: "30 FPS" },
          { label: "Status", value: "Live" },
        ]
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Demo Interface */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Try{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Liveness Detection
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl">
              Upload an image or video to test our advanced liveness detection API with industry-leading accuracy
            </p>
          </motion.div>
        </div>

        {/* Workflow Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <WorkflowTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Upload and Results Layout */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10"
        >
          <UploadPanel activeTab={activeTab} />

          {/* Demo Results */}
          <div className="lg:col-span-2">
            <ResultsPanel
              title="Detection Results"
              status="success"
              metrics={getResultsMetrics()}
            />
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl hover:border-gray-600 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center"
        >
          <p className="text-sm text-blue-300">
            <span className="font-semibold">Pro Tip:</span> For best results, ensure good lighting and the subject is clearly visible in the frame
          </p>
        </motion.div>
      </section>
    </main>
  )
}