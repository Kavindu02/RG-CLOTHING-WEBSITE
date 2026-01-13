"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
  selectedCategory,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState(30000)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange(value)
    onPriceChange(0, value)
  }

  return (
    <div className="space-y-12">
      {/* --- Section 01: Collections --- */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-black tracking-[0.6em] uppercase text-zinc-500">
            Select Archive
          </span>
          <div className="h-[1px] w-12 bg-[#C5A35D]/30" />
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="flex items-center gap-4 group w-full text-left outline-none"
            >
              {/* Luxury Diamond Indicator */}
              <div className="relative flex items-center justify-center w-3 h-3">
                <div 
                  className={`absolute w-full h-full border border-[#C5A35D]/50 transition-all duration-700 ease-out
                  ${selectedCategory === category ? "scale-100 rotate-45 opacity-100" : "scale-0 opacity-0"}`} 
                />
                <div 
                  className={`w-[1px] h-[1px] transition-all duration-500 
                  ${selectedCategory === category ? "bg-[#C5A35D] scale-[300%] opacity-100" : "bg-zinc-800 scale-100 opacity-50"}`} 
                />
              </div>
              
              <span className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-700 
                ${selectedCategory === category 
                  ? "text-[#C5A35D] font-black translate-x-3" 
                  : "text-zinc-600 hover:text-white hover:translate-x-2"}`}
              >
                {category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Section 02: Price Architecture --- */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-black tracking-[0.6em] uppercase text-zinc-500">
            Investment
          </span>
          <div className="h-[1px] w-12 bg-[#C5A35D]/30" />
        </div>

        <div className="space-y-6 pr-2">
          <div className="relative h-[2px] w-full bg-zinc-900">
            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={priceRange}
              onChange={handlePriceChange}
              className="absolute w-full h-[2px] bg-transparent appearance-none cursor-pointer accent-[#C5A35D] z-20 focus:outline-none"
            />
            <motion.div 
              initial={false}
              animate={{ width: `${(priceRange / 30000) * 100}%` }}
              className="absolute h-full bg-[#C5A35D] z-10" 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end border-b border-white/[0.03] pb-4">
              <div className="space-y-1">
                <p className="text-[7px] uppercase tracking-[0.5em] text-zinc-700 font-black">Current Ceiling</p>
                <p className="font-serif text-2xl text-white italic">
                  {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(priceRange)}
                </p>
              </div>
              <div className="h-6 w-[1px] bg-zinc-900 rotate-[30deg]" />
            </div>
            <p className="text-[7px] uppercase tracking-[0.3em] text-zinc-800 font-black self-end">Premium Tier</p>
          </div>
        </div>
      </div>

      {/* --- Aesthetic Sidebar Footer --- */}
      <div className="pt-12 opacity-40">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-[8px] uppercase tracking-[0.6em] leading-relaxed text-[#C5A35D] font-black italic">
              Bespoke <br /> Quality.
            </p>
            <div className="h-[1px] w-6 bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  )
}