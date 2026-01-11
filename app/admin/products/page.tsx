"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { Edit2, Trash2, Plus, X } from "lucide-react"

export default function AdminProductsPage() {
  const router = useRouter()
  const [productList, setProductList] = useState<Product[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<Product | null>(null)
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null) // Track the last added product

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
    // Initialize productList from localStorage or fallback to default products
    const stored = typeof window !== 'undefined' ? localStorage.getItem('products') : null;
    if (stored) {
      try {
        setProductList(JSON.parse(stored));
      } catch {
        setProductList(products);
      }
    } else {
      setProductList(products);
    }
  }, [router])

  const handleDelete = (id: string) => {
    setProductList((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updated));
      }
      return updated;
    });
    setShowDeleteConfirm(null);
  }

  const handleAdd = (product: Product) => {
    setProductList((prev) => {
      const updated = [...prev, product];
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updated));
      }
      return updated;
    });
    setLastAddedProduct(product); // Set the last added product
    setShowAddModal(false);
  }

  const handleEdit = (updatedProduct: Product) => {
    setProductList((prev) => {
      const updated = prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p);
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updated));
      }
      return updated;
    });
    setShowEditModal(null);
  }

  return (
    <main className="min-h-screen w-full bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Product Overview for last added product */}
            {lastAddedProduct && (
              <div className="mb-8 p-6 rounded-lg border border-primary bg-primary/10 flex items-center gap-6">
                {lastAddedProduct.image && (
                  <img src={lastAddedProduct.image} alt={lastAddedProduct.name} className="w-24 h-24 object-cover rounded-lg border" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-1">{lastAddedProduct.name}</h2>
                  <div className="text-sm text-foreground/80 mb-1">Category: {lastAddedProduct.category}</div>
                  <div className="text-sm text-foreground/80 mb-1">Price: {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(lastAddedProduct.price)}</div>
                  {lastAddedProduct.material && <div className="text-xs text-foreground/60">Material: {lastAddedProduct.material}</div>}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-primary">Products</h1>
                <p className="text-foreground/70 mt-2">Manage your product catalog</p>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity"
                onClick={() => setShowAddModal(true)}
              >
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
                      {/* Rating column removed */}
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
                        {/* Rating cell removed */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="p-2 hover:bg-muted rounded transition-colors text-foreground/70 hover:text-accent"
                              onClick={() => setShowEditModal(product)}
                            >
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

            {/* Add Product Modal */}
            {showAddModal && (
              <ProductModal
                onClose={() => setShowAddModal(false)}
                onSave={handleAdd}
                title="Add Product"
              />
            )}

            {/* Edit Product Modal */}
            {showEditModal && (
              <ProductModal
                onClose={() => setShowEditModal(null)}
                onSave={handleEdit}
                product={showEditModal}
                title="Edit Product"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

// --- Product Modal Component ---
import React from "react"

type ProductModalProps = {
  onClose: () => void
  onSave: (product: Product) => void
  product?: Product
  title: string
}

function ProductModal({ onClose, onSave, product, title }: ProductModalProps) {
  const [form, setForm] = useState<Product>(
    product || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      price: 0,
      category: "Bed Sets",
      image: "",
      images: [],
      material: "",
      sizes: [],
      colors: [],
      inStock: true,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    let checked = false
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      checked = e.target.checked
    }
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else if (name === "sizes" || name === "colors" || name === "images") {
      setForm((prev) => ({ ...prev, [name]: value.split(",").map((v) => v.trim()) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 w-full max-w-lg space-y-4 relative">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-foreground/60 hover:text-destructive">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full px-2 py-1 rounded border" required />
          </div>
          <div>
            <label className="block text-xs mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-2 py-1 rounded border">
              <option>Bed Sets</option>
              <option>Duvet Covers</option>
              <option>Sheets</option>
              <option>Pillows</option>
              <option>Blankets</option>
              <option>Towels</option>
              <option>Protectors</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Price (LKR)</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full px-2 py-1 rounded border" required />
          </div>
          <div>
            <label className="block text-xs mb-1">Material</label>
            <input name="material" value={form.material} onChange={handleChange} className="w-full px-2 py-1 rounded border" />
          </div>
          <div>
            <label className="block text-xs mb-1">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full px-2 py-1 rounded border" />
          </div>
          <div>
            <label className="block text-xs mb-1">Images (comma separated)</label>
            <input name="images" value={form.images.join(", ")} onChange={handleChange} className="w-full px-2 py-1 rounded border" />
          </div>
          <div>
            <label className="block text-xs mb-1">Sizes (comma separated)</label>
            <input name="sizes" value={form.sizes.join(", ")} onChange={handleChange} className="w-full px-2 py-1 rounded border" />
          </div>
          <div>
            <label className="block text-xs mb-1">Colors (comma separated)</label>
            <input name="colors" value={form.colors.join(", ")} onChange={handleChange} className="w-full px-2 py-1 rounded border" />
          </div>
          <div className="col-span-2 flex items-center gap-2 mt-2">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
            <label className="text-xs">In Stock</label>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-foreground hover:bg-muted">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">Save</button>
        </div>
      </form>
    </div>
  )
}
