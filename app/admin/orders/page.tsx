"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
    // Load orders from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, [router])

  const updateOrderStatus = (id: string, status: string) => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter(order => order.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

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
                      <th className="px-6 py-3 text-left font-medium text-foreground">Date</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Name</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Address</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Mobile</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Products</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Size</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Colour</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Count</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Total</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-foreground">{order.date}</td>
                        <td className="px-6 py-4 text-foreground">{order.name || '-'}</td>
                        <td className="px-6 py-4 text-foreground">{order.address || '-'}</td>
                        <td className="px-6 py-4 text-foreground">{order.mobile || '-'}</td>
                        {/* Products, Size, Colour: show each product in a separate row */}
                        <td className="px-6 py-4 text-foreground">
                          {order.items ? (
                            <div className="space-y-1">
                              {order.items.map((p: any, i: number) => (
                                <div key={i}>{p.product.name} x {p.quantity}</div>
                              ))}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {order.items ? (
                            <div className="flex flex-col gap-10">
                              {order.items.map((p: any, i: number) => (
                                <div key={i}>{p.size}</div>
                              ))}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {order.items ? (
                            <div className="flex flex-col gap-10">
                              {order.items.map((p: any, i: number) => (
                                <div key={i}>{p.color}</div>
                              ))}
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-foreground">{order.productsCount || '-'}</td>
                        <td className="px-6 py-4 text-foreground">
                          {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(order.total)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                            className="px-2 py-1 rounded border text-xs"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-700"
                          >
                            Delete
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
