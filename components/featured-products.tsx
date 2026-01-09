import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Egyptian Cotton Premium Set",
    price: 24999,
    image: "/egyptian-cotton-premium-bedsheet.jpg",
    category: "Bedsets",
  },
  {
    id: "2",
    name: "Silk Blend Duvet Cover",
    price: 8999,
    image: "/silk-duvet-cover.jpg",
    category: "Duvet Covers",
  },
  {
    id: "3",
    name: "Luxury Pillow Collection",
    price: 5999,
    image: "/luxury-pillows.jpg",
    category: "Pillows",
  },
  {
    id: "4",
    name: "Organic Mattress Protector",
    price: 3499,
    image: "/mattress-protector.jpg",
    category: "Protectors",
  },
]

export function FeaturedProducts() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-black mb-2">
            Crafting the Art of
            <span className="block italic text-5xl md:text-6xl text-black/30 mt-2">Featured Products.</span>
          </h2>
          <p className="text-base md:text-lg text-black/80 max-w-2xl mx-auto mt-4">
            At <span className="font-bold text-black">RG Bedsheet</span>, Our bedsheets are made with premium fabrics, blending Sri Lankan artistry with global luxury for a truly restful sleep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative bg-muted rounded-lg overflow-hidden aspect-square mb-4 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-2">{product.category}</p>
                <p className="font-serif text-lg text-primary">
                  {new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button className="px-8 py-3">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
