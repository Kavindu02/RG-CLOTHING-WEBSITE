"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingBag, Settings, FileText } from "lucide-react"

interface AdminSidebarProps {
  isOpen?: boolean
}

export function AdminSidebar({ isOpen = true }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path)

  return (
    <aside className={`bg-muted border-r border-border p-6 space-y-4 ${isOpen ? "block" : "hidden"}`}>
      <nav className="space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            isActive("/admin") &&
            !isActive("/admin/products") &&
            !isActive("/admin/orders") &&
            !isActive("/admin/settings")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-primary/10"
          }`}
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Dashboard</span>
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

        <Link
          href="/admin/blog"
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            isActive("/admin/blog") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
          }`}
        >
          <FileText size={18} />
          <span className="text-sm font-medium">Blog Posts</span>
        </Link>

        <Link
          href="/admin/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
            isActive("/admin/settings") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
          }`}
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
