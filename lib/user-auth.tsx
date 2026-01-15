// Simple user authentication context
"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface UserAuthContextType {
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined)

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem("userSession")
    setIsAuthenticated(!!session)
  }, [])

  const login = (email: string) => {
    localStorage.setItem("userSession", JSON.stringify({ email, authenticated: true, timestamp: Date.now() }))
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("userSession")
    setIsAuthenticated(false)
  }

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export function useUserAuth() {
  const context = useContext(UserAuthContext)
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider")
  }
  return context
}

export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem("userSession")
  return session ? JSON.parse(session).authenticated : false
}
