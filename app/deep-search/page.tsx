"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Search, Bot, User, Loader2, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function DeepSearchContent() {
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const analysisType = searchParams.get("type") || "unknown"
  const deepfakeScore = searchParams.get("score") || "0"
  const confidence = searchParams.get("confidence") || "0"

  const isFake = analysisType === "fake"

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your Deep Search AI assistant. I can help you understand the analysis results of your ${isFake ? "deepfake" : "authentic"} content.

**Analysis Summary:**
- Status: ${isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC"}
- Deepfake Score: ${deepfakeScore}%
- Confidence Level: ${confidence}%

You can ask me questions like:
• "What does the deepfake score mean?"
• "What artifacts were detected?"
• "How can I verify this is fake?"
• "Explain the texture analysis results"
• "What are the security implications?"

What would you like to know?`,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [analysisType, deepfakeScore, confidence, isFake])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content, isFake, deepfakeScore)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Deep Search</h1>
                <p className="text-sm text-gray-400">AI-Powered Analysis Assistant</p>
              </div>
            </div>
            <Link
              href="/demo-page"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Analysis Summary Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${
              isFake ? "bg-red-500/20" : "bg-green-500/20"
            }`}>
              {isFake ? (
                <AlertTriangle className="w-6 h-6 text-red-400" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Current Analysis</p>
              <p className="text-lg font-semibold text-white">
                {isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC"} • {deepfakeScore}% Score • {confidence}% Confidence
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Messages Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-6 flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-6"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the analysis results, detected artifacts, security implications..."
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                rows={1}
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}

// Mock AI response generator
function generateAIResponse(query: string, isFake: boolean, score: string): string {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("score") || lowerQuery.includes("mean")) {
    return `The deepfake score of ${score}% indicates the likelihood that the content has been manipulated using AI or deepfake technology.

**Score Interpretation:**
- **0-30%**: Likely authentic, minimal manipulation detected
- **31-60%**: Suspicious, some anomalies present
- **61-80%**: High probability of manipulation
- **81-100%**: Very high confidence of deepfake

Your content scored ${score}%, which suggests ${isFake ? "a high probability of manipulation" : "the content appears to be authentic"}.

The score is calculated using multiple detection algorithms analyzing facial geometry, texture patterns, lighting consistency, and temporal artifacts.`
  }

  if (lowerQuery.includes("artifact") || lowerQuery.includes("detect")) {
    return `Based on the analysis, several artifacts were detected that indicate ${isFake ? "manipulation" : "authenticity"}:

**Detected Artifacts:**
${isFake ? `• Blur inconsistencies around facial features
• Unnatural skin texture patterns
• Geometric distortions in facial structure
• Color space anomalies in shadow regions
• Lighting inconsistencies across the face

These artifacts are common in deepfake content because:
1. AI models struggle with maintaining consistent texture across the entire face
2. Blending boundaries between real and fake regions create visible seams
3. Lighting calculations don't perfectly match the original scene
4. Color grading may not be consistent throughout the image` : `• No significant artifacts detected
• Natural skin texture patterns
• Consistent lighting throughout
• Proper facial geometry
• Authentic color distribution

The absence of these manipulation artifacts suggests the content is authentic.`}`
  }

  if (lowerQuery.includes("verify") || lowerQuery.includes("check")) {
    return `To verify ${isFake ? "if this is a deepfake" : "the authenticity"} of the content, you can:

**Verification Methods:**
1. **Technical Analysis**: Use forensic tools to examine metadata, compression artifacts, and pixel-level inconsistencies
2. **Reverse Image Search**: Check if the image appears elsewhere online with different contexts
3. **Expert Review**: Consult with digital forensics experts who specialize in deepfake detection
4. **Multiple Tools**: Cross-reference results from different detection platforms
5. **Temporal Analysis**: For videos, examine frame-by-frame for inconsistencies

**Our Analysis Confidence:**
Based on our advanced AI detection system, we have ${isFake ? "identified multiple indicators" : "found no indicators"} of manipulation. However, for critical decisions, we recommend:
- Consulting multiple detection sources
- Getting expert human verification
- Examining the original source and context
- Checking for any metadata inconsistencies`
  }

  if (lowerQuery.includes("texture") || lowerQuery.includes("skin")) {
    return `Texture analysis examines the skin and surface patterns in the image to detect manipulation.

**What We Analyzed:**
• Skin texture consistency across facial regions
• Pixel distribution patterns
• Surface smoothness and natural variations
• Edge detection around facial features

**Findings:**
${isFake ? `The texture analysis revealed anomalies:
- Inconsistent pixel patterns in skin regions
- Unnatural smoothness in certain areas
- Abrupt texture changes at facial boundaries
- AI-generated texture artifacts

These patterns suggest the image was created or modified using generative AI models, which often struggle to maintain realistic texture consistency.` : `The texture analysis shows:
- Natural skin texture patterns throughout
- Consistent pixel distribution
- Realistic surface variations
- No abrupt texture changes

These findings support the authenticity of the content.`}`
  }

  if (lowerQuery.includes("security") || lowerQuery.includes("risk") || lowerQuery.includes("implication")) {
    return `**Security Implications:**

${isFake ? `⚠️ **HIGH RISK** - Deepfake Detected

**Potential Threats:**
1. **Identity Theft**: Fake images/videos can be used to impersonate individuals
2. **Fraud**: Deepfakes are increasingly used in financial scams and social engineering
3. **Reputation Damage**: Fake content can harm personal or organizational reputation
4. **Legal Issues**: Deepfakes can be used as evidence in legal disputes
5. **Social Engineering**: Attackers use deepfakes to gain trust and access

**Recommended Actions:**
- Report the content to relevant authorities if it's being used maliciously
- Document the detection results for legal purposes
- Implement additional verification measures
- Educate stakeholders about deepfake risks
- Consider watermarking or blockchain verification for authentic content` : `✅ **LOW RISK** - Content Appears Authentic

**Security Considerations:**
- Continue to verify content through multiple channels
- Maintain awareness of evolving deepfake technology
- Implement regular content verification processes
- Keep detection systems updated with latest AI models

**Best Practices:**
- Always verify important content through multiple sources
- Use established verification workflows
- Keep documentation of verification results
- Stay informed about new deepfake techniques`}`
  }

  // Default response
  return `I understand you're asking about "${query}". 

Based on the analysis results:
- **Status**: ${isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC"}
- **Deepfake Score**: ${score}%
- **Confidence**: High

${isFake ? `The content shows multiple indicators of AI manipulation. The analysis detected inconsistencies in facial geometry, texture patterns, and lighting that suggest this is a deepfake.` : `The content appears to be authentic. Our analysis found no significant indicators of manipulation or deepfake technology.`}

Would you like me to explain any specific aspect of the analysis in more detail? You can ask about:
- What the scores mean
- Detected artifacts
- How to verify the results
- Security implications
- Technical details of the detection process`
}

export default function DeepSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    }>
      <DeepSearchContent />
    </Suspense>
  )
}

