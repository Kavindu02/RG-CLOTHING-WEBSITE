"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart()

  return (
    <main className="min-h-screen w-full bg-background">
      <Navigation />

      {/* Header */}
      <section className="w-full py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-foreground/60 text-lg mb-6">Your cart is empty</p>
              <Link href="/shop">
                <button className="px-8 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-6 border-b border-border pb-6"
                    >
                      {/* Product Image */}
                      <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium text-foreground hover:text-accent transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="text-sm text-foreground/60 space-y-1">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                        <p className="font-serif text-lg text-primary pt-2">
                          {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                            item.product.price,
                          )}
                        </p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center border-l border-r border-border text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right space-y-2">
                          <p className="font-medium text-foreground">
                            {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                              item.product.price * item.quantity,
                            )}
                          </p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-foreground/60 hover:text-destructive transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <Link href="/shop">
                    <button className="text-accent font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                      ← Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-muted rounded-lg p-6 space-y-6">
                  <h2 className="font-medium text-foreground text-lg">Order Summary</h2>

                  <div className="space-y-3 border-b border-border pb-6">
                    <div className="flex justify-between text-foreground/70">
                      <span>Subtotal</span>
                      <span>
                        {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>Tax (8%)</span>
                      <span>{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(tax)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-serif text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary font-bold">
                      {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(total)}
                    </span>
                  </div>

                  <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>

                  <div className="text-xs text-foreground/60 text-center">Free shipping on orders over LKR 10,000</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
