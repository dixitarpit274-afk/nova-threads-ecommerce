import { Link } from '@tanstack/react-router'
import { storeConfig } from '@/config/store'

export function AnnouncementBar() {
  const items = [...storeConfig.announcements, ...storeConfig.announcements]
  return (
    <div className="relative overflow-hidden bg-ink text-paper" role="region" aria-label="Store announcements">
      <Link
        to="/shop"
        search={{ collection: 'new' }}
        className="flex h-9 items-center whitespace-nowrap"
        aria-label={`${storeConfig.announcements.join('. ')}. Shop new arrivals.`}
      >
        <div className="flex animate-marquee gap-16 pr-16" aria-hidden="true">
          {items.map((text, i) => (
            <span key={i} className="eyebrow flex items-center gap-16 !text-[10px] !tracking-[0.28em]">
              {text}
              <span className="text-stone">✦</span>
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}
