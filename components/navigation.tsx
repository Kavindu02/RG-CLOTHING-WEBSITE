"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag } from "lucide-react"
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-4" 
          : "bg-transparent py-8"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* 1. Left: Branding/Logo */}
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="font-serif text-3xl font-bold tracking-tighter text-white group"
          >
            RG<span className="text-primary group-hover:pl-1 transition-all">.</span>
          </Link>

          {/* Hidden on mobile, shown on desktop as sub-branding */}
          <div className="hidden lg:block h-6 w-[1px] bg-white/20" />
          <p className="hidden lg:block text-[9px] tracking-[0.4em] text-white/40 uppercase font-medium">
            Fine Bedding
          </p>
        </div>

        {/* 2. Right: Links & Actions */}
        <div className="flex items-center gap-12">
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
            {["about", "products", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => scrollToSection(e, item)}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6 border-l border-white/10 pl-10">
            
            
            <div className="relative hover:scale-110 transition-transform">
              <CartIcon />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Full-Screen Menu --- */}
      <div 
        className={`fixed inset-0 bg-[#050505] z-[-1] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          <Link
            href="/"
            className={`text-4xl font-serif text-white hover:text-primary transition-all ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `0ms` }}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {["about", "products", "contact"].map((item, idx) => (
            <a
              key={item}
              href={`#${item}`}
              className={`text-4xl font-serif text-white hover:text-primary transition-all ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
              onClick={(e) => { scrollToSection(e, item); }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="absolute bottom-12 flex gap-6">
          <span className="text-[10px] tracking-widest text-white/20 uppercase">Colombo</span>
          <span className="text-[10px] tracking-widest text-white/20 uppercase">Instagram</span>
        </div>
      </div>
    </header>
  )
}