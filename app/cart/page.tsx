"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, total, clearCart } = useCart()
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success");
  
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", mobile: "" });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.mobile) return;
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: `ORD${Date.now()}`,
      name: form.name,
      address: form.address,
      mobile: form.mobile,
      items: items.map(i => ({ product: i.product, size: i.size, color: i.color, quantity: i.quantity })),
      productsCount: items.reduce((acc, i) => acc + i.quantity, 0),
      total,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));
    clearCart();
    setShowForm(false);
    router.push("/cart?success=1");
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0b] text-zinc-100 selection:bg-primary selection:text-black">
      <Navigation />

      {/* --- Ambient Background Glow --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white">Your Selection</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter text-white">
              Shopping <span className="italic text-zinc-600">Bag.</span>
            </h1>
          </motion.div>

          {/* Success Message */}
          {isSuccess && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-12 p-8 border border-primary/20 bg-primary/5 rounded-3xl text-center">
              <h2 className="font-serif text-3xl text-primary mb-2">Order Placed Successfully.</h2>
              <p className="text-zinc-500 text-sm tracking-widest uppercase">Thank you for your investment.</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]"
              >
                <ShoppingBag className="w-12 h-12 text-zinc-800 mb-6" />
                <p className="font-serif text-2xl italic text-zinc-500 mb-8">Your bag is currently empty.</p>
                <Link href="/shop">
                  <button className="px-10 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold rounded-full hover:bg-primary transition-all">
                    Explore Gallery
                  </button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* --- Left Content (Items) --- */}
                <div className="lg:col-span-8 space-y-8">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="group relative flex flex-col sm:flex-row gap-8 pb-8 border-b border-white/5">
                      <div className="w-full sm:w-40 aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5">
                        <img src={item.product.image || "/placeholder.svg"} alt={item.product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-600 mb-1">{item.product.category}</p>
                              <h3 className="font-serif text-2xl text-white">{item.product.name}</h3>
                            </div>
                            <p className="font-serif text-xl text-zinc-400">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(item.product.price)}</p>
                          </div>
                          <div className="flex gap-6 text-[10px] tracking-widest uppercase font-bold text-zinc-500">
                            <span>Size: <span className="text-zinc-200">{item.size}</span></span>
                            <span>Color: <span className="text-zinc-200">{item.color}</span></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-8">
                          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-full p-1.5">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"><Minus size={14} /></button>
                            <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-600 hover:text-red-400 transition-colors"><Trash2 size={14} /> Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- Right Sidebar (Summary) --- */}
                <aside className="lg:col-span-4 lg:sticky lg:top-40">
                  <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                    <h2 className="text-[12px] tracking-[0.4em] uppercase font-black text-zinc-400">Total Investment</h2>
                    <div className="space-y-4 pt-4 border-b border-white/5 pb-6 text-[11px] tracking-widest uppercase text-zinc-500">
                      <div className="flex justify-between"><span>Subtotal</span><span className="text-zinc-200">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(subtotal)}</span></div>
                      <div className="flex justify-between"><span>Shipping</span><span className="text-primary italic font-bold">Complimentary</span></div>
                      <div className="flex justify-between"><span>Tax</span><span className="text-zinc-200">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(tax)}</span></div>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="font-serif text-lg italic text-zinc-500">Total</span>
                      <span className="font-serif text-4xl text-white">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(total)}</span>
                    </div>
                    <button onClick={handleCheckout} className="group w-full py-6 bg-white text-black rounded-full font-bold tracking-[0.3em] uppercase text-[11px] hover:bg-primary transition-all flex items-center justify-center gap-3">
                      Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </aside>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Modern Glassmorphic Checkout Form --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="relative bg-[#121214] border border-white/10 p-10 md:p-12 rounded-[3rem] w-full max-w-lg shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                  <h2 className="font-serif text-4xl text-white">Shipping.</h2>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Delivery Essentials</p>
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"><X size={20}/></button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {[
                  { name: "name", label: "Full Name", placeholder: "Enter your name" },
                  { name: "address", label: "Delivery Address", placeholder: "House No, Street, City" },
                  { name: "mobile", label: "Contact Number", placeholder: "+94 7X XXX XXXX" }
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-600 px-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={(form as any)[field.name]}
                      onChange={handleFormChange}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-800"
                      required
                    />
                  </div>
                ))}

                <div className="pt-6 flex flex-col gap-4">
                  <button type="submit" className="w-full py-6 bg-primary text-white rounded-full font-bold tracking-[0.3em] uppercase text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Complete Acquisition
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="w-full py-4 text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500 hover:text-white transition-colors">
                    Back to Bag
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}