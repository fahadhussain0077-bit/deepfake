// "use client"

// import ServiceCards from "@/components/demo/service-cards"
// import { motion } from "framer-motion"

// export default function DemoPageContent() {
//   return (
//     <main className="min-h-screen pt-20 md:pt-24">
//       {/* Header */}
//       <section className="section-padding py-12 md:py-16 border-b border-border">
//         <div className="section-container">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <div className="inline-block px-4 py-2 glass-effect rounded-full mb-4 text-xs md:text-sm text-accent">
//               Available Checks: 5/5
//             </div>
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//               Suite of <span className="gradient-text">DeepFake Detection's Services</span>
//             </h1>
//             <p className="text-base md:text-lg lg:text-xl text-muted mb-4">
//               Get hands-on experience with the world's fastest liveness detection platform
//             </p>
//             <p className="text-sm md:text-base text-muted">Begin your journey by clicking on any section below:</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Service Cards */}
//       <section className="section-padding py-12 md:py-16">
//         <div className="section-container">
//           <ServiceCards />
//         </div>
//       </section>
//     </main>
//   )
// }

import { useState } from 'react';
import { Shield, Video, Image, FileText, Zap, CheckCircle } from 'lucide-react';

export default function DemoPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Video,
      title: "Video Analysis",
      description: "Advanced deepfake detection for video content with real-time processing",
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      id: 2,
      icon: Image,
      title: "Image Verification",
      description: "Detect manipulated images and synthetic faces with high accuracy",
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      id: 3,
      icon: FileText,
      title: "Document Authentication",
      description: "Verify the authenticity of digital documents and signatures",
      color: "from-orange-500 to-red-500",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400"
    },
    {
      id: 4,
      icon: Zap,
      title: "Real-time Liveness",
      description: "Instant biometric verification with passive liveness detection",
      color: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400"
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex flex-col">
      {/* Header Section */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-4">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-medium text-blue-300">Available Checks: 5/5</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DeepFake Detection
            </span>
            {' '}Services
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 mb-2 max-w-3xl">
            Experience the world's fastest AI-powered verification platform
          </p>
        </div>
      </header>

      {/* Divider */}
      <div className="border-t border-slate-800/50 flex-shrink-0" />

      {/* Service Cards - Single Row */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  
                  {/* Icon */}
                  <div className="relative mb-4 flex-shrink-0 z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.iconBg} border border-slate-700/50 group-hover:border-slate-600/50 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 shadow-lg shadow-black/20`}>
                      <Icon className={`w-6 h-6 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-base font-bold mb-2 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed mb-3">
                      {service.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-blue-400 transition-colors">
                      <span>Try now</span>
                      <svg 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredCard === service.id ? 'translate-x-1' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shield Icon Background Decoration */}
      <div className="fixed bottom-0 right-0 w-72 h-72 pointer-events-none opacity-5">
        <Shield className="w-full h-full text-blue-500" strokeWidth={0.5} />
      </div>
    </div>
  );
}