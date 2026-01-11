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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/70">Total Products</h3>
                  <Package size={20} className="text-accent" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary">{totalProducts}</p>
                <p className="text-xs text-foreground/60">Active in catalog</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/70">Total Orders</h3>
                  <ShoppingBag size={20} className="text-accent" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary">{totalOrders}</p>
                <p className="text-xs text-foreground/60">This month</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/70">Revenue</h3>
                  <TrendingUp size={20} className="text-accent" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary">
                  {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(totalRevenue)}
                </p>
                <p className="text-xs text-foreground/60">Total this month</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground/70">Customers</h3>
                  <Users size={20} className="text-accent" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary">156</p>
                <p className="text-xs text-foreground/60">Active customers</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-medium text-foreground mb-4">Recent Activity</h2>
                <div className="space-y-3 text-sm">
                  <p className="text-foreground/70">
                    <span className="font-medium text-foreground">3 new orders</span> received today
                  </p>
                  <p className="text-foreground/70">
                    <span className="font-medium text-foreground">2 products</span> updated
                  </p>
                  <p className="text-foreground/70">
                    <span className="font-medium text-foreground">5 customers</span> signed up
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
