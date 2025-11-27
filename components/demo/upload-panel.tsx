"use client"

import { motion } from "framer-motion"
import { Upload, Camera } from "lucide-react"
import { useState } from "react"

export default function UploadPanel() {
  const [dragActive, setDragActive] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect p-6 md:p-8 rounded-2xl w-full md:max-w-md lg:max-w-sm"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6">Upload Media</h3>

      {/* Drag and drop area */}
      <div
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={() => setDragActive(false)}
        className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all ${
          dragActive ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
        }`}
      >
        <Upload className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-4 text-accent" />
        <p className="font-semibold mb-2 text-sm md:text-base">Drop your file here</p>
        <p className="text-xs md:text-sm text-muted mb-4">or click to browse</p>
        <input type="file" className="hidden" accept="image/*,video/*" />
      </div>

      {/* Alternative options */}
      <div className="mt-6 space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <Camera size={18} />
          Use Webcam
        </motion.button>
      </div>

      {/* Supported formats */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <p className="text-xs font-semibold text-accent mb-2">SUPPORTED FORMATS</p>
        <p className="text-xs text-muted">Images: JPG, PNG, WebP • Videos: MP4, WebM</p>
      </div>
    </motion.div>
  )
}
