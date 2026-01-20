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

  // Get all registered users from localStorage
  let siteUsers: { name: string; email: string }[] = [];
  if (typeof window !== "undefined") {
    const credsArr = localStorage.getItem("siteUsers");
    if (credsArr) {
      try {
        const parsedArr = JSON.parse(credsArr);
        if (Array.isArray(parsedArr)) {
          siteUsers = parsedArr.filter(u => u.name && u.email);
        }
      } catch {}
    }
  }

  // Block user logic
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const blocked = localStorage.getItem("blockedUsers");
      if (blocked) {
        try {
          setBlockedUsers(JSON.parse(blocked));
        } catch {}
      }
    }
  }, []);
  const handleBlockUser = (email: string) => {
    const updated = [...blockedUsers, email];
    setBlockedUsers(updated);
    localStorage.setItem("blockedUsers", JSON.stringify(updated));
  };
  const handleUnblockUser = (email: string) => {
    const updated = blockedUsers.filter(e => e !== email);
    setBlockedUsers(updated);
    localStorage.setItem("blockedUsers", JSON.stringify(updated));
  };

  // Delete user logic
  const handleDeleteUser = (email: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const credsArr = localStorage.getItem("siteUsers");
    if (credsArr) {
      try {
        const parsedArr = JSON.parse(credsArr);
        const filtered = parsedArr.filter((u: any) => u.email !== email);
        localStorage.setItem("siteUsers", JSON.stringify(filtered));
        window.location.reload();
      } catch {}
    }
  };

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
                Users<span className="font-serif italic text-zinc-500">Personnel.</span>
              </h1>
            </motion.div>
          </header>

          {/* Users Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Users</h2>
              <span className="text-xs sm:text-sm md:text-base text-zinc-400 font-semibold bg-zinc-900/60 rounded-full px-4 py-1">
                Total Users: {siteUsers.length}
              </span>
            </div>
            <div className="bg-zinc-900/60 rounded-lg p-2 sm:p-4 md:p-6 overflow-x-auto">
              <table className="w-full min-w-[400px] text-left text-xs sm:text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="py-2 px-2 sm:px-4 text-zinc-400 whitespace-nowrap">Name</th>
                    <th className="py-2 px-2 sm:px-4 text-zinc-400 whitespace-nowrap">Email</th>
                    <th className="py-2 px-2 sm:px-4 text-zinc-400 whitespace-nowrap">Status</th>
                    <th className="py-2 px-2 sm:px-4 text-zinc-400 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {siteUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-2 sm:px-4 text-zinc-500 italic">No users found.</td>
                    </tr>
                  ) : (
                    siteUsers.map((user, idx) => {
                      const isBlocked = blockedUsers.includes(user.email);
                      return (
                        <tr key={idx} className="border-b border-white/5 last:border-0">
                          <td className="py-2 px-2 sm:px-4 break-all max-w-[120px] sm:max-w-xs md:max-w-sm">{user.name}</td>
                          <td className="py-2 px-2 sm:px-4 break-all max-w-[160px] sm:max-w-xs md:max-w-md">{user.email}</td>
                          <td className="py-2 px-2 sm:px-4 whitespace-nowrap">{isBlocked ? "Blocked" : "Active"}</td>
                          <td className="py-2 px-2 sm:px-4 whitespace-nowrap flex gap-2">
                            {isBlocked ? (
                              <button onClick={() => handleUnblockUser(user.email)} className="px-2 sm:px-3 py-1 bg-green-700 text-white rounded text-xs sm:text-sm">Unblock</button>
                            ) : (
                              <button onClick={() => handleBlockUser(user.email)} className="px-2 sm:px-3 py-1 bg-red-700 text-white rounded text-xs sm:text-sm">Block</button>
                            )}
                            <button onClick={() => handleDeleteUser(user.email)} className="px-2 sm:px-3 py-1 bg-zinc-800 hover:bg-red-800 text-white rounded text-xs sm:text-sm flex items-center gap-1" title="Delete User">
                              <Trash2 size={14} /> Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}