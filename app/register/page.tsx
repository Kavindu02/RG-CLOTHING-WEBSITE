"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/lib/user-auth";
import { Diamond, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    // Save user credentials to localStorage as array
    let usersArr = [];
    const existing = localStorage.getItem("siteUsers");
    if (existing) {
      try {
        usersArr = JSON.parse(existing);
        if (!Array.isArray(usersArr)) usersArr = [];
      } catch { usersArr = []; }
    }
    const registeredAt = new Date().toISOString();
    usersArr.push({ name, email, password, registeredAt });
    localStorage.setItem("siteUsers", JSON.stringify(usersArr));
    // Simulate registration logic
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 sm:p-6 selection:bg-[#C5A35D] selection:text-black">
      {/* Background Decor - Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C5A35D]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C5A35D]/[0.03] rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg relative"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="w-16 h-16 border border-[#C5A35D]/20 flex items-center justify-center rotate-45 bg-zinc-950 shadow-[0_0_30px_rgba(197,163,93,0.1)]">
            <Diamond size={28} className="text-[#C5A35D] -rotate-45" fill="#C5A35D" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-4xl tracking-tighter italic">Create Account</h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-black mt-2">Begin Your Luxury Experience</p>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-zinc-950/50 backdrop-blur-3xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
          {/* Decorative Gold Corner */}
          <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-[#C5A35D] to-transparent" />
          <div className="absolute top-0 right-0 h-20 w-[1px] bg-gradient-to-b from-[#C5A35D] to-transparent" />

          <form className="space-y-7" onSubmit={handleRegister}>
            <div className="space-y-5">
              
              {/* Name Field */}
              <div className="space-y-2 group">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black flex items-center gap-2 group-focus-within:text-[#C5A35D] transition-colors">
                  <User size={12} /> Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C5A35D]/50 focus:bg-white/[0.05] transition-all font-light tracking-wide"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black flex items-center gap-2 group-focus-within:text-[#C5A35D] transition-colors">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C5A35D]/50 focus:bg-white/[0.05] transition-all font-light tracking-wide"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <label htmlFor="password" className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black flex items-center gap-2 group-focus-within:text-[#C5A35D] transition-colors">
                  <Lock size={12} /> Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C5A35D]/50 focus:bg-white/[0.05] transition-all font-light tracking-wide"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-white text-black py-5 px-6 font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:pr-10 disabled:opacity-70"
            >
              <div className="absolute inset-0 w-0 bg-[#C5A35D] transition-all duration-500 group-hover:w-full" />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black transition-colors duration-300">
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Create Account <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center space-y-4">
            <p className="text-zinc-500 text-[11px] tracking-wide">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:text-[#C5A35D] transition-colors font-bold underline underline-offset-4">
                Sign In
              </Link>
            </p>
            <Link href="/" className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex items-center justify-center gap-4 opacity-20">
          <div className="h-[1px] w-12 bg-[#C5A35D]" />
          <Diamond size={10} fill="#C5A35D" className="text-[#C5A35D]" />
          <div className="h-[1px] w-12 bg-[#C5A35D]" />
        </div>
      </motion.div>
    </div>
  );
}