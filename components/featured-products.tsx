"use client"

import React from "react"
import Link from "next/link"
import { motion, easeInOut } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"

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
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1 }}
                className="h-[1px] bg-zinc-800"
              />
              <span className="text-zinc-500 tracking-[0.5em] text-[10px] font-black uppercase">
                The Collection
              </span>
            </div>
            <h2 className="font-serif text-7xl md:text-9xl tracking-tighter text-white leading-[0.85]">
              Pure <br />
              <span className="italic font-light text-zinc-700">Refinement.</span>
            </h2>
          </motion.div>

          {/* --- Ultra Modern View Catalog Button --- */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link href="/shop" className="group">
              <div className="flex items-center gap-6 pb-2 border-b border-zinc-800 group-hover:border-white transition-all duration-500">
                <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-zinc-500 group-hover:text-white transition-colors">
                  Explore All
                </span>
                <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* --- Modern Product Grid (4 Columns) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {latestProducts.map((product, index) => (
            <motion.div
              key={product.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden bg-zinc-950 aspect-[3/4] mb-8">
                  {/* Category Badge Slide-in */}
                  <div className="absolute top-0 left-0 z-20 overflow-hidden">
                    <div className="bg-white px-4 py-2 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="text-[9px] tracking-widest uppercase font-black text-black">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Image with Luxury Ken-Burns-like effect on hover */}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                  />

                  {/* Bottom Reveal Plus Icon */}
                  <div className="absolute bottom-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-14 h-14 bg-white flex items-center justify-center">
                      <Plus className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* Info Area */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-zinc-300 group-hover:text-white transition-colors duration-500 tracking-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between overflow-hidden">
                    <p className="text-lg font-light text-zinc-500 group-hover:text-white transition-colors duration-300">
                      {new Intl.NumberFormat("en-LK", {
                        style: "currency",
                        currency: "LKR",
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                    
                    {/* Animated Line - Home page එකේ feature grid එකේ වගේමයි */}
                    <motion.div 
                      className="h-[1px] bg-zinc-900 flex-grow mx-4 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    
                    <span className="text-[10px] text-zinc-800 tracking-widest uppercase font-black group-hover:text-zinc-500 transition-colors">Details</span>
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