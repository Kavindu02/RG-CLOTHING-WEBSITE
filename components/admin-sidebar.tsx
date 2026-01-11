"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, ShoppingBag, LogOut, Users } from "lucide-react"
import { clearAdminSession } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  isOpen?: boolean
}

export function AdminSidebar({ isOpen = true }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path)

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  return (
    <aside className={`bg-muted border-r border-border p-6 space-y-4 ${isOpen ? "block" : "hidden"}`}>
      <nav className="space-y-2">
                <Link
                  href="/admin/users"
                  className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                    isActive("/admin/users") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
                  }`}
                >
                  <Users size={18} />
                  <span className="text-sm font-medium">Admins</span>
                </Link>

        <Link
          href="/admin/products"
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            isActive("/admin/products") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
          }`}
        >
          <Package size={18} />
          <span className="text-sm font-medium">Products</span>
        </Link>

        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            isActive("/admin/orders") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
          }`}
        >
          <ShoppingBag size={18} />
          <span className="text-sm font-medium">Orders</span>
        </Link>


      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded transition-colors w-full text-left text-foreground hover:bg-red-100 hover:text-red-700 mt-8"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </aside>
  )
}
