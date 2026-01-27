"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Check, Loader2, SendHorizontal } from "lucide-react"
import type { ContactFormData } from "@/lib/contact"

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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        console.error("Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-black rounded-xl p-10">
      
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: white !important;
          -webkit-box-shadow: 0 0 0px 1000px #050505 inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {submitted ? (
        <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full animate-pulse" />
            <div className="relative w-24 h-24 border-2 border-primary rounded-full flex items-center justify-center bg-black">
              <Check className="w-12 h-12 text-primary stroke-[3px]" />
            </div>
          </div>
          <h3 className="font-serif text-5xl text-white mb-4 tracking-tighter">Received!</h3>
          <p className="text-zinc-400 text-lg font-light max-w-sm leading-relaxed">
            Thank you, <span className="text-white font-medium">{formData.name}</span>. Your inquiry has been sent to our luxury concierge.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-10 text-[10px] uppercase tracking-[0.4em] text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { label: "Full Name", name: "name", type: "text", req: true },
              { label: "Email Address", name: "email", type: "email", req: true },
              { label: "Phone Number", name: "phone", type: "tel", req: false },
            ].map((field) => (
              <div key={field.name} className="relative group">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder=" "
                  autoComplete="new-password"
                  onChange={handleChange}
                  required={field.req}
                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all duration-500"
                />
                <label className="absolute left-0 top-3 text-zinc-500 text-sm uppercase tracking-widest pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                  {field.label}
                </label>
              </div>
            ))}

            
          </div>

          <div className="relative group">
            <textarea
              name="message"
              placeholder=" "
              rows={4}
              autoComplete="off"
              onChange={handleChange}
              required
              className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary transition-all resize-none"
            />
            <label className="absolute left-0 top-3 text-zinc-500 text-sm uppercase tracking-widest pointer-events-none transition-all duration-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
              Your Message
            </label>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden bg-primary px-8 py-5 flex items-center justify-between hover:bg-white transition-colors duration-500 rounded-none shadow-[0_20px_40px_rgba(var(--primary-rgb),0.2)]"
            >
              <div className="flex items-center gap-3">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                ) : (
                  <SendHorizontal className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                )}
                <span className="text-black font-black uppercase tracking-[0.3em] text-[12px]">
                  {loading ? "Transmitting..." : "Deliver Message"}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}