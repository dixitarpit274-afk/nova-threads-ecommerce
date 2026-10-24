import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  /** Visually hide the title (it is still announced to screen readers). */
  hideTitle?: boolean
  variant?: 'center' | 'drawer-left' | 'top'
  className?: string
  children: ReactNode
}

/**
 * Accessible modal built on the native <dialog> element, which provides
 * focus trapping, Escape-to-close and an inert background for free.
 */
export function Modal({ open, onClose, title, hideTitle, variant = 'center', className = '', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
    if (!open) document.documentElement.style.overflow = ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const placement = {
    center: 'm-auto w-[min(100vw-1.5rem,64rem)] max-h-[calc(100dvh-1.5rem)]',
    'drawer-left': 'mr-auto my-0 ml-0 h-dvh max-h-dvh w-[min(100vw-3rem,24rem)]',
    top: 'mx-auto mt-0 w-full max-w-none',
  }[variant]

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={`overflow-y-auto bg-paper p-0 text-ink backdrop:bg-ink/55 backdrop:backdrop-blur-[2px] ${placement} ${className}`}
    >
      {open && (
        <div className="relative">
          <div className={`flex items-center justify-between gap-4 px-5 pt-5 md:px-8 md:pt-6 ${hideTitle ? 'absolute inset-x-0 top-0 z-10' : ''}`}>
            <h2 id={titleId} className={hideTitle ? 'sr-only' : 'font-display text-lg font-bold uppercase'}>
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto grid size-10 place-items-center bg-paper/80 transition hover:bg-bone"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  )
}
