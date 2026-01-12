"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Product } from "@/lib/products"
import { ArrowUpRight } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="group relative w-full flex flex-col bg-transparent"
    >
      {/* --- Image Section with Luxury Frame --- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-white/[0.03] transition-all duration-700">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover opacity-80 grayscale-[0.3] transition-all duration-[1.8s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </Link>

        {/* --- Top Metadata Badge --- */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="text-[8px] tracking-[0.5em] uppercase font-black text-white/30">
            {product.material}
          </span>
          <div className="h-[1px] w-4 bg-[#C5A35D]/40 group-hover:w-8 transition-all duration-700" />
        </div>

        {/* --- Price Float on Hover --- */}
        <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2">
            <span className="text-[10px] font-serif italic text-[#C5A35D]">
              {new Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>
        </div>

        {/* --- Out of Stock Overlay --- */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="text-[9px] tracking-[0.6em] uppercase font-black text-[#C5A35D]/50 italic">
              Archived
            </span>
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="mt-8 flex flex-col items-start space-y-3">
        <div className="w-full flex justify-between items-start">
          <div className="space-y-1 flex-1">
            <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-zinc-600">
              {product.category}
            </span>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-serif text-2xl text-zinc-200 group-hover:text-[#C5A35D] transition-colors duration-500 tracking-tight italic">
                {product.name}
              </h3>
            </Link>
          </div>
          
          {/* Animated Arrow Icon */}
          <div className="pt-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <ArrowUpRight size={18} className="text-[#C5A35D]" strokeWidth={1} />
          </div>
        </div>

        {/* Discover Link - Underline Effect */}
        <Link 
          href={`/product/${product.id}`} 
          className="text-[9px] tracking-[0.4em] uppercase font-black text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
        >
          View Artifact
          <div className="h-[1px] w-6 bg-zinc-800 group-hover:w-12 group-hover:bg-[#C5A35D] transition-all duration-700" />
        </Link>
      </div>
    </motion.div>
  )
}