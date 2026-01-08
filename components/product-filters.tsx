"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
  const [priceRange, setPriceRange] = useState([0, 30000])
  const [expandedFilter, setExpandedFilter] = useState<string | null>("category")

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onPriceChange(value[0], value[1])
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => setExpandedFilter(expandedFilter === "category" ? null : "category")}
          className="w-full flex items-center justify-between py-2 font-medium text-foreground"
        >
          Category
          <ChevronDown size={18} className={expandedFilter === "category" ? "rotate-180" : ""} />
        </button>
        {expandedFilter === "category" && (
          <div className="space-y-3 mt-4">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => setExpandedFilter(expandedFilter === "price" ? null : "price")}
          className="w-full flex items-center justify-between py-2 font-medium text-foreground"
        >
          Price Range
          <ChevronDown size={18} className={expandedFilter === "price" ? "rotate-180" : ""} />
        </button>
        {expandedFilter === "price" && (
          <div className="space-y-4 mt-4">
            <input
              type="range"
              min="0"
              max="30000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">
                {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceRange[0])}
              </span>
              <span className="text-foreground">
                {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(priceRange[1])}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-border bg-background text-foreground rounded-md"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  )
}
