import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { UserAuthProvider } from "@/lib/user-auth"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const baseUrl = "https://rg-clothing-website.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RG Clothing - Premium Sri Lankan Luxury Clothing & Bedding",
    template: "%s | RG Clothing"
  },
  description:
    "Discover RG Bedsheet - Premium luxury bedding, bed sheets, and lifestyle products from Sri Lanka. Handcrafted quality for the modern home.",
  keywords: ["Sri Lanka", "Luxury Bedding", "Bed Sheets", "Clothing", "Online Store", "Cotton", "Silk", "RG Clothing"],
  authors: [{ name: "RG Clothing" }],
  creator: "RG Clothing",
  publisher: "RG Clothing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "RG Clothing - Premium Sri Lankan Luxury Clothing",
    description: "Discover RG Bedsheet - Premium luxury bedding and lifestyle products from Sri Lanka.",
    url: baseUrl,
    siteName: "RG Clothing",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "RG Clothing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "RG Clothing",
  image: `${baseUrl}/logo.jpeg`,
  description: "Premium luxury bedding and lifestyle products from Sri Lanka.",
  url: baseUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Colombo, Sri Lanka",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UserAuthProvider>
          <CartProvider>
            {children}
            <Analytics />
          </CartProvider>
        </UserAuthProvider>
      </body>
    </html>
  )
}
