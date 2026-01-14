"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Diamond } from "lucide-react"

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/luxury-premium-bedsheet-collection.jpg",
    "/beige-silk-duvet-cover.jpg",
    "/luxury-bedding-product-photography-elegant.jpg",
    "/premium-white-pillows.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-screen min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden bg-[#050505]">
      
      {/* --- Background Slider --- */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              opacity: index === currentImageIndex ? 0.35 : 0,
              scale: index === currentImageIndex ? 1.05 : 1 
            }}
            transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt="Premium Collection"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </motion.div>
        ))}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-90" />
      </div>

      {/* --- Architectural Lines (Gold Tint) --- */}
      <div className="absolute inset-0 flex justify-between px-4 sm:px-6 md:px-16 lg:px-24 pointer-events-none opacity-[0.03]">
        <div className="w-[1px] h-full bg-[#C5A35D]" />
        <div className="w-[1px] h-full bg-[#C5A35D] hidden md:block" />
        <div className="w-[1px] h-full bg-[#C5A35D] hidden md:block" />
        <div className="w-[1px] h-full bg-[#C5A35D]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-center">
          
          {/* --- Content Side --- */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12 md:space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-6 sm:space-y-8 md:space-y-10"
            >
              <div className="flex items-center gap-3 sm:gap-5">
                <Diamond size={8} className="sm:w-2.5 sm:h-2.5 text-[#C5A35D]" fill="#C5A35D" />
                <span className="text-[#C5A35D] tracking-[0.7em] text-[8px] sm:text-[10px] font-black uppercase">
                  The Essence of Living
                </span>
              </div>
              
              <h1 className="font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.8] text-white tracking-tighter">
                SILK-LIKE <br />
                <span className="italic font-light text-zinc-800 hover:text-[#C5A35D] transition-all duration-1000 cursor-default">
                  PERFECTION.
                </span>
              </h1>
            </motion.div>

            {/* Discover Action (Gold Accent) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              >
                <Link href="/shop" className="group inline-flex items-center gap-6 sm:gap-10 lg:gap-12 outline-none">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white/5 group-hover:border-[#C5A35D]/50 group-hover:scale-110 transition-all duration-700 relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 bg-[#C5A35D] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      />
                      <ArrowUpRight className="absolute inset-0 m-auto w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white group-hover:text-black z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <span className="block text-[8px] sm:text-[9px] tracking-[0.6em] font-black text-zinc-700 uppercase group-hover:text-[#C5A35D] transition-colors">View The</span>
                    <span className="block text-lg sm:text-xl md:text-2xl font-serif italic text-white group-hover:translate-x-3 transition-transform duration-700">Bespoke Collection</span>
                  </div>
                </Link>
              </motion.div>
          </div>

          {/* --- Right Info Panel --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 1.2 }}
            className="lg:col-span-4 hidden lg:flex flex-col gap-24 items-end"
          >
            <div className="text-right">
              <p className="text-[#C5A35D] tracking-[0.8em] text-[9px] font-black uppercase border-b border-[#C5A35D]/20 pb-2 inline-block">
                Limited Archive
              </p>
            </div>

            <div className="relative w-full max-w-[320px]">
              <div className="p-12 border border-white/[0.03] backdrop-blur-3xl bg-white/[0.01] space-y-12">
                <div className="space-y-3">
                  <p className="text-[8px] text-zinc-700 uppercase tracking-[0.4em] font-black">Origin</p>
                  <p className="text-2xl text-white font-serif italic tracking-tight">Sri Lanka</p>
                </div>
                <div className="space-y-3">
                  <p className="text-[8px] text-zinc-700 uppercase tracking-[0.4em] font-black">Composition</p>
                  <p className="text-xl text-white font-light tracking-tight">100% Giza Cotton</p>
                </div>
                
                {/* Visual Progress (Gold) */}
                <div className="flex items-end gap-3 h-8">
                  {images.map((_, i) => (
                    <div 
                      key={i} 
                      className={`transition-all duration-1000 ${i === currentImageIndex ? "w-12 h-[2px] bg-[#C5A35D]" : "w-4 h-[1px] bg-zinc-900"}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ambient Gold Glow */}
      <div className="absolute -bottom-48 -left-48 w-[800px] h-[800px] bg-[#C5A35D]/[0.02] rounded-full blur-[150px] pointer-events-none" />
    </section>
  )
}