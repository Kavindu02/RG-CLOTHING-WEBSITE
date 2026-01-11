export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  images: string[]
  material: string
  sizes: string[]
  colors: string[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Egyptian Cotton Premium Set",
    description:
      "Luxurious 800 thread count Egyptian cotton bedding set with duvet cover, fitted sheet, and pillowcases.",
    price: 24999,
    category: "Bed Sets",
    image: "/white-premium-bedsheet-set.jpg",
    images: ["/white-premium-bedsheet-set.jpg"],
    material: "100% Egyptian Cotton",
    sizes: ["Single", "Double", "Queen", "King"],
    colors: ["White", "Cream", "Charcoal"],
    inStock: true,
  },
  {
    id: "2",
    name: "Silk Blend Duvet Cover",
    description: "Smooth silk blend duvet cover offering superior comfort and temperature regulation for better sleep.",
    price: 8999,
    category: "Duvet Covers",
    image: "/beige-silk-duvet-cover.jpg",
    images: ["/beige-silk-duvet-cover.jpg"],
    material: "60% Mulberry Silk, 40% Cotton",
    sizes: ["Single", "Double", "Queen", "King"],
    colors: ["Beige", "White", "Champagne"],
    inStock: true,
  },
  {
    id: "3",
    name: "Luxury Pillow Collection",
    description: "Premium filled pillows with hypoallergenic materials, perfect for side, back, or stomach sleepers.",
    price: 5999,
    category: "Pillows",
    image: "/premium-white-pillows.jpg",
    images: ["/premium-white-pillows.jpg"],
    material: "100% Cotton with Memory Foam",
    sizes: ["Standard", "Queen", "King"],
    colors: ["White", "Cream"],
    inStock: true,
  },
  {
    id: "4",
    name: "Organic Mattress Protector",
    description: "Waterproof and breathable mattress protector made from organic cotton with hypoallergenic filling.",
    price: 3499,
    category: "Protectors",
    image: "/cream-mattress-protector.jpg",
    images: ["/cream-mattress-protector.jpg"],
    material: "100% Organic Cotton",
    sizes: ["Single", "Double", "Queen", "King"],
    colors: ["White", "Cream"],
    inStock: true,
  },
  {
    id: "5",
    name: "Bamboo Fitted Sheets",
    description: "Ultra-soft bamboo sheets with natural temperature regulation and anti-bacterial properties.",
    price: 4999,
    category: "Sheets",
    image: "/white-premium-bedsheet-set.jpg",
    images: ["/white-premium-bedsheet-set.jpg"],
    material: "100% Bamboo Viscose",
    sizes: ["Single", "Double", "Queen", "King"],
    colors: ["White", "Light Green", "Natural"],
    inStock: true,
  },
  {
    id: "6",
    name: "Turkish Cotton Bath Towels",
    description: "Absorbent and plush Turkish cotton towels designed for luxury bathroom experience.",
    price: 2499,
    category: "Towels",
    image: "/premium-white-pillows.jpg",
    images: ["/premium-white-pillows.jpg"],
    material: "100% Turkish Cotton",
    sizes: ["Single"],
    colors: ["White", "Taupe", "Navy"],
    inStock: true,
  },
  {
    id: "7",
    name: "Linen Flat Sheet",
    description: "Premium European linen flat sheet with superior breathability and durability.",
    price: 6999,
    category: "Sheets",
    image: "/beige-silk-duvet-cover.jpg",
    images: ["/beige-silk-duvet-cover.jpg"],
    material: "100% European Linen",
    sizes: ["Double", "Queen", "King"],
    colors: ["Natural", "White", "Charcoal"],
    inStock: true,
  },
  {
    id: "8",
    name: "Weighted Blanket",
    description: "Calming weighted blanket filled with premium materials, designed for better sleep quality.",
    price: 12999,
    category: "Blankets",
    image: "/cream-mattress-protector.jpg",
    images: ["/cream-mattress-protector.jpg"],
    material: "Cotton Cover with Glass Beads",
    sizes: ["48x72", "60x80"],
    colors: ["Charcoal", "Beige"],
    inStock: true,
  },
]

export const categories = ["All", "Bed Sets", "Duvet Covers", "Sheets", "Pillows", "Blankets", "Towels", "Protectors"]
