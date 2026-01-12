"use client"

import React from "react"
import Link from "next/link"
import { motion, easeInOut } from "framer-motion"
import { ArrowRight, Plus, Diamond } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

function getLatestProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(-4).reverse();
        }
      } catch {}
    }
  }
  return [
    { id: "1", name: "Egyptian Cotton Premium", price: 24999, image: "/egyptian-cotton-premium-bedsheet.jpg", category: "Linen" },
    { id: "2", name: "Silk Blend Duvet", price: 8999, image: "/silk-duvet-cover.jpg", category: "Luxury" },
    { id: "3", name: "Luxury Pillow Set", price: 5999, image: "/luxury-pillows.jpg", category: "Pillows" },
    { id: "4", name: "Organic Protector", price: 3499, image: "/mattress-protector.jpg", category: "Essentials" },
  ];
}

export function FeaturedProducts() {
  const [latestProducts, setLatestProducts] = React.useState<Product[]>(getLatestProducts());

  React.useEffect(() => {
    function updateProducts() {
      setLatestProducts(getLatestProducts());
    }
    window.addEventListener('storage', updateProducts);
    updateProducts();
    return () => window.removeEventListener('storage', updateProducts);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: easeInOut }
  };

  return (
    <section className="w-full bg-transparent py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <motion.div {...fadeInUp} className="space-y-6">
            <div className="flex items-center gap-6">
              <Diamond size={10} fill="#C5A35D" className="text-[#C5A35D]" />
              <span className="text-[#C5A35D] tracking-[0.6em] text-[10px] font-black uppercase">
                New Arrivals
              </span>
            </div>
            <h2 className="font-serif text-7xl md:text-9xl tracking-tighter text-white leading-[0.8]">
              Pure <br />
              <span className="italic font-light text-zinc-800 hover:text-[#C5A35D] transition-colors duration-1000 cursor-default">Refinement.</span>
            </h2>
          </motion.div>

          {/* --- View Catalog Button (Gold Themed) --- */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link href="/shop" className="group">
              <div className="flex items-center gap-6 pb-2 border-b border-zinc-900 group-hover:border-[#C5A35D] transition-all duration-500">
                <span className="text-[10px] tracking-[0.4em] uppercase font-black text-zinc-600 group-hover:text-white transition-colors">
                  Explore Archives
                </span>
                <ArrowRight className="w-5 h-5 text-zinc-800 group-hover:text-[#C5A35D] group-hover:translate-x-2 transition-all" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* --- Modern Product Grid (4 Columns) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {latestProducts.map((product, index) => (
            <motion.div
              key={product.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`} className="group block outline-none">
                <div className="relative overflow-hidden bg-zinc-950 aspect-[3/4] mb-10 border border-white/[0.03]">
                  {/* Category Badge Slide-in (Gold) */}
                  <div className="absolute top-0 left-0 z-20 overflow-hidden">
                    <div className="bg-[#C5A35D] px-5 py-3 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="text-[8px] tracking-[0.2em] uppercase font-black text-black">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Image with Luxury Scale effect */}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
                  />

                  {/* Bottom Reveal Plus Icon (Gold) */}
                  <div className="absolute bottom-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-16 h-16 bg-[#C5A35D] flex items-center justify-center">
                      <Plus className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                </div>

                {/* Info Area */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xl font-light text-zinc-600 group-hover:text-[#C5A35D] transition-colors duration-500">
                      {new Intl.NumberFormat("en-LK", {
                        style: "currency",
                        currency: "LKR",
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                    
                    {/* Animated Gold Line */}
                    <motion.div 
                      className="h-[1px] bg-[#C5A35D]/20 flex-grow origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    
                    <span className="text-[8px] text-zinc-800 tracking-[0.4em] uppercase font-black group-hover:text-zinc-500 transition-colors">Artifact</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}