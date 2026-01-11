"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"

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
    // If the deleted admin is currently logged in, log them out
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
    // If the edited admin is currently logged in, update session
    const currentName = localStorage.getItem("adminName")
    const currentPassword = localStorage.getItem("adminPassword")
    if (oldAdmin.name === currentName && oldAdmin.password === currentPassword) {
      localStorage.setItem("adminName", editName)
      localStorage.setItem("adminPassword", editPassword)
    }
    setEditIndex(null)
  }

  return (
    <main className="min-h-screen w-full bg-background p-8">
      <h1 className="font-serif text-2xl font-bold mb-6">Admin Users</h1>
      <form onSubmit={handleAdd} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Add</button>
      </form>
      <div className="space-y-4">
        {admins.map((admin, idx) => (
          <div key={idx} className="flex items-center gap-4 border p-4 rounded">
            {editIndex === idx ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="password"
                  value={editPassword}
                  onChange={e => setEditPassword(e.target.value)}
                  className="px-2 py-1 border rounded"
                />
                <button onClick={() => handleEditSave(idx)} className="px-2 py-1 bg-green-600 text-white rounded">Save</button>
                <button onClick={() => setEditIndex(null)} className="px-2 py-1 bg-gray-400 text-white rounded">Cancel</button>
              </>
            ) : (
              <>
                <span className="font-medium">{admin.name}</span>
                <span className="text-xs text-gray-500">(hidden password)</span>
                <button onClick={() => handleEdit(idx)} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(idx)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 text-sm text-gray-500">Total Admins: {admins.length}</div>
    </main>
  )
}
