"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, UserPlus, Loader2, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function AdminRegisterPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    if (!name || !password || !confirmPassword) {
      setError("Please fill in all security fields.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Add to admins list for dashboard
        const adminsRaw = localStorage.getItem("admins")
        let admins = []
        try {
          admins = adminsRaw ? JSON.parse(adminsRaw) : []
        } catch {
          admins = []
        }
        
        admins.push({ name, password })
        localStorage.setItem("admins", JSON.stringify(admins))
        
        setSuccess("Identity established. Redirecting to terminal...")
        
        // Save temporary session for the redirect
        localStorage.setItem("adminName", name)
        localStorage.setItem("adminPassword", password)
        
        setTimeout(() => router.push("/admin/login"), 1500)
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">Register <span className="italic text-zinc-500">Admin.</span></h1>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-bold">Create Authorized Identity</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 px-1">Identity Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                placeholder="Admin username"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 px-1">Security Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 px-1">Verify Key</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                placeholder="••••••••"
              />
            </div>

            {/* Feedback Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[8px] sm:text-[9px] md:text-[10px] tracking-wider text-red-400 text-center font-bold uppercase bg-red-400/5 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-red-400/10"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[8px] sm:text-[9px] md:text-[10px] tracking-wider text-primary text-center font-bold uppercase bg-primary/5 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-primary/10"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 sm:py-5 bg-white text-black rounded-full font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-[11px] transition-all hover:bg-white disabled:opacity-20 disabled:grayscale overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Initialize Registration
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/5 text-center">
            <Link 
              href="/admin/login" 
              className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-600 hover:text-white transition-colors"
            >
              Already Registered? <span className="text-white ml-1 font-black">Login</span>
            </Link>
          </div>
          
        </div>
      </motion.div>
    </main>
  )
}