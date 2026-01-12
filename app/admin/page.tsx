"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
// import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { products } from "@/lib/products"
import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      // If not authenticated, redirect to login and stop rendering dashboard
      router.replace("/admin/login")
    }
  }, [router])

  const totalProducts = products.length
  const totalRevenue = 125000 // Mock data
  const totalOrders = 42 // Mock data

  return (
    <main className="min-h-screen w-full bg-background">


      <div className="flex">
        <AdminSidebar />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold text-primary">Dashboard</h1>
              <p className="text-foreground/70 mt-2">Welcome back to RG Bedsheet Admin</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-medium text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <a
                    href="/admin/products"
                    className="block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity text-center"
                  >
                    Manage Products
                  </a>
                  <a
                    href="/admin/orders"
                    className="block px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity text-center"
                  >
                    View Orders
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
