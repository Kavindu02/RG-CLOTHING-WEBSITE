"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Edit2, ChevronDown, ShoppingBag, Clock, CheckCircle, Truck, XCircle, X } from "lucide-react"

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
    const stored = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, [router])

  const updateOrderStatus = (id: string, status: string) => {
    const updated = orders.map(order => order.id === id ? { ...order, status } : order);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    setEditingOrderId(null); // Update කළාට පස්සේ dropdown එක close කරනවා
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter(order => order.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle size={12} />;
      case "Processing": return <Clock size={12} />;
      case "Shipped": return <Truck size={12} />;
      case "Cancelled": return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-black text-white flex">
      <AdminSidebar />

      <div className="flex-1 border-l border-white/10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          
          <header className="mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag size={14} className="text-zinc-500" />
                <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">Transaction Registry</span>
              </div>
              <h1 className="text-6xl font-light tracking-tighter">
                Client <span className="font-serif italic text-zinc-500">Orders.</span>
              </h1>
            </motion.div>
          </header>

          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400">Timestamp</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400">Client Details</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400">Manifest (Items)</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400 text-center">Qty</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400">Financials</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400">Status Control</th>
                    <th className="px-6 py-6 text-[9px] tracking-[0.2em] uppercase font-black text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-white/[0.03] transition-all group">
                      <td className="px-6 py-8 align-top">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-tighter">{order.date}</div>
                        <div className="text-[9px] text-zinc-600 mt-1 uppercase font-bold tracking-widest">ID: {order.id.slice(0, 8)}</div>
                      </td>

                      <td className="px-6 py-8 align-top max-w-[200px]">
                        <div className="text-sm font-bold uppercase tracking-tight text-white">{order.name || 'Anonymous'}</div>
                        <div className="text-[10px] text-zinc-500 mt-1 font-medium leading-relaxed italic break-words whitespace-pre-line">{order.address || 'No Address'}</div>
                        <div className="text-[10px] text-zinc-400 mt-2 font-mono tracking-tighter">{order.mobile || '-'}</div>
                      </td>

                      <td className="px-6 py-8 align-top">
                        <div className="space-y-4">
                          {order.items ? order.items.map((p: any, i: number) => (
                            <div key={i} className="flex flex-col border-l border-white/10 pl-4 py-1">
                              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-200">{p.product.name}</span>
                              <div className="flex gap-4 mt-1">
                                <span className="text-[9px] text-zinc-500 uppercase font-bold">Size: <span className="text-white">{p.size}</span></span>
                                <span className="text-[9px] text-zinc-500 uppercase font-bold">Tone: <span className="text-white">{p.color}</span></span>
                                <span className="text-[9px] text-zinc-500 uppercase font-bold">Qty: <span className="text-white">{p.quantity}</span></span>
                              </div>
                            </div>
                          )) : '-'}
                        </div>
                      </td>

                      <td className="px-6 py-8 align-top text-center font-mono text-xs font-bold">{order.productsCount || '-'}</td>

                      <td className="px-6 py-8 align-top font-serif italic text-sm text-zinc-300">
                        {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(order.total)}
                      </td>

                      {/* Status Control Section */}
                      <td className="px-6 py-8 align-top min-w-[180px]">
                        {editingOrderId === order.id ? (
                          <div className="flex items-center gap-1">
                             <StatusDropdown 
                              order={order} 
                              onStatusUpdate={updateOrderStatus} 
                            />
                            <button 
                              onClick={() => setEditingOrderId(null)}
                              className="p-2 text-zinc-500 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.15em]
                            ${order.status === 'Completed' ? 'text-white border-white/20' : 'text-zinc-500'}
                          `}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        )}
                      </td>

                      {/* Actions Section */}
                      <td className="px-6 py-8 align-top text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setEditingOrderId(order.id)}
                            className="p-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all shadow-xl active:scale-90"
                            title="Edit Status"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all shadow-xl active:scale-90"
                            title="Delete Record"
                          >
                            <Trash2 size={16} />
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
    </main>
  )
}

/**
 * --- Status Dropdown Component ---
 */
function StatusDropdown({ order, onStatusUpdate }: { order: any, onStatusUpdate: (id: string, status: string) => void }) {
  const [isOpen, setIsOpen] = useState(true); 
  const statuses = ["Pending", "Processing", "Shipped", "Completed", "Cancelled"];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle size={12} />;
      case "Processing": return <Clock size={12} />;
      case "Shipped": return <Truck size={12} />;
      case "Cancelled": return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-white/20 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
      >
        <div className="flex items-center gap-2">
          {getStatusIcon(order.status)}
          {order.status}
        </div>
        <ChevronDown size={12} className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute z-[70] w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusUpdate(order.id, s)}
                  className={`w-full px-5 py-3 text-[9px] text-left uppercase tracking-[0.2em] transition-colors flex items-center gap-3
                    ${order.status === s ? "bg-white text-black font-black" : "text-zinc-500 hover:bg-white/5 hover:text-white"}
                  `}
                >
                  {getStatusIcon(s)}
                  {s}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}