"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/lib/user-auth";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, MapPin, Package, Settings, LogOut, Diamond } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useUserAuth();
  // Get user info from localStorage
  let name = "User";
  let email = "user@email.com";
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.email) {
          email = parsed.email;
          name = parsed.email.split("@")[0];
        }
      } catch {}
    }
  }
  const userData = {
    name,
    email,
    
    status: "Premium Member"
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-[#C5A35D] selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#C5A35D]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#C5A35D]/[0.02] rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Profile Header Card */}
        <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A35D] to-transparent opacity-30" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            
            {/* Avatar Section with Initial */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 border border-[#C5A35D]/20 flex items-center justify-center rotate-45 bg-zinc-900 group-hover:border-[#C5A35D]/50 transition-colors duration-700 overflow-hidden">
                <div className="-rotate-45 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold text-[#C5A35D]">
                    {userData.name ? userData.name[0].toUpperCase() : <User size={60} className="text-zinc-700" />}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#C5A35D] p-2 rotate-45">
                <ShieldCheck size={16} className="text-black -rotate-45" />
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A35D] font-black italic">
                    {userData.status}
                  </span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl tracking-tighter italic text-white">
                  {userData.name}
                </h1>
                <p className="text-zinc-500 font-light flex items-center justify-center md:justify-start gap-2">
                  <Mail size={14} className="text-zinc-700" /> {userData.email}
                </p>
              </div>

              {/* Stats/Quick Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                   
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-1">Studio Location</p>
                  <p className="text-sm font-medium flex items-center justify-center md:justify-start gap-1">
                    <MapPin size={12} className="text-[#C5A35D]" /> Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Grid - Centered */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 md:mt-16">
            <Link 
              href="/orders"
              className="group flex flex-col items-center justify-center p-6 border border-white/5 bg-white/[0.02] hover:bg-[#C5A35D] transition-all duration-500 hover:-translate-y-1"
            >
              <Package size={20} className="mb-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-black transition-colors">
                Orders
              </span>
            </Link>
            <button
              onClick={handleSignOut}
              className="group flex flex-col items-center justify-center p-6 border border-white/5 bg-white/[0.02] hover:bg-[#C5A35D] transition-all duration-500 hover:-translate-y-1 focus:outline-none"
              style={{ minWidth: '120px' }}
            >
              <LogOut size={20} className="mb-3 text-red-900/50 group-hover:text-black transition-colors" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-black transition-colors">
                Sign Out
              </span>
            </button>
          </div>
        </div>

        {/* Footer Brand Mention */}
        <div className="mt-16 flex flex-col items-center space-y-6">
          <div className="flex items-center gap-4 opacity-20">
            <div className="h-[1px] w-24 bg-[#C5A35D]" />
            <Diamond size={12} fill="#C5A35D" className="text-[#C5A35D]" />
            <div className="h-[1px] w-24 bg-[#C5A35D]" />
          </div>
          <Link href="/" className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 hover:text-[#C5A35D] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}