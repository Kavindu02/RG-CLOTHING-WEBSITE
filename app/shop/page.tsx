"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products as defaultProducts, categories } from "@/lib/products"
import { SlidersHorizontal, X } from "lucide-react"

export default function ShopPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 30000])
  const [sortBy, setSortBy] = useState("featured")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [productList, setProductList] = useState(defaultProducts)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('products') : null;
    if (stored) {
      try {
        setProductList(JSON.parse(stored));
      } catch {
        setProductList(defaultProducts);
      }
    } else {
      setProductList(defaultProducts);
    }
  }, [])

  // Smooth scroll to #pure-refinement if hash is present after navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#pure-refinement') {
        setTimeout(() => {
          const el = document.getElementById('pure-refinement');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200); // Wait for page/render
      }
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productList.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })

    switch (sortBy) {
      case "price-low": filtered.sort((a, b) => a.price - b.price); break
      case "price-high": filtered.sort((a, b) => b.price - a.price); break
      case "newest": filtered.reverse(); break
      default: break
    }
    return filtered
  }, [selectedCategory, priceRange, sortBy, productList])

  return (
    // Background eka thawa modern kala (Soft Zinc shades)
    <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100 selection:bg-primary selection:text-black">
      <Navigation />

      {/* --- Ambient Background Effects --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      {/* --- Page Header --- */}
      <section id="pure-refinement" className="relative w-full pt-44 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-8 bg-primary/50" />
            <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white">Curated Collection</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl tracking-tight leading-[0.9] text-white"
          >
            Fine Linen <span className="italic text-zinc-600 font-light">Gallery.</span> 
          </motion.h1>
        </div>
      </section>

      {/* --- Modern Glass Control Bar --- */}
      <section className="sticky top-[72px] z-30 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl px-8 h-20 flex items-center justify-between shadow-2xl shadow-black/50">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-primary transition-colors lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="hidden lg:block text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 border-r border-white/10 pr-6">
                {filteredAndSortedProducts.length} Results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[10px] font-black tracking-widest uppercase text-zinc-200 focus:ring-0 cursor-pointer"
              >
                <option value="featured" className="bg-[#18181b]">Featured</option>
                <option value="newest" className="bg-[#18181b]">New Arrivals</option>
                <option value="price-low" className="bg-[#18181b]">Price Low</option>
                <option value="price-high" className="bg-[#18181b]">Price High</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Desktop Filters (Refined) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-48">
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                  <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onPriceChange={(min, max) => setPriceRange([min, max])}
                    onSortChange={setSortBy}
                  />
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                {filteredAndSortedProducts.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
                  >
                    {filteredAndSortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="h-[400px] flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10"
                  >
                    <p className="font-serif text-xl italic text-zinc-500">No pieces found</p>
                    <button onClick={() => setSelectedCategory("All")} className="mt-4 text-[10px] uppercase tracking-widest text-primary">Reset</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}