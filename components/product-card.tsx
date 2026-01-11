"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative w-full flex flex-col">
      {/* --- Image Section --- */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#121214] transition-all duration-700 ease-out group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover opacity-90 transition-all duration-[1.5s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 group-hover:opacity-100"
          />
        </Link>

        {/* --- Top Left: Subtle Badge --- */}
        <div className="absolute top-5 left-5 overflow-hidden">
          <motion.p 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            className="text-[8px] tracking-[0.4em] uppercase font-black text-white/40 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5"
          >
            {product.category}
          </motion.p>
        </div>

        {/* --- Out of Stock Badge --- */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#0a0a0b]/80 backdrop-blur-[3px] flex items-center justify-center z-10">
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-zinc-500">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="mt-8 flex flex-col items-center text-center space-y-4 px-2">
        <div className="space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-2xl md:text-3xl text-zinc-200 group-hover:text-white transition-colors duration-500 tracking-tight">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex flex-col items-center">
             <span className="text-lg font-light text-zinc-500 tracking-widest">
              {new Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>
        </div>

        {/* --- Interactive CTA --- */}
        <Link href={`/product/${product.id}`} className="relative pt-2 inline-block">
          <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            Discover Piece
          </span>
          <div className="h-[1px] bg-primary/30 w-12 mx-auto mt-2 transition-all duration-500 group-hover:w-full" />
        </Link>
      </div>
    </div>
  )
}