"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Package, 
  ShoppingBag, 
  LogOut, 
  Users, 
  LayoutDashboard, 
  Store,
  ChevronRight,
  Menu,
  X
} from "lucide-react"
import { clearAdminSession } from "@/lib/admin-auth"
import { motion, AnimatePresence } from "framer-motion"

interface AdminSidebarProps {
  isOpen?: boolean
}

export function AdminSidebar({ isOpen = true }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Admins", href: "/admin/users", icon: Users },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "View Shop", href: "/shop", icon: Store },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside 
      className={`hidden md:flex h-screen sticky top-0 bg-black border-r border-white/10 w-72 flex-col transition-all duration-500 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Logo Section */}
      <div className="p-10 border-b border-white/5">
        <h2 className="text-white font-serif italic text-2xl tracking-tighter">RG <span className="text-zinc-500 not-italic font-sans text-xs tracking-[0.3em] ml-2 font-bold uppercase">Admin</span></h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-1 mt-4">
        {menuItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-4 z-10">
                <item.icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    active ? "text-black" : "text-zinc-500 group-hover:text-white"
                  }`} 
                />
                <span className={`text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 ${
                  active ? "text-black" : "text-zinc-600 group-hover:text-white"
                }`}>
                  {item.name}
                </span>
              </div>
              
              {active && (
                <ChevronRight size={14} className="text-black z-10" />
              )}

              {/* Active Background Slide */}
              {active && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Hover Effect (Non-Active) */}
              {!active && (
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="group flex items-center gap-4 px-4 py-4 w-full rounded-xl hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={18} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
          <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-zinc-600 group-hover:text-red-500 transition-colors">
            Logout
          </span>
        </button>
        
        <div className="mt-6 px-4">
          <p className="text-[8px] tracking-[0.3em] text-zinc-800 uppercase font-mono italic">
            Secure Terminal Access
          </p>
        </div>
      </div>
    </aside>
  )

  // Mobile Navigation Header
  const MobileNavHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-black border-b border-white/10 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-white font-serif italic text-xl tracking-tighter">RG <span className="text-zinc-500 not-italic font-sans text-xs tracking-[0.3em] ml-2 font-bold uppercase">Admin</span></h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black border-t border-white/10"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 z-10 w-full">
                      <item.icon 
                        size={16} 
                        className={`transition-colors duration-300 ${
                          active ? "text-black" : "text-zinc-500 group-hover:text-white"
                        }`} 
                      />
                      <span className={`text-[9px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 ${
                        active ? "text-black" : "text-zinc-600 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>
                    </div>

                    {/* Active Background */}
                    {active && (
                      <motion.div 
                        layoutId="mobileActiveTab"
                        className="absolute inset-0 bg-white"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Effect */}
                    {!active && (
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    )}
                  </Link>
                )
              })}
              
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="group flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 transition-all duration-300 mt-4 border-t border-white/5 pt-4"
              >
                <LogOut size={16} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-600 group-hover:text-red-500 transition-colors">
                  Logout
                </span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileNavHeader />
    </>
  )
}