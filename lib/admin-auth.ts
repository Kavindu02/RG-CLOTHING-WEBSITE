// Simple admin authentication context

function getStoredAdminPassword(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminPassword") || "admin123"
  }
  return "admin123"
}

export function validateAdminPassword(password: string): boolean {
  return password === getStoredAdminPassword()
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
