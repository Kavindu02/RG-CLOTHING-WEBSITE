"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, UserPlus } from "lucide-react"

export default function AdminRegisterPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!name || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Save admin name and password for login
        localStorage.setItem("adminName", name)
        localStorage.setItem("adminPassword", password)
        // Add to admins list for dashboard
        const adminsRaw = localStorage.getItem("admins")
        let admins = []
        try {
          admins = adminsRaw ? JSON.parse(adminsRaw) : []
        } catch {
          admins = []
        }
        admins.push({ name, password })
        localStorage.setItem("admins", JSON.stringify(admins))
        setSuccess("Admin registered successfully! Redirecting to login...")
        setTimeout(() => router.push("/admin/login"), 1200)
      }
      setLoading(false)
    }, 800)
  }

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <UserPlus size={24} className="text-primary-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary">Admin Register</h1>
            <p className="text-sm text-foreground/70">Create a new admin password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                placeholder="Enter admin name"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                placeholder="Re-enter password"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && <p className="text-green-600 text-xs">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
