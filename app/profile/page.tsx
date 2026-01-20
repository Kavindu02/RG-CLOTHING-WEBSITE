"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/lib/user-auth";
import { motion } from "framer-motion";
import { Mail, ShieldCheck, MapPin, Package, LogOut, Diamond, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useUserAuth();
  const [userData, setUserData] = useState({
    name: "User",
    email: "user@email.com",
    status: "Premium Member",
    registeredAt: null as string | null
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("userSession");
      if (session) {
        try {
          const parsed = JSON.parse(session);
          let registeredAt = null;
          const usersArr = localStorage.getItem("siteUsers");
          if (usersArr && parsed.email) {
            try {
              const arr = JSON.parse(usersArr);
              const found = arr.find((u: any) => u.email === parsed.email);
              if (found && found.registeredAt) {
                registeredAt = found.registeredAt;
              }
            } catch {}
          }
          setUserData(prev => ({
            ...prev,
            name: parsed.name || prev.name,
            email: parsed.email || prev.email,
            registeredAt: registeredAt
          }));
        } catch (error) {
          console.error("Session parsing error", error);
        }
      }
    }
  }, []);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-[#C5A35D] selection:text-black font-sans">
      
      {/* Background Decor - ඔබගේ මුල් කේතයේ තිබූ ආකාරයටම */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#C5A35D]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#C5A35D]/[0.02] rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Main Profile Card */}
        <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden group">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A35D] to-transparent opacity-30 mt-6 sm:mt-0" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-28 h-28 md:w-40 md:h-40 border border-[#C5A35D]/20 flex items-center justify-center rotate-45 bg-zinc-900 group-hover:border-[#C5A35D]/50 transition-all duration-700 overflow-hidden">
                <div className="-rotate-45 flex items-center justify-center">
                  <span className="text-5xl md:text-7xl font-bold text-[#C5A35D]">
                    {userData.name ? userData.name[0].toUpperCase() : "U"}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#C5A35D] p-2 rotate-45 shadow-lg">
                <ShieldCheck size={16} className="text-black -rotate-45" />
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A35D] font-black italic bg-[#C5A35D]/5 px-3 py-1 border border-[#C5A35D]/10">
                    {userData.status}
                  </span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl tracking-tighter italic text-white break-words">
                  {userData.name}
                </h1>
                <p className="text-zinc-500 font-light flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base">
                  <Mail size={14} className="text-zinc-700" /> {userData.email}
                </p>
              </div>

              {/* Stats/Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-1">Studio Location</p>
                  <p className="text-sm font-medium flex items-center justify-center md:justify-start gap-1">
                    <MapPin size={12} className="text-[#C5A35D]" /> Sri Lanka
                  </p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-1">Member Since</p>
                  <p className="text-sm font-medium text-zinc-300">
                    {userData.registeredAt
                      ? new Date(userData.registeredAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                      : "2024"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Grid - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 md:mt-16">
            <Link 
              href="/orders"
              className="group flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 p-6 border border-white/5 bg-white/[0.02] hover:bg-[#C5A35D] transition-all duration-500 rounded-sm"
            >
              <Package size={20} className="sm:mb-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-black transition-colors">
                Orders
              </span>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="group flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 p-6 border border-white/5 bg-white/[0.02] hover:bg-red-950/20 transition-all duration-500 rounded-sm focus:outline-none"
            >
              <LogOut size={20} className="sm:mb-3 text-red-900/50 group-hover:text-red-500 transition-colors" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-red-500 transition-colors">
                Sign Out
              </span>
            </button>
          </div>
        </div>

        {/* Footer Brand Mention */}
        <div className="mt-16 flex flex-col items-center space-y-6">
          <div className="flex items-center gap-4 opacity-20">
            <div className="h-[1px] w-16 sm:w-24 bg-[#C5A35D]" />
            <Diamond size={12} fill="#C5A35D" className="text-[#C5A35D]" />
            <div className="h-[1px] w-16 sm:w-24 bg-[#C5A35D]" />
          </div>
          <Link href="/" className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 hover:text-[#C5A35D] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}