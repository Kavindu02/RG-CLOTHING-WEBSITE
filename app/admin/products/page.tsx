"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { Edit2, Trash2, Plus } from "lucide-react"

export default function AdminProductsPage() {
  const router = useRouter()
  const [productList, setProductList] = useState<Product[]>(products)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id))
    setShowDeleteConfirm(null)
  }

  return (
    <main className="min-h-screen w-full bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-primary">Products</h1>
                <p className="text-foreground/70 mt-2">Manage your product catalog</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity">
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Product Name</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Category</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Price</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Stock</th>
                      <th className="px-6 py-3 text-left font-medium text-foreground">Rating</th>
                      <th className="px-6 py-3 text-center font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {productList.map((product) => (
                      <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                        <td className="px-6 py-4 text-foreground/70">{product.category}</td>
                        <td className="px-6 py-4 text-foreground">
                          {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(product.price)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.inStock ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-foreground">{product.rating.toFixed(1)} ⭐</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 hover:bg-muted rounded transition-colors text-foreground/70 hover:text-accent">
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(product.id)}
                              className="p-2 hover:bg-muted rounded transition-colors text-foreground/70 hover:text-destructive"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-card border border-border rounded-lg p-6 max-w-sm space-y-4">
                  <h2 className="font-medium text-foreground">Delete Product?</h2>
                  <p className="text-sm text-foreground/70">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(showDeleteConfirm)}
                      className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded hover:opacity-90 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
