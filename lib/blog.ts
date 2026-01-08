export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Perfect Sleep: Understanding Thread Count",
    excerpt:
      "Discover what thread count really means and how it affects your sleep quality. Learn the secrets to choosing the perfect bedding.",
    content: `
      Thread count is one of the most discussed metrics in the bedding industry, but many people misunderstand what it truly means. In this comprehensive guide, we'll break down everything you need to know about thread count and how it impacts your sleep experience.

      ## What is Thread Count?

      Thread count refers to the number of threads woven into one square inch of fabric. It's calculated by counting the threads in both the warp (vertical) and weft (horizontal) directions. A higher thread count generally means a denser, softer fabric.

      ## The Myth of Ultra-High Thread Count

      While it's true that higher thread count usually indicates better quality, the law of diminishing returns applies. Thread counts above 1000-1200 often don't provide significant improvements and may even indicate misleading marketing practices.

      ## Material Quality Matters More

      The type of cotton used is actually more important than the thread count. Egyptian cotton and Pima cotton are known for their superior softness and durability compared to standard cotton.

      ## Our Recommendation

      For the best sleep experience, we recommend 400-600 thread count bedding made from premium cotton varieties. This sweet spot offers luxury comfort without the inflated pricing of ultra-high thread counts.
    `,
    author: "Sarah Williams",
    date: "2025-01-15",
    category: "Bedding Guide",
    image: "/luxury-bedding-product-photography-elegant.jpg",
    readTime: 5,
  },
  {
    id: "2",
    title: "Sustainable Luxury: Our Journey to Eco-Friendly Bedding",
    excerpt:
      "How RG Bedsheet is committed to environmental sustainability while maintaining premium quality standards.",
    content: `
      At RG Bedsheet, we believe luxury and sustainability can coexist. Our commitment to the environment is reflected in every product we create.

      ## Our Sustainable Practices

      We source our materials from certified organic farms that use sustainable farming methods. Our manufacturing processes minimize water usage and chemical treatments.

      ## Why It Matters

      The bedding industry has a significant environmental impact. By choosing sustainable materials, we're reducing our carbon footprint and supporting ethical farming communities.

      ## What You Get

      When you choose RG Bedsheet, you're not just getting premium comfort—you're also supporting environmental responsibility and fair trade practices.
    `,
    author: "Michael Chen",
    date: "2025-01-10",
    category: "Sustainability",
    image: "/beige-silk-duvet-cover.jpg",
    readTime: 4,
  },
  {
    id: "3",
    title: "How to Care for Your Premium Bedding: A Complete Guide",
    excerpt: "Extend the life of your luxury bedding with our expert care and maintenance tips.",
    content: `
      Your premium bedding is an investment in your comfort and well-being. Proper care ensures it remains luxurious for years to come.

      ## Washing Your Bedding

      Wash your sheets in cool water with mild detergent. Hot water can damage delicate fibers and fade colors. Wash bedding weekly for optimal freshness.

      ## Drying Tips

      Use low heat when drying your bedding. High temperatures can cause shrinkage and damage to premium fibers. Air drying is ideal for extending the lifespan of your sheets.

      ## Storage

      Store clean, dry bedding in a cool, dark place. Use breathable storage bags to prevent moisture and dust accumulation.

      ## Maintenance Schedule

      Replace your bedding every 3-5 years depending on frequency of use. Quality bedding should maintain its softness and appearance much longer than budget alternatives.
    `,
    author: "Emma Johnson",
    date: "2025-01-05",
    category: "Care & Maintenance",
    image: "/premium-white-pillows.jpg",
    readTime: 6,
  },
  {
    id: "4",
    title: "The Science Behind Better Sleep: Temperature and Fabrics",
    excerpt: "Explore the role of bedding materials in regulating sleep temperature and improving sleep quality.",
    content: `
      Temperature plays a crucial role in sleep quality. The right bedding can help you maintain optimal sleep temperature throughout the night.

      ## Why Temperature Matters

      Your body naturally cools down during sleep. Bedding that helps regulate temperature can improve sleep quality and reduce nighttime disturbances.

      ## Best Fabrics for Temperature Regulation

      Bamboo viscose is excellent for moisture-wicking and breathability. Egyptian cotton offers natural temperature regulation. Silk provides a cool surface that adjusts to your body temperature.

      ## Finding Your Perfect Match

      The right bedding depends on your personal sleep preferences and climate. Light sleepers need more breathable materials, while those in cold climates may prefer warmer fabrics.
    `,
    author: "Dr. James Wilson",
    date: "2025-01-01",
    category: "Sleep Science",
    image: "/cream-mattress-protector.jpg",
    readTime: 5,
  },
]

export const categories = ["All", "Bedding Guide", "Sustainability", "Care & Maintenance", "Sleep Science"]
