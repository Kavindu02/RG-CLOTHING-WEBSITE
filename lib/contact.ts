export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export const WHATSAPP_PHONE = "+94712345678"

export function getWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(message || "Hi, I'd like to inquire about RG Bedsheet products.")
  return `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}?text=${text}`
}
