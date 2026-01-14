"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, X, ShieldCheck, Diamond } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function CartContent() {
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
    <>
      {/* --- Ambient Visuals (Gold Tint) --- */}

      {/* --- Ambient Visuals (Gold Tint) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C5A35D]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C5A35D]/[0.01] rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-12 md:mb-24 space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-6">
              <Diamond size={10} fill="#C5A35D" className="text-[#C5A35D]" />
              <span className="text-[10px] tracking-[0.7em] uppercase font-black text-[#C5A35D]">Curated Selection</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tighter">
              SHOPPING <br />
              <span className="italic font-light text-zinc-800 hover:text-[#C5A35D] transition-colors duration-700 cursor-pointer">BAG.</span>
            </h1>
          </motion.div>

          {/* Success Narrative (Gold Themed) */}
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="mb-12 md:mb-24 p-8 md:p-16 border border-[#C5A35D]/10 bg-white/[0.01] backdrop-blur-3xl text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A35D]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="w-20 h-20 border border-[#C5A35D]/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-[#C5A35D] rounded-full animate-ping opacity-10" />
                <ShieldCheck className="text-[#C5A35D] w-10 h-10" />
              </div>
              <h2 className="font-serif text-4xl mb-6 tracking-tight">Acquisition Confirmed.</h2>
              <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase mb-12">Thank you for choosing pure refinement.</p>
              <Link href="/shop" className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-black text-[#C5A35D] group">
                Continue Exploring <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {items.length === 0 && !isSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 md:py-40 flex flex-col items-center justify-center border border-white/[0.03] bg-white/[0.01]"
              >
                <div className="relative mb-12">
                   <ShoppingBag className="w-20 h-20 text-zinc-900" />
                   <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-1 -right-1 w-5 h-5 bg-[#C5A35D] rounded-full blur-[2px]" />
                </div>
                <p className="font-serif text-3xl italic text-zinc-700 mb-12 text-center leading-relaxed">Your bag is currently waiting for <br/> a touch of elegance.</p>
                <Link href="/shop">
                  <button className="px-16 py-6 bg-white text-black text-[10px] tracking-[0.5em] uppercase font-black hover:bg-[#C5A35D] hover:text-white transition-all duration-700">
                    Enter Gallery
                  </button>
                </Link>
              </motion.div>
            ) : !isSuccess && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start">
                
                {/* --- Left: Bag Items --- */}
                <div className="lg:col-span-7 space-y-16">
                  {items.map((item) => (
                    <motion.div 
                      key={`${item.product.id}-${item.size}-${item.color}`} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group relative flex flex-col sm:flex-row gap-12 pb-16 border-b border-white/[0.03]"
                    >
                      <div className="w-32 sm:w-40 md:w-56 aspect-[3/4] overflow-hidden bg-zinc-950">
                        <img 
                          src={item.product.image || "/placeholder.svg"} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out" 
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="space-y-8">
                          <div className="flex justify-between items-start">
                            <div className="space-y-3">
                              <p className="text-[9px] tracking-[0.5em] uppercase font-black text-[#C5A35D]">{item.product.category}</p>
                              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">{item.product.name}</h3>
                            </div>
                            <p className="font-serif text-2xl text-zinc-500 group-hover:text-white transition-colors duration-500">
                              {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(item.product.price)}
                            </p>
                          </div>
                          
                          <div className="flex gap-10 text-[9px] tracking-[0.4em] uppercase font-black">
                            <span className="flex items-center gap-3 text-zinc-600">Size <span className="text-zinc-200 border border-white/5 px-4 py-1.5">{item.size}</span></span>
                            <span className="flex items-center gap-3 text-zinc-600">Color <span className="text-zinc-200 border border-white/5 px-4 py-1.5">{item.color}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-16">
                          <div className="flex items-center gap-8 bg-white/[0.02] border border-white/[0.05] px-8 py-4 rounded-full">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-zinc-600 hover:text-[#C5A35D] transition-colors"><Minus size={14} /></button>
                            <span className="text-[12px] font-black w-6 text-center text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-zinc-600 hover:text-[#C5A35D] transition-colors"><Plus size={14} /></button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.product.id)} 
                            className="text-[9px] tracking-[0.5em] uppercase font-black text-zinc-800 hover:text-[#C5A35D] transition-all flex items-center gap-3 group/del"
                          >
                            <Trash2 size={12} className="group-hover/del:rotate-12 transition-transform" /> Remove Piece
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* --- Right: Investment Summary --- */}
                <aside className="lg:col-span-5 lg:sticky lg:top-40">
                  <div className="bg-[#080808] border border-white/[0.03] p-6 md:p-12 space-y-8 md:space-y-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A35D]/[0.03] blur-3xl pointer-events-none" />
                    <h2 className="text-[10px] tracking-[0.7em] uppercase font-black text-[#C5A35D]">Investment Summary</h2>
                    
                    <div className="space-y-6 md:space-y-8 pt-4 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black">
                      <div className="flex justify-between items-center text-zinc-600">
                        <span>Total</span>
                        <span className="text-zinc-300">{new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(total)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckout} 
                      className="group w-full py-6 md:py-8 bg-[#C5A35D] text-black text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.6em] font-black uppercase flex items-center justify-center gap-3 md:gap-5 hover:bg-white transition-all duration-700 mt-6 md:mt-0"
                    >
                      Secure Checkout <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform duration-500" />
                    </button>
                  </div>
                </aside>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Overlay Form: Minimalist Glass (Gold Accent) --- */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setShowForm(false)} 
              className="absolute inset-0 bg-black/95 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
              className="relative bg-[#080808] border border-[#C5A35D]/10 p-8 md:p-12 w-full max-w-xl shadow-3xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[#C5A35D]">
                    <Diamond size={8} fill="currentColor" />
                    <span className="text-[9px] tracking-[0.5em] font-black uppercase">Final Step</span>
                  </div>
                  <h2 className="font-serif text-5xl text-white tracking-tight">Destination</h2>
                </div>
                <button onClick={() => setShowForm(false)} className="text-zinc-700 hover:text-[#C5A35D] transition-colors p-2 border border-white/5 rounded-full"><X size={20}/></button>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-6">
                {[
                  { name: "name", label: "Legal Name", placeholder: "JOHN DOE" },
                  { name: "address", label: "Destination Address", placeholder: "NO, STREET, CITY" },
                  { name: "mobile", label: "Contact Intelligence", placeholder: "+94 7X XXX XXXX" }
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <label className="text-[9px] tracking-[0.5em] uppercase font-black text-zinc-800 group-focus-within:text-[#C5A35D] transition-colors">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={(form as any)[field.name]}
                      onChange={handleFormChange}
                      className="w-full bg-transparent border-b border-zinc-900/50 py-5 text-sm tracking-[0.2em] focus:outline-none focus:border-[#C5A35D] transition-all placeholder:text-zinc-900"
                      required
                    />
                  </div>
                ))}

                <div className="pt-6 flex flex-col gap-4">
                  <button type="submit" className="w-full py-8 bg-white text-black font-black tracking-[0.6em] uppercase text-[10px] hover:bg-[#C5A35D] hover:text-white transition-all duration-700">
                    Finalize Acquisition
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-[9px] tracking-[0.4em] uppercase font-black text-zinc-700 hover:text-white transition-colors">
                    Return to Bag
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function CartPage() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-white selection:bg-[#C5A35D] selection:text-black font-sans">
      <Navigation />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
        <CartContent />
      </Suspense>
      <Footer />
    </main>
  )
}