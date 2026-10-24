import { useEffect, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Heart, Menu, Search, ShoppingBag, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'
import { Modal } from './Modal'
import { mainNav } from './nav'
import { categories } from '@/data/categories'
import { queryProducts } from '@/lib/catalog'
import { useShop } from '@/lib/shop'
import { cdn } from '@/lib/image'
import { formatINR } from '@/lib/format'

export function Header() {
  const { itemCount, wishlist, ready } = useShop()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useRouterState({ select: (s) => s.location.href })

  // Close overlays whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconBtn = 'relative grid size-10 place-items-center transition hover:bg-ink/5'

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? 'border-ink/10 bg-paper/90 backdrop-blur-md' : 'border-transparent bg-paper'
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[72px] md:px-8">
          <div className="flex items-center gap-1">
            <button type="button" className={`${iconBtn} -ml-2 lg:hidden`} onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      to="/shop"
                      search={item.search}
                      className={`eyebrow link-underline py-1 ${item.label === 'Sale' ? 'text-sale' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Logo />

          <div className="flex items-center justify-end gap-0.5">
            <button type="button" className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search products">
              <Search className="size-5" aria-hidden="true" />
            </button>
            <Link to="/wishlist" className={`${iconBtn} hidden sm:grid`} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="size-5" aria-hidden="true" />
              {ready && wishlist.length > 0 && <Count n={wishlist.length} />}
            </Link>
            <Link to="/cart" className={`${iconBtn} -mr-2`} aria-label={`Shopping bag, ${itemCount} items`}>
              <ShoppingBag className="size-5" aria-hidden="true" />
              {ready && itemCount > 0 && <Count n={itemCount} />}
            </Link>
          </div>
        </div>
      </header>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" variant="drawer-left">
        <nav aria-label="Mobile" className="flex min-h-[calc(100dvh-4rem)] flex-col px-5 pb-8 pt-6">
          <ul className="space-y-1 border-b border-ink/10 pb-6">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  to="/shop"
                  search={item.search}
                  className={`flex items-center justify-between py-2.5 font-display text-2xl font-extrabold uppercase ${item.label === 'Sale' ? 'text-sale' : ''}`}
                >
                  {item.label}
                  <ArrowRight className="size-5 opacity-40" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mb-3 mt-6 text-ash">Categories</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/shop" search={{ category: c.slug }} className="link-underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-2.5 pt-8 text-sm">
            <Link to="/wishlist" className="flex items-center gap-2">
              <Heart className="size-4" aria-hidden="true" /> Wishlist {ready && wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
            <Link to="/contact" className="block text-ash">Contact & help</Link>
            <Link to="/shipping" className="block text-ash">Shipping</Link>
            <Link to="/returns" className="block text-ash">Returns & exchanges</Link>
          </div>
        </nav>
      </Modal>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

function Count({ n }: { n: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] font-bold leading-[18px] text-paper" aria-hidden="true">
      {n > 99 ? '99+' : n}
    </span>
  )
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const results = q.trim().length > 1 ? queryProducts({ q }).slice(0, 4) : []

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  return (
    <Modal open={open} onClose={onClose} title="Search" variant="top" hideTitle>
      <div className="mx-auto max-w-3xl px-5 pb-8 pt-16 md:pt-14">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            navigate({ to: '/shop', search: q.trim() ? { q: q.trim() } : {} })
          }}
          className="flex items-center gap-3 border-b-2 border-ink pb-3"
        >
          <Search className="size-6 shrink-0" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">Search products</label>
          <input
            id="site-search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tees, hoodies, black…"
            className="w-full bg-transparent font-display text-2xl font-bold uppercase placeholder:text-ink/25 focus:outline-none md:text-3xl"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-dark !min-h-10 !px-4">Search</button>
        </form>

        {q.trim().length > 1 && (
          <div className="mt-6" aria-live="polite">
            {results.length === 0 ? (
              <p className="text-sm text-ash">No products match “{q}”. Try “tee”, “hoodie” or a colour like “sand”.</p>
            ) : (
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                      <img src={cdn(p.images[0], 300, 375)} alt="" width={300} height={375} className="aspect-[4/5] w-full bg-bone object-cover" loading="lazy" />
                      <p className="mt-2 text-sm font-medium group-hover:underline">{p.name}</p>
                      <p className="text-xs text-ash">{formatINR(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {!q && (
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-wider hover:border-ink">
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
