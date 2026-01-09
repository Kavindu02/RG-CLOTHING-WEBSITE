"use client"
import { useCallback, useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, MessageSquare, MapPin, Phone } from "lucide-react"

export default function Home() {
  const handleScrollToProducts = useCallback(() => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white scroll-smooth">
      <Navigation />
      
      {/* --- Hero Section --- */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* --- About Section --- */}
      <section id="about" className="relative w-full py-24 md:py-40 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-10 left-10 text-[15vw] font-serif font-bold text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter">
          Quality
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
                <img
                  src="/luxury-bedding-product-photography-elegant.jpg"
                  alt="Craftsmanship"
                  className="object-cover w-full h-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 p-8 bg-white text-black shadow-[20px_20px_60px_rgba(0,0,0,0.5)]">
                <p className="font-serif text-4xl font-bold italic leading-none">10+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black mt-2 leading-none">Years Service</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  <span className="text-primary tracking-[0.4em] text-[11px] font-bold uppercase drop-shadow-md">
                    Our Heritage
                  </span>
                </div>
                <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tighter text-white drop-shadow-2xl">
                  Crafting the Art of <br />
                  <span className="italic text-zinc-500">Perfect Sleep.</span>
                </h2>
              </div>
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                At <span className="text-white font-medium border-b border-primary/50">RG Bedsheet</span>, we believe your bedroom is more than a space it's a sanctuary. We blend Sri Lankan craftsmanship with global luxury.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 pt-6 border-t border-white/10">
                {[
                  "Premium Giza Cotton",
                  "Artisan Hand-stitched",
                  "Ethically Sourced",
                  "Global Luxury Grade"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <Check className="w-3 h-3 text-primary group-hover:text-black" />
                    </div>
                    <span className="text-zinc-200 text-sm tracking-[0.1em] uppercase font-semibold group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <button
                  onClick={handleScrollToProducts}
                  className="group flex items-center gap-6 text-xs font-bold tracking-[0.4em] uppercase text-white hover:text-primary transition-all duration-300"
                >
                  <span className="border-b border-white/20 pb-2 group-hover:border-primary">Explore Collection</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-primary" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Products --- */}
      <section id="products" className="bg-[#050505] py-24 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
           <FeaturedProducts />
        </div>
      </section>

      {/* --- Modern Get in Touch Section --- */}
      <section id="contact" className="relative py-32 md:py-48 bg-[#050505] overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Side: Text Content */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  <span className="text-primary tracking-[0.5em] text-[11px] font-bold uppercase italic">
                    Contact Us
                  </span>
                </div>
                <h2 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none text-white">
                  Let’s Start <br />
                  <span className="italic text-zinc-500">Conversing.</span>
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                  Have a specific requirement or looking for a bespoke luxury collection? Our team is ready to assist you.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                    <MessageSquare className="w-5 h-5 text-zinc-500 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Email us</p>
                    <p className="text-white font-medium tracking-tight hover:text-primary transition-colors cursor-pointer">hello@rgbedsheets.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Phone className="w-5 h-5 text-zinc-500 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Call us</p>
                    <p className="text-white font-medium tracking-tight hover:text-primary transition-colors cursor-pointer">+94 11 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                    <MapPin className="w-5 h-5 text-zinc-500 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Visit Studio</p>
                    <p className="text-white font-medium tracking-tight hover:text-primary transition-colors cursor-pointer">72 Luxury Ave, Colombo 07, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Modern Glass Form */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-zinc-800/20 rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative backdrop-blur-3xl bg-white/[0.02] border border-white/10 p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}