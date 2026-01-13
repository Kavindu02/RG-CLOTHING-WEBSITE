"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminSidebar } from "@/components/admin-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { UserPlus, Shield, Trash2, Edit3, Check, X, Lock } from "lucide-react"

interface AdminUser {
  name: string
  password: string
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editPassword, setEditPassword] = useState("")

  useEffect(() => {
    if (!isAdminAuthenticated()) router.push("/admin/login")
    const stored = localStorage.getItem("admins")
    if (stored) setAdmins(JSON.parse(stored))
    else setAdmins([])
  }, [router])

  const saveAdmins = (newAdmins: AdminUser[]) => {
    setAdmins(newAdmins)
    localStorage.setItem("admins", JSON.stringify(newAdmins))
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !password) return
    const newAdmins = [...admins, { name, password }]
    saveAdmins(newAdmins)
    setName("")
    setPassword("")
  }

  const handleDelete = (idx: number) => {
    const deleted = admins[idx]
    const newAdmins = admins.filter((_, i) => i !== idx)
    saveAdmins(newAdmins)
    const currentName = localStorage.getItem("adminName")
    const currentPassword = localStorage.getItem("adminPassword")
    if (deleted.name === currentName && deleted.password === currentPassword) {
      localStorage.removeItem("adminName")
      localStorage.removeItem("adminPassword")
      localStorage.removeItem("adminSession")
      window.location.href = "/admin/login"
    }
  }

  const handleEdit = (idx: number) => {
    setEditIndex(idx)
    setEditName(admins[idx].name)
    setEditPassword(admins[idx].password)
  }

  const handleEditSave = (idx: number) => {
    const oldAdmin = admins[idx]
    const newAdmins = admins.map((a, i) =>
      i === idx ? { name: editName, password: editPassword } : a
    )
    saveAdmins(newAdmins)
    const currentName = localStorage.getItem("adminName")
    const currentPassword = localStorage.getItem("adminPassword")
    if (oldAdmin.name === currentName && oldAdmin.password === currentPassword) {
      localStorage.setItem("adminName", editName)
      localStorage.setItem("adminPassword", editPassword)
    }
    setEditIndex(null)
  }

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col md:flex-row">
      <AdminSidebar />

      <div className="flex-1 border-l border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-16 pt-20 md:pt-8 sm:pt-8">
          
          {/* Header */}
          <header className="mb-12 sm:mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Shield size={14} className="text-zinc-500" />
                <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">Security Infrastructure</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter">
                Admin <span className="font-serif italic text-zinc-500">Personnel.</span>
              </h1>
            </motion.div>
          </header>

          {/* Add New Admin Section */}
          <section className="mb-16 sm:mb-20">
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 sm:p-8">
              <h2 className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold text-zinc-500 mb-6 sm:mb-8 flex items-center gap-3">
                <UserPlus size={14} /> Assign New Administrator
              </h2>
              <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="IDENTITY NAME"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-black border border-white/10 rounded-lg sm:rounded-xl px-4 py-3 sm:py-4 text-[9px] sm:text-xs tracking-widest focus:outline-none focus:border-white/40 transition-all uppercase"
                />
                <input
                  type="password"
                  placeholder="SECURITY KEY"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-black border border-white/10 rounded-lg sm:rounded-xl px-4 py-3 sm:py-4 text-[9px] sm:text-xs tracking-widest focus:outline-none focus:border-white/40 transition-all uppercase"
                />
                <button 
                  type="submit" 
                  className="bg-white text-black text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-colors py-3 sm:py-4"
                >
                  Register
                </button>
              </form>
            </div>
          </section>

          {/* Admins List */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold text-zinc-700 mb-4 sm:mb-6">Active Directory</h2>
            <AnimatePresence>
              {admins.map((admin, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0">
                      {idx + 1}
                    </div>
                    
                    {editIndex === idx ? (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-[9px] sm:text-xs uppercase tracking-widest focus:outline-none"
                        />
                        <div className="flex items-center px-3 sm:px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-[9px] sm:text-[10px] text-zinc-600 gap-2 italic flex-shrink-0">
                          <Lock size={10} /> KEY_ENCRYPTED
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-bold tracking-widest uppercase truncate">{admin.name}</span>
                        <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-tighter uppercase mt-1">Authorized Access Layer 01</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {editIndex === idx ? (
                      <>
                        <button onClick={() => handleEditSave(idx)} className="p-2 sm:p-3 bg-white text-black rounded-lg sm:rounded-xl hover:scale-105 transition-transform"><Check size={16} /></button>
                        <button onClick={() => setEditIndex(null)} className="p-2 sm:p-3 bg-zinc-900 text-white rounded-lg sm:rounded-xl hover:bg-zinc-800 transition-colors"><X size={16} /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(idx)} className="p-2 sm:p-3 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg sm:rounded-xl transition-all" title="Modify"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(idx)} className="p-2 sm:p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded-lg sm:rounded-xl transition-all" title="Revoke"><Trash2 size={16} /></button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <footer className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/5 flex justify-between items-center">
            <div className="text-[9px] sm:text-[10px] tracking-[0.4em] text-zinc-800 uppercase italic">
              Total Personnel: {admins.length.toString().padStart(2, '0')}
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}