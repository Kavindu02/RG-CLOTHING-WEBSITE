// Simple admin authentication context

// Default admin credentials from environment variables
const DEFAULT_ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""

// Initialize default admin in localStorage if not exists
function initializeDefaultAdmin() {
  if (typeof window !== "undefined") {
    const adminsRaw = localStorage.getItem("admins")
    let admins = []
    try {
      admins = adminsRaw ? JSON.parse(adminsRaw) : []
    } catch {
      admins = []
    }
    
    // Check if default admin already exists
    const adminExists = admins.some((a: any) => a.name === DEFAULT_ADMIN_USERNAME)
    
    if (!adminExists) {
      admins.push({ name: DEFAULT_ADMIN_USERNAME, password: DEFAULT_ADMIN_PASSWORD })
      localStorage.setItem("admins", JSON.stringify(admins))
    }
  }
}

export function validateAdminCredentials(username: string, password: string): boolean {
  initializeDefaultAdmin()
  return username === DEFAULT_ADMIN_USERNAME && password === DEFAULT_ADMIN_PASSWORD
}

export function setAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminSession", JSON.stringify({ authenticated: true, timestamp: Date.now() }))
  }
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminSession")
    localStorage.removeItem("adminName")
    localStorage.removeItem("adminPassword")
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem("adminSession")
  return session ? JSON.parse(session).authenticated : false
}
