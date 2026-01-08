"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useEffect, useState } from "react"

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  const { items } = useCart()

  useEffect(() => {
    setMounted(true)
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [items])

  if (!mounted) return <div className="p-2 w-6 h-6" />

  return (
    <Link href="/cart" className="relative p-2 hover:text-accent transition-colors text-foreground">
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs flex items-center justify-center rounded-full">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  )
}
