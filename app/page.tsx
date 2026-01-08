
"use client"
import { useCallback } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  // Fix: useCallback to ensure function identity and client-side execution
  const handleScrollToProducts = useCallback(() => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <main className="min-h-screen w-full scroll-smooth">
      <Navigation />
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/about-modern.jpg"
              alt="About RG Bedsheet"
              className="rounded-xl shadow-lg w-full max-w-md object-cover border border-border"
              style={{ minHeight: '320px', background: '#f3f4f6' }}
            />
          </div>
          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 text-left md:text-left">About RG Bedsheet</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              At <span className="font-semibold text-primary">RG Bedsheet</span>, we believe your bedroom should be a sanctuary of comfort and style. Our mission is to redefine luxury bedding in Sri Lanka by blending timeless design, premium materials, and exceptional craftsmanship.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-accent"></span>
                <span className="text-foreground/90">Premium, sustainable fabrics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-accent"></span>
                <span className="text-foreground/90">Handcrafted with care</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-accent"></span>
                <span className="text-foreground/90">Ethically sourced materials</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-accent"></span>
                <span className="text-foreground/90">Designed for lasting comfort</span>
              </li>
            </ul>
            <div className="pt-4">
              <button
                type="button"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow hover:opacity-90 transition"
                onClick={handleScrollToProducts}
              >
                Explore Our Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products">
        <FeaturedProducts />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Have a question or want to get in touch? Fill out the form below and our team will respond promptly.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
