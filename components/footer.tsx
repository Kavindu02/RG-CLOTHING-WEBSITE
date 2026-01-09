import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Column - 4 columns wide */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-4xl font-bold tracking-tighter">
                RG <span className="italic text-zinc-600">Bedsheets.</span>
              </h3>
              <p className="text-zinc-400 font-light text-lg leading-relaxed max-w-sm">
                Elevating the art of sleep through Sri Lankan craftsmanship and global luxury standards.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              {[Instagram, Facebook].map((Icon, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-500"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns - 7 columns total */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] italic text-zinc-600">Shop</h4>
              <ul className="space-y-4">
                {["All Products", "Bed Sets", "Pillows", "Accessories"].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="group flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                      {item}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] italic text-zinc-600">Company</h4>
              <ul className="space-y-4">
                {["About Us", "Contact Us"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="group flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] italic text-zinc-600">Office</h4>
              <ul className="space-y-4 text-sm font-light text-zinc-400">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-zinc-600 mt-0.5" />
                  <span>Colombo 07,<br />Sri Lanka</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-zinc-600" />
                  <span>+94 11 234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-600" />
                  <span className="truncate">hello@rgbedsheets.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            &copy; {new Date().getFullYear()} RG BEDSHEETS. CRAFTED BY EXCELLENCE.
          </p>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-colors"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                <ArrowUpRight className="w-3 h-3 -rotate-45" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}