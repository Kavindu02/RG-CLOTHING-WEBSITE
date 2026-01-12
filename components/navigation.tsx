"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Diamond } from "lucide-react"
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
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled 
          ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.03] py-5" 
          : "bg-transparent py-10"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* 1. Left: Branding/Logo */}
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="font-serif text-3xl font-light tracking-tighter text-white group"
          >
            RG<span className="text-[#C5A35D] group-hover:pl-2 transition-all duration-700 italic">.</span>
          </Link>

          {/* Hidden on mobile, shown on desktop as sub-branding */}
          <div className="hidden lg:block h-8 w-[1px] bg-white/5 rotate-[25deg]" />
          <div className="hidden lg:flex items-center gap-3">
             <Diamond size={6} fill="#C5A35D" className="text-[#C5A35D] opacity-40" />
             <p className="text-[9px] tracking-[0.5em] text-zinc-600 uppercase font-black">
               Fine Bedding
             </p>
          </div>
        </div>

        {/* 2. Right: Links & Actions */}
        <div className="flex items-center gap-12">
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-all duration-500 relative group"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C5A35D] transition-all duration-700 group-hover:w-full" />
            </Link>
            {["about", "products", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => scrollToSection(e, item)}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-all duration-500 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C5A35D] transition-all duration-700 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-8 border-l border-white/5 pl-10">
            <div className="relative hover:scale-110 transition-all duration-500 group">
              <div className="absolute -inset-2 bg-[#C5A35D]/0 group-hover:bg-[#C5A35D]/5 rounded-full transition-all duration-700" />
              <CartIcon />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-[#C5A35D] transition-all duration-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Full-Screen Menu (Bespoke Style) --- */}
      <div 
        className={`fixed inset-0 bg-[#050505] z-[-1] flex flex-col items-center justify-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Decorative background text for Mobile Menu */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.02]">
           <span className="font-serif text-[40vw] font-black uppercase leading-none">RG</span>
        </div>

        <div className="flex flex-col items-center gap-12 relative z-10">
          <Link
            href="/"
            className={`text-5xl font-serif text-zinc-800 hover:text-[#C5A35D] transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `100ms` }}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {["about", "products", "contact"].map((item, idx) => (
            <a
              key={item}
              href={`#${item}`}
              className={`text-5xl font-serif text-zinc-800 hover:text-[#C5A35D] transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${(idx + 2) * 100}ms` }}
              onClick={(e) => { scrollToSection(e, item); }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="absolute bottom-16 flex flex-col items-center gap-6">
          <div className="w-12 h-[1px] bg-[#C5A35D]/30" />
        </div>
      </div>
    </header>
  )
}