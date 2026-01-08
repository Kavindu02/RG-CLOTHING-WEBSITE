"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import type { ContactFormData } from "@/lib/contact"
import { getWhatsAppLink } from "@/lib/contact"

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-foreground mb-4">Contact Details</h3>
          <div className="space-y-4">
            <a href="tel:+94712345678" className="flex items-start gap-3 group cursor-pointer">
              <Phone size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Phone</p>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  +94 (0) 71 234 5678
                </p>
              </div>
            </a>

            <a href="mailto:hello@rgbedsheet.com" className="flex items-start gap-3 group cursor-pointer">
              <Mail size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Email</p>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  hello@rgbedsheet.com
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Location</p>
                <p className="font-medium text-foreground">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.171l-.546-.274-5.652 1.482.154 5.022 1.582.736a9.885 9.885 0 00.9 4.852l-.524 1.352 5.23-1.372 1.394.557c1.58.935 3.4 1.431 5.282 1.431 5.484 0 9.944-4.465 9.944-9.949 0-2.66-.981-5.163-2.768-7.133-1.786-1.97-4.189-3.058-6.77-3.058z" />
          </svg>
          Chat on WhatsApp
        </a>

        <div className="p-4 bg-muted rounded-lg text-sm text-foreground/70">
          <p className="font-medium text-foreground mb-2">Response Time</p>
          <p>We typically respond to inquiries within 2-4 hours during business hours.</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="+94 (0) 71 234 5678"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a subject</option>
              <option value="product-inquiry">Product Inquiry</option>
              <option value="bulk-order">Bulk Order</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Tell us how we can help..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 font-medium rounded transition-all ${
              submitted
                ? "bg-accent text-accent-foreground"
                : loading
                  ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {loading ? "Sending..." : submitted ? "Message Sent Successfully!" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}
