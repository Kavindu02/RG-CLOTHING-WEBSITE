"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-square mb-4 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white font-medium">Out of Stock</p>
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-2">
        <p className="text-sm text-foreground/60 uppercase tracking-wide">{product.category}</p>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 pt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
              />
            ))}
          </div>
          <span className="text-xs text-foreground/60">({product.reviews})</span>
        </div>

        <p className="font-serif text-lg text-primary pt-2">
          {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(product.price)}
        </p>

        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
