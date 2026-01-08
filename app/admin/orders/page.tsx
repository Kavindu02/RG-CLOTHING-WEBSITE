"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminOrdersPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const orders = [
    { id: "ORD001", customer: "John Doe", total: 24999, status: "Completed", date: "2025-01-15" },
    { id: "ORD002", customer: "Jane Smith", total: 18999, status: "Processing", date: "2025-01-14" },
    { id: "ORD003", customer: "Mike Johnson", total: 35998, status: "Shipped", date: "2025-01-13" },
    { id: "ORD004", customer: "Sarah Williams", total: 12999, status: "Pending", date: "2025-01-12" },
    { id: "ORD005", customer: "Emma Brown", total: 29998, status: "Completed", date: "2025-01-11" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-accent/20 text-accent"
      case "Processing":
        return "bg-primary/20 text-primary"
      case "Shipped":
        return "bg-accent/20 text-accent"
      case "Pending":
        return "bg-muted-foreground/20 text-muted-foreground"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <main className="min-h-screen w-full bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold text-primary">Orders</h1>
              <p className="text-foreground/70 mt-2">View and manage customer orders</p>
            </div>

            {/* Orders Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Order ID</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Customer</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Total</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Date</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                        <td className="px-6 py-4 text-foreground">{order.customer}</td>
                        <td className="px-6 py-4 text-foreground">
                          {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(order.total)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-foreground">{order.date}</td>
                        <td className="px-6 py-4">
                          <button className="text-accent hover:opacity-80 transition-opacity text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
