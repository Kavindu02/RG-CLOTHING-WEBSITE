import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className={`group cursor-pointer h-full ${featured ? "md:col-span-2" : ""}`}>
        <div
          className={`relative bg-muted rounded-lg overflow-hidden mb-4 ${featured ? "aspect-video" : "aspect-square"}`}
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wide text-accent font-medium">{post.category}</span>
            <span className="text-xs text-foreground/60 flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>

          <h3
            className={`font-serif text-foreground group-hover:text-accent transition-colors ${featured ? "text-2xl" : "text-lg"}`}
          >
            {post.title}
          </h3>

          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-foreground/60 flex items-center gap-1">
              <User size={14} />
              {post.author}
            </div>
            <span className="text-sm text-foreground/60">{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <div className="group/arrow inline-flex items-center gap-2 text-accent font-medium text-sm pt-2 hover:opacity-80 transition-opacity">
            Read More
            <ArrowRight size={16} className="group-hover/arrow:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}
