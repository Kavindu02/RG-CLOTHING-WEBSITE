"use client"
import { useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, MessageSquare, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

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
    <main className="min-h-screen w-full bg-[#030303] text-white scroll-smooth selection:bg-white selection:text-black">
      <Navigation />
      
      {/* --- Hero Section --- */}
      <section id="hero" className="relative">
        <HeroSection />
      </section>

      {/* --- About Section: The Heritage --- */}
      <section id="about" className="relative w-full py-32 md:py-56 overflow-hidden bg-[#030303]">
        {/* Large Decorative Text Background */}
        <div className="absolute top-20 -left-10 text-[22vw] font-serif font-bold text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter leading-none">
          Legacy
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
            
            {/* Image Side with Luxury Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] shadow-2xl group">
                <img
                  src="/luxury-bedding-product-photography-elegant.jpg"
                  alt="Craftsmanship"
                  className="object-cover w-full h-full grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -right-6 md:-right-12 p-10 bg-white text-black shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                <p className="font-serif text-6xl font-light tracking-tighter leading-none">10<span className="text-2xl font-sans font-bold text-zinc-400">+</span></p>
                <p className="text-[9px] uppercase tracking-[0.4em] font-black mt-3 text-zinc-500 whitespace-nowrap">Years of Excellence</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <span className="w-16 h-[1px] bg-zinc-800"></span>
                  <span className="text-zinc-500 tracking-[0.5em] text-[10px] font-black uppercase">
                    The Artisan Philosophy
                  </span>
                </div>
                <h2 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tighter">
                  Crafting the Art of <br />
                  <span className="italic font-light text-zinc-600">Perfect Sleep.</span>
                </h2>
              </div>

              <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed max-w-2xl tracking-tight">
                At <span className="text-white font-medium italic underline underline-offset-8 decoration-zinc-800">RG Bedsheets</span>, we curate more than just fabric. We engineer sanctuaries, blending timeless Sri Lankan heritage with the pinnacle of global luxury standards.
              </p>

              {/* Feature Grid with Modern Minimal Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-10 border-t border-white/5">
                {[
                  "Premium Giza Cotton",
                  "Artisan Hand-stitched",
                  "Ethically Sourced",
                  "Global Luxury Grade"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-5 group cursor-default">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <Check className="w-2.5 h-2.5 text-zinc-500 group-hover:text-black" />
                    </div>
                    <span className="text-zinc-500 text-[11px] tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Modern CTA */}
              <div className="pt-10">
                <button
                  onClick={handleScrollToProducts}
                  className="group relative inline-flex items-center gap-10"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] tracking-[0.5em] uppercase font-black text-zinc-500 group-hover:text-white transition-colors">Discover the</span>
                    <span className="text-xl font-serif italic tracking-tight border-b border-zinc-800 pb-1 group-hover:border-white transition-all">Bespoke Collection</span>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Products: Minimal Container --- */}
      <section id="products" className="bg-[#030303] py-32 border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6">
           <FeaturedProducts />
        </div>
      </section>

      {/* --- Get in Touch: Dramatic Cinematic Section --- */}
      <section id="contact" className="relative py-40 md:py-64 bg-black overflow-hidden">
        
        {/* Ambient Moving Lights */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px] animate-pulse pointer-events-none" />

        {/* Cinematic Background Image (Ken Burns) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="silk-duvet-cover.jpg" 
            alt="Luxury Fabric Background"
            className="w-full h-full object-cover opacity-30 scale-105 animate-[ken-burns_30s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <span className="w-16 h-[1px] bg-white/20"></span>
                  <span className="text-zinc-500 tracking-[0.5em] text-[10px] font-black uppercase">
                    Inquiries
                  </span>
                </div>
                <h2 className="font-serif text-7xl md:text-9xl tracking-tighter leading-[0.85] text-white">
                  Let’s Start <br />
                  <span className="italic font-light text-zinc-600">Conversing.</span>
                </h2>
                <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-sm">
                  Seeking a custom aesthetic or wholesale partnership? Our consultants await your vision.
                </p>
              </div>

              {/* Minimal Contact List */}
              <div className="grid grid-cols-1 gap-10">
                {[
                  { icon: MessageSquare, label: "Correspondence", value: "hello@rgbedsheets.com" },
                  { icon: Phone, label: "Hotline", value: "+94 11 234 5678" },
                  { icon: MapPin, label: "The Studio", value: "72 Luxury Ave, Colombo 07" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                      <item.icon size={20} className="text-zinc-500 group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-1">{item.label}</p>
                      <p className="text-white font-medium text-lg tracking-tight group-hover:text-zinc-400 transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphism Form Container */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/[0.02] rounded-3xl blur-2xl" />
              <div className="relative bg-[#080808]/80 backdrop-blur-3xl border border-white/10 p-10 md:p-20 rounded-[2px] shadow-3xl">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      {/* Global Luxury Styles */}
      <style jsx global>{`
        @keyframes ken-burns {
          0%, 100% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.15) translate(-1%, -1%); }
        }
        ::selection {
          background-color: white;
          color: black;
        }
      `}</style>
    </main>
  )
}