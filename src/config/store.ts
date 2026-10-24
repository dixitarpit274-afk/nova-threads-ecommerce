/**
 * Store-wide business settings. Edit this file (or set the matching
 * environment variables in Netlify) to configure the shop without touching
 * any component code.
 */

const env = import.meta.env

export const storeConfig = {
  brand: 'NOVA THREADS',
  tagline: 'Wear Your Next Chapter.',
  description:
    'NOVA THREADS is an Indian premium streetwear label making elevated everyday essentials — heavyweight tees, relaxed shirts, hoodies and tailored trousers.',
  siteUrl: (env.VITE_SITE_URL as string | undefined) ?? 'https://nova-threads-ecommerce.netlify.app',

  /**
   * While true, the storefront shows demo labels on products, reviews and
   * checkout. Set to false only once real inventory, order storage and a
   * payment provider are connected.
   */
  demoMode: true,

  /** WhatsApp business number in international format, digits only (e.g. 919876543210). */
  whatsappNumber: ((env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '').replace(/\D/g, ''),
  whatsappMessage: 'Hi NOVA THREADS, I have a question about an order.',

  /** Public support email. Leave empty to hide email links. */
  supportEmail: (env.VITE_SUPPORT_EMAIL as string | undefined) ?? '',

  shipping: {
    freeThreshold: 1999,
    standardFee: 99,
    estimate: '3–7 business days',
    metroEstimate: '2–4 business days in metro cities',
  },

  payments: {
    cashOnDelivery: {
      enabled: true,
      fee: 49,
      /** COD is hidden for carts above this value. */
      maxOrderValue: 10000,
    },
    online: {
      /** Flip to true once a secure payment provider is integrated (see PLAN.md). */
      enabled: false,
      providerLabel: 'UPI, cards & netbanking',
    },
  },

  returns: {
    windowDays: 7,
    exchangeWindowDays: 15,
  },

  announcements: [
    'New Arrivals — The Chapter 02 drop is live',
    'Free shipping across India on orders above ₹1,999',
    'Easy 15-day size exchanges',
  ],
} as const

export function whatsappLink(message: string = storeConfig.whatsappMessage) {
  if (!storeConfig.whatsappNumber) return null
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
