"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { setAdminSession } from "@/lib/admin-auth"
import { Lock, User, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      if (typeof window !== "undefined") {
        const adminsRaw = localStorage.getItem("admins")
        let admins = []
        try {
          admins = adminsRaw ? JSON.parse(adminsRaw) : []
        } catch {
          admins = []
        }
        
        const found = admins.find((a: any) => a.name === name && a.password === password)
        
        if (found) {
          localStorage.setItem("adminName", name)
          localStorage.setItem("adminPassword", password)
          setAdminSession()
          router.push("/admin")
        } else {
          setError("Access denied. Please check your credentials.")
          setPassword("")
        }
      }
      setLoading(false)
    }, 1200) 
  }

  return (
    <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="space-y-1">
              <h1 className="font-serif text-3xl tracking-tight text-white">System <span className="italic text-zinc-500">Access.</span></h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-bold">Authorized Personnel Only</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-500 px-1">Admin Identity</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                  placeholder="Username"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-500 px-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] tracking-wider text-red-400 text-center font-bold uppercase bg-red-400/5 py-3 rounded-xl border border-red-400/10"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password || !name}
              className="group relative w-full py-5 bg-white text-black rounded-full font-bold tracking-[0.3em] uppercase text-[11px] transition-all hover:bg-white disabled:opacity-20 disabled:grayscale overflow-hidden mb-4 border border-white"
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
            <Link href="/admin/register">
              <button
                type="button"
                className="group relative w-full py-5 bg-white text-black rounded-full font-bold tracking-[0.3em] uppercase text-[11px] transition-all hover:bg-white disabled:opacity-20 disabled:grayscale overflow-hidden mb-4"
              >
                <span className="flex items-center justify-center gap-3">
                  Sign Up
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </form>
          
        </div>
      </motion.div>
    </main>
  )
}