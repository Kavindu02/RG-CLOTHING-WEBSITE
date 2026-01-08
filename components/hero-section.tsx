"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MoveDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden bg-[#050505]">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-premium-bedsheet-collection.jpg" 
          alt="RG Bedsheet Premium Collection"
          className="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[10s] hover:scale-110"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      {/* --- Floating Decorative Lines (Modern Aesthetic) --- */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5 hidden md:block" />
      <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/5 hidden md:block" />
      <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5 hidden md:block" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- Main Content (Left Side) --- */}
          <div className="lg:col-span-8 space-y-12">
            
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                <span className="text-primary tracking-[0.5em] text-[10px] font-bold uppercase">
                  The Essence of Living
                </span>
              </div>
              
              <h1 className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.8] text-white font-medium tracking-tighter">
                SILK-LIKE <br />
                <span className="text-white/20 hover:text-white transition-colors duration-700 cursor-default">
                  PERFECTION.
                </span>
              </h1>
            </div>

            <p className="max-w-md text-zinc-400 text-lg md:text-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              Where artisan craftsmanship meets the world's finest fabrics. 
              Elevate your sanctuary with RG's signature collection.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Link href="/shop">
                <Button className="group relative h-20 px-12 bg-white text-black hover:bg-white rounded-none overflow-hidden transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-widest uppercase">
                    Discover Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>

              <a
                href="#about"
                className="flex items-center gap-4 group cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById("about");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                  <MoveDown className="w-4 h-4 text-white animate-bounce" />
                </div>
                <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                  Scroll for Details
                </span>
              </a>
            </div>
          </div>

          {/* --- Right Side (Abstract Modern Details) --- */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-20 items-end animate-in fade-in zoom-in duration-1000 delay-500">
             {/* Year Indicator */}
             <div className="text-right">
               
                <p className="text-primary tracking-[0.5em] text-xs font-bold uppercase -mt-4 pr-4">
                  New Edition
                </p>
             </div>

             {/* Minimalist Stats Card */}
             <div className="p-10 border border-white/10 backdrop-blur-3xl bg-white/[0.02] space-y-6 w-full max-w-xs">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Handmade In</p>
                  <p className="text-xl text-white font-medium">Sri Lanka</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Material</p>
                  <p className="text-xl text-white font-medium">100% Giza Cotton</p>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent" />
             </div>
          </div>

        </div>
      </div>

      {/* --- Footer Accent --- */}
      <div className="absolute bottom-10 left-6 md:left-12 flex gap-10 text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase">
        <p className="hover:text-primary transition-colors cursor-pointer">Facebook</p>
        <p className="hover:text-primary transition-colors cursor-pointer">Instagram</p>
        <p className="hover:text-primary transition-colors cursor-pointer">Pinterest</p>
      </div>

      {/* Modern Blur Accent */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[180px]" />
    </section>
  )
}