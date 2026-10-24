import { Star } from 'lucide-react'
import { formatINR, discountPercent } from '@/lib/format'

export function DemoBadge({ label = 'Demo product', className = '' }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-ink/15 bg-paper/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ash backdrop-blur ${className}`}
    >
      <span className="size-1.5 rounded-full bg-stone" aria-hidden="true" />
      {label}
    </span>
  )
}

export function Price({ price, compareAt, size = 'md' }: { price: number; compareAt?: number; size?: 'md' | 'lg' }) {
  const off = discountPercent(price, compareAt)
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${size === 'lg' ? 'text-xl' : 'text-sm'}`}>
      <span className="font-semibold">{formatINR(price)}</span>
      {off > 0 && (
        <>
          <span className="text-ash line-through" aria-label={`Original price ${formatINR(compareAt!)}`}>
            {formatINR(compareAt!)}
          </span>
          <span className="font-semibold text-sale">{off}% off</span>
        </>
      )}
    </p>
  )
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-3.5 ${i < rating ? 'fill-ink text-ink' : 'text-ink/25'}`} aria-hidden="true" />
      ))}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
      <div>
        {eyebrow && <p className="eyebrow mb-3 text-ash">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-shimmer bg-bone ${className}`} aria-hidden="true" />
}
