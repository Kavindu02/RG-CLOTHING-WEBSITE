"use client"

import { useState } from "react"

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { CartIcon } from "./cart-icon"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-primary">
          RG
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={e => scrollToSection(e, 'hero')}>
            Home
          </a>
          <a href="#about" className="text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={e => scrollToSection(e, 'about')}>
            About
          </a>
          <a href="#products" className="text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={e => scrollToSection(e, 'products')}>
            Products
          </a>
          <a href="#contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={e => scrollToSection(e, 'contact')}>
            Contact
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-accent transition-colors text-foreground">
            <Search size={20} />
          </button>
          <CartIcon />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#hero"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={e => { scrollToSection(e, 'hero'); setIsOpen(false); }}
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={e => { scrollToSection(e, 'about'); setIsOpen(false); }}
            >
              About
            </a>
            <a
              href="#products"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={e => { scrollToSection(e, 'products'); setIsOpen(false); }}
            >
              Products
            </a>
            <a
              href="#blog"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={e => { scrollToSection(e, 'blog'); setIsOpen(false); }}
            >
              Blog
            </a>
            <a
              href="#contact"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={e => { scrollToSection(e, 'contact'); setIsOpen(false); }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
