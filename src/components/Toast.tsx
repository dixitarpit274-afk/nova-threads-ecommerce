import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useShop } from '@/lib/shop'

export function Toast() {
  const { toast, dismissToast } = useShop()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-4 md:top-24" aria-live="polite" role="status">
      {toast && (
        <div key={toast.id} className="pointer-events-auto flex animate-fade-up items-center gap-4 bg-ink py-3 pl-5 pr-2 text-sm text-paper shadow-xl">
          <span>{toast.message}</span>
          {toast.action && (
            <Link to={toast.action.to} onClick={dismissToast} className="eyebrow whitespace-nowrap underline underline-offset-4">
              {toast.action.label}
            </Link>
          )}
          <button type="button" onClick={dismissToast} className="grid size-8 place-items-center opacity-70 hover:opacity-100" aria-label="Dismiss notification">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
