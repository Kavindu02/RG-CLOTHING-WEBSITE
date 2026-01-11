"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  // Try to find product in static products first
  let product = products.find((p) => p.id === productId)
  // If not found, try to get from localStorage
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
      <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center p-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl italic text-zinc-600"
          >
            Product not found.
          </motion.p>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    // Here you would typically add selectedSize and selectedColor to the item
    addItem(product, quantity, selectedSize, selectedColor) 
    setTimeout(() => setIsAdding(false), 2000)
  }

  return (
    <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100">
      <Navigation />

      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back to Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500 hover:text-primary transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Gallery
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            
            {/* --- Left: Product Image & Secondary Views --- */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 shadow-xl shadow-black/30">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs tracking-[0.5em] uppercase font-bold text-zinc-500 border border-zinc-800 px-6 py-3 rounded-full">Archived Piece</span>
                  </div>
                )}
              </div>
              {/* Add more image thumbnails if available */}
              <div className="flex gap-4">
                {/* Placeholder for additional images */}
                {/* <div className="w-24 h-24 bg-zinc-800 rounded-lg" /> */}
              </div>
            </motion.div>

            {/* --- Right: Product Details & Interaction --- */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-1 flex flex-col justify-center"
            >
              <div className="space-y-8">
                {/* Product Title & Metadata */}
                <div className="space-y-3">
                  <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-zinc-500">
                    {product.category} — {product.material}
                  </p>
                  <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Description */}
                <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md">
                  {product.description}
                </p>

                {/* Pricing */}
                <div className="py-4 border-y border-white/5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-bold mb-1 block">Investment</span>
                  <span className="font-serif text-4xl text-white">
                    {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(product.price)}
                  </span>
                </div>

                {/* Options: Size & Color */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500">Dimensions</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-[10px] font-bold border rounded-full transition-all duration-300 ${
                            selectedSize === size ? "bg-white text-black border-white" : "border-white/10 text-zinc-500 hover:border-white/30"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500">Palette</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 text-[10px] font-bold border rounded-full transition-all duration-300 ${
                            selectedColor === color ? "bg-white text-black border-white" : "border-white/10 text-zinc-500 hover:border-white/30"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-6 pt-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center p-2 border border-white/5 bg-white/[0.02] rounded-full w-36">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><Minus size={14}/></button>
                    <span className="flex-1 text-center text-sm font-bold text-white">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><Plus size={14}/></button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={`flex-1 relative py-5 rounded-full overflow-hidden transition-all duration-500 font-bold tracking-[0.2em] uppercase text-[11px] group ${
                      isAdding ? "bg-primary text-black" : "bg-white text-black hover:bg-primary"
                    } disabled:opacity-20 disabled:cursor-not-allowed`}
                  >
                    <AnimatePresence mode="wait">
                      {isAdding ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <ShoppingBag size={18} /> Securely Added
                        </motion.span>
                      ) : (
                        <motion.span
                          key="acquire"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <ShoppingBag size={18} className="transition-transform group-hover:-rotate-12" /> Add Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
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