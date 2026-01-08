"use client"

import Link from "next/link"
import { LogOut, Settings } from "lucide-react"
import { clearAdminSession } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  return (
    <header className="w-full bg-primary text-primary-foreground border-b border-primary-foreground/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-serif text-2xl font-bold">
          RG Admin
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/admin" className="text-sm hover:opacity-80 transition-opacity">
            Dashboard
          </Link>
          <Link href="/admin/products" className="text-sm hover:opacity-80 transition-opacity">
            Products
          </Link>
          <Link href="/admin/orders" className="text-sm hover:opacity-80 transition-opacity">
            Orders
          </Link>
          <Link href="/admin/settings" className="text-sm hover:opacity-80 transition-opacity">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:opacity-80 transition-opacity">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
