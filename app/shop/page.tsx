"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products as defaultProducts, categories } from "@/lib/products"
import { SlidersHorizontal, ChevronDown, ArrowUpRight, Diamond, X } from "lucide-react"

// --- Custom Modern Dropdown Component (Luxury Gold Theme) ---
function ModernSort({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { label: "Featured Pieces", value: "featured" },
    { label: "New Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" }
  ];

  const currentLabel = options.find(opt => opt.value === value)?.label;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-6 group transition-all duration-300"
      >
        <span className="hidden sm:block text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-black group-hover:text-zinc-500">Order By</span>
        <div className="flex items-center gap-2 border-b border-white/5 group-hover:border-[#C5A35D]/40 pb-1 transition-all">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white min-w-[140px] text-right">
            {currentLabel}
          </span>
          <ChevronDown className={`w-3 h-3 text-[#C5A35D] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-6 z-50 min-w-[240px] bg-[#0c0c0c] border border-white/10 backdrop-blur-3xl p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col gap-1">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`text-left px-5 py-4 text-[9px] tracking-[0.3em] uppercase font-black transition-all duration-300
                      ${value === option.value 
                        ? "bg-[#C5A35D] text-black" 
                        : "text-zinc-500 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ShopPage() {
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
    }
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productList].filter((product) => {
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
    <main className="min-h-screen w-full bg-[#050505] text-white selection:bg-[#C5A35D] selection:text-black">
      <Navigation />

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A35D]/[0.02] rounded-full blur-[180px]" />
      </div>

      {/* Hero Header Experience */}
      <section className="relative w-full pt-48 pb-24 border-b border-white/[0.03]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <Diamond className="w-3 h-3 text-[#C5A35D] animate-pulse" fill="#C5A35D" />
            <span className="text-[10px] tracking-[0.8em] font-black uppercase text-zinc-600">The Archives</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] tracking-tighter"
          >
            PURE <br />
            <span className="italic font-light text-zinc-800 group hover:text-[#C5A35D] transition-colors duration-1000">GALLERY.</span> 
          </motion.h1>
        </div>
      </section>

      {/* Sticky Refinement Bar */}
      <section className="sticky top-[72px] z-30 w-full px-8 md:px-16 bg-[#050505]/90 backdrop-blur-3xl border-b border-white/[0.05]">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-24 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A35D]"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
              
              <div className="hidden lg:flex items-center gap-10">
                <div className="flex flex-col">
                   <span className="text-[9px] tracking-[0.3em] font-black uppercase text-zinc-700">Availability</span>
                   <span className="text-[11px] font-serif italic text-white">{filteredAndSortedProducts.length} Artifacts</span>
                </div>
                <div className="w-[1px] h-8 bg-white/5" />
                <span className="text-[9px] tracking-[0.5em] font-black uppercase text-zinc-500">Fine Textiles</span>
              </div>
            </div>

            <ModernSort value={sortBy} onChange={setSortBy} />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="w-full py-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Sidebar Filter */}
            <aside className="hidden lg:block lg:col-span-2 lg:sticky lg:top-40 lg:self-start">
              <div className="space-y-16">
                <div className="space-y-4">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.6em] text-zinc-700">Filter Archives</h3>
                  <div className="h-[1px] w-full bg-[#C5A35D]/20" />
                </div>
                <ProductFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onPriceChange={(min, max) => setPriceRange([min, max])}
                  onSortChange={setSortBy}
                />
              </div>
            </aside>

            {/* Gallery Grid */}
            <div className="lg:col-span-10">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20"
                  >
                    {filteredAndSortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="h-[60vh] flex flex-col items-center justify-center border border-white/[0.03] bg-zinc-950/20"
                  >
                    <p className="font-serif text-3xl italic text-zinc-800">No artifacts found.</p>
                    <button 
                      onClick={() => setSelectedCategory("All")} 
                      className="mt-10 group flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#C5A35D] font-black"
                    >
                      Reset Gallery <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-[#0a0a0a] border-t border-white/10 rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A35D]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white">Filter</span>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => { setSelectedCategory(cat); setIsMobileFilterOpen(false); }}
                onPriceChange={(min, max) => setPriceRange([min, max])}
                onSortChange={setSortBy}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}