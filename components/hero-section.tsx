"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary leading-tight">
              Luxury Bedding Redefined
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Experience the unparalleled comfort and elegance of RG Bedsheet. Handcrafted premium bedding that
              transforms your bedroom into a sanctuary of luxury.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/shop">
                <Button className="px-8 py-3">Explore Collection</Button>
              </Link>
              <Button variant="outline" className="px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <img
              src="/luxury-premium-bedsheet-collection.jpg"
              alt="RG Bedsheet Premium Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
