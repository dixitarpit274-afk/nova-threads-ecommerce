import { Link } from '@tanstack/react-router'
import { storeConfig } from '@/config/store'
import { mainNav } from './nav'
import { NewsletterForm } from './NewsletterForm'

const help = [
  { label: 'Shipping', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
  { label: 'Exchanges', to: '/exchange' },
  { label: 'Contact us', to: '/contact' },
] as const

const legal = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms of service', to: '/terms' },
] as const

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-md">
            <p className="eyebrow mb-4 text-stone">The Nova List</p>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
              First access to every drop.
            </h2>
            <p className="mb-6 mt-4 text-sm leading-relaxed text-paper/65">
              New chapters, restocks and early sale access — straight to your inbox. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm tone="dark" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Shop">
              {mainNav.map((n) => (
                <li key={n.label}>
                  <Link to="/shop" search={n.search} className="link-underline">{n.label}</Link>
                </li>
              ))}
            </FooterCol>
            <FooterCol title="Help">
              {help.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-underline">{n.label}</Link>
                </li>
              ))}
            </FooterCol>
            <FooterCol title="Legal">
              {legal.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-underline">{n.label}</Link>
                </li>
              ))}
            </FooterCol>
          </div>
        </div>

        <p
          className="mt-20 select-none font-display text-[19vw] font-black uppercase leading-[0.78] tracking-[-0.06em] text-paper/[0.07] lg:text-[16.5rem]"
          aria-hidden="true"
        >
          Nova
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {storeConfig.brand}. {storeConfig.tagline}</p>
          {storeConfig.demoMode && (
            <p>Demo storefront — products, prices and reviews are samples. No real orders are placed.</p>
          )}
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-5 text-stone">{title}</h3>
      <ul className="space-y-3 text-sm text-paper/80">{children}</ul>
    </div>
  )
}
