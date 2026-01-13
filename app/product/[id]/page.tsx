"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag, Minus, Plus, ArrowLeft, ShieldCheck, Star } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  // Logic remains unchanged as requested
  let product = products.find((p) => p.id === productId)
  if (!product && typeof window !== 'undefined') {
    const stored = localStorage.getItem('products')
    if (stored) {
      try {
        const localProducts = JSON.parse(stored)
        product = localProducts.find((p: Product) => p.id === productId)
      } catch {}
    }
  }

  const { addItem } = useCart()
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-500 font-serif italic">
        <Navigation />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Product not found in archives...
        </motion.p>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product!, quantity, selectedSize, selectedColor) 
    setTimeout(() => setIsAdding(false), 2000)
  }

  return (
    <main className="min-h-screen w-full bg-[#050505] text-zinc-100 selection:bg-[#C5A35D] selection:text-black">
      <Navigation />

      <section className="pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto relative overflow-hidden">
        {/* Subtle Luxury Glows */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-[#C5A35D]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          {/* Minimal Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 md:mb-12"
          >
            <Link href="/shop" className="group inline-flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black text-zinc-600 hover:text-[#C5A35D] transition-all">
              <ArrowLeft size={12} className="md:w-[14px] md:h-[14px] group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 xl:gap-24">
            
            {/* --- Left: Hero Image Section --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 w-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 border border-white/5 rounded-sm group shadow-2xl">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                />
                
                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[9px] md:text-[11px] tracking-[0.6em] uppercase font-black text-[#C5A35D] border border-[#C5A35D]/30 px-6 md:px-10 py-3 md:py-5">
                      Archived Piece
                    </span>
                  </div>
                )}

                {/* Corner Decorative Detail */}
                <div className="absolute top-0 left-0 w-12 md:w-20 h-12 md:h-20 border-l border-t border-[#C5A35D]/20 m-4 md:m-6 pointer-events-none" />
              </div>
            </motion.div>

            {/* --- Right: Detailed Specs & Acquisition --- */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="space-y-8 md:space-y-12">
                {/* Product Meta & Title */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Star size={10} className="md:w-3 md:h-3" fill="#C5A35D" stroke="none" />
                    <span className="text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-black">
                      {product.category} // {product.material}
                    </span>
                  </div>
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic leading-[0.85] tracking-tighter text-white">
                    {product.name}
                  </h1>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                    {product.description}
                  </p>
                </div>

                {/* Investment Value */}
                <div className="py-6 md:py-8 border-y border-white/5 flex items-baseline gap-3 md:gap-4">
                  <span className="text-2xl md:text-4xl font-serif text-[#C5A35D]">
                    {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(product.price)}
                  </span>
                  <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-zinc-800 font-black italic">Investment Value</span>
                </div>

                {/* Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-black text-zinc-600">Scale</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-10 md:h-11 px-4 md:px-6 text-[9px] md:text-[10px] font-black transition-all duration-500 border ${
                            selectedSize === size ? "bg-white text-black border-white" : "border-zinc-900 text-zinc-600 hover:border-zinc-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-black text-zinc-600">Palette</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`h-10 md:h-11 px-4 md:px-6 text-[9px] md:text-[10px] font-black transition-all duration-500 border ${
                            selectedColor === color ? "bg-white text-black border-white" : "border-zinc-900 text-zinc-600 hover:border-zinc-700"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interaction Section */}
                <div className="pt-4 md:pt-6 space-y-6 md:space-y-8">
                  <div className="flex flex-col gap-3 md:gap-4">
                    {/* Qty Control */}
                    <div className="flex items-center justify-between border border-zinc-900 bg-zinc-950 px-4 h-12 md:h-14 w-full sm:w-40">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-zinc-600 hover:text-white transition-colors"><Minus size={12} className="md:w-3.5 md:h-3.5"/></button>
                      <span className="text-xs font-black">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="text-zinc-600 hover:text-white transition-colors"><Plus size={12} className="md:w-3.5 md:h-3.5"/></button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAdding}
                      className="w-full bg-white text-black h-12 md:h-14 flex items-center justify-center font-black text-[10px] md:text-[11px] tracking-[0.5em] uppercase hover:bg-[#C5A35D] transition-colors duration-500 disabled:opacity-20 relative overflow-hidden group"
                    >
                      <AnimatePresence mode="wait">
                        {isAdding ? (
                          <motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 italic">
                            Secured in Vault
                          </motion.span>
                        ) : (
                          <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 md:gap-3">
                            <ShoppingBag size={12} className="md:w-3.5 md:h-3.5" /> Add Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>

                  {/* Trust Factors */}
                  <div className="flex items-center gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <ShieldCheck size={16} className="md:w-[18px] md:h-[18px] text-[#C5A35D]" strokeWidth={1} />
                      <span className="text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-zinc-600 font-bold leading-tight">Certified <br /> Authenticity</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}