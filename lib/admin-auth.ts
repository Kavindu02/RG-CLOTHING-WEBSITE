// Simple admin authentication context
const ADMIN_PASSWORD = "admin123" // In production, this should be properly secured

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function setAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminSession", JSON.stringify({ authenticated: true, timestamp: Date.now() }))
  }
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminSession")
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem("adminSession")
  return session ? JSON.parse(session).authenticated : false
}
