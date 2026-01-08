"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Star, ShoppingCart, Heart } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen w-full">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-foreground/60">Product not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <main className="min-h-screen w-full bg-background">
      <Navigation />

      {/* Product Section */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-foreground/60 uppercase tracking-wide mb-2">{product.category}</p>
                <h1 className="font-serif text-4xl font-bold text-primary mb-4">{product.name}</h1>
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/60">{product.reviews} reviews</span>
              </div>

              {/* Price */}
              <div className="border-y border-border py-6">
                <p className="font-serif text-4xl font-bold text-primary">
                  {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(product.price)}
                </p>
              </div>

              {/* Material */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Material</p>
                <p className="text-foreground/70">{product.material}</p>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Size</p>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Color</p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary text-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">Quantity</span>
                  <div className="flex items-center border border-border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center border-l border-r border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 px-8 py-4 font-medium flex items-center justify-center gap-2 transition-all ${
                      addedToCart
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    } disabled:opacity-50`}
                  >
                    <ShoppingCart size={20} />
                    {addedToCart ? "Added to Cart!" : "Add to Cart"}
                  </button>
                  <button className="px-6 py-4 border border-border text-foreground hover:bg-muted transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              {!product.inStock && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground/70">This product is currently out of stock</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
