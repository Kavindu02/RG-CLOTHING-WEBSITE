"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { products } from "@/lib/products"
import { 
  Plus, 
  ArrowUpRight, 
  Layers, 
  Globe, 
  Command,
  ArrowRight
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [adminName, setAdminName] = useState("ADMIN")

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login")
    }
    setAdminName(localStorage.getItem("adminName")?.toUpperCase() || "ADMIN")
  }, [router])

  const stats = [
    { label: "Inventory", value: products.length.toString().padStart(2, '0'), detail: "Total Items" },
    { label: "Revenue", value: "125.0K", detail: "LKR - Month" },
    { label: "Orders", value: "42", detail: "Active Now" },
  ]

  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
      <div className="flex">
        {/* Sidebar eka black and white theme ekata match wenna oneda? */}
        <AdminSidebar />

        <div className="flex-1 min-h-screen border-l border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
            
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] tracking-[0.5em] font-black uppercase text-zinc-500">System. v2.0</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
                  HELLO, <br />
                  <span className="font-serif italic text-zinc-400">{adminName}</span>
                </h1>
              </motion.div>

              <div className="hidden md:block">
                <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-bold text-right leading-relaxed">
                  RG LUXURY BEDDING<br />
                  ADMINISTRATION TERMINAL<br />
                  
                </p>
              </div>
            </header>

            

            {/* Main Actions Section */}
            <div className="mt-20">
              <h2 className="text-[10px] tracking-[0.5em] uppercase font-black text-zinc-700 mb-10 text-center">Executive Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 overflow-hidden">
                {/* Product Action */}
                <a
                  href="/admin/products"
                  className="group bg-black p-12 flex flex-col justify-between aspect-square md:aspect-auto md:h-80 hover:bg-white transition-all duration-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 border border-white/20 group-hover:border-black/20 transition-colors">
                      <Layers className="text-white group-hover:text-black" size={15} />
                    </div>
                    <ArrowUpRight className="text-white/30 group-hover:text-black transition-all" size={24} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-black mb-2 transition-colors">Products</h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 group-hover:text-black/50 transition-colors">Inventory Management</p>
                  </div>
                </a>

                {/* Orders Action */}
                <a
                  href="/admin/orders"
                  className="group bg-black p-12 flex flex-col justify-between aspect-square md:aspect-auto md:h-80 hover:bg-white transition-all duration-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 border border-white/20 group-hover:border-black/20 transition-colors">
                      <Command className="text-white group-hover:text-black" size={15} />
                    </div>
                    <ArrowUpRight className="text-white/30 group-hover:text-black transition-all" size={24} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-black mb-2 transition-colors">Orders</h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 group-hover:text-black/50 transition-colors">Customer Fulfillment</p>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}