import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">RG</h3>
            <p className="text-sm opacity-80">Premium luxury bedding and lifestyle products from Sri Lanka.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="opacity-80 hover:opacity-100 transition-opacity">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bedsets" className="opacity-80 hover:opacity-100 transition-opacity">
                  Bed Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pillows" className="opacity-80 hover:opacity-100 transition-opacity">
                  Pillows
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="opacity-80 hover:opacity-100 transition-opacity">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span className="opacity-80">+94 (0) 1 234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span className="opacity-80">hello@rgbedsheet.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span className="opacity-80">Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex justify-center items-center">
  <p className="text-sm opacity-80 text-center">
    &copy; {new Date().getFullYear()} RG Bedsheet. All Rights Reserved.
  </p>
</div>


      </div>
    </footer>
  )
}
