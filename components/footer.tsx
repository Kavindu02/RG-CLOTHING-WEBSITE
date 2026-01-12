"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUpRight, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Premium Background Gradient Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-zinc-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Identity Section */}
          <div className="md:col-span-5 space-y-10">
            <div className="space-y-6">
              <Link href="/" className="inline-block group">
                <h3 className="font-serif text-5xl font-light tracking-tighter transition-all duration-700 group-hover:tracking-normal">
                  RG <span className="italic text-zinc-600 group-hover:text-zinc-400 transition-colors">Bedsheets.</span>
                </h3>
              </Link>
              <p className="text-zinc-500 font-light text-lg leading-relaxed max-w-sm tracking-tight">
                Sculpting the sanctuary of your dreams with meticulous Sri Lankan artistry and an uncompromising vision of luxury.
              </p>
            </div>
            
            {/* Minimal Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" }
              ].map(({ Icon, label }, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  aria-label={label}
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-500 group"
                >
                  <Icon size={18} className="group-hover:rotate-12 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links Group */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            
            {/* Shop Navigation */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Collections</h4>
              <ul className="space-y-5">
                {["All Products", "Bed Sets", "Pillows", "Accessories"].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="group flex items-center text-[13px] text-zinc-400 hover:text-white transition-all duration-300">
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                        <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white italic font-serif">
                          {item}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Links */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Company</h4>
              <ul className="space-y-5">
                <li>
                  <Link href="#about" className="text-[13px] text-zinc-400 hover:text-white transition-all duration-300 relative group">
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-[13px] text-zinc-400 hover:text-white transition-all duration-300 relative group">
                    Contact Us
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-[13px] text-zinc-400 hover:text-white transition-all duration-300 relative group">
                    Shop
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-8 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Atelier</h4>
              <ul className="space-y-6 text-[13px] font-light text-zinc-400">
                <li className="flex items-start gap-4 group cursor-default">
                  <MapPin size={16} className="text-zinc-700 mt-0.5 group-hover:text-white transition-colors" />
                  <span className="leading-relaxed">Colombo 07,<br /><span className="text-zinc-600 uppercase text-[11px] font-bold tracking-widest">Sri Lanka</span></span>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                  <Phone size={16} className="text-zinc-700 group-hover:text-white transition-colors" />
                  <span className="font-mono tracking-tighter">+94 11 234 5678</span>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors overflow-hidden">
                  <Mail size={16} className="text-zinc-700 group-hover:text-white transition-colors" />
                  <span className="truncate border-b border-transparent hover:border-zinc-500 transition-all">hello@rgbedsheets.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Infrastructure */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
              &copy; {currentYear} RG BEDSHEETS.
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white">
              Defining the standard of excellence in Sri Lanka.
            </p>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all duration-500"
          >
            <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">Back To Top</span>
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:-translate-y-2">
              <ArrowUp size={20} className="transition-transform duration-500" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}