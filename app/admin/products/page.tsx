"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { Edit2, Trash2, Plus, X, Package, Layers, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminProductsPage() {
  const router = useRouter()
  const [productList, setProductList] = useState<Product[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<Product | null>(null)
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
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
    setLastAddedProduct(product);
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
    <main className="min-h-screen w-full bg-black text-white flex flex-col md:flex-row">
      <AdminSidebar />

      <div className="flex-1 border-l border-white/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 pt-20 md:pt-8 sm:pt-8">
          
          <header className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between md:gap-8 mb-12 sm:mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Layers size={14} className="text-zinc-500" />
                <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">Inventory Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter">
                Products <span className="font-serif italic text-zinc-500">Log.</span>
              </h1>
            </motion.div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-black text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
            >
              <Plus size={14} />
              Register Item
            </button>
          </header>

          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8">
              <table className="w-full text-left border-collapse px-4 sm:px-6 md:px-8 min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400">Designation</th>
                    <th className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400">Classification</th>
                    <th className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400">Valuation</th>
                    <th className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400 text-center">Status</th>
                    <th className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400 text-right">Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {productList.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.03] transition-all group">
                      <td className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 uppercase text-xs sm:text-sm font-bold tracking-tight">{product.name}</td>
                      <td className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-[8px] sm:text-[9px] md:text-xs text-zinc-500 uppercase tracking-widest">{product.category}</td>
                      <td className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-xs sm:text-sm font-serif italic">
                        {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(product.price)}
                      </td>
                      <td className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-center">
                        <span className={`text-[7px] sm:text-[8px] md:text-[9px] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black uppercase tracking-widest ${
                          product.inStock ? "bg-white text-black" : "bg-zinc-800 text-zinc-500"
                        }`}>
                          {product.inStock ? "Active" : "Depleted"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3">
                          <button onClick={() => setShowEditModal(product)} className="p-2 sm:p-3 bg-white text-black rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-all shadow-xl">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => setShowDeleteConfirm(product.id)} className="p-2 sm:p-3 bg-white text-black rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-all shadow-xl">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-zinc-950 border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-10 max-w-sm w-full text-center">
              <h2 className="text-lg sm:text-xl font-serif italic text-white mb-6">Confirm Deletion?</h2>
              <div className="flex flex-col gap-3">
                <button onClick={() => handleDelete(showDeleteConfirm)} className="py-3 sm:py-4 bg-white text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg sm:rounded-xl">Confirm</button>
                <button onClick={() => setShowDeleteConfirm(null)} className="py-3 sm:py-4 text-zinc-500 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">Abort</button>
              </div>
            </motion.div>
          </div>
        )}

        {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} onSave={handleAdd} title="Register Entry" />}
        {showEditModal && <ProductModal onClose={() => setShowEditModal(null)} onSave={handleEdit} product={showEditModal} title="Update Entry" />}
      </AnimatePresence>
    </main>
  )
}

// --- Product Modal Component ---

function ProductModal({ onClose, onSave, product, title }: { onClose: () => void, onSave: (p: Product) => void, product?: Product, title: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  const categories = ["Bed Sets", "Duvet Covers", "Sheets", "Pillows", "Blankets", "Towels", "Protectors"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
        setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === "sizes" || name === "colors" || name === "images") {
        setForm(prev => ({ ...prev, [name]: value.split(",").map(v => v.trim()) }))
    } else {
        setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const inputStyles = "w-full bg-white/[0.03] border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-white uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-800"
  const labelStyles = "block text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-black text-zinc-500 mb-2 ml-1"

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={(e) => { e.preventDefault(); onSave(form); }} 
        className="bg-zinc-950 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 w-full max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="flex justify-between items-start mb-8 sm:mb-10">
            <div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] text-zinc-600 uppercase font-black mb-2">Vault / Inventory</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white">{title}</h2>
            </div>
            <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className={labelStyles}>Designation</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputStyles} required placeholder="PRODUCT NAME" />
            </div>

            <div className="relative">
              <label className={labelStyles}>Classification</label>
              <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${inputStyles} flex justify-between items-center text-left`}>
                {form.category} <ChevronDown size={14} className={isDropdownOpen ? "rotate-180" : ""} />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-lg sm:rounded-xl overflow-hidden">
                    {categories.map(cat => (
                      <button key={cat} type="button" onClick={() => { setForm(prev => ({ ...prev, category: cat })); setIsDropdownOpen(false); }}
                        className={`w-full px-3 sm:px-5 py-2 sm:py-3 text-[9px] sm:text-[10px] text-left uppercase tracking-widest ${form.category === cat ? "bg-white text-black font-black" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelStyles}>Valuation (LKR)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label className={labelStyles}>Material</label>
                <input name="material" value={form.material} onChange={handleChange} className={inputStyles} placeholder="FABRIC TYPE" />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className={labelStyles}>Primary Resource (Image File)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      setForm(prev => ({ ...prev, image: event.target?.result as string }))
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className={inputStyles}
              />
            </div>

            <div>
              <label className={labelStyles}>Gallery Resources (Comma Separated)</label>
              <textarea name="images" value={form.images.join(", ")} onChange={handleChange} className={`${inputStyles} h-[90px] sm:h-[100px] md:h-[108px] resize-none`} placeholder="IMAGE URL 1, IMAGE URL 2..." />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <label className={labelStyles}>Dimensional Variants (Sizes)</label>
              <input name="sizes" value={form.sizes.join(", ")} onChange={handleChange} className={inputStyles} placeholder="S, M, L, XL (COMMA SEPARATED)" />
            </div>
            <div>
              <label className={labelStyles}>Tonal Variants (Colors)</label>
              <input name="colors" value={form.colors.join(", ")} onChange={handleChange} className={inputStyles} placeholder="BLACK, WHITE, GOLD (COMMA SEPARATED)" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8 sm:mt-10 bg-white/[0.03] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/5">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={(e) => setForm(prev => ({ ...prev, inStock: e.target.checked }))} className="w-4 h-4 accent-white" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black text-zinc-400">Inventory Status: Item is Currently Active</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
          <button type="button" onClick={onClose} className="flex-1 py-3 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white">Discard</button>
          <button type="submit" className="flex-[2] py-3 sm:py-4 bg-white text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-all shadow-2xl">Add Products</button>
        </div>
      </motion.form>
    </div>
  )
}