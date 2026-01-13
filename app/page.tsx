"use client"
import { useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, MessageSquare, MapPin, Phone, Diamond } from "lucide-react"
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
    <main className="min-h-screen w-full bg-[#050505] text-white scroll-smooth selection:bg-[#C5A35D] selection:text-black">
      <Navigation />
      
      {/* --- Hero Section --- */}
      <section id="hero" className="relative">
        <HeroSection />
      </section>

      {/* --- About Section: The Heritage --- */}
      <section id="about" className="relative w-full py-16 sm:py-24 md:py-32 lg:py-64 overflow-hidden bg-[#050505]">
        {/* Large Decorative Text Background */}
        <div className="absolute top-8 sm:top-12 md:top-20 -left-10 text-[30vw] sm:text-[25vw] md:text-[22vw] font-serif font-black text-[#C5A35D]/[0.03] select-none pointer-events-none uppercase tracking-tighter leading-none">
          Legacy
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 md:gap-24 lg:gap-32 items-center">
            
            {/* Image Side with Luxury Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl group">
                <img
                  src="/luxury-bedding-product-photography-elegant.jpg"
                  alt="Craftsmanship"
                  className="object-cover w-full h-full grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[2s] ease-out scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 -right-4 sm:-right-6 md:-right-12 p-6 sm:p-8 md:p-10 bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform"
              >
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter leading-none text-black">
                  10<span className="text-lg sm:text-xl md:text-2xl font-sans font-black text-[#C5A35D]">+</span>
                </p>
                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] font-black mt-2 sm:mt-3 text-zinc-500 whitespace-nowrap">Years of Excellence</p>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-10 sm:space-y-12 md:space-y-16">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 sm:gap-6">
                  <Diamond size={8} className="sm:w-2.5 sm:h-2.5 text-[#C5A35D]" fill="#C5A35D" />
                  <span className="text-[#C5A35D] tracking-[0.6em] text-[8px] sm:text-[10px] font-black uppercase">
                    The Artisan Philosophy
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[0.8] tracking-tighter text-white">
                  Crafting the Art of <br />
                  <span className="italic font-light text-zinc-800 hover:text-[#C5A35D] transition-colors duration-1000 cursor-default inline-block mt-2 sm:mt-3 md:mt-4">Perfect Sleep.</span>
                </h2>
              </div>

              <p className="text-zinc-500 text-xs sm:text-sm md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                At <span className="text-white font-medium italic border-b border-[#C5A35D]/30 pb-1">RG Bedsheets</span>, we curate more than just fabric. We engineer sanctuaries, blending timeless Sri Lankan heritage with the pinnacle of global luxury standards.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-x-12 md:gap-y-10 pt-6 sm:pt-8 md:pt-10 border-t border-white/5">
                {[
                  "Premium Giza Cotton",
                  "Artisan Hand-stitched",
                  "Ethically Sourced",
                  "Global Luxury Grade"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 sm:gap-4 md:gap-5 group cursor-default">
                    <div className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 border border-[#C5A35D]/20 flex items-center justify-center group-hover:bg-[#C5A35D] group-hover:border-[#C5A35D] transition-all duration-500 rotate-45">
                      <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#C5A35D] group-hover:text-black -rotate-45" />
                    </div>
                    <span className="text-zinc-500 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-black group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Modern CTA */}
              <div className="pt-6 sm:pt-8 md:pt-10">
                <button
                  onClick={handleScrollToProducts}
                  className="group flex items-center gap-4 sm:gap-8 md:gap-12 outline-none"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[9px] tracking-[0.6em] uppercase font-black text-zinc-700 group-hover:text-[#C5A35D] transition-colors">Discover the</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-serif italic tracking-tight text-white group-hover:translate-x-2 transition-transform duration-700">Bespoke Collection</span>
                  </div>
                  <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#C5A35D] transition-all duration-700 relative overflow-hidden flex-shrink-0">
                    <motion.div 
                      className="absolute inset-0 bg-[#C5A35D] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    />
                    <ArrowRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white group-hover:text-black relative z-10 transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Products --- */}
      <section id="products" className="bg-[#050505] py-16 sm:py-24 md:py-32 border-y border-white/[0.03]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8">
           <FeaturedProducts />
        </div>
      </section>

      {/* --- Get in Touch Section --- */}
      <section id="contact" className="relative py-16 sm:py-24 md:py-40 lg:py-64 bg-black overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-[#C5A35D]/[0.03] rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] pointer-events-none" />

        <div className="absolute inset-0 z-0">
          <img 
            src="silk-duvet-cover.jpg" 
            alt="Luxury Fabric Background"
            className="w-full h-full object-cover opacity-20 scale-105 animate-[ken-burns_30s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 md:gap-24 lg:gap-32 items-center">
            
            <div className="space-y-20">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <Diamond size={10} fill="#C5A35D" className="text-[#C5A35D]" />
                  <span className="text-[#C5A35D] tracking-[0.6em] text-[10px] font-black uppercase">
                    Inquiries
                  </span>
                </div>
                <h2 className="font-serif text-6xl md:text-8xl tracking-tighter leading-[0.8] text-white">
                  Let’s Start <br />
                  <span className="italic font-light text-zinc-800 hover:text-[#C5A35D] transition-colors duration-1000 cursor-default">Conversing.</span>
                </h2>
              </div>

              {/* Minimal Contact List */}
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {[
                  { icon: MessageSquare, label: "Correspondence", value: "rgbedsheet@gmail.com" },
                  { icon: Phone, label: "Hotline", value: "+94 77 892 0954" },
                  { icon: MapPin, label: "The Studio", value: "D62/A, Warakapola." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 group cursor-pointer">
                    <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 flex-shrink-0 bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:bg-[#C5A35D] transition-all duration-700 rotate-45">
                      <item.icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#C5A35D] group-hover:text-black transition-colors -rotate-45" />
                    </div>
                    <div>
                      <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.5em] text-zinc-700 font-black mb-1">{item.label}</p>
                      <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl tracking-tight group-hover:text-[#C5A35D] transition-colors duration-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Container */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C5A35D]/20 to-transparent blur-sm opacity-50" />
              <div className="relative bg-[#080808]/90 backdrop-blur-3xl border border-white/5 p-6 sm:p-10 md:p-16 lg:p-20 shadow-2xl">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes ken-burns {
          0%, 100% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.15) translate(-1%, -1%); }
        }
      `}</style>
    </main>
  )
}