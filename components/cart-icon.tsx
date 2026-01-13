"use client"

import Link from "next/link"
import { ShoppingBag, Diamond } from "lucide-react"
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

  if (!mounted) return <div className="p-2 w-10 h-10" />

  return (
    <Link 
      href="/cart" 
      className="relative p-3 text-[#C5A35D] flex items-center justify-center group transition-all duration-500"
    >
      {/* Icon Upgrade: ShoppingBag looks more premium than ShoppingCart */}
      <ShoppingBag 
        size={22} 
        strokeWidth={1.5} 
        className="group-hover:scale-110 transition-transform duration-500 ease-out" 
      />
      
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-white text-black text-[9px] font-black flex items-center justify-center px-1 rounded-full shadow-[0_0_15px_rgba(197,163,93,0.3)] border border-[#C5A35D]/20">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}

      {/* Subtle Dot Decoration */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C5A35D] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-[1px]" />
    </Link>
  )
}