"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateAdminPassword, setAdminSession } from "@/lib/admin-auth"
import { Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      if (validateAdminPassword(password)) {
        setAdminSession()
        router.push("/admin")
      } else {
        setError("Invalid password. Please try again.")
        setPassword("")
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
              <Lock size={24} className="text-primary-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary">Admin Access</h1>
            <p className="text-sm text-foreground/70">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="p-3 bg-muted rounded text-xs text-foreground/60">
            <p className="font-medium mb-1">Demo Password: admin123</p>
            <p>
              This is a demo admin panel. In production, implement proper authentication with secure password hashing.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
