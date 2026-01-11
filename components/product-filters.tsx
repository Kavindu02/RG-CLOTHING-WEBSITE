"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Minus } from "lucide-react"

interface ProductFiltersProps {
  categories: string[]
  onCategoryChange: (category: string) => void
  onPriceChange: (min: number, max: number) => void
  onSortChange: (sort: string) => void
  selectedCategory: string
}

export function ProductFilters({
  categories,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  selectedCategory,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState(30000)
  const [openSections, setOpenSections] = useState<string[]>(["category", "price"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange(value)
    onPriceChange(0, value)
  }

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="space-y-6">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between group"
        >
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/90 group-hover:text-primary transition-colors">
            Collections
          </span>
          <ChevronDown 
            size={14} 
            className={`text-zinc-500 transition-transform duration-500 ${openSections.includes("category") ? "rotate-180" : ""}`} 
          />
        </button>

        <AnimatePresence>
          {openSections.includes("category") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className="flex items-center gap-4 group w-full text-left"
                  >
                    <motion.div 
                      className={`h-[1px] transition-all duration-500 ${selectedCategory === category ? "w-6 bg-primary" : "w-0 bg-zinc-700 group-hover:w-4"}`}
                    />
                    <span className={`text-sm tracking-wide transition-all duration-300 ${selectedCategory === category ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"}`}>
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-6">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between group"
        >
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/90 group-hover:text-primary transition-colors">
            Price Limit
          </span>
          <ChevronDown 
            size={14} 
            className={`text-zinc-500 transition-transform duration-500 ${openSections.includes("price") ? "rotate-180" : ""}`} 
          />
        </button>

        <AnimatePresence>
          {openSections.includes("price") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-4">
                <div className="relative h-1 w-full bg-zinc-900 rounded-full">
                  <input
                    type="range"
                    min="0"
                    max="30000"
                    step="500"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-primary z-10"
                  />
                  <div 
                    className="absolute h-full bg-zinc-700 rounded-full" 
                    style={{ width: `${(priceRange / 30000) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600">Under</p>
                    <p className="text-sm font-medium text-zinc-200">
                      {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(priceRange)}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600">Max</p>
                    <p className="text-sm font-medium text-zinc-200">Rs. 30,000</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Info - Desktop Minimal */}
      <div className="pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 text-zinc-600">
          <Minus size={16} />
          <p className="text-[9px] uppercase tracking-[0.3em] leading-relaxed">
            Refining your search for the perfect night's sleep.
          </p>
        </div>
      </div>
    </div>
  )
}