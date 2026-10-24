import { Link } from '@tanstack/react-router'
import { whatsappLink } from '@/config/store'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.56-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.45 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.69 5.8.69 12.07c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.3 11.3 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.36-11.35 0-3.03-1.18-5.89-3.32-8.03" />
    </svg>
  )
}

/**
 * Floating WhatsApp contact button. Uses VITE_WHATSAPP_NUMBER from the store
 * config; until a number is configured it routes to the contact page instead
 * of a broken wa.me link.
 */
export function WhatsAppButton() {
  const href = whatsappLink()
  const cls =
    'fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:scale-105 md:bottom-7 md:right-7'
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Chat with us on WhatsApp (opens in a new tab)">
        <WhatsAppIcon className="size-7" />
      </a>
    )
  }
  return (
    <Link to="/contact" hash="whatsapp" className={cls} aria-label="Contact us — WhatsApp support details">
      <WhatsAppIcon className="size-7" />
    </Link>
  )
}

export { WhatsAppIcon }
