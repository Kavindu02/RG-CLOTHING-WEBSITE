"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Egyptian Cotton Premium",
    price: 24999,
    image: "/egyptian-cotton-premium-bedsheet.jpg",
    category: "Linen",
  },
  {
    id: "2",
    name: "Silk Blend Duvet",
    price: 8999,
    image: "/silk-duvet-cover.jpg",
    category: "Luxury",
  },
  {
    id: "3",
    name: "Luxury Pillow Set",
    price: 5999,
    image: "/luxury-pillows.jpg",
    category: "Pillows",
  },
  {
    id: "4",
    name: "Organic Protector",
    price: 3499,
    image: "/mattress-protector.jpg",
    category: "Essentials",
  },
]

export function FeaturedProducts() {
  return (
    <section className="w-full bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ duration: 0.8 }}
                className="h-[1px] bg-primary"
              />
              <span className="text-white tracking-[0.4em] text-[11px] font-bold uppercase drop-shadow-md">
                The Collection
              </span>
            </div>
            <h2 className="font-serif text-6xl md:text-8xl tracking-tighter text-white leading-[0.85]">
              Pure <br />
              <span className="italic text-zinc-700">Refinement.</span>
            </h2>
          </div>

          {/* --- Ultra Modern View Catalog Button --- */}
          <Link href="/shop" className="group relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-6 pl-8 pr-4 py-4 rounded-full border border-white/10 overflow-hidden"
            >
              {/* Liquid Hover Fill Effect */}
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              
              <span className="relative z-10 text-[11px] tracking-[0.3em] uppercase font-bold text-white group-hover:text-black transition-colors duration-300">
                View More
              </span>
              
              <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* --- Modern Product Grid (4 Columns) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden bg-zinc-900 aspect-[3/4] mb-6">
                  {/* Category Badge Slide-in */}
                  <div className="absolute top-0 left-0 z-20 overflow-hidden">
                    <div className="bg-primary px-4 py-2 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[9px] tracking-widest uppercase font-black text-black">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Image with Zoom Effect */}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />

                  {/* Bottom Reveal Plus Icon */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <Plus className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Info Area */}
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl md:text-2xl text-zinc-200 group-hover:text-white transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between overflow-hidden">
                    <p className="text-lg font-light text-zinc-500 group-hover:text-primary transition-colors duration-300">
                      {new Intl.NumberFormat("en-LK", {
                        style: "currency",
                        currency: "LKR",
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                    {/* Animated Line */}
                    <motion.div 
                      className="h-[1px] bg-zinc-800 flex-grow mx-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                    />
                    <span className="text-[10px] text-zinc-700 tracking-tighter uppercase font-bold">Details</span>
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