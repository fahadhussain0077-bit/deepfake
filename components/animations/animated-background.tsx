"use client"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full mix-blend-screen filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  )
}
