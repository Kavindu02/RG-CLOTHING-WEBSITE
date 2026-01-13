"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Diamond } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CartIcon } from "./cart-icon"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
        
        scrolled 
          ? "bg-[#000000] border-b border-white/[0.05] py-4" 
          : "bg-transparent md:bg-transparent py-6 md:py-10 max-md:bg-[#000000] max-md:py-4 max-md:border-b max-md:border-white/5"
      }`}
    >
      <nav className="max-w-[1800px] mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* --- 1. Branding --- */}
        <div className="flex items-center gap-4 md:gap-12">
          <Link 
            href="/" 
            className="font-serif text-2xl md:text-3xl font-light tracking-tighter text-white"
          >
            RG<span className="text-[#C5A35D] italic">.</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-10 h-6">
             <Diamond size={6} fill="#C5A35D" className="text-[#C5A35D] opacity-40" />
             <p className="text-[8px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Fine Bedding</p>
          </div>
        </div>

        {/* --- 2. Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-all duration-500 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A35D] group-hover:w-full transition-all duration-500" />
          </Link>
          {["about", "products", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => scrollToSection(e, item)}
              className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-all duration-500 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A35D] group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        {/* --- 3. Right Actions (No Search Button) --- */}
        <div className="flex items-center gap-5 md:gap-8">
          <div className="relative group">
            <CartIcon />
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 items-end group z-[110]"
            aria-label="Toggle Menu"
          >
            <span className={`h-[1px] bg-white transition-all duration-500 ease-out ${isOpen ? 'w-8 rotate-45 translate-y-[3.5px]' : 'w-8'}`} />
            <span className={`h-[1px] bg-[#C5A35D] transition-all duration-500 ${isOpen ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`h-[1px] bg-white transition-all duration-500 ease-out ${isOpen ? 'w-8 -rotate-45 -translate-y-[3.5px]' : 'w-8'}`} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Full-Screen Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#000000] z-[105] md:hidden flex flex-col p-8 pt-32"
          >
            <div className="space-y-12 relative z-10">
              <div className="flex flex-col gap-8">
                <Link
                  href="/"
                  className="text-5xl font-serif text-white italic hover:text-[#C5A35D] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {["about", "products", "contact"].map((item, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={item}
                    href={`#${item}`}
                    className="text-5xl font-serif text-white italic hover:text-[#C5A35D] transition-colors flex items-baseline gap-4"
                    onClick={(e) => scrollToSection(e, item)}
                  >
                    <span className="text-xs font-sans not-italic text-zinc-800 font-bold">0{idx + 1}</span>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="mt-auto pb-10 space-y-6">
              <div className="h-[1px] w-full bg-white/5" />
              <div className="flex justify-between items-center">
                 <p className="text-[8px] tracking-[0.5em] text-zinc-600 uppercase font-black">Limited Edition</p>
                 <Diamond size={8} className="text-[#C5A35D]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}