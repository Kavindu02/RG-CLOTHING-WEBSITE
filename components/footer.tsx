"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUpRight, ArrowUp, Diamond } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/[0.03] relative overflow-hidden">
      {/* Premium Background Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A35D]/30 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A35D]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          
          {/* Brand Identity Section */}
          <div className="md:col-span-5 space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
              <Link href="/" className="inline-block group">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter transition-all duration-700">
                  RG <span className="italic text-zinc-800 group-hover:text-[#C5A35D] transition-colors duration-700">Bedsheets.</span>
                </h3>
              </Link>
              <p className="text-zinc-500 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-sm tracking-tight">
                Sculpting the sanctuary of your dreams with meticulous Sri Lankan artistry and an uncompromising vision of luxury.
              </p>
            </div>
            
            {/* Minimal Social Icons (Gold Accent) */}
            <div className="flex items-center gap-3 sm:gap-5">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" }
              ].map(({ Icon, label }, index) => (
                <Link 
                  key={index} 
                  href="https://www.facebook.com/profile.php?id=61584223415123" 
                  aria-label={label}
                  className="w-12 sm:w-14 h-12 sm:h-14 bg-zinc-950 border border-white/5 flex items-center justify-center hover:bg-[#C5A35D] hover:border-[#C5A35D] transition-all duration-700 group rotate-45"
                >
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px] text-[#C5A35D] group-hover:text-black -rotate-45 transition-all duration-500 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links Group */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            
            {/* Shop Navigation */}
            <div className="space-y-6 sm:space-y-10">
              <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A35D]">Collections</h4>
              <ul className="space-y-4 sm:space-y-6">
                {["All Products", "Bed Sets", "Pillows", "Accessories"].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="group flex items-center text-[11px] sm:text-[13px] text-zinc-500 hover:text-white transition-all duration-300">
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                        <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#C5A35D] italic font-serif">
                          {item}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Links */}
            <div className="space-y-6 sm:space-y-10">
              <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A35D]">Company</h4>
              <ul className="space-y-4 sm:space-y-6">
                {["About Us", "Contact Us", "Shop"].map((item) => (
                   <li key={item}>
                    <Link 
                      href={item === "About Us" ? "#about" : item === "Contact Us" ? "#contact" : "/shop"} 
                      className="text-[11px] sm:text-[13px] text-zinc-500 hover:text-white transition-all duration-300 relative group inline-block">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A35D] transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 sm:space-y-10 col-span-2 md:col-span-1">
              <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A35D]">Contacts</h4>
              <ul className="space-y-5 sm:space-y-8 text-[11px] sm:text-[13px] font-light text-zinc-500">
                <li className="flex items-start gap-3 sm:gap-5 group cursor-default">
                  <MapPin size={14} className="sm:w-4 sm:h-4 text-zinc-800 mt-0.5 group-hover:text-[#C5A35D] transition-colors flex-shrink-0" />
                  <span className="leading-relaxed group-hover:text-zinc-300 transition-colors">D62/A, Warakapola.<br /><span className="text-zinc-700 uppercase text-[9px] sm:text-[10px] font-black tracking-widest">Sri Lanka</span></span>
                </li>
                <li className="flex items-center gap-3 sm:gap-5 group cursor-pointer hover:text-white transition-colors">
                  <Phone size={14} className="sm:w-4 sm:h-4 text-zinc-800 group-hover:text-[#C5A35D] transition-colors flex-shrink-0" />
                  <span className="font-mono text-[10px] sm:text-[13px] tracking-tighter group-hover:translate-x-1 transition-transform">+94 77 892 0954</span>
                </li>
                <li className="flex items-center gap-3 sm:gap-5 group cursor-pointer hover:text-white transition-colors overflow-hidden">
                  <Mail size={14} className="sm:w-4 sm:h-4 text-zinc-800 group-hover:text-[#C5A35D] transition-colors flex-shrink-0" />
                  <span className="truncate border-b border-transparent group-hover:border-[#C5A35D]/30 transition-all">rgbedsheet@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Infrastructure */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-6 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.5em] text-zinc-700 font-black">
              &copy; {currentYear} RG BEDSHEETS.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <Diamond size={7} className="sm:w-2 sm:h-2 text-[#C5A35D] fill-[#C5A35D]" />
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                Defining the standard of excellence.
              </p>
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-zinc-600 hover:text-[#C5A35D] transition-all duration-700"
          >
            <span className="order-2 md:order-1 opacity-100 md:opacity-0 md:-translate-x-6 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-700">Back To Top</span>
            <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#C5A35D] transition-all duration-700 md:group-hover:-translate-y-3 relative overflow-hidden order-1 md:order-2">
              <motion.div className="absolute inset-0 bg-[#C5A35D] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <ArrowUp size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5 relative z-10 transition-transform duration-500 group-hover:text-black" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}