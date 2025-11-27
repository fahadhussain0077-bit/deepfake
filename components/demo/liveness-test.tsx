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

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Eye, Upload, Video, X, AlertTriangle, CheckCircle2, FileText, Download } from "lucide-react"
import Image from "next/image"

type TabType = "image" | "video" | "document"

interface AnalysisResult {
  isFake: boolean
  confidence: number
  deepfakeScore: number
  livenessScore: number
  processingTime: number
  details: {
    faceDetection: string
    textureAnalysis: string
    lightingConsistency: string
    temporalAnalysis: string
    artifacts: string[]
  }
}

// Upload Panel Component
const UploadPanel = ({ 
  activeTab, 
  onFileUpload, 
  uploadedImage 
}: { 
  activeTab: TabType
  onFileUpload: (file: File | null) => void
  uploadedImage: string | null
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getContent = () => {
    switch (activeTab) {
      case "image":
        return {
          title: "Upload Image",
          icon: Upload,
          description: "Click to upload or drag and drop",
          fileTypes: "PNG, JPG (max. 10MB)",
          accept: "image/*"
        }
      case "video":
        return {
          title: "Upload Video",
          icon: Video,
          description: "Click to upload or drag and drop",
          fileTypes: "MP4, MOV (max. 50MB)",
          accept: "video/*"
        }
      case "document":
        return {
          title: "Upload Document",
          icon: FileText,
          description: "Click to upload or drag and drop",
          fileTypes: "PDF, DOC, DOCX (max. 20MB)",
          accept: ".pdf,.doc,.docx"
        }
    }
  }

  const content = getContent()
  const Icon = content.icon

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      if (activeTab === "image" && file.type.startsWith("image/")) {
        onFileUpload(file)
      } else if (activeTab === "document" && (file.type === "application/pdf" || file.type.includes("document") || file.name.endsWith(".pdf") || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
        onFileUpload(file)
      } else if (activeTab === "video" && file.type.startsWith("video/")) {
        onFileUpload(file)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      onFileUpload(null)
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-white mb-4">{content.title}</h3>
      
      {uploadedImage ? (
        <div className="relative">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700">
            <Image
              src={uploadedImage}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept={content.accept}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-900/50 block"
          >
            <div className="flex flex-col items-center">
              <Icon className="w-12 h-12 text-gray-500 mb-3" />
              <p className="text-sm font-medium text-gray-200 mb-1">{content.description}</p>
              <p className="text-xs text-gray-500">{content.fileTypes}</p>
            </div>
          </label>
        </>
      )}
      
      {activeTab === "document" && !uploadedImage && (
        <div className="mt-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            Supported formats: PDF, DOC, DOCX. Maximum file size: 20MB
          </p>
        </div>
      )}
    </div>
  )
}

// Detailed Analysis Report Component
const DetailedReport = ({ analysisResult }: { analysisResult: AnalysisResult | null }) => {
  if (!analysisResult) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Upload an image to generate analysis report</p>
        </div>
      </div>
    )
  }

  const isFake = analysisResult.isFake
  const StatusIcon = isFake ? AlertTriangle : CheckCircle2
  const statusColor = isFake ? "red" : "green"
  const statusText = isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8"
    >
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Deepfake Analysis Report</h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
          isFake 
            ? "bg-red-500/20 text-red-400 border border-red-500/30" 
            : "bg-green-500/20 text-green-400 border border-green-500/30"
        }`}>
          <StatusIcon size={18} />
          {statusText}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Deepfake Score</p>
          <p className={`text-2xl font-bold ${isFake ? "text-red-400" : "text-green-400"}`}>
            {analysisResult.deepfakeScore}%
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Confidence</p>
          <p className="text-2xl font-bold text-white">{analysisResult.confidence}%</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Liveness Score</p>
          <p className="text-2xl font-bold text-white">{analysisResult.livenessScore}%</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Processing Time</p>
          <p className="text-2xl font-bold text-white">{analysisResult.processingTime}s</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">Detailed Analysis</h4>
        
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-2">Face Detection</p>
          <p className="text-sm text-gray-400">{analysisResult.details.faceDetection}</p>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-2">Texture Analysis</p>
          <p className="text-sm text-gray-400">{analysisResult.details.textureAnalysis}</p>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-2">Lighting Consistency</p>
          <p className="text-sm text-gray-400">{analysisResult.details.lightingConsistency}</p>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-2">Temporal Analysis</p>
          <p className="text-sm text-gray-400">{analysisResult.details.temporalAnalysis}</p>
        </div>

        {analysisResult.details.artifacts.length > 0 && (
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <p className="text-sm font-medium text-red-400 mb-2">Detected Artifacts</p>
            <ul className="list-disc list-inside space-y-1">
              {analysisResult.details.artifacts.map((artifact, idx) => (
                <li key={idx} className="text-sm text-red-300">{artifact}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-700">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <Download size={18} />
          Download Report
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Analyze Another
        </button>
      </div>
    </motion.div>
  )
}

const WorkflowTabs = ({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (tab: TabType) => void }) => {
  const tabs = [
    { id: "image" as TabType, label: "Image Upload" },
    { id: "video" as TabType, label: "Video Upload" },
    { id: "document" as TabType, label: "Upload Document" },
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

  // Generate mock analysis result
  const generateAnalysisResult = (isFake: boolean): AnalysisResult => {
    if (isFake) {
      return {
        isFake: true,
        confidence: 94,
        deepfakeScore: 87,
        livenessScore: 23,
        processingTime: 1.2,
        details: {
          faceDetection: "Face detected with inconsistencies in facial geometry. Unnatural blending detected around facial boundaries.",
          textureAnalysis: "Texture anomalies detected in skin regions. Inconsistent pixel patterns suggest AI-generated manipulation.",
          lightingConsistency: "Lighting inconsistencies observed. Multiple light sources detected that don't align with natural scene composition.",
          temporalAnalysis: "Static image - temporal analysis not applicable. However, spatial analysis reveals manipulation artifacts.",
          artifacts: [
            "Blur inconsistencies around facial features",
            "Unnatural skin texture patterns",
            "Geometric distortions in facial structure",
            "Color space anomalies in shadow regions"
          ]
        }
      }
    } else {
      return {
        isFake: false,
        confidence: 98,
        deepfakeScore: 12,
        livenessScore: 96,
        processingTime: 0.8,
        details: {
          faceDetection: "Face detected with natural geometry and consistent facial features. No signs of manipulation detected.",
          textureAnalysis: "Natural skin texture patterns observed. Consistent pixel distribution across facial regions.",
          lightingConsistency: "Consistent lighting throughout the image. Natural shadow and highlight transitions detected.",
          temporalAnalysis: "Static image - temporal analysis not applicable. Spatial analysis confirms authenticity.",
          artifacts: []
        }
      }
    }
  }

  const handleFileUpload = (file: File | null) => {
    if (!file) {
      // Clean up previous image URL
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage)
      }
      setUploadedImage(null)
      setAnalysisResult(null)
      return
    }

    // Clean up previous image URL
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }

    // Create preview URL
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
    setIsAnalyzing(true)

    // Simulate analysis (in real app, this would be an API call)
    setTimeout(() => {
      // Randomly determine if fake (70% chance of fake for demo)
      const isFake = Math.random() > 0.3
      const result = generateAnalysisResult(isFake)
      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 2000)
  }

  // Get header content based on active tab
  const getHeaderContent = () => {
    switch (activeTab) {
      case "image":
        return {
          title: "Image Deepfake Detection",
          description: "Upload an image to analyze and detect deepfake manipulation with our advanced AI-powered detection technology"
        }
      case "video":
        return {
          title: "Video Deepfake Detection",
          description: "Upload a video file to test our real-time deepfake detection API with frame-by-frame analysis and industry-leading accuracy"
        }
      case "document":
        return {
          title: "Document Verification",
          description: "Upload a document to verify authenticity and detect any signs of manipulation or forgery using advanced forensic analysis"
        }
    }
  }

  const headerContent = getHeaderContent()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Demo Interface */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Try{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {headerContent.title}
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl">
              {headerContent.description}
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
          <UploadPanel 
            activeTab={activeTab}
            onFileUpload={handleFileUpload}
            uploadedImage={uploadedImage}
          />

          {/* Analysis Report */}
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 lg:p-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Analyzing image for deepfake detection...</p>
                </div>
              </div>
            ) : (
              <DetailedReport analysisResult={analysisResult} />
            )}
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